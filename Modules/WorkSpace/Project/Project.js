class Project {

  constructor(id) {

    this.id = id;

    this.Pages = [];

    this.currentPageIndex = null;

    this.init();

  }

  init() {

    this.currentPageIndex = this.createPage() - 1;

  }

  get currentPage() {

    return this.Pages[this.currentPageIndex];

  }

  createPage() {

    const newPageId = this.id + "_p" + (this.Pages.length + 1);

    const newPage = new Page(newPageId);

    return this.Pages.push(newPage);

  }

  

}