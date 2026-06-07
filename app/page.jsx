'use client';

import { useState, useMemo, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import StatsCards from '@/components/StatsCards';
import EditTaskModal from '@/components/EditTaskModal';

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchTasks() {
      try {
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        if (mounted) setTasks(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTasks();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filter === 'completed') {
      result = result.filter((t) => t.completed);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          (t.title && t.title.toLowerCase().includes(query)) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }

    return result;
  }, [tasks, filter, searchQuery]);

  const handleAddTask = async (payload) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create task');
      }
      const created = await res.json();
      setTasks((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Add task error', err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Toggle complete failed', res.status, err);
        return;
      }
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error('Toggle complete error', err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      const { id, title, description, dueDate } = updatedTask;
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Save edit failed', res.status, err);
        return;
      }
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Save edit error', err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Delete failed', res.status, err);
        return;
      }
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error('Delete task error', err);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Task Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your daily tasks efficiently</p>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Section */}
          <section>
            <StatsCards tasks={tasks} />
          </section>

          {/* Add Task Form */}
          <section>
            <TaskForm onAddTask={handleAddTask} />
          </section>

          {/* Search and Filter Section */}
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="md:col-span-1 flex justify-center md:justify-end">
                {/* Spacer for alignment */}
              </div>
            </div>
            <FilterBar activeFilter={filter} onFilterChange={setFilter} />
          </section>

          {/* Task List Section */}
          <section>
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </div>

      {/* Edit Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveEdit}
      />
    </main>
  );
}
