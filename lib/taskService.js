const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.resolve(process.cwd(), 'data', 'tasks.json');

async function readFile() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
      await fs.writeFile(DATA_PATH, '[]', 'utf8');
      return [];
    }
    throw err;
  }
}

async function writeFile(tasks) {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), 'utf8');
}

async function getAll() {
  const tasks = await readFile();
  // ensure createdAt exists and sort newest first
  return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function getById(id) {
  const tasks = await readFile();
  return tasks.find((t) => String(t.id) === String(id));
}

async function create(task) {
  const tasks = await readFile();
  tasks.push(task);
  await writeFile(tasks);
  return task;
}

async function update(id, updates) {
  const tasks = await readFile();
  const idx = tasks.findIndex((t) => String(t.id) === String(id));
  if (idx === -1) return null;
  const updated = Object.assign({}, tasks[idx], updates);
  tasks[idx] = updated;
  await writeFile(tasks);
  return updated;
}

async function remove(id) {
  const tasks = await readFile();
  const remaining = tasks.filter((t) => String(t.id) !== String(id));
  if (remaining.length === tasks.length) return false;
  await writeFile(remaining);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
