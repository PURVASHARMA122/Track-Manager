import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

async function loadService() {
  const mod = await import('../../../lib/taskService.js');
  return mod.default || mod;
}

export async function GET() {
  try {
    const svc = await loadService();
    const tasks = await svc.getAll();
    return NextResponse.json(tasks);
  } catch (err) {
    console.error('GET /api/tasks error', err);
    return NextResponse.json({ error: 'Failed to read tasks' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.title || String(body.title).trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const svc = await loadService();

    const task = {
      id: randomUUID(),
      title: String(body.title).trim(),
      description: body.description ? String(body.description) : '',
      dueDate: body.dueDate ? String(body.dueDate) : '',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const created = await svc.create(task);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/tasks error', err);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
