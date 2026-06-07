import { NextResponse } from 'next/server';

async function loadService() {
  const mod = await import('../../../../lib/taskService.js');
  return mod.default || mod;
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (body.title !== undefined && String(body.title).trim() === '') {
      return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 });
    }

    const svc = await loadService();
    const updates = {};
    if (body.title !== undefined) updates.title = String(body.title);
    if (body.description !== undefined) updates.description = String(body.description);
    if (body.dueDate !== undefined) updates.dueDate = String(body.dueDate);
    if (body.completed !== undefined) updates.completed = Boolean(body.completed);

    const updated = await svc.update(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT /api/tasks/[id] error', err);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const svc = await loadService();
    const ok = await svc.remove(id);
    if (!ok) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/tasks/[id] error', err);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
