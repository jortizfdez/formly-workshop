# Workshop: Desarrollo de Formularios Dinámicos con Formly

## Caso Práctico

Desde **Santander SCIB**, se nos ha solicitado desarrollar una herramienta para registrar los bugs que se producen en los diferentes proyectos tecnológicos. Dado que el alta de incidencias requiere manejar información variable y validaciones complejas, hemos decidido utilizar **Formly** para simplificar el desarrollo.

El cliente ha solicitado un formulario dividido en **5 secciones**: **Informador**, **Detalles**, **Entorno**, **Prioridad** y **Adjuntos**. A continuacion se detallan los requisitos de cada seccion:

---

## Requerimientos del Formulario

### **1. Informador**

Esta sección incluye los siguientes campos:

- **Número de empleado**:

  - **Type**: Texto.

  - **Required**: Sí.

  - **Validación**: Mínimo 3 caracteres y debe empezar por una 'N' o 'X'.

- **Email**:

  - **Type**: Texto.

  - **Required**: Sí.

  - **Validación**: Se requiere una validación, el texto introducido debe terminar en (`@gruposantander.es`).

- **Tipo de empleado**:

  - **Type**: Text.

  - **Oculto**: Sí **Número de empleado** no es un valor valido.

  - **Readonly**: Si **Número de empleado** valido.

  - **Valor**: Si **Número de empleado** empieza por N el valor será igual a `Interno` si no `Externo`

  - **Opciones**: Se recuperará la lista de roles de un servicio que contiene la funcion (`getRoles`).

- **Rol del informador**:

  - **Type**: Select.

  - **Required**: Sí.

  - **Options**: Se recuperará la lista de roles de un servicio que contiene la funcion (`getRoles`).

- **Asignar responsable**:

  - **Type**: Select.

  - **Required**: Sí, si el Rol no es igual a QA.

  - **Ocultar y resetear valor**: Si el Rol es igual a QA.

  - **Options**: Se deberá mostrar la siguiente lista de opciones:`[n1111, n2222]`.

  - **Readonly**: Si el Número de empleado coincide con alguna de las opciones.

  - **Valor**: Si el Número de empleado es igual a `n1111` o `n2222` se rellenará con uno de estos valores.

---

### **2. Detalles**

Esta sección incluye los siguientes campos:

- **Título**:

  - **Type**: Texto.

  - **Required**: Sí.

  - **Validación**: Mínimo 3 caracteres.

- **Descripción del bug**:

  - **Type**: Text-area..

  - **Required**: No.

  - **Validación**: Mínimo 50 caracteres.

  - **Mensaje de error personalizado**: “Se requiere al menos <<nºletras>> caracteres”.

  - **Nota** Crea un nuevo tipo de campo customizado llamado "text-area" con Formly usando el componente input Angular Material

- **Pasos para reproducirlo**:

  - **Type**: Text-area.

  - **Required**: Sí.

  - **Validación**: Mínimo 100 caracteres.

  - **Mensaje de error personalizado**: “Se requiere al menos <<nºletras>> caracteres”.

  - **Nota** Reutiliza el typo "text-area" creado en el paso anterior

- **Geografía**:

  - **Type**: Select.

  - **Required**: Sí.

  - **Readonly**: Si el switch **SCIB Global** está activado.

  - **Options**: `[ES, GB, PT, GLOBAL]`.

  - **Preasignar valor**: `GLOBAL` si el switch **SCIB Global** está activado.

---

### **3. Entorno**

Esta sección incluye los siguientes campos:

- **Aplicación**:

  - **Type**: Texto.

  - **Required**: Sí.

- **Entorno**:

  - **Type**: Select.

  - **Required**: Sí.

  - **Options**: `[PRO, PRE, DEV]`.

- **Categoría**:

  - **Type**: Select.

  - **Disabled**: Hasta que se seleccione un valor en Entorno.

  - **Readonly**: Si el entorno es `DEV`.

  - **Options**:

    - Si Entorno es `PRO`: `[CAT A, CAT B]`.

    - Si Entorno es `DEV`: Asignar valor `None`.

    - Si Entorno es `PRE`: `[CAT C, CAT D]`.

- **Cliente**:

  - **Type**: Switch.

  - **Valor por defecto**: Activado.

  - **Nota**: Crea un nuevo tipo de campo customizado llamado "switch" con Formly usando el componente Slide toggle de Angular Material

---

### **4. Prioridad**

Esta sección incluye los siguientes campos:

- **Severidad**:

  - **Type**: Select.

  - **Required**: Sí.

  - **Options**: `[Grave, Medio, Bajo]`.

  - **Readonly**: Si es una aplicación cliente y el Entorno es `PRO`.

  - **Autocompletar valor**: `Grave` si es una aplicación cliente y el Entorno es `PRO`.

- **Prioridad**:

  - **Type**: Select.

  - **Disabled**: Hasta que se complete el campo **Severidad**.

  - **Required**: Sí.

  - **Options**:

    - Si Severidad es `Grave`: `[Alta, Muy alta]`.

    - Si Severidad no es `Grave`: `[Alta, Muy alta, Media, No prioritario]`.

- **Notificar a equipo**:

  - **Type**: Checkbox.

  - **Oculto**: Si Prioridad no es igual a `Alta` o `Muy alta`.

  - **Valor por defecto**: Activado.

  - **Nota**: Crea un nuevo tipo de campo customizado llamado "Checkbox" con Formly usando el componente Checkbox de Angular Material

---

### **5. Información Adicional**

En esta seccion el usuario a pedido que el formulario se divida en dos acordeones.
En el primer acordeón el titulo será "Documentación", al desplegarse aparecerán los campos **Adjuntos** y **Número de adjuntos**
En un segundo acordeón se mostrará el titulo "Extra", al desplegarse aparecerá el campo **Enlace**.

Es obligatorio crear un wrapper con Formly llamado "acordeon", usando el componente Expansion Panel de Angular Material

- **Adjuntos**:

  - **Type**: Checkbox.

  - **Required**: Sí.

  - **Valor por defecto**: Activado.

  - **Nota**: Crea un nuevo tipo de campo customizado llamado "Checkbox" con Formly usando el componente Checkbox de Angular Material

- **Número de adjuntos**:

  - **Type**: Texto numérico.

  - **Oculto**: Si el checkbox **Adjuntos** está desactivado.

  - **Required**: Si el checkbox **Adjuntos** está activado.

  - **Validaciones**:

    - Mayor que 0.

    - Menor que 4.

  - **Mensajes de error**:

    - Si supera el máximo: “El máximo de adjuntos permitidos es 4”.

    - Si es menor que 1: “El mínimo de adjuntos es 1”.

- **Enlace**:

  - **Type**: Texto.

  - **Required**: Si el Entorno es `PRO`.

  - **Validación**: Debe comenzar con `https://`.

  - **Mensaje de error**: “URL no válida”.

---

## Requerimientos Generales

- Todos los campos requeridos deben mostrar el mensaje: **“Campo requerido”** si no son validos

- Se ha incluido el boton **reset** al finalizar todas las acciones se debera incluir la logica de Formly que permite resetear el valor de los formularios

- Ciertos campos de las secciones 4 y 5 dependen de los valores seleccionados en la sección 3. Hasta que no se llegue a la integración se puede utilizar o simular un valor por defecto

## Bonus (opcional)

- Si el switch **SCIB Global** está activado, todos los inputs deben tener un color rojo; de lo contrario, azul

- Utilizar el servicio de traducciones para que los label de cada campo cambien segun en idioma seleccionado

¡Manos a la obra! 🚀
