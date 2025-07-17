let savingsBanksId = 1;
//Es un número único de 22 dígitos que identifica la cuenta
let cbuCounter = 1000000000000000000000;

class SavingsBank{
    //Ponemos el límite como último parámetro para no tener que ingresarlo si está en USD.
    //Pero si le pasamos 0 no hay problema.
    constructor(currency, alias, limit) {
        this.id = savingsBanksId;
        savingsBanksId++;
        this.currency = currency;
        this.balance = 0;
        if(currency == "ARS") {
            this.limit = limit;
            this.overdraft = 0;
        }
        this.debitCards = [];
        this.movements = [];
        this.alias = alias;
        //Lo tratamos como ID para que no se repitan.
        this.cbu = cbuCounter;
        cbuCounter++;
    }

    /*
        18) Agregar a la clase SavingsBank un método para extraer dinero de una caja de ahorros de la cuenta
        bancaria.
        a. El método recibe como parámetro el monto que se desea retirar.
        b. En caso de que se desee retirar dinero de una caja de ahorros en dólares se debe verificar
        que haya saldo suficiente antes de hacer la extracción.
        c. En caso de que se desee retirar de una caja de ahorro en pesos se debe verificar una de
        estas condiciones:
        i. Hay saldo suficiente para realizar la extracción.
        ii. La suma del saldo existente + el descubierto NO utilizado no supera el monto que se
        desea extraer.
        En caso de usarlo se debe modificar el valor del descubierto utilizado para futuras
        extracciones.

        d. Este método devuelve true si se pudo realizar la extracción y false en caso contrario. */

        extractMoney(amount)  { // para que ande "client[0].savingsBanks[0].extractMoney(100)"

            if (this.currency === "USD") {
                if (this.balance >= amount) {
                    this.balance -= amount;
                    this.movements.push(new Movement("Extraccion USD", amount));
                    return true;
                } else {
                    return false;
                }
            } else if (this.currency === "ARS") {
                let diferencia = this.limit - this.overdraft; // dif = limite - sobrante
                if (this.balance >= amount) {
                    this.balance -= amount;
                    this.movements.push(new Movement("Extraccion ARS", amount));
                    return true;
                } else if (this.balance +  diferencia >= amount && diferencia >= 0) {  // si la dif > cantidad a extraer y la dif es positiva y a esto le sumas el balance
                    this.overdraft += (amount - this.balance); // se agrega la dif al sobregiro
                    this.balance = 0; // hace que el balance sea 0
                    this.movements.push(new Movement("Extraccion ARS", amount));
                    return true;
                } else {
                    return false;
                }
            }
            return false; 
        }

    /*
    19)
    Agregar a la clase SavingsBank un método para ingresar dinero a una caja de ahorros de la cuenta
    bancaria.
    a. El método recibe como parámetro el monto que se desea ingresar.
    b. Si se ingresa dinero a una caja de ahorro en pesos, y de la misma se había utilizado el
    descubierto, se usa la plata para saldar parcial o totalmente el descubierto otorgado
    primero. Si sobra plata, se la suma al balance de la caja de ahorro.
    c. Este método devuelve el saldo que hay en la caja de ahorro luego de haber realizado el
    ingreso de dinero o -1 si no se puede ingresar dinero.
    */
    // 

