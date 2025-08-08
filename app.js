// Arrays
let amigos = [];        // Lista de participantes
let asignaciones = [];  // Lista con las parejas sorteadas

// Agregar un amigo
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya fue agregado.");
        return;
    }

    amigos.push(nombre);
    mostrarLista();
    input.value = "";
}

// Mostrar lista de amigos en pantalla
function mostrarLista() {
    const ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";

    amigos.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        ul.appendChild(li);
    });
}

// Sortear amigo secreto
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Agrega al menos dos personas para hacer el sorteo.");
        return;
    }

    asignaciones = [];
    let copia = [...amigos];

    // Mezclar
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    // Evitar que alguien se asigne a sí mismo
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i] === copia[i]) {
            return sortearAmigo();
        }
    }

    // Guardar resultados en el array
    for (let i = 0; i < amigos.length; i++) {
        asignaciones.push({
            persona: amigos[i],
            amigoSecreto: copia[i]
        });
    }

    mostrarSelector();
}

// Mostrar selector para que cada persona vea su asignación
function mostrarSelector() {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <label for="jugador">Selecciona tu nombre:</label>
        <select id="jugador">
            <option value="">-- Elige tu nombre --</option>
            ${amigos.map(nombre => `<option value="${nombre}">${nombre}</option>`).join("")}
        </select>
        <button onclick="verAmigo()">Ver mi amigo secreto</button>
        <p id="mensaje"></p>
    `;
}

// Mostrar el amigo secreto de la persona seleccionada
function verAmigo() {
    const select = document.getElementById("jugador");
    const nombreSeleccionado = select.value;
    const mensajeP = document.getElementById("mensaje");

    if (!nombreSeleccionado) {
        mensajeP.textContent = "Por favor, selecciona tu nombre.";
        return;
    }

    const asignacion = asignaciones.find(a => a.persona === nombreSeleccionado);
    mensajeP.textContent = `🎁 Tu amigo secreto es: ${asignacion.amigoSecreto}`;
}