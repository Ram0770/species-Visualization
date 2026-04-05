import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const colors = ['#0ea5e9', '#14b8a6', '#f97316', '#2563eb', '#f59e0b', '#8b5cf6'];

const chartSurface = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.72))',
  borderRadius: '30px',
  boxShadow: '0 22px 60px rgba(15,23,42,0.09)',
};

function Charts({ stats }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="glass rounded-[30px] p-6">
        <p className="section-kicker mb-3">Bar Analysis</p>
        <h3 className="mb-4 text-2xl font-bold text-slate-950">Species discovered per year</h3>
        <div className="h-80 p-3" style={chartSurface}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.perYear}>
              <CartesianGrid strokeDasharray="2 6" stroke="rgba(148,163,184,0.28)" />
              <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 18, borderColor: 'rgba(226,232,240,0.9)' }} />
              <Legend />
              <Bar dataKey="count" fill="#0ea5e9" radius={[12, 12, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass rounded-[30px] p-6">
        <p className="section-kicker mb-3">Contribution View</p>
        <h3 className="mb-4 text-2xl font-bold text-slate-950">Top scientists contribution</h3>
        <div className="h-80 p-3" style={chartSurface}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats.topScientists} dataKey="count" nameKey="scientist" outerRadius={108} innerRadius={48} paddingAngle={4} label>
                {stats.topScientists.map((entry, index) => (
                  <Cell key={entry.scientist} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 18, borderColor: 'rgba(226,232,240,0.9)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass rounded-[30px] p-6 lg:col-span-2">
        <p className="section-kicker mb-3">Timeline View</p>
        <h3 className="mb-4 text-2xl font-bold text-slate-950">Recently added species timeline</h3>
        <div className="h-80 p-3" style={chartSurface}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.recentlyAdded.map((item, idx) => ({ ...item, order: idx + 1 }))}>
              <CartesianGrid strokeDasharray="2 6" stroke="rgba(148,163,184,0.28)" />
              <XAxis dataKey="scientific_name" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 18, borderColor: 'rgba(226,232,240,0.9)' }} />
              <Line type="monotone" dataKey="order" stroke="#f97316" strokeWidth={4} dot={{ r: 5, fill: '#f97316' }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default Charts;
