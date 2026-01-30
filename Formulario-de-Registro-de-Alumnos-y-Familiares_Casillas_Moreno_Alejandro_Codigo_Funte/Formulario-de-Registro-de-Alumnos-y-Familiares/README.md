# Formulario de Registro de Alumnos y Familiares - Práctica RA5

Este proyecto consiste en el desarrollo de un formulario web avanzado para el alta de alumnos, implementado con **HTML5, CSS3 y JavaScript**. El sistema utiliza patrones de diseño de software y validaciones estrictas para asegurar la integridad de los datos.

Asignatura: **Desarrollo Web en Entorno Cliente (DWEC)**.

## 📋 Características Técnicas

El proyecto cumple con los siguientes requisitos de la rúbrica:

* [cite_start]**Patrón de Diseño Builder:** Utilizado para la construcción paso a paso del objeto `Alumno` complejo[cite: 92].
* [cite_start]**Prototipos (Prototypes):** Definición de métodos y estructuras en las clases JavaScript para optimizar memoria[cite: 94].
* [cite_start]**Carga Dinámica (AJAX/Fetch):** Los desplegables (Idiomas, Países, Ciudades) se llenan automáticamente consumiendo un archivo `datos.json` externo[cite: 83].
* **Validación con Expresiones Regulares (Regex):**
    * [cite_start]**NIF:** Valida formato de 8 números y letra correcta[cite: 89].
    * [cite_start]**Código Postal:** Valida formato numérico exacto de 5 dígitos[cite: 90].
* [cite_start]**Resumen en Modal:** Generación dinámica de una ventana emergente con el resumen de los datos introducidos[cite: 98].

## 🚀 Instalación y Ejecución

Debido a que el proyecto utiliza `fetch` para cargar el archivo JSON, **no funcionará si abres el archivo `index.html` directamente** (protocolo `file://`) por políticas de seguridad CORS de los navegadores.

### Opción A: Visual Studio Code (Recomendada)
1.  Abre la carpeta del proyecto en VS Code.
2.  Instala la extensión **Live Server**.
3.  Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.

### Opción B: Servidor Local (Python)
Si tienes Python instalado, abre una terminal en la carpeta del proyecto y ejecuta:
```bash
python -m http.server 8000