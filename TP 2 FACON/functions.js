let idLogged = -1

// INICIO DE SESION
function cargarDatos(id) {
    
}
function findeClientByNameAndPassword(dni, password) {
    // Esta función busca un cliente en el arreglo 'client' que tenga un DNI y contraseña específicos
    for (let i = 0; i < client.length; i++) { 
        // Recorre el arreglo 'client' para revisar cada cliente (índice i)
        if (client[i].dni == dni && client[i].password == password) {
            // Si el cliente tiene el mismo DNI Y la misma contraseña que los ingresados...
            return client[i].id;
            // Devuelve el ID del cliente que encontró
        }
    }
    return -1;
    // Si no encuentra ningún cliente con ese DNI y contraseña, devuelve -1 (indica error o no encontrado)
}


function inicioSesion() {
    let dni = ui.getDni()
    let password = ui.getPassword();
    console.log(dni, password)
    let resultado = findeClientByNameAndPassword(dni, password);
    console.log(resultado)
    if (resultado > 0) {
        idLogged = resultado
        ui.changeScreen();
        ui.clearLoginInputs();
    }
}


// 9)  Implementar una función para encontrar un cliente en el vector “clients” a partir de su ID. La función
// recibe como parámetro el ID y devuelve la posición del vector donde se encuentra el cliente.

function findClients(idLogged) {
    for (let i = 0; i < client.length; i++) {
        if (client[i].id == idLogged) {
            return i
        } 
    }
}

/* 10) Implementar una función para encontrar todas las cajas de ahorro de un determinado cliente a
partir del ID del cliente. La función recibe como parámetro el ID del cliente y devuelve un nuevo
vector con las cajas de ahorro que están a nombre de ese cliente.
NOTA: Puede generar dos funciones o puede la función recibir un parámetro extra y de esa manera
saber si tiene que devolver solo cajas en pesos, solo cajas en dólares, o ambas. */

function findSavingbanks(idLogged, currency) {
    let resultado = []
    let posCliente = findClients(idLogged);
    if (posCliente != -1) {
        for (let i = 0; i < client[posCliente].savingsBanks.length; i++) {
            if (currency == undefined) {
                resultado.push(client[posCliente].savingsBanks)
            } else if (client[posCliente].savingsBanks[i].currency === currency) {
                resultado.push(client[posCliente].savingsBanks[i])
            }
        }
    }
    return resultado
}

/*
11) 
Implementar una función para encontrar todas las tarjetas de débito de un determinado cliente a
partir del ID del cliente. La función recibe como parámetro el ID del cliente y devuelve un nuevo
vector con las tarjetas de débito que están a nombre de ese cliente.
 */



function findDebitCards(idLogged) { //busca TODAS las tarjetas de un cliente en especifico
    let posClient = findClients(idLogged)
    let resultado = []
    if (posClient != -1) {
        for (let i = 0; i < client[posClient].savingsBanks.length; i++) {
            for (let j = 0; j < client[posClient].savingsBanks[i].debitCards.length; j++){
                resultado.push(client[posClient].savingsBanks[i].debitCards[j])
            } 
            
        }
    }
    return resultado
}

/* 12) Implementar una función para encontrar una tarjeta de débito específica de un cliente a partir del ID
de la tarjeta. La función recibe como parámetro el ID y devuelve el objeto “debitCard”
correspondiente. */

function findDebitCardsSpecific(id) { //busca una en especifico entre todos los cientes
    for (let i = 0; i < client.length; i++){
        for (let j = 0; j < client[i].savingsBanks.length; j++){
            for(let k = 0; k < client[i].savingsBanks[j].debitCards.length; k++){
                if (client[i].savingsBanks[j].debitCards[k].id === id){
                    return client[i].savingsBanks[j].debitCards[k]
                }
            }
        }
    }
    return -1
}

/*
13) Implementar una función para encontrar todas las tarjetas de crédito de un determinado cliente a
partir del ID del cliente. La función recibe como parámetro el ID del cliente y devuelve un nuevo
vector con las tarjetas de crédito que están a nombre de ese cliente.*/ 

function findCreditCards(idLogged) {
    let resultado = []
    let posCliente = findClients(idLogged);
    if (posCliente != -1){
        for (let i = 0; i < client[posCliente].creditCards.length; i++) {
            resultado.push(client[posCliente].creditCards[i])
        }
    } 
    return resultado;
}




/*
14) Implementar una función para encontrar una tarjeta de crédito específica de un cliente a partir del
ID de la tarjeta. La función recibe como parámetro el ID y devuelve el objeto “creditCard”
correspondiente.
NOTA: No se conoce el ID del cliente. Hay que buscar cliente por cliente a ver a quién está asociada
esa tarjeta de crédito. */


