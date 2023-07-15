import './index.css';
import TodoApp from './js/crud';
const todoList = document.getElementById('to-do-list')
let todoApp = new TodoApp(todoList);

todoApp.render();