class Model extends Element {

  constructor(id) {
    super();

    this.root = null;
    this.elements = [];

    // Initialize
    this.setRoot(id);
    this.syncElements();

  }

  setRoot(id) {
    // assign root element to this.root

    // if the id argument is not provided
    // create new id using createElementId()
    if (id === undefined)
      id = this.createElementId();

    let root = document.getElementById(id);

    if (root === null) {
      // if the element is not found in dom
      // create new <div> element
      root = document.createElement("div");
      // and assign the id
      root.id = id;

      // append the newly created element
      // into the <body> tag
      document.body.appendChild(root);      
    }
    // assign this.root
    // and return its value
    return this.root = root;

  }

  createElementId() {
    // create new element id by recursively checking
    // whether an element with the same ID exists.
    const createId = (index) => {
      // template for the new id
      const id = "customElement_" + index;
      // if the element with ID doesn't exist, then return ID
      if (document.getElementById(id) === null) return id;
      // otherwise, try again
      return createId(++index);
    };
    // start of recursion
    return createId(this.elements.length + 1);
  }

  syncElements() {
    // Sync all Elements with this.elements
    // fetch elements as a flattened Array
    let elements = this.flatten();
    // add this.root to the index [0] of elements
    elements.splice(0, 0, this.root);
    // map through each elements
    // note: map creates new array
    elements = elements.map((element) => {
      // create new Instance of Element      
      const elementInstance = new Element(element);
      // set Root for the elementInstance
      elementInstance.setRoot(this.root);
      // return created instance
      return elementInstance;
    });
    // assign this.elements
    this.elements = elements;
  }

}