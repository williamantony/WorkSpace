class Page {

  constructor(id) {
    
    this.id = id;

    this.document = new DocumentModel(this.id);

  }

}