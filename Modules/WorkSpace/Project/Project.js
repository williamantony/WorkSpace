class Project extends Page {

  constructor(id) {
    super();

    this.pages = [];
    this.currentPageIndex = 0;

    // Initialize
    // set project id on init()    
    this.setProjectId(id);

  }
  
  setProjectId(id) {
    // set this.project_id to the given id
    // if the given id is not undefined
    if (id !== undefined)
      this.project_id = id;
  }

  get currentPage() {
    // returns the current page instance
    // if there is no pages, return null
    return this.pages[this.currentPageIndex] || null;
  }
  
  createPage() {
    // create new page
    // for this WorkSpace

    // create id ( workSpacePage_# )
    const id = this.id + "Page_" + (this.pages.length + 1);

    // create new page
    const newPage = new Page(id);
    
    // add new page to this WorkSpace
    this.pages.push(newPage);

  }

}