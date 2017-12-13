class WorkSpace {

  constructor(id) {
    
    this.id = id;

    this.Projects = [];

    this.currentProjectIndex = null;
    
    this.init();    

  }

  init() {

    this.currentProjectIndex = this.createProject() - 1;

  }
  
  get currentProject() {

    return this.Projects[this.currentProjectIndex];

  }

  createProject() {
    
    const newProjectId = this.id + "_P" + (this.Projects.length + 1);

    const newProject = new Project(newProjectId);

    return this.Projects.push(newProject);

  }



}