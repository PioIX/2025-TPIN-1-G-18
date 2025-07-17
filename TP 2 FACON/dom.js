class UserInterface {
    constructor() {

    }

    /**
     * Obtiene el texto ingresado en el input "DNI", sección "Login".
     * @returns String que contiene el DNI ingresado por el usuario.
     */
    getDni() {
        return document.getElementById("loginDni").value
    }

    /**
     * Obtiene el texto ingresado en el input "Contraseña", sección "Login".
     * @returns String que contiene la contraseña ingresada por el usuario.
     */
    getPassword() {
        return document.getElementById("loginPassword").value;
    }


    /**
     * Vacía el contenido de los inputs del login / registro.
     */
    clearLoginInputs() {
        document.getElementById("loginPassword").value = "";
        document.getElementById("loginDni").value = "";
    }



     /**
     * Si se está mostrando la pantalla de login la oculta y muestra el contenido. Y viceversa.
     */
    changeScreen() {
        const notepad = document.getElementById("notepad");
        const login = document.getElementById("login");

        if (notepad.style.display === "none") {
            notepad.style.display = "block"; // 
            login.style.display = "none";
        } else {
            notepad.style.display = "none";
            login.style.display = "block"; 
        }
    }   

    /**
     * Muestra el modal y le inserta los textos que se reciben como parámetros.
     * @param {String} title Título que se quiere mostrar en el modal.
     * @param {String} body Texto del cuerpo del modal.
     */
    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;

        const modal = new bootstrap.Modal('#modal', {
            keyboard: true,
            focus: true
        });

        modal.show();
    }



    /**
     * Dibuja una nueva nota en la parte inferior de la pantalla con DOM a partir de los datos ingresados.
     * @param {Number} id ID de la nueva nota.
     * @param {String} title Título de la nueva nota.
     * @param {String} content Contenido de la nueva nota.
     * @param {String} category Categoría de la nueva nota.
     */
    createNote(id, title, content, category) {
        document.getElementById("allNotes").innerHTML += `
            <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card shadow-sm h-100">
                        <div class="card-body">
                            <h5 class="card-title">Caja de Ahorro en Pesos</h5>
                            <p class="card-text mb-1"><strong>Moneda:</strong> ARS</p>
                            <p class="card-text mb-1"><strong>Saldo:</strong> $120.000</p>
                            <p class="card-text mb-1"><strong>Descubierto disponible:</strong> $5.000</p>
                            <p class="card-text mb-1"><strong>Descubierto usado:</strong> $2.000</p>
                            <p class="card-text mb-1"><strong>Alias:</strong> mi.cuenta.pesos</p>
                            <p class="card-text mb-3"><strong>CBU:</strong> 0123456789012345678901</p>
                            <div class="d-grid">
                                <button class="btn btn-outline-primary btn-sm">Ver movimientos</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }

}

const ui = new UserInterface()
