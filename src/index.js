import './index.css';
import TodoApp from './modules/crud';
const todoList = document.getElementById('to-do-list')
let todoApp = new TodoApp(todoList);

const clearCompletedButton = document.getElementById('clear-completed-button');
	clearCompletedButton.addEventListener('click', () => todoApp.clearAllCompletedTasks());

todoApp.render();