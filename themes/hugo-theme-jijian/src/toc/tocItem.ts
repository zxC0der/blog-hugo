class TocItem {

  public last:string=null;
  constructor(public body: NodeListOf<HTMLElement>) {
  }

  init() {
    this.body.forEach(nd=>{
      // 点击后，上次的锚点的css类就要取消
      nd.addEventListener('click',()=>{
        if(this.last!=null){
          document.getElementById(this.last).classList.remove("z-dingweizhunque");
        }
        const id=nd.getAttribute("href").substr(1);
        this.last=id;
        console.log(id,document.getElementById(id))
        document.getElementById(id).classList.add("z-dingweizhunque");
      })
    })
  }
}

export default TocItem;
