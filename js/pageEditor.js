import ExternalServices from './ExternalServices.js';

function htmlRenderer(title, text, imgBase64) {
    
    let sectionDiv = `<div class="section">
    <h2>${title}</h2>
    <p>${text}</p>`;

    if(typeof imgBase64 != undefined){
        sectionDiv += `<img src="${imgBase64}">`;
    }
    
    sectionDiv += `</div>`;

}

export default class PageEditor {
    constructor(siteName) {
        this.token = null;
        this.services = new ExternalServices('admin/' + siteName);
        this.siteName = siteName;
    }

    editPage(){

    }
    getValues(){
        document.querySelector('#submitBtn').addEventListener('click', (e)=>{

            let sectionTitle = document.querySelector('#title').value;
            let sectionText = document.querySelector('#text').value;

            e.preventDefault();

            let upload = document.querySelector('#image');
            let img = upload.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(img);

            reader.addEventListener('load', ()=>{
                let imgBase64 = reader.result;
                console.log(JSON.stringify({sectionTitle, sectionText, imgBase64}));
            })
        })
    }
}

