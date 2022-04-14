export class FormRes{
    constructor(IPT){
        this.IPT = IPT;
        this.$result = document.getElementById('result');
        this.cpData = [];
        //실행
        this.init();
    }//constructor
    init(){
        const $form = document.getElementById('form-res');
        $form.addEventListener('submit',this.on_submit);
    }//init

    on_submit = (e)=>{
        e.preventDefault();
        this.reset();

        //early return
        if(!this.IPT.data.length){return;}

        //switch
        const $sel = e.target.sel;
        const selVal = $sel.value;
        
        switch(selVal){
            case "order" :
                this.order();
                break;
            case "reverse" :
                this.reverse();
                break;
            case "random" :
            default:
                this.random();
                break;
        }//switch

        this.display_result();
    }//on_submit

    reset(){
        this.$result.innerHTML = '';
        this.cpData = [];
    }//reset

    order(){
        this.cpData = this.IPT.data.sort();
    }//order

    reverse(){
        this.cpData = this.IPT.data.reverse();
    }//reverse
    
    random(){
        const copied = [...this.IPT.data];

        while(copied.length > 0){
            const random = Math.floor(Math.random() * copied.length);
            const popped = copied.splice(random,1)[0];
            this.cpData.push(popped);
        }//while
    }//random

    display_result(){
        const $frag = document.createDocumentFragment();
        this.cpData.forEach(data =>{
            const $li = document.createElement('LI');
            $li.textContent = data;
            $frag.appendChild($li);
        });
        this.$result.appendChild($frag);
    }//display_result
}//FormRes