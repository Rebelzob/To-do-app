import { updateCompletionStatus, clearAllCompleted } from './status.js';

// This class creates a Todo application.

class TodoApp {
  // Constructs the Todo App, fetch tasks from local storage and set up event listeners.

  constructor() {
    this.inputField = document.getElementById('input');
    this.returnButton = document.getElementById('return-btn');
    this.todoTask = JSON.parse(localStorage.getItem('tasks')) || [];
    this.todoList = document.getElementById('to-do-list');
    this.render();
    this.AddTaskPressEnter();
    this.AddTaskPressButton();
    this.DeleteTaskButton();
  }

  // Sets an event listener for deleting a task when a specific element is clicked
  DeleteTaskButton() {
    this.todoList.addEventListener('mousedown', (e) => {
      if (e.target.closest('.trash-icon')) {
        this.deleteTask(e.target.dataset.task);
      }
    });
  }

  // Sets an event listener for adding a task when return button is clicked
  AddTaskPressButton() {
    this.returnButton.addEventListener('click', (e) => {
      this.addTask(this.inputField.value);
      this.inputField.value = '';
      e.preventDefault();
    });
  }

  // Sets an event listener for adding task when enter button is pressed
  AddTaskPressEnter() {
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTask(this.inputField.value);
        this.inputField.value = '';
      }
    });
  }

  // Sorts the tasks based on their index
  sortTasks() {
    this.todoTask.sort((a, b) => a.index - b.index);
  }

  // Refreshes the tasks presented in the UI
  render() {
    this.sortTasks();
    this.todoList.innerHTML = '';
    this.todoTask.forEach((task, i) => {
      const taskElement = document.createElement('li');
      taskElement.classList.add('task-container');
      const taskContent = document.createElement('div');
      taskContent.classList.add('task');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        this.todoTask = updateCompletionStatus(i, checkbox.checked, this.todoTask);
        this.updateLocalStorage();
      });
      taskContent.appendChild(checkbox);
      const description = document.createElement('span');
      description.classList.add('description');
      description.contentEditable = 'true';
      description.textContent = task.description;
      description.addEventListener('input', () => {
        this.editTask(i, description.textContent);
      });
      taskContent.appendChild(description);
      const deleteIcon = document.createElement('span');
      deleteIcon.innerHTML = 'delete';
      deleteIcon.classList.add('material-icons', 'trash-icon');
      deleteIcon.style.display = 'none';
      deleteIcon.dataset.task = i;
      const moreVertIcon = document.createElement('span');
      moreVertIcon.innerHTML = 'more_vert';
      moreVertIcon.classList.add('material-icons', 'dots-icon');
      taskElement.append(taskContent, deleteIcon, moreVertIcon);
      // Add the task element to the to-do list.
      this.todoList.appendChild(taskElement);
      taskElement.addEventListener('focus', (event) => {
        event.currentTarget.querySelector('.dots-icon').style.display = 'none';
        event.currentTarget.querySelector('.trash-icon').style.display = '';
        event.currentTarget.style.backgroundColor = 'lightyellow';
      }, true);
      taskElement.addEventListener('blur', (event) => {
        event.currentTarget.querySelector('.dots-icon').style.display = '';
        event.currentTarget.querySelector('.trash-icon').style.display = 'none';
        event.currentTarget.style.backgroundColor = '';
      }, true);
    });
    // Persist the updates to local storage.
    this.updateLocalStorage();
  }

  // Clears all completed tasks, updates local storage and the UI.
  clearAllCompletedTasks() {
    this.todoTask = clearAllCompleted(this.todoTask);
    this.todoTask.forEach((task, index) => {
      task.index = index + 1;
    });
    this.updateLocalStorage();
    this.render();
  }

  // Adds a new task with the supplied description, updates local storage and the UI.
  addTask(description) {
    if (description.trim() !== '') {
      const newTask = {
        description,
        completed: false,
        index: this.todoTask.length + 1,
      };
      this.todoTask.push(newTask);
      this.updateLocalStorage();
      this.render();
    }
  }

  // Deletes task with matching id, updates local storage and the UI.
  deleteTask(taskId) {
    this.todoTask.splice(taskId, 1);
    this.todoTask.forEach((task, index) => {
      task.index = index + 1;
    });
    this.updateLocalStorage();
    this.render();
  }

  // Edits task description, update local storage and the UI.
  editTask(taskId, newDescription) {
    if (this.todoTask[taskId]) {
      this.todoTask[taskId].description = newDescription;
      this.updateLocalStorage();
    }
  }

  // Persists the current state of tasks to the local storage
  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.todoTask));
  }
}

export default TodoApp;