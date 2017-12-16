class WorkSpace extends Project {

  constructor(id) {
    super();

    // set WorkSpace id
    this.id = id || "workSpace";
    
    this.projects = [];
    this.currentProjectIndex = 0;
    
    // Initialize
    console.info("Move 'currentProjectIndex' to window.localStorage");
    console.info("Move 'currentPageIndex' to window.localStorage");
    
  }
    
  get currentProject() {
    // returns the current project instance
    // if there is no projects, return null
    return this.projects[this.currentProjectIndex] || null;
  }

  createProject() {
    // create new project
    // for this WorkSpace

    // create id ( workSpaceProject_# )
    const id = this.id + "Project_" + (this.projects.length + 1);

    // create new Project
    const newProject = new Project(id);
    
    // add new project to this WorkSpace
    this.projects.push(newProject);

  }

}