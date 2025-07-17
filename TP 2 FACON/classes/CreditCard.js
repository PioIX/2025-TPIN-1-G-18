let creditsCardsId = 1;

class CreditCard{
    constructor(provider, emitionDate, securityCode, displayName, closeDate, balanceExpirationDate) {
        this.id = creditsCardsId;
        creditsCardsId++;
        this.cardNumber = cardsNumbers;
        cardsNumbers++;
        //VISA, American Express, MasterCard, CABAL...
        this.provider = provider;
        //Para poder tener distintas fechas de vencimiento de tarjeta.
        this.expirationDate = emitionDate;
        this.expirationDate.setFullYear(this.expirationDate.getFullYear() + 5);

        //Solo para saber que existe
        this.securityCode = securityCode;
        //Ej: NICOLAS AGUST FACON o NICOLAS A FACON
        this.displayName = displayName;
        this.consumptions = [];
        this.balance = 0;
        //Si el cliente hace un pago que NO sea el total, modificamos el interes
        //Por ej, 1.1
        this.interest = 1;
        //Fecha hasta la cual se computan los gastos
        this.closeDate = closeDate;
        //Fecha en la que tengo que pagar la tarjeta.
        this.balanceExpirationDate = balanceExpirationDate;
    }

    addMovement(thirdPartyName, amount, date, cuotes) {
        if (amount === 0 || !thirdPartyName || !date) {
            return false; // No se puede registrar un movimiento sin monto o tercero
        }
        let movement = new Movement(thirdPartyName, amount, cuotes);
        this.movements.push(movement);
        
        if (this.currency === "USD") {
            this.balance += amount;
        } else if (this.currency === "ARS") {
            this.balance += amount;
            if (this.overdraft > 0 && this.balance < 0) {
                this.overdraft += Math.abs(this.balance);
                this.balance = 0;
            }
        }
        return true;
    }

    /* 22) Agregar a la clase CreditCard un método para registrar un pago que efectúa el cliente del saldo de la
    tarjeta de crédito.
    a. El método recibe el monto que el cliente desea abonar.
    b. El método devuelve:
        i. 1 si se realiza el pago solicitado por el cliente y no queda saldo en la tarjeta para
        pagar (o sea, si se realiza un pago por el monto total o más que el monto total).
        ii. 0 si se realiza el pago solicitado, pero aún queda saldo para pagar (por ejemplo,
        cuando el cliente quiere realizar un pago mínimo).
        iii. -1 si no se puede realizar el pago solicitado por el cliente.
    Esto sucede solamente si el cliente intenta abonar un monto menor al pago mínimo
    de la tarjeta. Para este TP, vamos a considerar que un pago mínimo es el 10% del
    saldo que se debe. */

    pay(amount) { // client[0].creditCards[0].pay(1000)
    // Si el monto es negativo o cero, no se puede pagar → devuelve -1
    if (amount <= 0) {
        return -1; 
    }
    // Se calcula el pago mínimo: 10% del saldo pendiente de la tarjeta
    let minimumPayment = this.balance * 0.1;
    // Si el cliente quiere pagar menos del mínimo → no se permite → devuelve -1
    if (amount < minimumPayment) {
        return -1; 
    }
    // Se descuenta el monto pagado del saldo pendiente
    this.balance -= amount; 
    //Si el saldo queda en cero o menos, el pago fue total o superior → devuelve 1
    if (this.balance <= 0) {
        this.balance = 0; // Evita que quede negativo
        return 1;         // Pago completo
    }
    // Si el saldo sigue siendo mayor a 0 → fue un pago parcial válido → devuelve 0
    return 0; 
}


 
}
client[0].creditCards.push(new CreditCard("VISA", new Date("10/07/2021"), 111, "IVAN OSHIRO", 25, 7))
client[1].creditCards.push(new CreditCard("VISA", new Date("10/07/2023"), 123, "NICOLAS VAZQUEZ", 25, 7))

// 28)
function payCreditCard(idTarjeta, monto) {
    let tarjeta = findCreditCardsSpecific(idTarjeta);
    if (tarjeta) {
        return tarjeta.pagarMonto(monto);
    }
    return false;
}

// 29)
function addMovementToCreditCard(idTarjeta, name, monto, fecha, cuotas = 1) {
    let tarjeta = findCreditCardsSpecific(idTarjeta);
    if (tarjeta) {
        return tarjeta.registrarMovimiento(name, monto, fecha, cuotas);
    }
    return false;
}
