export function renderGlobalData(pageContent){
    
    let logoUrl = pageContent.headerLogoUrl;
    let headerColor = pageContent.headerBackgroundColor;

    let contactInfo = pageContent.footerContact;
    let contactInfoArray = contactInfo.split('/');
    let email = "Email: " + contactInfoArray[0];
    let phone = "Phone: " + contactInfoArray[1];

    let targetLogo = document.querySelector('#hLogo');
    let targetEmail = document.querySelector('#email');
    let targetPhone = document.querySelector('#phone');
    let targetAddress = document.querySelector('#address');
    let header = document.querySelector('header');

    targetLogo.setAttribute('src',logoUrl);
    header.style.backgroundColor = headerColor;

    targetEmail.innerHTML = email;
    targetPhone.innerHTML = phone;
}

export function getParam(params){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productInfo = urlParams.get(params);
    return productInfo;
  }