let Todo = function (title, description, dueDate, color, completed) {
    let todo = {};

    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
    todo.color = color;
    todo.completed = completed;

    todo.print = () => {
        console.log(`Title: ${todo.title}`);
        console.log(`Description: ${todo.description}`);
        console.log(`Due Date: ${todo.dueDate}`);
        console.log(`Color: ${todo.color}`);
        console.log(`Completed: ${todo.completed}`);
    }

    return todo;
}

export { Todo };