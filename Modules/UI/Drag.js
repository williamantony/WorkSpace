class Dragger {

  constructor(element) {

    // Element on which Drag is applied
    this.element = element || null;

    this.snap = true

    // Initialize
    this.init();

  }

  init() {
    // Initialize

    // switch for drag
    this.status = false;

    // AddEventListeners
    this.applyEvents();

  }

  applyEvents() {

    // Mouse Events
    this.element.addEventListener("mousedown", this.start.bind(this));
    document.documentElement.addEventListener("mousemove", this.move.bind(this));
    document.documentElement.addEventListener("mouseup", this.stop.bind(this));

    if (window.Touch && window.TouchEvent){

      // Touch Events
      this.element.addEventListener("touchstart", this.start.bind(this));
      document.documentElement.addEventListener("touchmove", this.move.bind(this));
      document.documentElement.addEventListener("touchend", this.stop.bind(this));

    }

  }

  start(event) {

    // Turn ON Drag
    this.status = true;

    // Get ComputerStyle
    const computedStyle = window.getComputedStyle(this.element);
    // Get Margin Left & Margin Top    
    const marginLeft = parseInt(computedStyle["marginLeft"]);
    const marginTop = parseInt(computedStyle["marginTop"]);

    // updates the latest position
    this.offset = {
      x: this.element.offsetLeft - marginLeft,
      y: this.element.offsetTop - marginTop,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    };
    
    // considering touch events
    event = (event.type === "touchstart") ? event.targetTouches[0] : event;

    // for older browsers
    // if event.movementX is undefined
    if (event.movementX === undefined){

      // updates the changes in movement
      this.delta = {
        x: event.pageX,
        y: event.pageY
      }

    }

    // Hide Scroll Bars
    document.documentElement.style.overflow = "hidden";

  }

  stop() {

    this.snapOnStop();

    // Turn OFF Drag
    this.status = false;

    // Auto Scroll Bars
    document.documentElement.style.overflow = "auto";

  }

  snapOnStopbackup() {
    
    if (!this.status) return undefined;

    const gridSize = parseInt(window.localStorage.getItem("workspace-grid-size"));
    
    const snapX_index = Math.floor(this.offset.x / gridSize);
    const snapY_index = Math.floor(this.offset.y / gridSize);
    
    const snapX_remainder = this.offset.x % gridSize;
    const snapY_remainder = this.offset.y % gridSize;
    
    const snapX = (snapX_remainder > (gridSize / 2)) ? snapX_index + 1 : snapX_index;
    const snapY = (snapY_remainder > (gridSize / 2)) ? snapY_index + 1 : snapY_index;

    this.offset.x = (snapX * gridSize);
    this.offset.y = (snapY * gridSize);

    this.element.style.left = this.offset.x + "px";
    this.element.style.top = this.offset.y + "px";

  }

  snapOnStop() {
    
    if (!this.status) return undefined;

    const gridSize = parseInt(window.localStorage.getItem("workspace-grid-size"));

    const snapX_index = Math.floor(this.offset.x / gridSize);
    const snapY_index = Math.floor(this.offset.y / gridSize);
    
    const snapX_remainder = this.offset.x % gridSize;
    const snapY_remainder = this.offset.y % gridSize;
    
    const snapX = (snapX_remainder > (gridSize / 2)) ? snapX_index + 1 : snapX_index;
    const snapY = (snapY_remainder > (gridSize / 2)) ? snapY_index + 1 : snapY_index;

    this.offset.x = (snapX * gridSize);
    this.offset.y = (snapY * gridSize);

    this.element.style.left = this.offset.x + "px";
    this.element.style.top = this.offset.y + "px";

  }

  move(event) {

    // if drag is turned Off
    if (!this.status) {

      // exit by returning undefined
      return undefined;
      
    }

    // considering touch events
    event = (event.type === "touchmove") ? event.targetTouches[0] : event;

    // for newer browsers
    // where event.movementX is available
    let xMovement = event.movementX;
    let yMovement = event.movementY;

    // for older browsers
    // if event.movementX is undefined
    if (event.movementX === undefined) {

      // Calculate the change in movement
      xMovement = (event.pageX - this.delta.x);
      yMovement = (event.pageY - this.delta.y);
      
    }

    // calculate the new position
    this.offset.x += xMovement;
    this.offset.y += yMovement;

    // apply position to the element using css
    this.element.style.left = this.offset.x + "px";
    this.element.style.top = this.offset.y + "px";

    // for older browsers
    // if event.movementX is undefined
    if (event.movementX === undefined){

      // update the page X|Y
      this.delta.x = event.pageX;
      this.delta.y = event.pageY;

    }

  }

}