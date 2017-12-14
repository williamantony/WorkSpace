class DocumentModel {
  
  constructor(id) {
    
    this.id = (id || "website-alter-app") + "-root";

    this.root = null;

    this.elements = [];

    this.init();

  }

  init() {

    this.setRoot();

    this.syncElements();

  }

  setRoot() {
    
    let root = document.getElementById(this.id);

    if (root !== null) {

      this.root = root;

    } else {

      root = document.createElement("div");
      root.id = this.id;

      this.root = document.body.appendChild(root);

    }

    return this.root;

  }

  syncElements() {
    
    // Temporary storage of elements list
    const elements = [];

    // Add each elements to list
    const addElement = (element) => {

      // Create new Instance of DocumentElement
      const elementInstance = new DocumentElement(element);

      // Set Root to current Element Instance
      elementInstance.setRoot(this.root);

      // Add element Instance to elements list
      elements.push(elementInstance);

      // For each child elements (converted to Array)
      Array.from(element.children).forEach((child) => {

        // nodeType of '1' means it's an Element
        if (child.nodeType === 1) {
          // run recursive function again
          return addElement(child);
        }

        // return undefined for forEach
        return undefined;

      });

      // End of Function
    };
    
    addElement(this.root);
    
    // Replace old list with new list
    this.elements = elements;

  }


}