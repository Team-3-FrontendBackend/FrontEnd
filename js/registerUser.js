
export default class createUser{
    constructor(username, password, siteName){
        this.username = username;
        this.password = password;
        this.siteName = siteName;
        this.siteUrl = "";
    }

    init(){
        // Format siteUrl 
        this.siteUrl = this.siteName.replaceAll(" ", "-")
    }
}