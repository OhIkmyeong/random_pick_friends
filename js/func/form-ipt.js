import { FormRes } from "./form-res.js";

export class FormIpt{
    constructor(){
        this.$list = document.getElementById('list_friend');
        this.$message = document.getElementById('message-alert');
        this.RES = new FormRes(this);
        this.data = [];
    }//constructor

    init(){
        //form
        const $form = document.getElementById('form-ipt');
        $form.addEventListener('submit',this.on_submit);

        //list click(del)
        this.$list.addEventListener('click',this.remove_li);
    }//init

    on_submit = e =>{
        e.preventDefault();
        const val = e.target.ipt.value;
        //reset ipt
        this.reset_ipt(e);
        
        //early return
        if(!val){return;}
        if(this.data.indexOf(val) > -1){
            this.off_message(false);
            return;
        }

        //add li
        this.off_message(true);
        this.add_data(val);
        this.add_li(val);
    }//on_submit

    off_message(bool){this.$message.classList.toggle('off',bool);}

    reset_ipt(e){
        e.target.ipt.value = '';
        e.target.ipt.focus();
    }//reset_ipt

    add_li(val){
        const $frag = document.createDocumentFragment();

        const $p = document.createElement('P');
        $p.textContent = val;
        $frag.appendChild($p);

        const $del = document.createElement('BUTTON');
        $del.classList.add('del');
        $frag.appendChild($del);

        const $li = document.createElement('LI');
        $li.appendChild($frag);

        this.$list.appendChild($li);
    }//add_li

    add_data(val){
        this.data.push(val);
    }//add_data

    remove_li = e =>{
        const target = e.target;
        if(!target.classList.contains('del')){return;}
        const val = target.previousElementSibling.textContent;
        const $li = target.parentElement;
        this.$list.removeChild($li);
        this.remove_data(val);
    }//remove_li

    remove_data(val){
        const idx = this.data.indexOf(val);
        this.data.splice(idx,1);
    };
}//FormIpt