"use client";

import { useState, useMemo, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import StatsCards from "@/components/StatsCards";
import EditTaskModal from "@/components/EditTaskModal";
import { Plus, X } from "lucide-react";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
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

    if (filter === "active") {
      result = result.filter((t) => !t.completed);
    } else if (filter === "completed") {
      result = result.filter((t) => t.completed);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          (t.title && t.title.toLowerCase().includes(query)) ||
          (t.description && t.description.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [tasks, filter, searchQuery]);

  const handleAddTask = async (payload) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create task");
      }
      const created = await res.json();
      setTasks((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Add task error", err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Toggle complete failed", res.status, err);
        return;
      }
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Toggle complete error", err);
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Save edit failed", res.status, err);
        return;
      }
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Save edit error", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Delete failed", res.status, err);
        return;
      }
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Delete task error", err);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Task Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage your daily tasks efficiently
          </p>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StatsCards tasks={tasks} />
            </div>

            <button
              onClick={() => setShowAdd(true)}
              className="
      h-full
      min-h-[220px]
      rounded-2xl
      border
      border-border
      bg-card
      flex flex-col
      items-center
      justify-center
      gap-3
      hover:border-primary/50
      transition-all
    "
            >
              <Plus size={32} />
              <span className="font-semibold text-lg">Create New Task</span>
            </button>
          </div>

          {/* Search and Filter Section */}
          <section>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>

              <div className="shrink-0">
                <FilterBar activeFilter={filter} onFilterChange={setFilter} />
              </div>
            </div>
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
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-card border border-border rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAdd(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <TaskForm onAddTask={handleAddTask} setShowAdd= {setShowAdd} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
