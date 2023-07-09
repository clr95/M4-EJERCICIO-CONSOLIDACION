        // Variables
        let presupuestoInicial = 0;
        let gastos = [];
    
        // Obtener elementos del DOM
        const presupuestoInput = document.getElementById("presupuesto");
        const btnPresupuesto = document.getElementById("btnPresupuesto");
        const gastadoElement = document.getElementById("gastado");
        const saldoElement = document.getElementById("saldo");
        const nombreGastoInput = document.getElementById("nombreGasto");
        const cantidadGastoInput = document.getElementById("cantidadGasto");
        const btnGasto = document.getElementById("btnGasto");
        const gastoActualizadoElement = document.getElementById("gastoActualizado");
        const valorElement = document.getElementById("valor");
    
// Calcular presupuesto al hacer clic en el botón "Calcular"
btnPresupuesto.addEventListener("click", function() {
  const presupuesto = Number(presupuestoInput.value);

  // Validar presupuesto vacío
  if (!presupuesto) {
    alert("Por favor, ingrese un valor válido para el presupuesto.");
    return;
  }

  presupuestoInicial = presupuesto;
  document.getElementById("presupuestado").textContent = presupuesto.toFixed(0);
  actualizarSaldo();
});

// Añadir gasto al hacer clic en el botón "Añadir Gasto"
btnGasto.addEventListener("click", function() {
  const nombreGasto = nombreGastoInput.value;
  const cantidadGasto = Number(cantidadGastoInput.value);

  // Validar presupuesto antes de añadir gasto
  if (!presupuestoInicial) {
    alert("Por favor, ingrese un presupuesto antes de añadir gastos.");
    return;
  }

  // Validar campos vacíos y valores negativos
  if (!nombreGasto.trim() || !cantidadGasto || cantidadGasto <= 0) {
    alert("Por favor, complete todos los campos y asegúrese de ingresar valores válidos.");
    return;
  }

  const gasto = {
    nombre: nombreGasto,
    cantidad: cantidadGasto
  };
  gastos.push(gasto);
  actualizarGastos();
  actualizarSaldo();
  nombreGastoInput.value = "";
  cantidadGastoInput.value = "";
});


// Actualizar lista de gastos
function actualizarGastos() {
  gastoActualizadoElement.innerHTML = "";
  valorElement.innerHTML = "";
  gastos.forEach((gasto, index) => {
    const gastoItem = document.createElement("li");
    gastoItem.textContent = gasto.nombre;

    const contenedorValor = document.createElement("div");
    contenedorValor.className = "d-flex align-items-center";

    const valorItem = document.createElement("li");
    valorItem.textContent = gasto.cantidad.toFixed(0);

    const iconoEliminar = document.createElement("img");
    iconoEliminar.src = "assets/img/trash-alt-regular.svg";
    iconoEliminar.className = "icono-eliminar";
    iconoEliminar.setAttribute("data-index", index);
    iconoEliminar.addEventListener("click", eliminarGasto);

    contenedorValor.appendChild(valorItem);
    contenedorValor.appendChild(iconoEliminar);

    gastoActualizadoElement.appendChild(gastoItem);
    valorElement.appendChild(contenedorValor);
  });
}

// Eliminar gasto al hacer clic en el ícono de papelera
function eliminarGasto(event) {
  const index = event.target.getAttribute("data-index");
  gastos.splice(index, 1);
  actualizarGastos();
  actualizarSaldo();
}

// Actualizar saldo
function actualizarSaldo() {
  const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  gastadoElement.textContent = totalGastado.toFixed(0);
  const saldo = presupuestoInicial - totalGastado;
  saldoElement.textContent = saldo.toFixed(0);
}