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
}