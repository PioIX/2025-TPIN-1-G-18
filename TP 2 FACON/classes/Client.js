let clientsId = 1;

class Client{
    constructor(dni, password, name, lastName) {
        this.id = clientsId;
        clientsId++;
        this.dni = dni;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.creditCards = [];
        this.savingsBanks = [];
        //Otra opción es crear la primer caja de ahorro acá directamente... SAVINGBANKS = CAJA DE AHORRO 
        //this.savingsBanks = [new SavingsBanks("ARS", 50000, "FIRMA.TIPO.ALIAS")]; 
    }

    /*20) Agregar a la clase Client un método para realizar “Compra – Venta de dólares”.
    a. La forma de llevar a cabo esto es utilizando el método de extracción en la caja de ahorros de
    una moneda y el método de ingreso en la caja de ahorros de la otra moneda, verificando
    qué respuesta dio cada método.
    b. Se debe calcular el equivalente del monto extraído en la moneda destino, utilizando una
    conversión.
    c. El valor de conversión debe ser una variable tipo const global con la cotización del dólar. Hay
    que recordar que las constantes no se declaran ni en camelCase ni en PascalCase, sino que
    se escriben con el formato ESTO_ES_UNA_CONSTANTE.
    d. El método recibe tres parámetros:
    i. Monto que se desea vender de la moneda origen.
    ii. ID de la caja de ahorro de la que se desea extraer el dinero.
    iii. ID de la caja de ahorro a la que se desea ingresar el dinero.
    e. El método automáticamente determina si es una operación de compra o de venta y en qué
    moneda está expresado el monto que se ingresa.
    f. Este método devuelve true si se pudo realizar la compra / venta y false en caso contrario.
    */

    buySellDollars(amount, idOrigin, idDestiny) {     //cilent[0].buySellDollars(100, 1, 2)
        const DOLAR_BLUE = 1150; // Ejemplo de cotización del dólar blue
        let originBank = this.savingsBanks.find(bank => bank.id === idOrigin);
        let destinyBank = this.savingsBanks.find(bank => bank.id === idDestiny);
        
        if (!originBank || !destinyBank) {
            return false; // No se encontró alguna de las cajas de ahorro
        }
        if (originBank.currency === "USD") {
            // Venta de dólares
            if (originBank.extractMoney(amount)) {
                let equivalent = amount * DOLAR_BLUE;
                return destinyBank.addMoney(equivalent); // Agregar el equivalente en la otra moneda
            }
        } else if (originBank.currency === "ARS") {
            // Compra de dólares
            let equivalent = amount / DOLAR_BLUE;
            if (destinyBank.addMoney(equivalent)) {
                return originBank.extractMoney(amount); // Extraer el monto en pesos
            }
        }
        return false; // No se pudo realizar la operación
    }   
}


const client = [];
client.push(new Client(48679870, "1234", "ivan","oshiro"))
client.push(new Client(1, "1", "nico","vazquez"))
client.push(new Client(11645123, "1231", "trava","lpopez"))
client.push(new Client(34091233, "1233", "x","d"))

// 27)
function convertDollars(idCliente, monto, idCajaOrigen, idCajaDestino) {
    let cliente = clients.find(c => c.id === idCliente);
    if (cliente) {
        return cliente.comprarVenderDolares(monto, idCajaOrigen, idCajaDestino);
    }
    return false;
}

