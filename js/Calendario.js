const elementoMesAño = document.getElementById('mes-año');
const contenedorDias = document.getElementById('dias');
const botonAnterior = document.getElementById('anterior');
const botonSiguiente = document.getElementById('siguiente');

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// AQUÍ AGREGAS TUS FECHAS IMPORTANTES CON SU EMOJI REPRESENTATIVO
const eventosScout = [
    { fecha: '2026-09-15', titulo: 'Paseo de Tropa', emoji: '🥾' },
    { fecha: '2026-09-26', titulo: 'Junta de Grupo', emoji: '⚜️' },
    { fecha: '2026-10-10', titulo: 'Campamento Anual', emoji: '⛺' }
];

let fechaActual = new Date();

function renderizarCalendario() {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    elementoMesAño.textContent = `${meses[mes]} ${año}`;
    contenedorDias.innerHTML = '';

    const primerDiaSemana = new Date(año, mes, 1).getDay();
    const totalDiasMes = new Date(año, mes + 1, 0).getDate();

    // Espacios vacíos iniciales
    for (let i = 0; i < primerDiaSemana; i++) {
        const divVacio = document.createElement('div');
        divVacio.classList.add('vacio');
        contenedorDias.appendChild(divVacio);
    }

    const hoy = new Date();

    // Dibujar días
    for (let dia = 1; dia <= totalDiasMes; dia++) {
        const divDia = document.createElement('div');
        divDia.textContent = dia;

        // Formato AAAA-MM-DD para comparar fechas
        const mesFormateado = String(mes + 1).padStart(2, '0');
        const diaFormateado = String(dia).padStart(2, '0');
        const fechaString = `${año}-${mesFormateado}-${diaFormateado}`;

        // Resaltar hoy
        if (
            dia === hoy.getDate() &&
            mes === hoy.getMonth() &&
            año === hoy.getFullYear()
        ) {
            divDia.classList.add('hoy');
        }

        // Resaltar evento si existe en esta fecha
        const eventoEncontrado = eventosScout.find(e => e.fecha === fechaString);
        if (eventoEncontrado) {
            divDia.classList.add('evento');
            // Incluye el emoji en la etiqueta que se muestra al pasar el cursor (tooltip)
            const textoEmoji = eventoEncontrado.emoji ? `${eventoEncontrado.emoji} ` : '';
            divDia.title = `${textoEmoji}${eventoEncontrado.titulo}`;
        }

        contenedorDias.appendChild(divDia);
    }

    actualizarListaEventos(mes, año);
}

// Función para mostrar la lista por escrito abajo del calendario
function actualizarListaEventos(mes, año) {
    let contenedorLista = document.getElementById('lista-eventos');
    
    // Si no existe el contenedor de lista, lo crea dinámicamente
    if (!contenedorLista) {
        contenedorLista = document.createElement('div');
        contenedorLista.id = 'lista-eventos';
        contenedorLista.classList.add('lista-eventos');
        document.querySelector('.contenedor-calendario').appendChild(contenedorLista);
    }

    const mesFormateado = String(mes + 1).padStart(2, '0');
    const eventosDelMes = eventosScout.filter(e => e.fecha.startsWith(`${año}-${mesFormateado}`));

    if (eventosDelMes.length === 0) {
        contenedorLista.innerHTML = `<h3>Actividades del mes</h3><p style="font-size: 0.85rem; color: #888;">No hay eventos registrados para este mes.</p>`;
    } else {
        let htmlEventos = `<h3>Actividades del mes</h3><ul>`;
        eventosDelMes.forEach(e => {
            const diaNum = e.fecha.split('-')[2];
            const iconoEmoji = e.emoji ? `${e.emoji} ` : '';
            htmlEventos += `<li><span>${iconoEmoji}${e.titulo}</span> <strong>Día ${parseInt(diaNum)}</strong></li>`;
        });
        htmlEventos += `</ul>`;
        contenedorLista.innerHTML = htmlEventos;
    }
}

botonAnterior.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderizarCalendario();
});

botonSiguiente.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderizarCalendario();
});

renderizarCalendario();

/* Estilos CSS para el calendario:
⛺ Campamento: ⛺

🥾 Paseos / Excursiones: 🥾 o 🌲

⚜️ Junta de Grupo / Ceremonia: ⚜️

🪵 Fogata: 🪵 o 🔥

🎒 Caminata / Mochilazo: 🎒

🧭 Orientación / Guiado: 🧭 */