# LongCont — contexto y decisiones

Última actualización: 8 de septiembre de 2026.

## Proyecto

- Sitio estático de LongCont hecho con HTML, CSS y JavaScript sin framework ni backend.
- Archivo principal: `index.html`.
- Estilos principales: `styles.css`.
- Comportamiento del inicio: `script.js`.
- Recursos locales: carpeta `image/`.
- Existe una copia de seguridad hermana del proyecto en `E:\Lcont-Website 2`.

## Figma

- Archivo: `https://www.figma.com/design/sCk0DLqg4EC8wu4xJCPr1x/Web-Site--LCont`.
- Se conectó Figma mediante MCP.
- Frames relevantes ya consultados:
  - `HOME - LongCont` (`1:6`).
  - `NAV - Página de navegación` (`1:85`).
  - `NAV-BUSQUEDA - Overlay` (`1:145`).
  - `inicio-de-sesion` (`17:91`).
  - `registro` (`17:170`).

## Lo implementado

- Barra del inicio con logo, buscador y botón de sesión.
- Menú completo abierto por el ícono de tres líneas.
  - Se cierra con ×, Escape, clic fuera o al elegir un enlace.
  - Sus enlaces coinciden con los bloques de Inicio.
- Overlay de búsqueda con sugerencias y foco automático en el campo.
- Novedades organizadas en cuatro tarjetas: Noticia, Economía, Educación y Salud.
  - Son noticias actuales de China con foto, resumen, fecha y enlace externo "Ver más".
  - El botón usa el mismo estilo que Participación.
- Información está organizada en tres bloques temáticos, con tres tarjetas cada uno:
  - **China Tradicional:** Historia, Cultura y Festivales.
  - **China Moderna:** Economía, Gastronomía y Turismo.
  - **Culturas Populares:** Celebridades, Programas y Cine y TV.
  - Las tarjetas son subtítulos de cada bloque. Cada subtítulo y su botón "Ver más información" llevan a una página HTML propia.
- Participación contiene Voluntariado, Nuestros Departamentos y Origen de la ONG, enlazados desde el menú.
- Sobre Nosotros se enlaza desde el menú como "Quiénes Somos".

## Sesión y registro

- Se creó `login.html`, `login.css` y `login.js`.
  - Los botones "Iniciar Sesión" de Inicio apuntan a `login.html`.
  - Incluye validación del navegador, mostrar/ocultar contraseña, recordarme, recuperación, Google y enlace a registro.
- Se creó `registro.html`, `registro.css` y `registro.js`.
  - Incluye nombre, email, contraseña, confirmación, aceptación de términos y botón de Google.
  - `login.html` enlaza correctamente a esta página.
- Para esta pasantía sin servidor: registro e inicio de sesión funcionan solo en el navegador mediante `localStorage`. Las contraseñas se guardan como hash SHA-256 (con una alternativa local básica para navegadores que no expongan Web Crypto) y la sesión local redirige a `panel.html`.
- Limitación importante: no es un sistema seguro de producción, no se sincroniza entre dispositivos ni permite recuperación de contraseña. No usar para datos reales o sensibles.

## Panel con navegación lateral

- Se creó `panel.html`, `panel.css` y `panel.js`, basados en la estructura previamente vista del frame de Figma `navegacion-sidebar`.
- Es una página independiente del sitio público: incluye sidebar, botón para contraerlo, menú móvil, cabecera de usuario, bienvenida y accesos directos.
- El panel requiere una sesión local y tiene botón "Cerrar sesión". Se puede probar registrando una cuenta desde `registro.html`.
- El sidebar tiene una única sección "Publicaciones": reúne la creación y la lista de contenidos guardados. Guarda publicaciones locales con título, categoría, descripción e imagen opcional (máximo 1 MB) en `localStorage`.
- `novedades.html` fue reconstruida como página pública y muestra las publicaciones guardadas en el panel, solo dentro del mismo navegador. Usa `novedades.css` y `novedades.js`.
- El sidebar ya no tiene Novedades, Información ni Cultura. Se agregó Calendario, con una vista estática de septiembre de 2026 y próximos eventos de demostración.

## Archivos de iconos de Figma agregados

- `image/figma-eye.svg`, `image/figma-google.svg` para login.
- `image/figma-reg-eye.svg`, `image/figma-reg-check.svg`, `image/figma-reg-google.svg` para registro.

## Próximos pasos sugeridos

1. Probar en navegador el menú, la búsqueda, los botones desplegables de Información, login y registro.
2. Elegir un backend/proveedor de autenticación para que registro e inicio de sesión funcionen con cuentas reales.
3. Reemplazar o renovar periódicamente las noticias de Novedades y sus enlaces a fuentes.
4. Definir páginas internas para cada categoría si se desea no depender de enlaces externos.
