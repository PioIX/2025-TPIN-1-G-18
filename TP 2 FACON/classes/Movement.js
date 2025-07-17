let movementsId = 1;

class Movement{
    constructor(thirdPartyName, amount, cuotes) {
        this.id = movementsId;
        movementsId++;

        this.date = new Date();
        this.thirdPartyName = thirdPartyName;
        this.amount = amount;
        if(cuotes >= 1)
            this.cuotes = cuotes;
    }
}

//Si yo genero un movimiento de dèbito
new Movement("SUPERMERCADO", 1000);
//Si yo genero un movimiento de crèdito
new Movement("SUPERMERCADO", 1000, 3);
