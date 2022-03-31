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
        
    }
}


