import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';
import { useDailyStats } from '../../hooks/useDailyStats';



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
        <p className="text-sm">{`WPM: ${label}`}</p>
        <p className="text-sm">{`Users: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const DailyBar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { loading, stats } = useDailyStats();
  //console.log(stats);
  const userWPM = 72;


  const wpmDistribution = !stats || stats.length === 0 
  ? [] 
  : stats.map(bucket => {
      const [min, max] = bucket.range.split("-").map(Number);
      return {
        ...bucket,
        isUser: userWPM >= min && userWPM < max,
      };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={wpmDistribution}
        margin={{ top: 0, right: 35, left: 0, bottom: 0 }}
        onMouseMove={(state) => {
          if (state && state.activeTooltipIndex !== undefined) {
            setHoveredIndex(state.activeTooltipIndex);
          }
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0)' }} />
        <Bar dataKey="count" isAnimationActive={false} activeBar={false}>
          {wpmDistribution.map((entry, index) => {
            const isHovered = hoveredIndex === index;
            const fillColor = isHovered
              ? (entry.isUser ? '#FFC76A' : '#666666')
              : (entry.isUser ? '#F5972F' : '#161616');

            return (
              <Cell
                key={`cell-${index}`}
                fill={fillColor}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyBar;
