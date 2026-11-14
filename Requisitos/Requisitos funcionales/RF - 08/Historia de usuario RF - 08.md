## Requisito Funcional 08 - Gestión de recursos de salud mental

RF08 - El sistema deberá permitir al administrador registrar nuevos materiales informativos, modificar los materiales registrados y eliminar de la consulta pública los materiales publicados.

## Historia de usuario

**Como** administrador del sistema, **quiero** subir, actualizar o eliminar recursos informativos, **para** mantener actualizado el repositorio de salud mental.

## Criterios de aceptación

**CA1 – Agregar material**
**Dado** que el administrador inició sesión y llenó los datos de un material nuevo,
**cuando** confirma la operación "Agregar",
**entonces** se muestra un mensaje con el resultado
**y** el material aparece en el catálogo público de materiales informativos (RF07).

**CA2 – Actualizar material**
**Dado** que existe un material registrado,
**cuando** el administrador modifica sus datos y confirma la operación "Actualizar",
**entonces** se muestra un mensaje con el resultado
**y** el catálogo público muestra la información nueva.

**CA3 – eliminar material**
**Dado** que existe un material publicado,
**cuando** el administrador confirma la operación "eliminar",
**entonces** se muestra un mensaje con el resultado
**y** el material deja de aparecer en el catálogo público.

**CA4 – Confirmar sin seleccionar material**
**Dado** que el administrador eligió actualizar o eliminar pero no seleccionó ningún material,
**cuando** confirma la operación,
**entonces** se muestra el mensaje "Se solicita que seleccione un material" y no se realiza ningún cambio.

**CA5 – Cancelar la operación**
**Dado** que el administrador inició una operación de agregar, actualizar o eliminar,
**cuando** la cancela antes de confirmarla,
**entonces** no se aplica ningún cambio.

**CA6 – Material ya no disponible**
**Dado** que un material fue retirado mientras el administrador lo tenía seleccionado,
**cuando** intenta actualizarlo o eliminarlo,
**entonces** se informa que el material no está disponible y el listado se actualiza.

**CA7 – Solo el administrador puede gestionar**
**Dado** que una persona no ha iniciado sesión como administrador,
**cuando** intenta entrar al módulo de gestión de materiales,
**entonces** el sistema no le permite el acceso.
