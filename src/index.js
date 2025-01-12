import { Todo } from "./todo";
import { Project } from "./project";
import { DOM } from "./DOMstuff";

const project = Project("Default");

project.add(Todo("Practice", "Scales, Bach, Brahms", "01/12/25", "green", "true"));
project.add(Todo("Finish To-do Project", "store data, dom, css", "01/12/25", "red", "false"));
project.print();
console.log(JSON.stringify(project));

