import {ProjectsData} from "./projectData.js";
import {ProjectsUI} from "./projectUI.js";


const ProjectsController = (function(){

    function showDefaultProject() {

        const myProject = ProjectsData.createProject("My Project Title", "The description of my fascinating project yay");

        ProjectsData.addProject(myProject);

        ProjectsData.addTask(
            myProject.id,
            "Test task somewhat long but it's just for a test",
            "Description de la tâche du dessus",
            "Nov 13"
        );

        ProjectsData.addTask(
            myProject.id,
            "Test task somewhat long but it's just for a test",
            "Description de la tâche du dessus",
        );

        ProjectsData.addTask(
            myProject.id,
            "Test task somewhat long but it's just for a test",
            "Description de la tâche du dessus",
        );

        ProjectsUI.projects.add(myProject);
        ProjectsUI.projects.show(myProject);

    }

    function actualizeEvents() {

        const actualTasks = Array.from(document.querySelectorAll(".task"));

        actualTasks.forEach(task => {
            const childsLength = task.childNodes.length;

            task.childNodes[childsLength - 1].addEventListener("click", tasks.taskClicked);
            task.addEventListener("mouseenter", tasks.taskHovered);
            task.addEventListener("mouseleave", tasks.taskUnhovered);

            task.firstChild.addEventListener("click", tasks.checkBoxClicked);
        });
    }

    function init() {

        showDefaultProject();

        const projectsLinks = Array.from(document.querySelectorAll(".app-nav ul a"));
        const modal = document.querySelector(".modal");
        const newTaskButton = document.querySelector(".new-task-button");
        const newProjectButton = document.querySelector(".new-project-button");

        projectsLinks.forEach(projectLink => {
            projectLink.addEventListener("mouseenter", projects.projectHovered);
            projectLink.addEventListener("mouseleave", projects.projectUnhovered);
            projectLink.addEventListener("click", projects.projectClicked);
        });

        modal.addEventListener("click", modals.outOfModalClicked);
        newTaskButton.addEventListener("click", modals.createTaskClicked);
        newProjectButton.addEventListener("click", modals.createProjectClicked);

        actualizeEvents();
        
    }

    const tasks = (function(){
        
        function taskClicked(e) {

            const taskId = e.target.parentNode.dataset.id;
            console.log(taskId);
            const taskData = ProjectsData.getTask(taskId);
            ProjectsUI.modal.showDetails(taskData);

            // ProjectsUI.modal.showDetails(taskData);
        
        }

        function taskHovered(e) {
            ProjectsUI.icons.showDeleteIcon(e.target);

            const deleteIcon = document.querySelector(".trash-icon");

            deleteIcon.addEventListener("click", (e) => {

                const taskId = e.target.parentNode.dataset.id;

                deleteTaskClicked(taskId);
            });

        }

        function taskUnhovered(e) {
            ProjectsUI.icons.removeDeleteIcon(e.target);
        
        }

        function deleteTaskClicked(id) {

            ProjectsUI.tasks.deleteTask(id);
            ProjectsData.deleteTask(id);

        }

        function checkBoxClicked(e) {

            const taskId = e.target.parentNode.dataset.id;
            const taskState = ProjectsData.getTask(taskId).completed;

            ProjectsData.updateTask(taskId);
            ProjectsUI.tasks.updateTask(taskId, taskState);
        
        }

        return {
            taskClicked,
            taskHovered,
            taskUnhovered,
            deleteTaskClicked,
            checkBoxClicked
        }

    })();

    const projects = (function() {

        function projectClicked(e) {

            const projectId = e.target.parentNode.getAttribute("data-id");

            // if (projectId === document
            //     .querySelector(".active-project")
            //     .getAttribute("data-id")) return;
            
            console.log(projectId);
            const projectData = ProjectsData.getProject(projectId)

            ProjectsUI.projects.show(projectData);
            actualizeEvents();
            
        }

        function projectHovered(e) {
            ProjectsUI.icons.showDeleteIcon(e.target);

            const deleteIcon = document.querySelector(".trash-icon");

            deleteIcon.addEventListener("click", (e) => {
                e.stopImmediatePropagation();
                const projects = Array.from(document.querySelectorAll(".app-nav ul li"));
                const actualProject = e.target.parentNode.parentNode;
                console.log(projects.length);

                if (projects.length == 1) return;

                const projectToShow = projects.find(project => {
                    return project && project !== actualProject;
                });

                const projectData = ProjectsData.getProject(projectToShow.dataset.id);
                ProjectsUI.projects.show(projectData);
                actualProject.remove();  
                actualizeEvents();
            });
        }

        function projectUnhovered(e) {
            ProjectsUI.icons.removeDeleteIcon(e.target);
        }

        return {
            projectClicked,
            projectHovered,
            projectUnhovered
        };
        
    })();

    const modals = (function() {
        
        function createTaskClicked(e) {

            ProjectsUI.modal.showTaskCreator();
            document.querySelector("button").addEventListener("click", validatedForm);
        
        }

        function createProjectClicked(e) {

            ProjectsUI.modal.showProjectCreator();
            document.querySelector("button").addEventListener("click", validatedForm);
        
        }

        function outOfModalClicked(e) {

            if (e.target !== e.currentTarget) return;

            ProjectsUI.modal.close();
        
        }

        function validatedForm(e) {

            if (e.target.parentNode.classList.contains("project-modal")) {
                const titleInput = document.getElementById("title-input"); 
                const descInput = document.getElementById("desc-input"); 

                if (!titleInput.value || !descInput.value) {
                    ProjectsUI.modal.showErrorMessage();
                    return;
                } else {
                    const myNewProject = ProjectsData.createProject(titleInput.value, descInput.value);

                    ProjectsData.addProject(myNewProject);
                    ProjectsUI.projects.add(myNewProject);

                    let newProjectUI = document.querySelector(".app-nav ul").lastChild;
                    newProjectUI = newProjectUI.firstChild;

                    newProjectUI.addEventListener("mouseenter", projects.projectHovered);
                    newProjectUI.addEventListener("mouseleave", projects.projectUnhovered);
                    newProjectUI.addEventListener("click", projects.projectClicked);

                }
            } else {
                const titleInput = document.getElementById("title-input"); 
                const descInput = document.getElementById("desc-input"); 
                const dateInput = document.getElementById("date-input");

                if (!titleInput.value || !descInput.value) {
                    ProjectsUI.modal.showErrorMessage();
                    return;
                } else {
                    const projectId = document.querySelector("li.active-project").dataset.id;
                    
                    if (!dateInput.value) {
                        const newTask = ProjectsData.addTask(
                            projectId,
                            titleInput.value,
                            descInput.value
                        );

                        ProjectsUI.tasks.addTask(
                            newTask.id,
                            titleInput.value,
                            descInput.value
                        );
                    } else {
                        let year, month, day;
                        let formatedDate;

                        const months = {
                            "01": "Jan",
                            "02": "Feb",
                            "03": "Mar",
                            "04": "Apr",
                            "05": "May",
                            "06": "Jun",
                            "07": "Jul",
                            "08": "Aug",
                            "09": "Sep",
                            "10": "Oct",
                            "11": "Nov",
                            "12": "Dec"
                        }
                        
                        let date = dateInput.value.split("-");
                        month = date[1];
                        day = date[2];
                        formatedDate = `${months[month]} ${day}`;
                        
                        const newTask = ProjectsData.addTask(
                            projectId,
                            titleInput.value,
                            descInput.value,
                            formatedDate
                        );

                        ProjectsUI.tasks.addTask(
                            newTask.id,
                            titleInput.value,
                            descInput.value,
                            formatedDate
                        );


                    } 

                    const task = document.querySelector(".project-tasks").lastChild;
                    const childsLength = task.childNodes.length;

                    task.childNodes[childsLength - 1].addEventListener("click", tasks.taskClicked);
                    task.addEventListener("mouseenter", tasks.taskHovered);
                    task.addEventListener("mouseleave", tasks.taskUnhovered);

                    task.firstChild.addEventListener("click", tasks.checkBoxClicked);
                } 
            }
             
            ProjectsUI.modal.close();
        }

        return {
            createTaskClicked,
            createProjectClicked,
            outOfModalClicked,
            validatedForm
        }
    })();

    init();

})();

//ProjectsUI.modal.showDetails(
//    {
//        title: "Title", 
//        desc: `My full and pretty description. We're gonna make it a bit longer
//        for tests bcs yeah it's important to this if the layering stays right`, 
//        date: "Nov 13"
//    });
