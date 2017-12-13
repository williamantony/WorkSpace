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

  
  createMap(element) {
    
    // if element not defined use root element
    element = element || this.root;    

    const documentMap = [];

    // Flags
    let rangeStart = false;
    let rangeEnd = false;
    
    for (let i = 0; i < this.elements.length; i++) {

      // Stops For Loop
      if (rangeEnd) return documentMap;

      if (this.elements[i].element === element) {
        // Range Starts on the first matched element
        rangeStart = true;
      }

      if (rangeStart) {
        // if RangeStart is set to true

        if (this.elements[i].element !== element) {
          
          if (!this.elements[i].isChild(element)) {
            // Range Ends on the last child of element
            rangeEnd = true;
          }
          
          // Other Process Goes Here
          documentMap.push(this.elements[i].element);

        }

      }
      
      // End of For Loop
    }

    // Return the Map
    return documentMap;
    
    // End of createMap Method
  }

  renderMap(element) {
    
    // if element not defined use root element
    element = element || this.root;

    // update map
    // this.map = this.createMap(element);
    
    const elementClone = element.cloneNode(true);

    const elementMap = this.createMap(elementClone);
    
    console.log(elementClone);
    console.log(elementMap);

    return elementMap;

  }


}