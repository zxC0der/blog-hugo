class Toc {

  public isShow:boolean=true;
  constructor(public header: HTMLElement,public body:HTMLElement) {
  }

  show() {
    this.body.style.display = 'block';
  }

  hide() {
    this.body.style.display = 'none';
  }

  init() {
    const instance = this;
    this.header.addEventListener('click', () => {
      instance.isShow=!this.isShow;
      if(instance.isShow){
        instance.show();
      }else{
        instance.hide();
      }
    });
  }
}

export default Toc;
