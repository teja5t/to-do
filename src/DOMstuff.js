import { Project } from "./project"
import { Todo } from "./todo";

class DOM {
    constructor () {
        this.projects = [];
        this.dialog = document.querySelector('.detailed-todo');
        this.projectDialog = document.querySelector('.edit-project');
        document.querySelector('.add-project').addEventListener('click', () => this.addProject());
        
        if (!localStorage.getItem("projects")) {
            const defaultProject = Project();
            defaultProject.title = "default";
            const date1 = new Date('2025-01-12');
            const date2 = new Date('2025-07-13');
            const todo1 = Todo("Practice", "Scales, Bach, Brahms", date1, "#FFC0CB", "true");
            const todo2 = Todo("Finish To-do Project", "store data, dom, css", date2, "#ffffff", "false");
            defaultProject.add(todo1);
            defaultProject.add(todo2);
            this.projects.push(defaultProject);
            this.saveProjects();
        }

        this.display();
    }

    saveProjects() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }

    loadProjects() {
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        this.projects = storedProjects.map(projectData => {
            const project = Object.assign(new Project(), projectData);
            // Convert task dates into Date objects
            project.tasks = project.tasks.map(todoData => {
                const todo = Object.assign(new Todo(), todoData);
                todo.dueDate = new Date(todo.dueDate); // Convert stored date string to Date object
                return todo;
            });
            return project;
        });
    }

    showDialog() {
        this.dialog.innerHTML = `
            <button class="close-dialog">x</button>
            <div>
                <label>Title: <input type="text" id="title"></label>
            </div>
            <div class='textarea-container'>
                <label for='description'>Description: </label><textarea id="description"></textarea>
            </div>
            <div>
                <label>Due Date: <input type="date" id="dueDate"></label>
            </div>
            <div>
                <label>Color: <input type="color" id="color" value="#ffffff"></label>
            </div>
            <div>
                <label>Completed: <input type="checkbox" id="completed"></label>
            </div>
                <button class="update-task">Update Task</button>`

        this.dialog.show();
        document.querySelector('.close-dialog').addEventListener('click', () => this.dialog.close());
    }

    showProjectDialog() {
        this.projectDialog.innerHTML = `
            <button class='close-project-dialog'>X</button>
            <label>Title: <input type="text" id="project-title"></label>`
        document.querySelector('.close-project-dialog').addEventListener('click', () => this.projectDialog.close())
        this.projectDialog.show();
    }

    addProject() {
        this.showProjectDialog();

        const addBtn = document.createElement("button")
        addBtn.textContent = "Add project";
        this.projectDialog.appendChild(addBtn);

        addBtn.addEventListener('click', () => {
            const newProject = Project();
            newProject.title = this.projectDialog.querySelector("input").value;
            this.projects.push(newProject);
            this.saveProjects();
            this.display();
            this.projectDialog.close();
        }); 
    }

    editProject(project) {
        this.showProjectDialog();
        this.projectDialog.querySelector("input").value = project.title;

        const editBtn = document.createElement("button")
        editBtn.textContent = "Edit project";
        this.projectDialog.appendChild(editBtn);

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete project";
        this.projectDialog.appendChild(deleteBtn);

        editBtn.addEventListener('click', () => {
            project.title = this.projectDialog.querySelector("input").value;
            this.saveProjects();
            this.display();
            this.projectDialog.close();
        }); 

        deleteBtn.addEventListener('click', () => {
            this.projects.splice(this.projects.indexOf(project), 1);
            this.saveProjects();
            this.display();
            this.projectDialog.close();
        })
    }

    createProject() {
        const project = document.createElement('div');
        project.classList.add('project');
    }

    makeTodo(project, todo) {
        const container = document.createElement('div');
        container.classList.add('task');
        container.addEventListener('click', () => {
            this.editTodo(project, todo);
        });
        
        const title = document.createElement('p');
        title.classList.add('task-title');
        title.textContent = todo.title;
        title.style.color = todo.color;
        container.appendChild(title);

        const date = document.createElement('p');
        date.classList.add('task-date');
        date.textContent = `${todo.dueDate.getMonth() + 1}/${todo.dueDate.getDate() + 1}`;
        date.style.color = todo.color;
        container.appendChild(date);


        if (todo.completed) {
            title.style.textDecoration = "line-through";
            date.style.textDecoration = "line-through";
        }

        return container;
    }

    editTodo(project, todo) {
        this.showDialog();
        const btn = document.querySelector('.update-task');
        btn.textContent = `Edit ${todo.title}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = `Delete ${todo.title}`;
        deleteBtn.addEventListener('click', () => {
            project.remove(todo);
            this.saveProjects();
            this.display();
            this.dialog.close();
        });
        this.dialog.appendChild(deleteBtn);

        document.querySelector('#title').value = todo.title;
        document.querySelector('#description').value = todo.description;
        document.querySelector('#dueDate').value = todo.dueDate.toISOString().slice(0, 10);
        document.querySelector('#color').value = todo.color;
        document.querySelector('#completed').checked = todo.completed;


        btn.addEventListener('click', () => {
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const dueDate = new Date(document.querySelector('#dueDate').value);
            const color = document.querySelector('#color').value;
            const completed = document.querySelector('#completed').checked;

            if (title === "") {
                alert("Please enter a title");
            }
            else if (isNaN(dueDate.getDate())) {
                alert("Please enter a valid date");
            }
            else {
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.color = color;
                todo.completed = completed;
                this.dialog.close();
                this.saveProjects();
                this.display();
            }
        });
    }


    addTodo(project) {
        this.showDialog();
        const btn = document.querySelector('.update-task');
        btn.textContent = `Add task to ${project.title}`;

        btn.addEventListener('click', () => {
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const dueDate = new Date(document.querySelector('#dueDate').value);
            const color = document.querySelector('#color').value;
            const completed = document.querySelector('#completed').checked;

            console.log(dueDate.getDate());

            if (title === "") {
                alert("Please enter a title");
            }
            else if (isNaN(dueDate.getDate())) {
                alert("Please enter a valid date");
            }
            else {
                project.add(new Todo(title, description, dueDate, color, completed));
                this.dialog.close();
                this.saveProjects();
                this.display();
            }
        })

    }

    makeProject(project) {
        const container = document.createElement("div");
        container.classList.add('project');

        const title = document.createElement('h2');
        title.textContent = project.title;
        title.addEventListener('click', () => this.editProject(project));
        container.appendChild(title);

        project.tasks.forEach(todo => {
            container.appendChild(this.makeTodo(project, todo));
        });

        const addTask = document.createElement('button');
        addTask.classList.add('add-task');
        addTask.textContent = '+';
        addTask.addEventListener('click', () => this.addTodo(project));
        container.appendChild(addTask);

        return container;
    }

    display() {
        this.loadProjects();
        const container = document.querySelector('.projects');
        container.innerHTML = "";
        this.projects.forEach((element) => container.appendChild(this.makeProject(element)));
    }
}

export { DOM };
