class UserInterface{
    constructor (){
    }
    getLoginDni(){
        return document.getElementById("loginDni").value;
    }
    getLoginPassword(){
        return document.getElementById("loginPassword").value;
    }
}

const ui = new UserInterface();