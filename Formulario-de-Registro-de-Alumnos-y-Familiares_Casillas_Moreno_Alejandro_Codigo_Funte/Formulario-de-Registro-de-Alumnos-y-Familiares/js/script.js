// ==========================================
// 1. CLASES Y BUILDER (Patrón Builder y Prototype)
// ==========================================

function Alumno() {
    this.nombre = '';
    this.apellidos = '';
    this.nif = '';
    this.lenguaMaterna = '';
    this.idiomasConocidos = [];
    this.familiares = [];
    this.direccion = null;
    this.datosAcademicos = null;
    this.informacionMedica = null;
}

Alumno.prototype.mostrarResumen = function() {
    return `
        <h2>Resumen del Alumno</h2>
        <h3>1. Datos del Alumno</h3>
        <p><strong>Nombre:</strong> ${this.nombre} ${this.apellidos}</p>
        <p><strong>NIF:</strong> ${this.nif}</p>
        <p><strong>Lengua materna:</strong> ${this.lenguaMaterna}</p>
        <p><strong>Idiomas conocidos:</strong> ${this.idiomasConocidos.join(", ") || "Ninguno"}</p>
        
        <h3>2. Familiar Asociado</h3>
        ${this.familiares.map(f => `
            <div style="margin-left:15px; border-left:2px solid #ccc; padding-left:10px;">
                <p><strong>Nombre:</strong> ${f.nombre} ${f.apellidos}</p>
                <p><strong>Profesión:</strong> ${f.profesion}</p>
                <p><strong>Idiomas:</strong> ${f.idiomasConocidos.join(", ") || "Ninguno"}</p>
            </div>
        `).join('')}
        
        <h3>3. Dirección</h3>
        <p>${this.direccion.direccionCompleta}, ${this.direccion.poblacion} (${this.direccion.ciudad}) - ${this.direccion.pais}</p>
        
        <h3>4. Académico</h3>
        <p><strong>Nivel Alcanzado:</strong> ${this.datosAcademicos.nivelAlcanzado}</p>
        <p><strong>Idiomas Estudiados:</strong> ${this.datosAcademicos.idiomasEstudiados.join(", ") || "Ninguno"}</p>
        
        <h3>5. Médico</h3>
        <p><strong>Alergias:</strong> ${this.informacionMedica.alergias.join(", ") || "Ninguna"}</p>
    `;
};

// Builder
function AlumnoBuilder() { this.alumno = new Alumno(); }
AlumnoBuilder.prototype.setDatosPersonales = function(n, a, nif, lm, ic) {
    this.alumno.nombre = n; this.alumno.apellidos = a; this.alumno.nif = nif;
    this.alumno.lenguaMaterna = lm; this.alumno.idiomasConocidos = ic; return this;
};
AlumnoBuilder.prototype.addFamiliar = function(f) { this.alumno.familiares.push(f); return this; };
AlumnoBuilder.prototype.setDireccion = function(d) { this.alumno.direccion = d; return this; };
AlumnoBuilder.prototype.setDatosAcademicos = function(da) { this.alumno.datosAcademicos = da; return this; };
AlumnoBuilder.prototype.setInformacionMedica = function(im) { this.alumno.informacionMedica = im; return this; };
AlumnoBuilder.prototype.build = function() { return this.alumno; };

// Clases de Datos Auxiliares
function Familiar(n, a, nif, p, cn, lm, ic) { 
    this.nombre = n; this.apellidos = a; this.nif = nif; this.profesion = p; 
    this.ciudadNacimiento = cn; this.lenguaMaterna = lm; this.idiomasConocidos = ic; 
}
function Direccion(p, c, pob, dir, cp) { 
    this.pais = p; this.ciudad = c; this.poblacion = pob; this.direccionCompleta = dir; this.codigoPostal = cp; 
}
function DatosAcademicos(col, na, ie, ns) { 
    this.colegio = col; this.nivelAlcanzado = na; this.idiomasEstudiados = ie; this.nivelSolicitado = ns; 
}
function InformacionMedica(al, med) { this.alergias = al; this.medicacion = med; }


// ==========================================
// 2. GESTOR DE FORMULARIO (DOM)
// ==========================================

function GestorFormulario() {}

