import ExternalServices from './ExternalServices.js';

function formatUrl(name){

    const pageName = name.replaceAll(" ", "-");
    const url = '/' + pageName;
    
    return url;
}

export default class Register{
    constructor(){
        this.apiMessage = null;
        this.services = new ExternalServices('signup');
    }

    async register(userInfo, url){
        
        try {
            this.apiMessage = await this.services.apiRequest(userInfo);
            console.log(this.apiMessage);

            window.sessionStorage.setItem('newHomePage', url);

            window.location.href = "login.html";   
        }
        catch(err){
            console.log(err);
        }
    }

    setRegister(){

        document.querySelector('#registerBtn').addEventListener('click', (e)=>{
            e.preventDefault();
            const username = document.querySelector("#r-username").value;
            const password = document.querySelector("#r-password").value;
            const confirmPassword = document.querySelector('#confirm-password').value;
            const siteName = document.querySelector('#site-name').value;
            const url = formatUrl(siteName);

            this.register({username, password, confirmPassword, url, siteName}, url);
        });
        
    }

}