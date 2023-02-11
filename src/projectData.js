export const ProjectsData = (function() {

    // STOCKAGE 
    
    const projects = [];

    // DATA OBJECTS

    function Project(title, desc) {
        const tasks = [];
        const id = _randomId();

        return {
            id, 
            get title() {
                return title;
            },
            get desc() {
                return desc;
            },
            get tasks() {
                return tasks;
            }
        };
    }

    function Task(projectId, title, desc, date = null, completed = false) {
        const id = `${projectId}-${_randomId()}`; 
            
        return {
            id, 
            get title() {
                return title;
            },
            get desc() {
                return desc;
            },
            get date() {
                return date;
            },
            get completed() {
                return completed;
            },
            set completed(value) {
                completed = value;
            } 
        };
    }

    // MANIPULATION INTERFACE (CRUD); 

    function _randomId() {
        return Math.floor(Math.random() * 1e+8);
    }

    function getProject(projectId) {
        return projects.find(project => project.id == projectId);
    }

    function getTask(taskId) {
        const projectId = taskId.split("-")[0];   
        const taskToGet = projects
            .find(project => {
                return projectId == project.id;
            })
            .tasks
            .find(task => task.id == taskId);
    
        return taskToGet;
    }

    function addProject(project) { 
        projects.push(project);
    }

    function createProject(title, desc) {
        return Project(title, desc);
    }

    function addTask(projectId, title, desc, date = null, completed = false) {
        const projectToUpdate = projects.find(project => project.id == projectId); 
        const newTask = Task(projectId, title, desc, date, completed);

        if (!projectToUpdate) return null;
        
        projectToUpdate.tasks.push(newTask);
        return newTask;
    }

    function updateTask(taskId) {
        const projectId = taskId.split("-")[0];   
        console.log(projectId);
        const taskToUpdate = projects
            .find(project => {
                return projectId == project.id;
            })
            .tasks
            .find(task => task.id == taskId);

        taskToUpdate.completed = !taskToUpdate.completed;
        
    }

    function deleteProject(projectId) {
        projects.splice(projects.findIndex(project => project.id == projectId), 1);
    }

    function deleteTask(taskId) {
        console.log(taskId);
        const projectId = taskId.split("-")[0];   
        const projectOfTask = projects.find(project => project.id == projectId);

        if (!projectOfTask) {
            console.log("ERROR");
            console.log(projectOfTask);
            return ; 
        }

        projectOfTask
            .tasks
            .splice(projectOfTask.tasks.findIndex(task => task.id == taskId), 1);
    } 

    return {
        projects, // temporary

        addTask,
        addProject,
        createProject,

        deleteTask,
        deleteProject,

        updateTask,

        getTask,
        getProject,

        get projects() {
            // Pas très encapsulé mais on verra après si on le retire pas
            return projects;
        }
    };

})();




// Les tests

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

console.log(ProjectsData.projects);
