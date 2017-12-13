class DocumentElement {
  
  constructor(element) {

    this.element = element;

    this.root = null;

    this.style = {};

    this.computedStyle = {};

    this.versionHistory = {};

    this.init();

  }

  init() {

    this.syncStyles();
    
    this.syncComputedStyles();

  }

  syncStyles() {
    
    const styles = {};

    Array.from(this.element.style).reduce((styles, property) => {

      styles[property] = this.element.style[property];

      return styles;

    }, styles);

    this.style = styles;

  }

  syncComputedStyles() {

    const styles = {};
    
    const computedStyle = window.getComputedStyle(this.element);

    const allStyles = Object.keys(computedStyle).slice(computedStyle.length);

    allStyles.forEach((property) => {

      styles[property] = computedStyle[property];

    });

    this.computedStyle = styles;

  }

  setRoot(root) {

    if (this.root === null) {

      this.root = root;

      return this.root;

    }

  }

  isChild(parent) {

    const checkParent = (child, parent) => {

      if (child === this.root) return false;

      if (child.parentNode === parent) return true;

      return checkParent(child.parentNode, parent);

    };

    return checkParent(this.element, parent);

  }

}