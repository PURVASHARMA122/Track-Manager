'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditTaskModal({
  task,
  isOpen,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate || '');
    }
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = String(title || '').trim();

    if (!trimmed) {
      console.error('Title is required');
      return;
    }

    onSave({
      ...task,
      title: trimmed,
      description: description || '',
      dueDate: dueDate || '',
    });
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl shadow-lg max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Edit Task
          </h2>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-y min-h-[200px] max-h-[400px] overflow-y-auto"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-muted text-muted-foreground hover:bg-muted/80 font-medium py-3 px-4 rounded-md transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}