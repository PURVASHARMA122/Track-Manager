'use client';

import { CheckCircle2, Clock3 } from 'lucide-react';

export default function StatsCards({ tasks }) {
  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Active Tasks */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              In Progress
            </p>
            <h2 className="mt-2 text-5xl font-bold">{activeTasks}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-primary/10">
            <Clock3 className="h-7 w-7 text-primary" />
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-green-500/10 blur-2xl" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              Finished
            </p>
            <h2 className="mt-2 text-5xl font-bold">{completedTasks}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-green-500/10">
            <CheckCircle2 className="h-7 w-7 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}