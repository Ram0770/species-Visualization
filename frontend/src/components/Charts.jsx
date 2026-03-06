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

const colors = ['#56c7ff', '#44d7b6', '#ff8f5a', '#6da3ff', '#ffc857', '#3dd5f3'];

function Charts({ stats }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="glass rounded-2xl p-5">
        <h3 className="mb-4 font-['Sora'] text-lg font-bold">Species Discovered Per Year</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.perYear}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#56c7ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass rounded-2xl p-5">
        <h3 className="mb-4 font-['Sora'] text-lg font-bold">Top Scientists Contribution</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats.topScientists} dataKey="count" nameKey="scientist" outerRadius={100} label>
                {stats.topScientists.map((entry, index) => (
                  <Cell key={entry.scientist} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass rounded-2xl p-5 lg:col-span-2">
        <h3 className="mb-4 font-['Sora'] text-lg font-bold">Recently Added Species Timeline</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.recentlyAdded.map((item, idx) => ({ ...item, order: idx + 1 }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scientific_name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="order" stroke="#ff8f5a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default Charts;
