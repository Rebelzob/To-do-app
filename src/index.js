import './index.css';
const todoList = document.getElementById('to-do-list')

const todoTasks = [
  {
    description: 'Make breakfast',
    completed: true,
    index: 1
  },
  {
    description: 'Make dinner',
    completed: true,
    index: 2
  },
]

const listSort = todoTasks.sort((a, b) => a.index - b.index);

const generateTasks = () => {
  listSort.forEach(task => {
    todoList.innerHTML += `
    <div class='task-container'>
      <div class='task'>
        <input type='checkbox'
          id=${task.description}
          name=${task.description}>
        <li>${task.description}</li>
      </div>
      <span class="material-icons">
      more_vert
      </span>
    </div>
    `
  });
}

generateTasks();
