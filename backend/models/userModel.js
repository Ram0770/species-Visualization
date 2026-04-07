const User = require('./User');

const findByEmail = async (email) => {
  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).lean();
  if (!user) return null;

  return {
    id: user._id.toString(),
    full_name: user.fullName,
    email: user.email,
    role: user.role,
    password_hash: user.passwordHash,
    google_id: user.googleId,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
};

const findSafeById = async (id) => {
  const user = await User.findById(id).lean();
  if (!user) return null;

  return {
    id: user._id.toString(),
    full_name: user.fullName,
    email: user.email,
    role: user.role,
    created_at: user.createdAt,
  };
};

const createLocalUser = async ({ fullName, email, role, passwordHash }) => {
  const user = await User.create({
    fullName,
    email,
    role,
    passwordHash,
  });
  return user._id.toString();
};

const createGoogleUser = async ({ fullName, email, role, googleId }) => {
  const user = await User.create({
    fullName,
    email,
    role,
    googleId,
  });
  return user._id.toString();
};

module.exports = {
  findByEmail,
  findSafeById,
  createLocalUser,
  createGoogleUser,
};
