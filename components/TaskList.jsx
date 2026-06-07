'use client';

import TaskCard from './TaskCard';

export default function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const isOverdue = (task) => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 shadow-sm text-center">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No tasks found
        </h3>
        <p className="text-muted-foreground">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isOverdue={isOverdue(task)}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
