

//ejercicio 10 al 36
function findClient(idClient){
    for(let i = 0; i < clients.length; i++){
        if(clients[i].id == idClient){
            return i 
        }
    }
    return -1
}

function findSavingsBanks(idClient){
    let savingsBanks = []
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id == idClient) {
            for (let j = 0; j < clients[i].savingsBanks.length; j++) {
                savingsBanks.push(clients[i].savingsBanks[j])             
            }
        }
    }
    return savingsBanks
}

function findDolarSavingsBanks(idClient) {
    let savingsBanks = findSavingsBanks(idClient)
    let dolarSavingsBanks = []
    for (let j = 0; j < savingsBanks.length; j++) {
        if (savingsBanks[j].currency == "USD") {
            dolarSavingsBanks.push(savingsBanks[j])
        }
    }
    return dolarSavingsBanks
}

function findPesosSavingsBanks(idClient) {
    let savingsBanks = findSavingsBanks(idClient)
    let pesosSavingsBanks = []
    for (let j = 0; j < savingsBanks.length; j++) {
        if (savingsBanks[j].currency == "ARS") {
            pesosSavingsBanks.push(savingsBanks[j])
        }
    }
    return pesosSavingsBanks
}

function findDebitCards(idClient){
    let debitCards = []
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id == idClient) {
            for (let j = 0; j < clients[i].savingsBanks.length; j++) {
                for (let k = 0; k < clients[i].savingsBanks[j].debitCards.length; k++) {
                    debitCards.push(clients[i].savingsBanks[j].debitCards[k])
                }
            }
        }
    }
    return debitCards
}

function findSpecificDebitCard(idDebitCard){
    for (let i = 0; i < clients.length; i++){
        for ( let j = 0; j < clients[i].savingsBanks.length; j++){
            for ( let x = 0; x < clients[i].savingsBanks[j].debitCards.length; x++){
                if (clients[i].savingsBanks[j].debitCards[x].id == idDebitCard){
                    return clients[i].savingsBanks[j].debitCards[x]
                }
            }
        }
    }
    return null
}

function findCreditCards(idClient){
    for(let i = 0; i < clients.length; i++){
        if(clients[i].id == idClient){
            return clients[i].creditCards
        }
    }
    return []
}

function findSpecificCreditCard(idCreditCard){
    for (let i = 0; i < clients.length; i++){
        for ( let x = 0; x < clients[i].creditCards.length; x++){
            if (clients[i].creditCards[x].id == idCreditCard){
                return clients[i].creditCards[x]
            }
        }
    }
    return null
}

function findMovementsSavingsBank(idSavingsBank){
    for (let i = 0; i < clients.length;i++){
        for (let x = 0; x < clients[i].savingsBanks.length; x++){
            if (clients[i].savingsBanks[x].id == idSavingsBank){
                return clients[i].savingsBanks[x].movements
            }
        }
    }
    return []
}

function findMovementsDebitCard(idDebitCard){
    let debitCard = findSpecificDebitCard(idDebitCard)
    return debitCard ? debitCard.consumptions : []
}

function findMovementsCreditCard(idCreditCard){
    let creditCard = findSpecificCreditCard(idCreditCard)
    return creditCard ? creditCard.consumptions : []
}

function login(){
    let password = ui.getLoginPassword()
    let dni = ui.getLoginDni()
    for (let i = 0; i < clients.length;i++){
        if (dni == clients[i].dni){
            if (password == clients[i].password){
                return clients[i].id
            } else{
                alert("ERROR! la contraseña que ingresaste está mal.")
                return -1
            }
        }
    }
    alert("ERROR! El dni que ingresaste está mal.")
    return -1
}

function findSavingsBankById(idSavingsBank) {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            if (clients[i].savingsBanks[j].id == idSavingsBank) {
                return clients[i].savingsBanks[j]
            }
        }
    }
    return null
}

function extractFromSavingsBank(idSavingsBank, amount) {
    let bank = findSavingsBankById(idSavingsBank)
    if (bank) {
        return bank.extraer(amount)
    }
    return false
}

function depositToSavingsBank(idSavingsBank, amount) {
    let bank = findSavingsBankById(idSavingsBank)
    if (bank) {
        return bank.ingresar(amount)
    }
    return false
}

function findClientById(idClient) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id == idClient) {
            return clients[i]
        }
    }
    return null
}

function convertDollars(idClient, amount, idFrom, idTo) {
    let client = findClientById(idClient)
    if (client) {
        return client.comprarVenderDolares(amount, idFrom, idTo)
    }
    return false
}

function payCreditCard(idCreditCard, amount) {
    let card = findSpecificCreditCard(idCreditCard)
    if (card) {
        return card.pagarMonto(amount)
    }
    return false
}

function addMovementToCreditCard(idCreditCard, name, amount, date, installments = 1) {
    let card = findSpecificCreditCard(idCreditCard)
    if (card) {
        return card.registrarMovimiento(name, amount, date, installments)
    }
    return false
}

function addMovementToDebitCard(idDebitCard, name, amount, date) {
    let card = findSpecificDebitCard(idDebitCard)
    if (card) {
        return card.registrarMovimiento(name, amount, date)
    }
    return false
}

function addMovementToSavingsBank(idSavingsBank, name, amount, date) {
    let bank = findSavingsBankById(idSavingsBank)
    if (bank) {
        return bank.registrarMovimiento(name, amount, date)
    }
    return false
}

window.onload = () => {
    initData();

    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const resultado = login();
        if (resultado !== -1) {
            const cliente = findClientById(resultado);
            ui.mostrarNombreUsuario(cliente.name);
            ui.mostrarCuentas(resultado);
            ui.limpiarLogin();
        }
    });
};
