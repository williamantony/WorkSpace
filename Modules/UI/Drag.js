class Dragger {

  constructor(element) {

    // Element on which Drag is applied
    this.element = element || null;

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

    // updates the latest position
    this.offset = {
      x: this.element.offsetLeft,
      y: this.element.offsetTop
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

    // Turn OFF Drag
    this.status = false;

    // Auto Scroll Bars
    document.documentElement.style.overflow = "auto";

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
    if (event.movementX === undefined){

      // Calculate the change in movement
      xMovement = (event.pageX - this.delta.x);
      yMovement = (event.pageY - this.delta.y);
      
    }

    // calculate the new position
    this.offset.x += xMovement;
    this.offset.y += yMovement;

    // for older browsers
    // if event.movementX is undefined
    if (event.movementX === undefined){

      // update the page X|Y
      this.delta.x = event.pageX;
      this.delta.y = event.pageY;

    }

    // apply position to the element using css
    this.element.style.left = this.offset.x + "px";
    this.element.style.top = this.offset.y + "px";


  }

}