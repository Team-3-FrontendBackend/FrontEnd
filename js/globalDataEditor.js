import ExternalServices from './ExternalServices.js';

export default class EditGlobal{
    constructor(token){
        this.token = token;
        this.services = new ExternalServices('admin/global-data');
    }

    async reqEdit(pageData){
        try{
            this.apiMessage = await this.services.updatePageRequest(pageData, this.token);
            console.log(this.apiMessage);
        }
        catch(err){
            console.log(err);
        }

    }

    editGlobalData(){
        document.querySelector('#submitBtn').addEventListener('click', (e)=>{
            e.preventDefault();
            let backgroundColor = document.querySelector('#color-picker').value;

            let email = document.querySelector('#email').value;
            let phone = document.querySelector('#phone').value;

            /*I dont think contact can hold multiple values*/
            let contact = email + '/' + phone;

            let facebook = "string";
            let iBelong = "string";
            let instagram = "string";
            let socialLinks = {facebook, iBelong, instagram}

            let links = ["string"];

            let upload = document.querySelector('#logo');
            let img = upload.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(img);
            let siteName = sessionStorage.getItem("newHomePage");
            siteName = siteName.substring(1);
            document.querySelector('#home-link').innerHTML = `<a href="site-preview.html?url=${siteName}">Visit your new home page</a>`;


            reader.addEventListener('load', ()=>{
                /*logoUrl is actual base64 encoded img*/
                let logoUrl = reader.result;

                let header = {logoUrl, backgroundColor};
                let nav = {links};
                let footer = {
                    contact,
                    socialLinks,
                }
                console.log(JSON.stringify({header, nav, footer}));
                this.reqEdit({header, nav, footer});
                
            })


        })
    }

}

