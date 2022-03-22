import ExternalServices from './ExternalServices.js';

export default class User {
  constructor() {
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    // I built the login method with a callback: next. This makes it much more flexible...
    // there could be many different things the user wants to do after logging in...
    // this allows us that flexibility without having to write a bunch of login methods
    try {
      this.token = await this.services.loginRequest(creds);
      next()
    } 
    catch(err) {
      console.log(err)
    }
  }
  setLogin() {
    // add the html for the login form
      // now that it is in the DOM we can add a listener for the login button
      document.querySelector('#loginButton').addEventListener('click', (e) => {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        this.login({username, password});
      });
  }
  
}