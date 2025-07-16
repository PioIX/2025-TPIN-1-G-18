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
        //Otra opción es crear la primer caja de ahorro acá directamente...
        //this.savingsBanks = [new SavingsBanks("ARS", 50000, "FIRMA.TIPO.ALIAS")];
    }
}

let clients=[]
clients.push(new Client(48111111,0,"N","V"));
clients.push(new Client(48111112,0,"T","L"));
clients.push(new Client(48111113,0,"S","R"));
clients.push(new Client(48111114,0,"I","O"));