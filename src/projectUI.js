export const ProjectsUI = (function() {

    const appElements = {
        nav: document.querySelector(".app-nav ul"),
        mainPage: document.querySelector(".app-main"), 
        modal: document.querySelector(".modal") 
    }    

    const active = (function() {
        const projectPage = document.createElement("div");
        projectPage.classList.add("project-page");
        projectPage.dataset.id = "";

        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
        
        const projectTitle = document.createElement("h2");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = "";

        const projectDesc = document.createElement("p");
        projectDesc.classList.add("project-description");
        projectDesc.textContent = "";

        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectDesc);

        const projectTasks = document.createElement("div");
        projectTasks.classList.add("project-tasks");

        projectPage.appendChild(projectHeader);
        projectPage.appendChild(projectTasks);

        return {
            page: projectPage, 
            id: projectPage.dataset.id,
            title: projectTitle,
            desc: projectDesc,
            tasks: projectTasks
        };    
    })();

    const projects = (function() {

        function add(project) {

            // On crée un li qu'on va append à la liste des projets de l'ui
            const liElement = document.createElement("li");
            const aElement = document.createElement("a");

            liElement.dataset.id = project.id;
            aElement.textContent = project.title;
            aElement.href = "#";

            liElement.appendChild(aElement);

            appElements.nav.appendChild(liElement);

        }

        function show(project) {

            function createTasks(project) {
                const tasksData = project.tasks;

                for (let task of tasksData) {
                    tasks.addTask(
                        task.id,
                        task.title,
                        task.desc,
                        task.date,
                        task.completed
                    );
                }
            }
            
            // On change les données de active et on le réaffiche

            appElements.mainPage.innerHTML = "";

            active.id = project.id;
            active.title.textContent = project.title;
            active.desc.textContent = project.desc;
            active.tasks.innerHTML = "";

            appElements.mainPage.appendChild(active.page);
            createTasks(project);

            const activeProject = document.querySelector(".active-project");

            if (activeProject) activeProject.classList.remove("active-project");

            document.querySelector(`[data-id="${project.id}"]`).classList.add("active-project");
            
        }

        function remove(project) {

            // On enlève l'élément li avec l'id de la liste des projets
            // (et si la page est affichée, on la remplace par la précédente dans la liste)
            
            document.querySelector(`li .app-nav [data-id=${project.id}]`).remove();

        }

        return {
            add,
            show,
            remove
        };

    })();

    const tasks = (function() {
        function addTask(id, title, desc, date = null, completed = false) {
            const task = document.createElement("div");
            task.classList.add("task");
            task.setAttribute("data-id", id);

            const taskInput = document.createElement("input");
            taskInput.setAttribute("type", "checkbox");

            if (completed) taskInput.checked = true;

            const taskDate = document.createElement("p");
            taskDate.classList.add("task-date");
            taskDate.textContent = date;

            const taskTitle = document.createElement("p");
            taskTitle.textContent = title;

            task.appendChild(taskInput);
            if (date) {
                task.appendChild(taskDate); 
            }
            task.appendChild(taskTitle);

            active.tasks.appendChild(task);
        }

        function deleteTask(id) {

            document.querySelector(`[data-id="${id}"]`).remove();
            
        }

        function updateTask(id, completed) {

            if (completed) {
                document.querySelector(`[data-id="${id}"]`).classList.remove("task-checked");
            } else {
                document.querySelector(`[data-id="${id}"]`).classList.add("task-checked");
            }

        }

        return {
            addTask,
            deleteTask,
            updateTask,
        }
    })();

    const modal = (function() {

        function showErrorMessage() {
            if (!document.querySelector(".modal")) return;
            if (document.querySelector(".error-message")) return;

            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "One or both of the text inputs have been left blank!";

            document.querySelector(".modal-popup").appendChild(errorMessage);
        }

        function showDetails(taskData) {
            const detailElt = document.createElement("div"); 
            detailElt.classList.add("task-details");
            detailElt.classList.add("modal-popup");

            const detailTitle = document.createElement("h2");
            detailTitle.classList.add("title");
            detailTitle.textContent = taskData.title;

            const descElt = document.createElement("div");

            const descTextElt = document.createElement("p");
            descTextElt.classList.add("description");
            descTextElt.textContent = taskData.desc
            descElt.appendChild(descTextElt);

            detailElt.appendChild(detailTitle);
            detailElt.appendChild(descElt);

            if (taskData.date) {
                const dateElt = document.createElement("p");
                dateElt.classList.add("date");
                dateElt.classList.add("task-date");
                dateElt.textContent = taskData.date;
                descElt.appendChild(dateElt);
            }

            appElements.modal.innerHTML = "";
            appElements.modal.appendChild(detailElt);
            appElements.modal.classList.add("modal-active");
        }

        function showTaskCreator() {
            const taskCreatorElt = document.createElement("div"); 
            taskCreatorElt.classList.add("task-modal");
            taskCreatorElt.classList.add("modal-popup");

            const taskCreatorTitle = document.createElement("h2");
            taskCreatorTitle.classList.add("title");
            taskCreatorTitle.textContent = "Create Task";

            const fieldsContainer = document.createElement("div");
            
            const titleFieldContainer = document.createElement("div");

            const titleLabel = document.createElement("label");
            titleLabel.setAttribute("for", "title-input");
            titleLabel.textContent = "Title";

            const titleInput = document.createElement("input");
            titleInput.setAttribute("id", "title-input");
            titleInput.setAttribute("type", "text");

            titleFieldContainer.appendChild(titleLabel);
            titleFieldContainer.appendChild(titleInput);

            const descFieldContainer = document.createElement("div");

            const descLabel = document.createElement("label");
            descLabel.setAttribute("for", "desc-input");
            descLabel.textContent = "Description";

            const descInput = document.createElement("textarea");
            descInput.setAttribute("id", "desc-input");
            descInput.setAttribute("name", "desc-input");
            descInput.setAttribute("cols", "30");
            descInput.setAttribute("rows", "10");
            descInput.setAttribute("placeholder", "Enter your description here...");

            descFieldContainer.appendChild(descLabel);
            descFieldContainer.appendChild(descInput);

            const dateFieldContainer = document.createElement("div");

            const dateLabel = document.createElement("label");
            dateLabel.setAttribute("for", "date-input");
            dateLabel.textContent = "Date";

            const dateInput = document.createElement("input");
            dateInput.setAttribute("id", "date-input");
            dateInput.setAttribute("type", "date");

            dateFieldContainer.appendChild(dateLabel);
            dateFieldContainer.appendChild(dateInput);

            fieldsContainer.appendChild(titleFieldContainer);
            fieldsContainer.appendChild(descFieldContainer);
            fieldsContainer.appendChild(dateFieldContainer);

            const confirmButton = document.createElement("button");
            confirmButton.textContent = "Confirm";

            taskCreatorElt.appendChild(taskCreatorTitle);
            taskCreatorElt.appendChild(fieldsContainer);
            taskCreatorElt.appendChild(confirmButton);

            appElements.modal.innerHTML = "";
            appElements.modal.appendChild(taskCreatorElt);
            appElements.modal.classList.add("modal-active");
        }

        function showProjectCreator() {
            const projectCreatorElt = document.createElement("div"); 
            projectCreatorElt.classList.add("task-details");
            projectCreatorElt.classList.add("project-modal");
            projectCreatorElt.classList.add("modal-popup");

            const projectCreatorTitle = document.createElement("h2");
            projectCreatorTitle.classList.add("title");
            projectCreatorTitle.textContent = "Create Project";

            const fieldsContainer = document.createElement("div");
            
            const titleFieldContainer = document.createElement("div");

            const titleLabel = document.createElement("label");
            titleLabel.setAttribute("for", "title-input");
            titleLabel.textContent = "Title";

            const titleInput = document.createElement("input");
            titleInput.setAttribute("id", "title-input");
            titleInput.setAttribute("type", "text");

            titleFieldContainer.appendChild(titleLabel);
            titleFieldContainer.appendChild(titleInput);

            const descFieldContainer = document.createElement("div");

            const descLabel = document.createElement("label");
            descLabel.setAttribute("for", "desc-input");
            descLabel.textContent = "Description";

            const descInput = document.createElement("textarea");
            descInput.setAttribute("id", "desc-input");
            descInput.setAttribute("name", "desc-input");
            descInput.setAttribute("cols", "30");
            descInput.setAttribute("rows", "10");
            descInput.setAttribute("placeholder", "Enter your description here...");

            descFieldContainer.appendChild(descLabel);
            descFieldContainer.appendChild(descInput);

            fieldsContainer.appendChild(titleFieldContainer);
            fieldsContainer.appendChild(descFieldContainer);

            const confirmButton = document.createElement("button");
            confirmButton.textContent = "Confirm";

            projectCreatorElt.appendChild(projectCreatorTitle);
            projectCreatorElt.appendChild(fieldsContainer);
            projectCreatorElt.appendChild(confirmButton);

            appElements.modal.innerHTML = "";
            appElements.modal.appendChild(projectCreatorElt);
            appElements.modal.classList.add("modal-active");
        }

        function close() {

            // Fermer la modale
            appElements.modal.classList.remove("modal-active"); 
            appElements.modal.innerHTML = "";
        }

        return {
            showDetails,
            showTaskCreator,
            showProjectCreator,
            showErrorMessage,
            close
        }
    })();


    const icons = (function(){
        function showDeleteIcon(parent) {
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "./delete.png";
            deleteIcon.alt = "delete icon";
            deleteIcon.classList.add("trash-icon");

            parent.appendChild(deleteIcon);
        }

        function removeDeleteIcon(parent) {
            document.querySelector(".trash-icon").remove(); 
        }

        return {
            showDeleteIcon,
            removeDeleteIcon
        }
    })();

    return {
        appElements,
        active,
        projects,
        tasks,
        modal,
        icons

    }
})();

