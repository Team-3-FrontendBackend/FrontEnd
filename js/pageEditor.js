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
    constructor(siteName, token) {
        this.token = token;
        this.services = new ExternalServices('admin/' + siteName);
        this.siteName = siteName;
    }

    async reqEditPage(pageData){
        try{

            this.apiMessage = await this.services.updatePageRequest(pageData, this.token); 
            const pageInfo = await this.services.getPageRequest(this.token);

            console.log(this.apiMessage);
            console.log(pageInfo);
        }
        catch(err){
            console.error(err);
        }
    }
    editPage(){
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
                let name = "testing";
                let contentTemplates = [{sectionTitle, sectionText, imgBase64}];
                this.reqEditPage({name, contentTemplates});
            })
        
        })
    }
}

