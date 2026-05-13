import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'];

/**
 * DoughnutChartComponent
 * ======================
 * Source-wise business distribution doughnut chart.
 */
export default function DoughnutChartComponent({
  data = [],
  title = 'Source Distribution',
}) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <h3 className="text-base font-semibold text-surface-800 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={120}
            paddingAngle={3}
            strokeWidth={2}
            stroke="#fff"
            label={({ name, count }) => `${name} (${count})`}
            labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
