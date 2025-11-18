'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProjectProgress() {
  const progress = 41;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background pattern circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="16"
              className="text-muted opacity-20"
              strokeDasharray="8 8"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinecap="round"
              className="text-emerald-600"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold">{progress}%</span>
            <span className="text-sm text-muted-foreground mt-1">
              Project Ended
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted"></div>
            <span className="text-muted-foreground">Pending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
