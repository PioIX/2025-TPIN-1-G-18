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
}

client[1].savingsBanks[0].debitCards.push(new DebitCard("American Express", new Date("6,10,2025"),1941,"IVAN OSHIRO"))
client[1].savingsBanks[1].debitCards.push(new DebitCard("American Express", new Date("6,10,2022"),1941,"IVAN OSHIRO"))
client[3].savingsBanks[0].debitCards.push(new DebitCard("VISA", new Date("1,4,2023"),892,"NICOLAS FACON"))
client[0].savingsBanks[0].debitCards.push(new DebitCard("MASTERCARD", new Date("5,9,2025"),123,"TRAVA LOPEZ"))
client[2].savingsBanks[0].debitCards.push(new DebitCard("American Express", new Date("4,10,2024"),2412,"LIONEL MESSI"))

// 30)
function addMovementToDebitCard(idTarjeta, name, monto, fecha) {
    let tarjeta = findDebitCardsSpecific(idTarjeta);
    if (tarjeta) {
        return tarjeta.registrarMovimiento(name, monto, fecha);
    }
    return false;
}
