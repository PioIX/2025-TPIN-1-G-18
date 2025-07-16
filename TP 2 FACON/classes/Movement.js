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