"use client";

import { useState } from "react";
import { Plus, CalendarDays } from "lucide-react";

export default function TaskForm({ onAddTask, setShowAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    // Send minimal payload to the parent which will call the API
    onAddTask({ title, description, dueDate });
    setTitle("");
    setDescription("");
    setDueDate("");
    setShowAdd(false);
  };

  return (
    <div className="bg-card  rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Create New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full bg-background border border-input rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            className="w-full bg-background border border-input rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Due Date
          </label>

          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              
              className="w-full bg-background border border-input rounded-md px-3 py-2 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />

            
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          
        >
          <Plus size={20} />
          Add Task
        </button>
      </form>
    </div>
  );
}
