import ExternalServices from './ExternalServices.js';



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
            
            document.querySelector('#home-link').innerHTML = `<a href="site-preview.html?url=${this.siteName}">Visit your new home page</a>`;
            
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
                let name = "template";
                let contentTemplates = [{sectionTitle, sectionText, imgBase64}];
                this.reqEditPage({name, contentTemplates});

            })
            
        
        })
    }
}

