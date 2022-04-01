import ExternalServices from './ExternalServices.js';

class PageEditor {
    constructor(siteName) {
        this.token = null;
        this.services = new ExternalServices('admin/' + siteName);
        this.siteName = siteName;
    }

    editPage(){

    }
    getValues(){


        let sectionTitle = document.querySelector('#title').value;
        let sectionText = document.querySelector('#text').value;
        
        let pageData = {
            
        };

        this.services.updatePageRequest();
    }
}

function htmlRenderer(title, text, image) {
    

    if(typeof image != undefined){
        
    }
}


