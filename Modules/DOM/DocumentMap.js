class DocumentMap {

  constructor(element) {

    this.root = element || null;

  }
  
  create(element, cloned = false) {
    
    element = element || this.root;

    element = (cloned) ? element.cloneNode(true) : element;

    const elementNodes = element.querySelectorAll("*");

    return (elementNodes);

  }

  render(element) {
    
    // if element not defined use root element
    element = element || this.root;
    
    const elementMap = this.create(element.parentElement, true);
    
    const documentMapId = __WorkSpace__.id + "-map";

    const documentMap = document.createElement("div");
    documentMap.id = documentMapId;
    
    const firstElementChildren = Array.from(elementMap[0].children);

    for (let i = 0; i < firstElementChildren.length; i++) {

      documentMap.appendChild(firstElementChildren[i]);

    }
    
    for (let i = 0; i < elementMap.length; i++) {

      new DocumentElement(elementMap[i]).resetStyles();

      const selectorText = (elementMap[i].id) ? "#" + elementMap[i].id : "." + elementMap[i].className.replace(" ", ".");

      const selectorTextElement = document.createElement("div");
      selectorTextElement.textContent = selectorText;

      elementMap[i].insertBefore(selectorTextElement, elementMap[i].children[0] || null);

      elementMap[i].style.backgroundColor = "rgba(0, 0, 0, 0.25)";
      elementMap[i].style.padding = "20px";
      elementMap[i].style.margin = "10px 0px";
      
    }
    
    if (!!document.getElementById(documentMapId)) {

      document.body.removeChild(document.getElementById(documentMapId));

    }
    
    document.body.appendChild(documentMap);

  }

}