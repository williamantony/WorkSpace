class Element {

  constructor(element) {

    if (this.constructor.name === "Element") {

      // this.root = null;
      this.element = element;

      this.versionHistory = {};

      this.style = {};
      this.computedStyle = {};

      this.syncStyles();
      this.syncComputedStyles();
/*
      this.setRoot = (root) => {
        // if this.root is not defined
        if (this.root === null)
          return this.root = root;
      };
*/

    }

    console.info("create 'findZIndex' function");

  }

  isChild(parent) {
    // check if this.element is a child of parent
    // using recursive function
    const checkParent = (child, parent) => {
      // if child is the root, return false
      if (child === this.root) return false;
      // if parentNode match parent, return true
      if (child.parentNode === parent) return true;
      // other, try again
      return checkParent(child.parentNode, parent);
    };
    // start of recursion
    return checkParent(this.element, parent);
  }

  clone(cloneChildren = true) {
    // if clone() is called on Model Class
    // use this.root as the element
    const element = this.element || this.root;
    // return the Cloned Element
    return element.cloneNode(cloneChildren);
  }

  flatten(convertToArray = true) {
    // if clone() is called on Model Class
    // use this.root as the element
    const element = this.element || this.root;
    // Flatten the element
    const flattened = element.querySelectorAll("*");
    // convertToArray as provided as args
    if (convertToArray) return Array.from(flattened);
    // return the flattened Element
    return flattened;
  }

  syncStyles() {
    // sync css properties
    // from this.element.style
    const styles = {};

    Array.from(this.element.style).reduce((styles, property) => {
      // assemble css propery in a {} object format      
      styles[property] = this.element.style[property];
      // return reduced "styles" object
      return styles;
    }, styles);
    // assign this.styles
    this.style = styles;
  }

  syncComputedStyles() {
    // sync css properties
    // from window.getComputedStyle method
    const styles = {};
    // fetch all computed css properties
    const computedStyle = window.getComputedStyle(this.element);
    // filter out arrays items, and only take Object.keys
    const allStyles = Object.keys(computedStyle).slice(computedStyle.length);

    allStyles.forEach((property) => {
      // assemble css propery in a {} object format
      styles[property] = computedStyle[property];
    });
    // assign this.computedStyle    
    this.computedStyle = styles;
  }

  resetStyles() {
    // Reset Styles to default
    // get css property names as array
    const styles = Array.from(this.element.style);
    // for each css property
    for (let i = 0; i < styles.length; i++) {
      // assign empty "" to make default
      this.element.style[toCamelCase(styles[i])] = "";
    }
    // also, remove the inline "style" attribute
    this.element.removeAttribute("style");
  }

}