  depositMoney(amount) {  
    // Si el monto es 0 o negativo, no se puede hacer un depósito
    if (amount <= 0) {
        return -1; // Retorna -1 para indicar que es inválido
    }

    // Si la moneda de la caja es en dólares (USD)
    if (this.currency === "USD") {
        this.balance += amount; // Suma el monto al saldo (balance)
        this.movements.push(new Movement("Deposito USD", amount)); 
        // Registra el movimiento como un depósito en dólares
        return this.balance; // Devuelve el nuevo saldo
    } 
    
    // Si la moneda de la caja es en pesos (ARS)
    else if (this.currency === "ARS") {
        // Verifica si hay descubierto (overdraft), es decir, deuda
        if (this.overdraft > 0) {
            const cubierto = Math.min(this.overdraft, amount); 
            // Calcula cuánto del depósito va para cubrir la deuda (el menor entre el monto y el descubierto)
            this.overdraft -= cubierto; 
            // Resta lo que se cubrió del descubierto
            this.balance += (amount - cubierto); 
            // El resto (si hay) se suma al saldo
        } else {
            this.balance += amount; // Si no hay deuda, se suma todo el monto al saldo
        }

        this.movements.push(new Movement("Deposito ARS", amount)); 
        // Registra el movimiento como un depósito en pesos
        return this.balance; // Devuelve el nuevo saldo
    } 
    
    else {
        return -1; // Si la moneda no es ni USD ni ARS, devuelve error
    }
    }


    /*21) Agregar a las clases SavingsBank, CreditCard y DebitCard un método para registrar un movimiento
    realizado.
    a. El método recibe tres o cuatro parámetros:
        i. El nombre del tercero involucrado en el movimiento.
        ii. El monto del movimiento realizado (puede ser positivo o negativo, depende de si fue
        un gasto o una acreditación de dinero).
        iii. La fecha del movimiento.
        iv. En caso de ser un movimiento con tarjeta de crédito, la cantidad de cuotas.
    b. Por cada movimiento que se realice en una tarjeta de crédito se debe sumar el monto al
    parámetro "saldo" de la tarjeta de crédito correspondiente.
    c. En caso de tarjetas (tanto débito como crédito) se debe verificar que la tarjeta no esté
    vencida antes de intentar registrar un movimiento.
    d. Este método devuelve true si se almacena el movimiento y false en caso contrario.
    */

    addMovement(thirdPartyName, amount, date, cuotes) { 
    // client[0].savingsBanks[0].addMovement("Tercero", 100, "2023-10-01", 3)
    if (amount === 0 || !thirdPartyName || !date) {
        return false; 
    }
    // Se crea un nuevo movimiento con los datos provistos
    let movement = new Movement(thirdPartyName, amount, cuotes);
    // Se agrega el movimiento a la lista de movimientos de esta cuenta
    this.movements.push(movement);
    // Si la cuenta es en dólares
    if (this.currency === "USD") {
        // Se suma el monto al saldo directamente
        this.balance += amount;
    } else if (this.currency === "ARS") {
        // Si la cuenta es en pesos
        this.balance += amount; // Se suma el monto al saldo
        // Si hay descubierto y el nuevo balance aún no lo cubre
        if (this.overdraft > 0 && this.balance < 0) {
            // Se incrementa el descubierto usado con el saldo negativo actual
            this.overdraft += Math.abs(this.balance);
            // Y el balance vuelve a cero (ya que no alcanza para cubrir todo el descubierto)
            this.balance = 0;
        }
    }

    // Si todo salió bien, se devuelve true
    return true;
}
}


client[0].savingsBanks.push(new SavingsBank("ARS","aliaschino",100000))
client[1].savingsBanks.push(new SavingsBank("ARS","travialias",1000000))
client[1].savingsBanks.push(new SavingsBank("USD","quechugaalias",10000))
client[3].savingsBanks.push(new SavingsBank("ARS","faconalias",100000000))
client[2].savingsBanks.push(new SavingsBank("ARS","matialias",100000000))


// 24)
function extractMoneyFromSavingsBank(idCaja, monto) {
    let caja = findSavingBankById(idCaja);
    if (caja) {
        return caja.extraer(monto);
    }
    return false;
}

// 25)
function depositMoneyToSavingsBank(idCaja, monto) {
    let caja = findSavingBankById(idCaja);
    if (caja) {
        return caja.ingresar(monto);
    }
    return false;
}

// 30)
function addMovementToDebitCard(idTarjeta, name, monto, fecha) {
    let tarjeta = findDebitCardsSpecific(idTarjeta);
    if (tarjeta) {
        return tarjeta.registrarMovimiento(name, monto, fecha);
    }
    return false;
}
