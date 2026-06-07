'use client';

import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';

export default function TaskCard({
  task,
  isOverdue,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No due date';

  return (
    <div
      className={`bg-card border rounded-lg p-4 shadow-sm transition-all ${
        isOverdue ? 'border-destructive/50 bg-destructive/5' : 'border-border'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex-shrink-0 mt-1 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Toggle task completion"
        >
          {task.completed ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <Circle size={20} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className={`font-semibold transition-all ${
                  task.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>

            {isOverdue && !task.completed && (
              <span className="flex-shrink-0 bg-destructive/20 text-destructive text-xs font-medium px-2 py-1 rounded">
                Overdue
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                aria-label="Edit task"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