function findCreditCardsSpecific(id) {
    for (let i = 0; i < client.length; i++) {
        for (let j = 0; j < client[i].creditCards.length; j++) {  //no se pasa por savingbanks Porque las tarjetas de crédito (creditCards) en este sistema están guardadas directamente dentro del cliente, no dentro de las cajas de ahorro (savingsBanks).
            if (client[i].creditCards[j].id === id) {
                return client[i].creditCards[j];
            }
        }
    }
    return -1;
}

/*
15) Implementar una función para encontrar los movimientos de una determinada caja de ahorro a
partir del ID de la caja de ahorro. La función recibe como parámetro el ID de la caja de ahorro y
devuelve un nuevo vector con los movimientos que se realizaron en esa caja.
NOTA: No se conoce el ID del cliente. Hay que buscar cliente por cliente a ver a quién le pertenece
esa caja de ahorro para obtener sus movimientos. */

function findMovementsSavingBanks(id) {
    for (let i = 0; i < client.length; i++) {
        for (let j = 0; j < client[i].savingsBanks.length; j++) {
            if (client[i].savingsBanks[j].id === id) { //Compara el ID de la caja de ahorro actual con el id que se está buscando: 
                return client[i].savingsBanks[j].movements;
            }
        }
    }
    return -1;
}   

/*
16) Implementar una función para encontrar los movimientos de una determinada tarjeta de débito a
partir del ID de la tarjeta. La función recibe como parámetro el ID de la tarjeta de débito y devuelve
un nuevo vector con los movimientos que se realizaron con esa tarjeta.
NOTA: No se conoce el ID del cliente. Hay que buscar cliente por cliente a ver a quién está asociada
esa tarjeta de débito. */

function findMovementsDebitCards(id) {
    for (let i = 0; i < client.length; i++) {
        for (let j = 0; j < client[i].savingsBanks.length; j++) {
            for (let k = 0; k < client[i].savingsBanks[j].debitCards.length; k++) {
                if (client[i].savingsBanks[j].debitCards[k].id === id) {
                    return client[i].savingsBanks[j].movements;
                }
            }
        }
    }
    return -1;
}

/*
17) Implementar una función para encontrar los movimientos de una determinada tarjeta de crédito a
partir del ID de la tarjeta. La función recibe como parámetro el ID de la tarjeta de crédito y devuelve
un nuevo vector con los movimientos que se realizaron con esa tarjeta.
NOTA: No se conoce el ID del cliente. Hay que buscar cliente por cliente a ver a quién está asociada
esa tarjeta de crédito.*/

function findMovementsCreditCards(id) {
    for (let i = 0; i < client.length; i++) {
        for (let j = 0; j < client[i].creditCards.length; j++) {
            if (client[i].creditCards[j].id === id) {
                return client[i].creditCards[j].consumptions;
            }
        }
    }
    return -1;
}

/* 23) Implementar una función para realizar una transferencia de dinero de un cliente a otro.
    a. La forma de llevar a cabo esto es utilizando el método de extracción en la caja de ahorros
    correspondiente en el cliente origen y el método de ingreso en la caja de ahorros
    correspondiente del cliente destino, verificando qué respuesta dio cada método.
    b. La función recibe tres parámetros:
    i. El ID de la caja de ahorro que tiene el dinero a transferir.
    ii. El Alias, CBU o ID de la caja de ahorro de destino.
    iii. El monto por transferir.
    c. Se debe verificar que el cliente que va a transferir el dinero cuente con el mismo en la caja
    de ahorro correspondiente.
    d. La función devuelve true si se realiza la transferencia y false en caso contrario. */

function transferMoney( id,alias, amount) { // client[0].transferMoney(1, "suarezalias", 1000)
    let originBank = findSavingbanks(idLogged, currency);
    let destinyBank = findSavingbanks(idLogged, currency);
    
    if (!originBank || !destinyBank) {
        return false; 
    }
    
    if (originBank.extractMoney(amount)) {
        return destinyBank.addMoney(amount); 
    }
    
    return false; 
} 


/* Ejemplo changescreen mucho mas facil y mejor hecho

changeScreen() {
        const notepad = document.getElementById("notepad");
        const loginForm = document.getElementById("loginForm");
        if (notepad.style.display == "none") {
            notepad.style.display = "block";
            loginForm.style.display = "none";
        } else {
            notepad.style.display = "none";
            loginForm.style.display = "flex";
        }
    }

    changeScreenAdmin() {
        const admin = document.getElementById("admin");
        const loginForm = document.getElementById("loginForm");
        const notepad = document.getElementById("notepad");
        notepad.style.display = "none";
        loginForm.style.display = "none";
        admin.style.display = "block";
    } */



// 26)
function findSavingBankById(id) {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            if (clients[i].savingsBanks[j].id === id) {
                return clients[i].savingsBanks[j];
            }
        }
    }
    return null;
}


