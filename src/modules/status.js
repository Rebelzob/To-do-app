export const updateCompletionStatus = (taskId, status, tasks) => {
  tasks[taskId].completed = status;
  return tasks;
};

export const clearAllCompleted = (tasks) => tasks.filter((task) => !task.completed);