GestorFormulario.prototype.rellenarSelect = function(lista, idElemento) {
    const select = document.getElementById(idElemento);
    if (!select || !lista) return;
    const primera = select.options[0];
    select.innerHTML = '';
    if(primera) select.appendChild(primera);
    
    lista.forEach(item => {
        const op = document.createElement("option");
        op.value = (typeof item === 'object') ? item.nombre : item;
        op.textContent = op.value;
        select.appendChild(op);
    });
};

GestorFormulario.prototype.generarCheckboxes = function(lista, idContenedor, nombreGrupo) {
    const box = document.getElementById(idContenedor);
    if (!box) { console.error("ID no encontrado en HTML:", idContenedor); return; }
    if (!lista) { console.error("Lista vacía para:", nombreGrupo); return; }

    box.innerHTML = ""; // Limpiar
    lista.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "opcion-checkbox";
        const val = (typeof item === 'object') ? item.nombre : item;
        
        div.innerHTML = `
            <input type="checkbox" id="${nombreGrupo}_${i}" name="${nombreGrupo}" value="${val}">
            <label for="${nombreGrupo}_${i}">${val}</label>
        `;
        box.appendChild(div);
    });
};

GestorFormulario.prototype.gestionarUbicacion = function(datosUbi) {
    const pais = document.getElementById("pais");
    const ciudad = document.getElementById("ciudad");
    const poblacion = document.getElementById("poblacion");

    // Llenar Paises
    datosUbi.forEach(p => {
        let op = document.createElement("option");
        op.value = p.pais; op.textContent = p.pais;
        pais.appendChild(op);
    });

    pais.addEventListener("change", function() {
        ciudad.innerHTML = '<option value="">Seleccione Ciudad</option>';
        poblacion.innerHTML = '<option value="">Seleccione Población</option>';
        const pData = datosUbi.find(p => p.pais === this.value);
        if (pData) {
            pData.ciudad.forEach(c => {
                let op = document.createElement("option");
                op.value = c.nombre; op.textContent = c.nombre;
                ciudad.appendChild(op);
            });
        }
    });

    ciudad.addEventListener("change", function() {
        poblacion.innerHTML = '<option value="">Seleccione Población</option>';
        const pData = datosUbi.find(p => p.pais === pais.value);
        const cData = pData.ciudad.find(c => c.nombre === this.value);
        if (cData) {
            cData.poblacion.forEach(pop => {
                let op = document.createElement("option");
                op.value = pop; op.textContent = pop;
                poblacion.appendChild(op);
            });
        }
    });
};

// --- Funciones de Validación Globales---

function esNifValido(nif) {
    // Regex simple para formato: 8 números + Letra (mayúscula o minúscula)
    const regexNIF = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    return regexNIF.test(nif);
}

function esCodigoPostalValido(cp) {
    // Regex: Exactamente 5 dígitos numéricos
    const regexCP = /^\d{5}$/;
    return regexCP.test(cp);
}


// ==========================================
// 3. CARGA DE DATOS (JSON)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const gestor = new GestorFormulario();

    fetch('data/datos.json') // Asegúrate de que la ruta sea correcta según tu carpeta
        .then(r => r.json())
        .then(datos => {
            console.log("JSON cargado:", datos);

            // SECCION 1: ALUMNO
            gestor.rellenarSelect(datos.IdiomasConocidosAlumno, "lenguamaternaalumno");
            gestor.generarCheckboxes(datos.IdiomasConocidosAlumno, "checkboxesidiomasalumno", "idiomasAlumno");

            // SECCION 2: FAMILIAR
            gestor.rellenarSelect(datos.Profesiones, "profesionFamiliar");
            gestor.rellenarSelect(datos.ciudadnacimento, "ciudadnacimientofamiliar");
            gestor.rellenarSelect(datos.IdiomasConocidosFamiliares, "lenguamaternafamiliar");
            gestor.generarCheckboxes(datos.IdiomasConocidosFamiliares, "checkboxesidiomasfamiliar", "idiomasFamiliar");

            // SECCION 3: DIRECCION
            gestor.gestionarUbicacion(datos.Ubicaciones);

            // SECCION 4: ACADEMICO
            gestor.rellenarSelect(datos.NiveldeEstudio, "nivelAlcanzado");
            gestor.rellenarSelect(datos.NiveldeEstudio, "nivelSolicitado");
            gestor.generarCheckboxes(datos.IdiomasEstudiados, "checkboxesidiomasestudiados", "idiomasEstudiados");

            // SECCION 5: MEDICO
            gestor.generarCheckboxes(datos.Alergias, "checkboxesalergias", "alergias");
        })
        .catch(e => console.error("Error JSON:", e));
});


