import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#3b82f6',
  '#84cc16', '#a855f7', '#e11d48', '#0ea5e9', '#eab308',
  '#d946ef', '#10b981', '#fb923c', '#64748b', '#f43f5e',
];

/**
 * PieChartComponent
 * =================
 * Category-wise business distribution pie chart.
 */
export default function PieChartComponent({ data = [], title = 'Category Distribution' }) {
  // Take top 10 categories for clarity
  const chartData = data.slice(0, 10);

  const renderCustomLabel = ({ name, percent }) => {
    if (percent < 0.05) return null;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <h3 className="text-base font-semibold text-surface-800 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={120}
            label={renderCustomLabel}
            labelLine={false}
            strokeWidth={2}
            stroke="#fff"
          >
            {chartData.map((_, index) => (
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
