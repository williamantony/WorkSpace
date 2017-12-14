class Page {
  
  constructor(id) {
    
    

    // Initialize
    // set project id on init()    
    this.setPageId(id);
    
  }
  
  setPageId(id) {
    // set this.project_id to the given id
    // if the given id is not undefined
    if (id !== undefined)
      this.page_id = id;
  }

}