// ==========================================
// 4. ENVIO Y VALIDACION (AQUÍ ESTÁ LA LÓGICA MOVIDA)
// ==========================================
document.getElementById("formularioOficial").addEventListener("submit", function(e) {
    e.preventDefault();

    // Helper para coger valores checkboxes
    const getC = (n) => Array.from(document.querySelectorAll(`input[name="${n}"]:checked`)).map(x => x.value);

    // --- A. VALIDACIÓN CON REGEX (Requisito PDF) ---
    const nifAlumno = document.getElementById("nifalumno").value;
    const nifFamiliar = document.getElementById("niffamiliar").value;
    const cp = document.getElementById("codigoPostal").value;

    if (!esNifValido(nifAlumno)) {
        alert("El NIF del Alumno no tiene un formato válido (8 números y letra).");
        return; // Detiene el envío
    }

    if (!esNifValido(nifFamiliar)) {
        alert("El NIF del Familiar no tiene un formato válido.");
        return;
    }

    if (!esCodigoPostalValido(cp)) {
        alert("El Código Postal debe contener exactamente 5 números.");
        return;
    }

    // --- B. VALIDACIÓN DE CHECKBOXES ---
    if (getC("idiomasAlumno").length === 0) return alert("Selecciona idiomas del alumno");
    if (getC("idiomasFamiliar").length === 0) return alert("Selecciona idiomas del familiar");
    if (getC("idiomasEstudiados").length === 0) return alert("Selecciona idiomas estudiados");


    // --- C. CONSTRUCCIÓN DEL OBJETO (BUILDER) ---
    const familiar = new Familiar(
        document.getElementById("nombrefamiliar").value,
        document.getElementById("apellidosfamiliar").value,
        document.getElementById("niffamiliar").value,
        document.getElementById("profesionFamiliar").value,
        document.getElementById("ciudadnacimientofamiliar").value,
        document.getElementById("lenguamaternafamiliar").value,
        getC("idiomasFamiliar")
    );

    const direccion = new Direccion(
        document.getElementById("pais").value,
        document.getElementById("ciudad").value,
        document.getElementById("poblacion").value,
        document.getElementById("direccionTexto").value,
        document.getElementById("codigoPostal").value
    );

    const datosAcad = new DatosAcademicos(
        document.getElementById("colegioProcedencia").value,
        document.getElementById("nivelAlcanzado").value,
        getC("idiomasEstudiados"),
        document.getElementById("nivelSolicitado").value
    );

    const infoMed = new InformacionMedica(
        getC("alergias"),
        document.getElementById("medicacion").value
    );

    // Usando el Builder
    const alumno = new AlumnoBuilder()
        .setDatosPersonales(
            document.getElementById("nombrealumno").value,
            document.getElementById("apellidosalumno").value,
            document.getElementById("nifalumno").value,
            document.getElementById("lenguamaternaalumno").value,
            getC("idiomasAlumno")
        )
        .addFamiliar(familiar)
        .setDireccion(direccion)
        .setDatosAcademicos(datosAcad)
        .setInformacionMedica(infoMed)
        .build();

    console.log("FICHA GENERADA:", alumno);
    
    // --- D. MOSTRAR MODAL ---
    let modal = document.getElementById("modalResumen");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modalResumen";
        modal.className = "modal"; 
        modal.innerHTML = '<div class="modal-contenido" style="background:white; padding:20px; margin:10% auto; width:80%; border:1px solid #888;"><span onclick="document.getElementById(\'modalResumen\').style.display=\'none\'" style="float:right; cursor:pointer; font-size:28px;">&times;</span><div id="resumenTexto"></div></div>';
        document.body.appendChild(modal);
    }
    document.getElementById("resumenTexto").innerHTML = alumno.mostrarResumen();
    modal.style.display = "block";
});