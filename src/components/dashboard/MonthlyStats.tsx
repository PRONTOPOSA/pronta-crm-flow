
import React from 'react';
import StatCard from './StatCard';
import { monthlyStats } from '@/data/monthlyStats';

const MonthlyStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {monthlyStats.map((stat, index) => (
        <StatCard 
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          trend={stat.trend}
          tooltipInfo={stat.tooltipInfo}
        />
      ))}
    </div>
  );
};

export default MonthlyStats;
