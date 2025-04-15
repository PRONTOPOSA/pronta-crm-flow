
import React from 'react';
import { ArrowDown, ArrowUp, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  trend?: 'positive' | 'negative' | 'neutral';
  className?: string;
  tooltipInfo?: string;
}

const getTrendIcon = (trend: StatCardProps['trend']) => {
  switch (trend) {
    case 'positive':
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    case 'negative':
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const formatValue = (value: string | number) => {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('it-IT', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(value);
  }
  return value;
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend, 
  className, 
  tooltipInfo 
}) => {
  return (
    <Card className={`overflow-hidden relative ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
              {title}
              {tooltipInfo && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {tooltipInfo}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <h3 className="text-2xl font-bold">{formatValue(value)}</h3>
              {getTrendIcon(trend)}
            </div>
            
            {change && (
              <div className="flex items-center mt-2">
                {change.type === 'increase' ? (
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-xs font-medium ${
                  change.type === 'increase' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {Math.abs(change.value)}% rispetto al mese scorso
                </span>
              </div>
            )}
          </div>
          
          <div className={`p-2 rounded-lg ${
            trend === 'positive' ? 'bg-green-100/50 text-green-600' :
            trend === 'negative' ? 'bg-red-100/50 text-red-600' :
            'bg-primary/10 text-primary'
          }`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
