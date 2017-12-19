class Grid {

  constructor() {

    this.size = null;
    
    this.init();

  }

  init() {
    
    this.screen = {
      width: window.outerWidth || screen.availWidth,
      height: window.outerHeight || screen.availHeight
    };

    this.setSize();

    this.update();

  }
  
  setSize(size) {

    if (size === undefined)
      this.size = parseInt(window.localStorage.getItem("workspace-grid-size")) || 20;

    else this.size = size;
    
    window.localStorage.setItem("workspace-grid-size", this.size);

    this.update();

  }

  update() {

    const grid = document.getElementById("workspace-grid");

    grid.style.backgroundSize = this.size + "px auto";
    grid.style.backgroundPosition = (this.size / 2) + "px -" + (this.size / 2) + "px";

  }

}


const GRID = new Grid();