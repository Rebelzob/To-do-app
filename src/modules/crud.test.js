import TodoApp from './crud.js';

jest.mock('../../src/modules/crud.js');
jest.mock('../../src/index.js');
jest.mock('../../src/index.html');
// Test for the TodoApp class
// Test addTask method
// Test deleteTask method
// mock localStorage
// Mock HTML to test if add/delete functions add or remove exactly one <li> element to/from the list in the DOM.



describe('TodoApp', () => {
  test('add a task', () => {
    const todoApp = new TodoApp();
    todoApp.todoTask = [];
    todoApp.addTask('task1');
    todoApp.addTask('task2');
    todoApp.addTask('task3');
    expect(todoApp.todoTask.length).toBe(3);
  });
});

