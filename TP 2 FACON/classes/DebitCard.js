let debitsCardsId = 1;
let cardsNumbers = 1000000000000000;

class DebitCard{
    constructor(provider, emitionDate, securityCode, displayName) {
        this.id = debitsCardsId;
        debitsCardsId++;

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
    }
}
