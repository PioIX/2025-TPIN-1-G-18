const ui = {
    getLoginDni: () => document.getElementById("loginDni").value.trim(),
    getLoginPassword: () => document.getElementById("loginPassword").value.trim(),

    mostrarNombreUsuario: (nombre) => {
        document.getElementById("usuario-logueado").innerText = `Hola, ${nombre}`;
    },

    limpiarLogin: () => {
        document.getElementById("loginDni").value = "";
        document.getElementById("loginPassword").value = "";
    },

    mostrarCuentas: (idClient) => {
        const cuentas = findSavingsBanks(idClient);
        const contenedor = document.getElementById("accounts");
        const cards = cuentas.map(cuenta => {
            return `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card shadow-sm h-100">
                        <div class="card-body">
                            <h5 class="card-title">Caja de Ahorro en ${cuenta.currency}</h5>
                            <p class="card-text mb-1"><strong>Moneda:</strong> ${cuenta.currency}</p>
                            <p class="card-text mb-1"><strong>Saldo:</strong> ${cuenta.currency === 'USD' ? 'U$D' : '$'} ${cuenta.balance}</p>
                            ${cuenta.currency === 'ARS' ? `<p class="card-text mb-1"><strong>Descubierto:</strong> $${cuenta.overdraft}/${cuenta.limit}</p>` : ""}
                            <p class="card-text mb-1"><strong>Alias:</strong> ${cuenta.alias}</p>
                            <p class="card-text mb-3"><strong>CBU:</strong> ${cuenta.cbu}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
        contenedor.querySelector(".row").innerHTML = cards;
    },

    mostrarError: (msg) => alert("⚠️ " + msg),
};