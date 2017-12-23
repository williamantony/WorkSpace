class Dragger {

  constructor(element, handle, handleStyle) {

    this.element = element;
    
    this.boundary = document.documentElement;

    this.setHandle(handle, handleStyle);

    this.init();

  }

  init() {

    // On / Off
    this.isEnabled = true;

    // Drag Status
    this.status = false;

    this.vertical = true;
    this.horizontal = true;

    this.events = {
      onMouseDown: this.start.bind(this),
      onMouseUp: this.stop.bind(this),
      onMouseMove: this.move.bind(this),
    };

    // Data Object
    this._data = {};

    // Functions
    this._method = {};

    this.createMethods();

    this._method.syncOffset();

    this.setEvents('init');


  }

  setHandle(handle, handleStyle = {}) {

    const defaultHandleStyle = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '0px',
      height: '0px',
      boxShadow: 'inset 0px 0px 0px 5px #ffc000',
    };

    if (handle === true) {

      const handleElement = document.createElement('div');

      if (typeof handleStyle === 'string')
        handleElement.className = handleStyle;

      else if (typeof handleStyle === 'object')
        Object.assign(handleElement.style, handleStyle, defaultHandleStyle);
      
      this.handle = handleElement;

      document.documentElement.appendChild(this.handle);

    }
    else if (handle !== false) {

      if (typeof handle === 'object')
        this.handle = handle;

      else this.setHandle(true, handleStyle);

    }
    else this.handle = this.element;

  }

  setEvents(type) {

    if (type === 'init')
      this.handle.addEventListener('mousedown', this.events.onMouseDown);
      
    else if (type === 'add' || type === 'remove') {
      document.documentElement[`${ type }EventListener`]('mousemove', this.events.onMouseMove);
      document.documentElement[`${ type }EventListener`]('mouseup', this.events.onMouseUp);
    }

    if ('ontouchstart' in window) {

      if (type === 'init')
        this.handle.addEventListener('touchstart', this.events.onMouseDown);

      else if (type === 'add' || type === 'remove') {
        document.documentElement[`${ type }EventListener`]('touchmove', this.events.onMouseMove);
        document.documentElement[`${ type }EventListener`]('touchend', this.events.onMouseUp);
      }

    }
      
  }

  createMethods() {

    this._method.getElementOffset = (element) => {
      
      return element.getBoundingClientRect();

    };

    this._method.setCursorPosition = (event) => {

      const pageOffset = this._method.getEventPageOffset(event);

      this._data.cursor = {
        x: pageOffset.x,
        y: pageOffset.y,
        originX: pageOffset.x,
        originY: pageOffset.y,
      };

    };

    this._method.updateCursorPosition = (event) => {

      const pageOffset = this._method.getEventPageOffset(event);

      this._data.cursor.x = pageOffset.x;
      this._data.cursor.y = pageOffset.y;

    };

    this._method.getEventPageOffset = (event) => {

      const pageOffset = {
        x: event.pageX,
        y: event.pageY,
      };

      if (pageOffset.x === undefined) {
        const scrollOffset = this._method.getScrollOffset();

        pageOffset.x = event.clientX + scrollOffset.x;
        pageOffset.y = event.clientY + scrollOffset.y;
      }

      return pageOffset;

    };

    this._method.getMovement = (event) => {

      const movement = {
        x: event.movementX,
        y: event.movementY,
      };

      if (movement.x === undefined) {
        const pageOffset = this._method.getEventPageOffset(event);
        
        movement.x = parseInt(pageOffset.x - this._data.cursor.x);
        movement.y = parseInt(pageOffset.y - this._data.cursor.y);
      }
      
      return movement;

    };

    this._method.getScrollOffset = () => {

      const scrollOffset = {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop,
      };

      const nodeList = Array.from(document.querySelectorAll('*'));
      const bodyIndex = nodeList.indexOf(document.body);
      const elementIndex = nodeList.indexOf(this.element);
      
      const shortList = nodeList.slice(bodyIndex, elementIndex);
      
      for (let i = 0; i < shortList.length; i++) {

        scrollOffset.x += parseInt(shortList[i].scrollLeft);
        scrollOffset.y += parseInt(shortList[i].scrollTop);

      }
      
      return scrollOffset;

    };

    this._method.syncOffset = () => {

      if (this._data.offset === undefined){
        this._data.offset = {
          element: {},
          handle: {},
        };
      }

      const computedStyle = window.getComputedStyle(this.element);
      
      // from getBoundingClientRect();
      const elementOffset = this._method.getElementOffset(this.element);

      this._data.offset.element.x = this.element.offsetLeft - parseInt(computedStyle["marginLeft"]);
      this._data.offset.element.y = this.element.offsetTop - parseInt(computedStyle["marginTop"]);
      this._data.offset.element.width = elementOffset.width;
      this._data.offset.element.height = elementOffset.height;

      this._data.offset.handle.x = elementOffset.left;
      this._data.offset.handle.y = elementOffset.top;
      this._data.offset.handle.width = elementOffset.width;
      this._data.offset.handle.height = elementOffset.height;
      
      // Range of Element
      this._data.offset.element.minX = - parseInt(computedStyle["marginLeft"]);
      this._data.offset.element.minY = - parseInt(computedStyle["marginTop"]);
      this._data.offset.element.maxX = this.boundary.clientWidth - this.element.offsetWidth - parseInt(computedStyle["marginRight"]);
      this._data.offset.element.maxY = this.boundary.clientHeight - this.element.offsetHeight - parseInt(computedStyle["marginBottom"]);

      // Range of Handle
      this._data.offset.handle.minX = 0;
      this._data.offset.handle.minY = 0;
      this._data.offset.handle.maxX = this.boundary.clientWidth - this.element.offsetWidth;
      this._data.offset.handle.maxY = this.boundary.clientHeight - this.element.offsetHeight;

      this._method.updateHandle();

    };

    this._method.updateOffset = (movement) => {

      this._method.syncOffset();

      this._data.offset.element.x += movement.x;
      this._data.offset.element.y += movement.y;

      this._data.offset.handle.x += movement.x;
      this._data.offset.handle.y += movement.y;

    };
    
    this._method.updateElement = () => {

      const element = this._data.offset.element;
      
      element.x = (element.x < element.minX) ? element.minX : (element.x > element.maxX) ? element.maxX : element.x;
      element.y = (element.y < element.minY) ? element.minY : (element.y > element.maxY) ? element.maxY : element.y;
      

      if (this.horizontal)
        this.element.style.left = element.x + 'px';

      if (this.vertical)
        this.element.style.top = element.y + 'px';

    };

    this._method.updateHandle = () => {

      if (this.handle === this.element) return undefined;

      const handle = this._data.offset.handle;
      
      handle.x = (handle.x < handle.minX) ? handle.minX : (handle.x > handle.maxX) ? handle.maxX : handle.x;
      handle.y = (handle.y < handle.minY) ? handle.minY : (handle.y > handle.maxY) ? handle.maxY : handle.y;

      if (this.horizontal)
        this.handle.style.left = handle.x + 'px';

      if (this.vertical)
        this.handle.style.top = handle.y + 'px';

      this.handle.style.width = handle.width + 'px';
      this.handle.style.height = handle.height + 'px';

      this.handle.style.transform = window.getComputedStyle(this.element)["transform"];
      this.handle.style.zIndex = window.getComputedStyle(this.element)["zIndex"];

    };

    this._method.treatEvent = (event) => {

      if (event.type === "mousemove") {
        
        event.preventDefault();  
        // Check if mouse is pressed
        // event.buttons will return 1, if mouse is left-clicked
        if (event.buttons !== 1) {
          // Turn off Resizing
          this.stop();
        }
  
      }
      
      event = (event.type.includes('touch')) ? event.targetTouches[0] : event;

      return event;

    };

  }
  


  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }
  


  start(event) {
    
    if (!this.isEnabled) return undefined;

    this.status = true;

    this.setEvents('add');
    
    event = this._method.treatEvent(event);

    this._method.syncOffset();

    this._method.setCursorPosition(event);

    // Auto Scroll Bars
    document.documentElement.style.overflow = 'hidden';
    
    if (typeof this.onDragMove === 'function')
      this.onDragStart();

  }

  stop(event) {
        
    this.status = false;
    
    this.setEvents('remove');

    // Auto Scroll Bars
    document.documentElement.style.overflow = 'auto';
    
    if (typeof this.onDragMove === 'function')
      this.onDragEnd();

  }

  move(event) {
    
    if (!this.isEnabled) return undefined;
    if (!this.status) return undefined;
    
    event = this._method.treatEvent(event);
    
    const movement = this._method.getMovement(event);
    
    this._method.updateOffset(movement);

    this._method.updateElement();
    
    this._method.updateHandle();
    
    this._method.updateCursorPosition(event);

    if (typeof this.onDragMove === 'function')
      this.onDragMove();

  }

}