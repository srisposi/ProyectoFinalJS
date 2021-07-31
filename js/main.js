const tarjeta = document.querySelector('#tarjeta'),
	btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	formulario = document.querySelector('#formulario-tarjeta'),
	numeroTarjeta = document.querySelector('#tarjeta .numero'),
	nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	logoMarca = document.querySelector('#logo-marca'),
	firma = document.querySelector('#tarjeta .firma p'),
	mesExpiracion = document.querySelector('#tarjeta .mes'),
	yearExpiracion = document.querySelector('#tarjeta .year');
	ccv = document.querySelector('#tarjeta .ccv');

//Mostrar el frente de la tarjeta.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

//Rotación de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

//Botón para abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

//Select del mes generado dinámicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

//Select del año generado dinámicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

//Input número de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	//Se Eliminan espacios en blanco
	.replace(/\s/g, '')
	//Se Eliminan las letras
	.replace(/\D/g, '')
	//Espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	//Elimina el último espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	//Voltear tarjeta para que el usuario vea el frente.
	mostrarFrente();
});

//Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Jhon Doe';
	}

	mostrarFrente();
});

//Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

//Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

//CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	//Eliminar los espacios
	.replace(/\s/g, '')
	//Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});