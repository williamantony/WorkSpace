class Resizer {

  constructor(element) {

    // Element on which Resize is applied
    this.element = element;

    // Initialize
    this.init();
    
  }

  init() {
    // Initialization

    // switch for Resize
    this.status = false;

    // values are 'T' = top, 'B' = bottom, 'L' = Left, 'R' = Right
    this.target = "";

    // the overlay template element
    this.overlay = document.getElementById("workspace-resizer");

    // manages offset properties of the element
    this.offset = {};

    // manages properties of the overlay template
    this.layer = {};
    this.layer.offset = {};

    // margin is the space between the element and overlay template
    this.layer.margin = 5;

    // Updates the offset properties
    // for both element and overlay template
    this.updateOffset();

    // Apply Events Listeners
    this.applyEvents();

  }

  applyEvents() {

    // Mouse Events
    this.overlay.addEventListener("mousedown", this.start.bind(this));
    document.documentElement.addEventListener("mousemove", this.renderOverlay.bind(this));
    document.documentElement.addEventListener("mousemove", this.resize.bind(this));
    document.documentElement.addEventListener("mouseup", this.stop.bind(this));
    
    if (window.Touch && window.TouchEvent){

      // Touch Events
      this.overlay.addEventListener("touchstart", this.start.bind(this));
      document.documentElement.addEventListener("touchmove", this.renderOverlay.bind(this));
      document.documentElement.addEventListener("touchmove", this.resize.bind(this));
      document.documentElement.addEventListener("touchend", this.stop.bind(this));

    }

  }

  updateOffset() {

    // Set Offset Properties of the Element
    this.offset.x = this.element.offsetLeft;
    this.offset.y = this.element.offsetTop;
    this.offset.width = this.element.offsetWidth;
    this.offset.height = this.element.offsetHeight;

    // Set Offset Properties of the Overlay Template
    this.layer.offset.x = this.offset.x - this.layer.margin - 3;
    this.layer.offset.y = this.offset.y - this.layer.margin - 3;
    this.layer.offset.width = this.offset.width + (this.layer.margin * 2);
    this.layer.offset.height = this.offset.height + (this.layer.margin * 2);

  }

  renderOverlay() {

    if (!this.status) {

      // Update Offset Properties
      this.updateOffset();

      // Apply updated Offset properties
      this.overlay.style.left = this.layer.offset.x + "px";
      this.overlay.style.top = this.layer.offset.y + "px";
      this.overlay.style.width = this.layer.offset.width + "px";
      this.overlay.style.height = this.layer.offset.height + "px";

    }

    // Transform Overlay Template based on the Element
    this.overlay.style.transform = window.getComputedStyle(this.element).transform;

  }

  setTarget(event) {

    // empty this.target value
    this.target = "";

    // Find min/max Range of x and y
    this.axis = {
      x: {
        min: this.element.offsetLeft,
        max: this.element.offsetLeft + this.element.offsetWidth
      },
      y: {
        min: this.element.offsetTop,
        max: this.element.offsetTop + this.element.offsetHeight
      }
    };

    // Set Appropriate values to this.target
    // When Top/Bottom is the target
    if (event.pageY - 10 < this.axis.y.min)
      this.target += "T";      
    else if (event.pageY + 10 > this.axis.y.max)
      this.target += "B";

    // When Left/Right is the target
    if (event.pageX - 10 < this.axis.x.min)
      this.target += "L";
    else if (event.pageX + 10 > this.axis.x.max)
      this.target += "R";    

  }

  start(event) {

    // Turn ON Resize
    this.status = true;

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

    // Update this.target
    this.setTarget(event);

    // Hide Scroll Bars
    document.documentElement.style.overflow = "hidden";

  }
  
  stop(event) {

    // Turn OFF Resize
    this.status = false;

    // Update Offset Properties
    this.updateOffset();

    // Auto Scroll Bars
    document.documentElement.style.overflow = "auto";

  }

  resize(event) {

    if (event.type === "mousemove"){

      // Prevent the default behavior of the browser
      // Prevents Selection behavior caused by dragging
      event.preventDefault();

      // Check is mouse is pressed
      // event.buttons will return 1, if mouse is left-clicked
      if (event.buttons !== 1) {
        // Turn off Resizing
        this.stop();
      }

    }

    // considering touch events
    event = (event.type === "touchmove") ? event.targetTouches[0] : event;

    // if resize is turned Off
    if (!this.status) {
      // exit by returning undefined
      return undefined;
    }
  
    // for newer browsers
    // where event.movementX is available
    let xMovement = event.movementX;
    let yMovement = event.movementY;
    
    // for older browsers
    // if event.movementX is undefined
    if (event.movementX === undefined){
      xMovement = (event.pageX - this.delta.x);
      yMovement = (event.pageY - this.delta.y);
    }

    // for older browsers
    // if event.movementX is undefined
    if (event.movementX === undefined){
      // update the page X|Y
      this.delta.x = event.pageX;
      this.delta.y = event.pageY;
    }
    
    // If this.target is 'L'    
    if (new RegExp(/L/gi).test(this.target)) {

      // assign x offset to element and overlay template
      this.offset.x += xMovement;
      this.layer.offset.x += xMovement;

      // assign width offset to element and overlay template
      this.offset.width += (-xMovement);
      this.layer.offset.width += (-xMovement);  

    }

    // If this.target is 'R'    
    if (new RegExp(/R/gi).test(this.target)) {

      // assign width offset to element and overlay template
      this.offset.width += xMovement;
      this.layer.offset.width += xMovement;

    }
    
    // If this.target is 'T'    
    if (new RegExp(/T/gi).test(this.target)) {

      // assign y offset to element and overlay template
      this.offset.y += yMovement;
      this.layer.offset.y += yMovement;

      // assign height to element and overlay template
      this.offset.height += (-yMovement);
      this.layer.offset.height += (-yMovement);

    }
    // If this.target is 'B'
    if (new RegExp(/B/gi).test(this.target)) {

      // assign height to element and overlay template
      this.offset.height += yMovement;
      this.layer.offset.height += yMovement;

    }

    // update position of the overlay template
    this.overlay.style.left = this.layer.offset.x + "px";
    this.overlay.style.top = this.layer.offset.y + "px";

    // update width/height of the overlay template
    this.overlay.style.width = this.layer.offset.width + "px";
    this.overlay.style.height = this.layer.offset.height + "px";
    


    // update position of the element
    this.element.style.left = this.offset.x + "px";
    this.element.style.top = this.offset.y + "px";

    // update width/height of the element
    this.element.style.width = this.offset.width + "px";
    this.element.style.height = this.offset.height + "px";

  }

}