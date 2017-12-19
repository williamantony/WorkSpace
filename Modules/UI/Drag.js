class Dragger {

  constructor(element) {

    // Element on which Drag is applied
    this.element = element || null;

    // Snap Switch
    this.snap = false;

    // Initialize
    this.init();

  }

  init() {
    // Initialize

    // switch for drag
    this.status = false;

    // the overlay template element
    this.overlay = document.getElementById("workspace-drag-handle");

    // manages offset properties
    this.offset = {
      element: {},
      overlay: {}
    }

    // AddEventListeners
    this.applyEvents();

  }

  applyEvents() {

    // Mouse Events
    this.overlay.addEventListener("mousedown", this.start.bind(this));
    document.documentElement.addEventListener("mousemove", this.renderOverlay.bind(this));
    document.documentElement.addEventListener("mousemove", this.move.bind(this));
    document.documentElement.addEventListener("mouseup", this.stop.bind(this));

    if (window.Touch && window.TouchEvent){

      // Touch Events
      this.overlay.addEventListener("touchstart", this.start.bind(this));
      document.documentElement.addEventListener("touchmove", this.renderOverlay.bind(this));
      document.documentElement.addEventListener("touchmove", this.move.bind(this));
      document.documentElement.addEventListener("touchend", this.stop.bind(this));

    }

  }

  updateOffset() {

    // Get ComputerStyle
    const computedStyle = window.getComputedStyle(this.element);
    // Get Margin Left & Margin Top    
    const marginLeft = parseInt(computedStyle["marginLeft"]);
    const marginTop = parseInt(computedStyle["marginTop"]);

    // Set Offset Properties of the Element
    this.offset.element.x = this.element.offsetLeft - marginLeft;
    this.offset.element.y = this.element.offsetTop - marginTop;
    this.offset.element.width = this.element.offsetWidth;
    this.offset.element.height = this.element.offsetHeight;
    
    // Set Offset Properties of the Overlay Template
    this.offset.overlay.x = this.offset.element.x + marginLeft;
    this.offset.overlay.y = this.offset.element.y + marginLeft;
    this.offset.overlay.width = this.offset.element.width;
    this.offset.overlay.height = this.offset.element.height;

  }
  
  renderOverlay() {

    if (!this.status) {

      // Update Offset Properties
      this.updateOffset();

      // Apply updated Offset properties
      this.overlay.style.left = this.offset.overlay.x + "px";
      this.overlay.style.top = this.offset.overlay.y + "px";
      this.overlay.style.width = this.offset.overlay.width + "px";
      this.overlay.style.height = this.offset.overlay.height + "px";

    }

    // Transform Overlay Template based on the Element
    this.overlay.style.transform = window.getComputedStyle(this.element).transform;

  }

  start(event) {

    // Turn ON Drag
    this.status = true;
    
    this.updateOffset();

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
    
    const snapX_index = Math.floor(this.offset.element.x / gridSize);
    const snapY_index = Math.floor(this.offset.element.y / gridSize);
    
    const snapX_remainder = this.offset.element.x % gridSize;
    const snapY_remainder = this.offset.element.y % gridSize;
    
    const snapX = (snapX_remainder > (gridSize / 2)) ? snapX_index + 1 : snapX_index;
    const snapY = (snapY_remainder > (gridSize / 2)) ? snapY_index + 1 : snapY_index;

    this.offset.element.x = (snapX * gridSize);
    this.offset.element.y = (snapY * gridSize);

    this.element.style.left = this.offset.element.x + "px";
    this.element.style.top = this.offset.element.y + "px";

  }

  snapOnStop() {
    
    if (!this.status || !this.snap) return undefined;

    const gridSize = parseInt(window.localStorage.getItem("workspace-grid-size"));

    const snapX_index = Math.floor(this.offset.element.x / gridSize);
    const snapY_index = Math.floor(this.offset.element.y / gridSize);
    
    const snapX_remainder = this.offset.element.x % gridSize;
    const snapY_remainder = this.offset.element.y % gridSize;
    
    const snapX = (snapX_remainder > (gridSize / 2)) ? snapX_index + 1 : snapX_index;
    const snapY = (snapY_remainder > (gridSize / 2)) ? snapY_index + 1 : snapY_index;

    this.offset.element.x = (snapX * gridSize);
    this.offset.element.y = (snapY * gridSize);

    this.element.style.left = this.offset.element.x + "px";
    this.element.style.top = this.offset.element.y + "px";

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
    this.offset.element.x += xMovement;
    this.offset.element.y += yMovement;
    
    // calculate the new position
    this.offset.overlay.x += xMovement;
    this.offset.overlay.y += yMovement;

    // apply position to the element using css
    this.element.style.left = this.offset.element.x + "px";
    this.element.style.top = this.offset.element.y + "px";

    // apply position to the overlay using css
    this.overlay.style.left = this.offset.overlay.x + "px";
    this.overlay.style.top = this.offset.overlay.y + "px";

    // for older browsers
    // if event.movementX is undefined
    if (event.movementX === undefined){

      // update the page X|Y
      this.delta.x = event.pageX;
      this.delta.y = event.pageY;

    }

  }

}