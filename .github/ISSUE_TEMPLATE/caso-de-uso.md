---
name: Caso de uso
about: Documentar un caso de uso del sistema con el formato de tabla del equipo
title: "CU: "
labels: documentation
assignees: ""
---

## Caso de uso

<!-- Llena la tabla. Puedes agregar o quitar filas en el flujo principal y en los flujos alternativos. -->

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | <!-- Ej. Login --> |
| **Código del Caso de Uso** | CU<!-- 01 --> |
| **Actor(es)** | <!-- Ej. Administrador general, administrador, contador --> |
| **Precondición** | <!-- Lo que debe cumplirse antes de iniciar. Ej. Que el usuario esté registrado... --> |

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1. | 1. |
| | 2. |
| | 3. |

### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **Flujo Alternativo 1** | 1) | 2) |
| **Flujo Alternativo 2** | 1) | 2) |

### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** | <!-- Estado del sistema al terminar. Ej. Actor logueado --> |
| **Frecuencia** | <!-- Ej. Siempre, diario, semanal, ocasional --> |
| **Importancia** | <!-- Por qué es importante. Ej. Proceso indispensable para autenticación --> |
| **Comentarios** | <!-- Opcional --> |

## Trazabilidad

- **Requisito(s) relacionado(s):** <!-- RF / RNF -->
- **Pantalla(s) / boceto(s):** <!-- opcional -->
- [ ] El caso de uso aparece en el diagrama (`docs/diagramas de casos de uso/`)

## Datos del trabajo

- **Responsable:** <!-- asígnate el issue o asígnalo a otro colaborador -->
- **Sprint:** <!-- 1 o 2 -->
- **Fecha límite:**
- **Rama:** `feature/casos-de-uso`

---

**Cuándo está terminado:** cuando el PR con `Closes #[número]` se integre a `main` y el Product Owner lo acepte.
