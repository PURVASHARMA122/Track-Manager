'use client';

export default function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeFilter === filter.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-input text-foreground hover:bg-card/80'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
