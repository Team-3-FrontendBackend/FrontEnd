import ExternalServices from './ExternalServices.js';

async function postHomepage(endpoint, token, content) {
  const baseURL = 'https://cms-societies.herokuapp.com/';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}` 
    },
    body: JSON.stringify(content)
  }
  // Instead of baseURL + login, I changed to make it reusable.
   const response = await fetch(baseURL + endpoint, options)/*.then(convertToJson)*/;
   return response;
}

export default class User {
  constructor() {
    this.token = null;
    this.services = new ExternalServices('login');
    this.servicesGetUrl = new ExternalServices('admin');
    
  }
  async login(creds) {
    // I built the login method with a callback: next. This makes it much more flexible...
    // there could be many different things the user wants to do after logging in...
    // this allows us that flexibility without having to write a bunch of login methods
    try {


      this.token = await this.services.apiRequest(creds);
      this.urlArray = await this.servicesGetUrl.getPageLinks(this.token.token);
      // console.log(this.token.token);
      // console.log(this.urlArray.links.length);
      const urlArraySize = this.urlArray.links.length;
    
      if(urlArraySize <= 1){

        let siteNameUrl = sessionStorage.getItem('newHomePage');
        let siteName = siteNameUrl.substring(1);
        console.log(siteName);

        
        const name = `${siteName}`;
        // const postPage = new ExternalServices('admin/' + siteName);

        try{
        const postEndpoint = 'admin' + '/' + siteName;
        console.log(siteName);
        const apiPostMessage = await postHomepage(postEndpoint, this.token.token, {name});
        console.log(apiPostMessage);
        }

        catch(err){
          console.log(err);
        }
      }

      window.sessionStorage.setItem('creds',JSON.stringify(this.token));

      window.location.href = "home.html";
      
    } 
    catch(err) {
      console.log(err)
      const messageElement = document.getElementById("errMessage");
      messageElement.innerHTML = err.message.message;
    }
  }
  setLogin() {
    // add the html for the login form
      // now that it is in the DOM we can add a listener for the login button
      document.querySelector('#loginButton').addEventListener('click', (e) => {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const homeName = document.querySelector("#sitename").value;
        const siteEndpoint = "/" + homeName;
        window.sessionStorage.setItem('user', username);
        window.sessionStorage.setItem('newHomePage',siteEndpoint);
        this.login({username, password});
      });
  }
  
}