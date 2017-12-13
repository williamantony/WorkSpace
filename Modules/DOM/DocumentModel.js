class DocumentModel {
  
  constructor(id) {
    
    this.id = (id || "website-alter-app") + "-root";

    this.root = null;

    this.elements = [];

    this.map = null;

    this.init();

  }

  init() {

    this.setRoot();

    this.syncElements();
    
    this.map = this.createMap();

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

  createMap(element, cloned = false) {

    element = element || this.root;

    element = (cloned) ? element.cloneNode(true) : element;

    const elementNodes = element.querySelectorAll("*");

    return (elementNodes);

  }

  renderMap(element) {
    
    // if element not defined use root element
    element = element || this.root;
    
    const elementMap = this.createMap(element.parentElement, true);
    
    const documentMap = document.createElement("div");
    documentMap.id = (__WorkSpace__.id + "-map");
    
    const firstElementChildren = Array.from(elementMap[0].children);

    for (let i = 0; i < firstElementChildren.length; i++) {

      documentMap.appendChild(firstElementChildren[i]);

    }
    
    document.body.appendChild(documentMap);

    for (let i = 0; i < elementMap.length; i++) {

      new DocumentElement(elementMap[i]).resetStyles();
      
    }

  }


}