import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = [
  '#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8',
  '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#4338ca',
  '#3730a3', '#312e81', '#6366f1', '#818cf8', '#a78bfa',
  '#c084fc', '#d946ef', '#e879f9', '#f0abfc', '#f5d0fe',
];

/**
 * BarChartComponent
 * =================
 * City-wise business listing count bar chart.
 */
export default function BarChartComponent({ data = [], title = 'City-wise Distribution' }) {
  // Take top 15 cities for readability
  const chartData = data.slice(0, 15);

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <h3 className="text-base font-semibold text-surface-800 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: '13px',
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
