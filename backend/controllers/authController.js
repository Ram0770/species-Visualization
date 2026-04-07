const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { signToken } = require('../utils/token');
const { findByEmail, createLocalUser, createGoogleUser, findSafeById } = require('../models/userModel');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res, next) => {
  try {
    const { fullName, email, role, password, confirmPassword } = req.body;

    if (!fullName || !email || !role || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!['student', 'lecturer'].includes(role)) {
      return res.status(400).json({ message: 'Role must be student or lecturer' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existing = await findByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createLocalUser({
      fullName: fullName.trim(),
      email: normalizedEmail,
      role,
      passwordHash,
    });

    return res.status(201).json({
      message: 'Registration successful',
      userId,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered' });
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    if (!['student', 'lecturer'].includes(role)) {
      return res.status(400).json({ message: 'Role must be student or lecturer' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await findByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.password_hash) {
      return res.status(401).json({ message: 'Use Google login for this account' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: `Role mismatch. Please login as ${user.role}.` });
    }

    const token = signToken({ id: user.id, role: user.role });

    return res.json({
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const { credential, role } = req.body;

    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email.toLowerCase();

    let user = await findByEmail(email);

    if (!user) {
      const safeRole = ['student', 'lecturer'].includes(role) ? role : 'student';
      const newId = await createGoogleUser({
        fullName: payload.name || 'Google User',
        email,
        role: safeRole,
        googleId: payload.sub,
      });
      user = await findSafeById(newId);
      user.email = email;
    }

    const token = signToken({ id: user.id, role: user.role });

    return res.json({
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered' });
    }
    return res.status(401).json({ message: 'Google authentication failed', error: error.message });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
};
