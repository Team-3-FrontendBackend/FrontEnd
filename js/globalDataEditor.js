import ExternalServices from './ExternalServices.js';

export default class EditGlobal{
    constructor(token){
        this.token = token;
    }

    async reqEdit(){


    }

    editGlobalData(){
        document.querySelector('#submitBtn').addEventListener('click', (e)=>{

            let color = document.querySelector('#color-picker');
            console.log(color);
        })
    }

}