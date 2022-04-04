import ExternalServices from './ExternalServices.js';
import { renderGlobalData } from './utils.js';

function htmlRenderer(pageContent) {
    
    let title = pageContent.sectionTitle;
    let text = pageContent.sectionText;
    let imgBase64 = pageContent.imgBase64;

    let div = `
    <div>
    <h2>${title}</h2>
    <img src="${imgBase64}">
    <p>${text}</p>`;

    return div;

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
        let pageContent = await this.getHomePageInfo();
        console.log(pageContent);

        const pageHTML = htmlRenderer(pageContent.content[0]);

        const homeMain = document.querySelector('#home-page');

        homeMain.innerHTML = pageHTML;

        renderGlobalData(pageContent);
    }

    async getHomePageInfo(){

        let siteUrl = getParam("url");
        const services = new ExternalServices('live/' + siteUrl);
        const pageInfo = await services.getLivePageRequest(this.token);

        return pageInfo;
    }
}