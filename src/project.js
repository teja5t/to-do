let Project = function (title) {
    let project = {};

    project.title = title;
    project.tasks = [];

    project.add = (todo) => {
        project.tasks.push(todo);
    }

    project.remove = (todo) => {
        project.tasks.splice(project.tasks.indexOf(todo), 1);
    }

    project.print = () => {
        console.log(project.title);
        project.tasks.forEach((todo) => {
            console.log('\n');
            todo.print()
    });
    }

    return project;
}

export { Project };