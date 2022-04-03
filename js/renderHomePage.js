import ExternalServices from './ExternalServices.js';

function htmlRenderer(title, text, imgBase64) {
    
    let sectionDiv = `<div class="section">
    <h2>${title}</h2>
    <p>${text}</p>`;

    if(typeof imgBase64 != undefined){
        sectionDiv += `<img src="${imgBase64}">`;
    }
    
    sectionDiv += `</div>`;

    return sectionDiv;
}

function getParam(params){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productInfo = urlParams.get(params);
    return productInfo;
  }

export default class PageRenderer{
    constructor(token){
        this.token = token;
    }

    async render(){
        let pageInfo = await this.getHomePageInfo();

        let content = pageInfo.page.contentTemplates[0]
        
        const title = content.sectionTtitle;
        const text = content.sectionTtext;
        const img64 = content.imgBase64;

        const pageHTML = htmlRenderer(title, text, img64);

        const homeMain = document.querySelector('#home-page');

        homeMain.innerHTML = pageHTML;

    }

    async getHomePageInfo(){

        let siteUrl = getParam("url");
        const services = new ExternalServices('admin/' + siteUrl);
        const pageInfo = await services.getPageRequest(this.token);

        return pageInfo;
    }
}