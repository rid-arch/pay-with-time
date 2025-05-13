const API = 'http://localhost:3000/api/tasks';

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 1, title }) // sementara user_id hardcoded
  });

  const data = await res.json();
  alert(`Task created! Reward: ${Math.floor(data.reward_time / 60)} minutes`);
  document.getElementById('title').value = '';
  loadTasks();
});

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `${task.title} — +${Math.floor(task.reward_time / 60)}m <button>Take</button>`;
    list.appendChild(li);
  });
}

loadTasks();
