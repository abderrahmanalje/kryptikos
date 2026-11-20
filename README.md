# kryptikós

Crípticos diarios en español y en catalán. Web estática: HTML, CSS y JavaScript sin dependencias ni paso de compilación.

## Abrirla

- **Doble clic en `index.html`**: funciona directamente desde el disco.
- O con un servidor local:

  ```bash
  python3 -m http.server 8123
  ```

  y abre <http://localhost:8123>.

## Estructura

```
index.html            página única (rutas con #/es/…, #/ca/…)
css/styles.css        estilos «Tinta y papel» (modo claro y oscuro)
fonts/                Fraunces e Instrument Sans, alojadas en el propio sitio
data/puzzles-es.js    crípticos en español
data/puzzles-ca.js    críptics en català
js/i18n.js            textos de la interfaz en los dos idiomas
js/tutorial-es.js     «Cómo se juega» (texto + ejemplos interactivos)
js/tutorial-ca.js     «Com es juga»
js/widgets.js         resaltado, animaciones, ejemplos, tutorial
js/app.js             rutas, juego, puntuación, rachas, archivo
```

## Añadir un críptico

Añade un objeto al final de `data/puzzles-es.js` o `data/puzzles-ca.js` (el formato está explicado al principio del archivo):

```js
{
  id: 'es-014', fecha: '2026-11-21',
  pista: 'Galería alborotada causa felicidad',
  respuesta: 'ALEGRÍA', tipo: 'anagram',
  definicion: ['felicidad'], indicador: ['alborotada'], material: ['Galería'],
  explicacion: 'Las letras de **GALERÍA**, alborotadas, forman **ALEGRÍA**.'
}
```

- Cada día se muestra el críptico cuya `fecha` es hoy. Si no hay ninguno, se muestra el último publicado.
- Los de fecha futura no se ven hasta su día, así que puedes programarlos con antelación.
- `definicion`, `indicador` y `material` deben ser trozos **literales** de la pista. Si alguno no se encuentra, aparece un aviso en la consola del navegador.
- No cambies el `id` de un críptico ya publicado: el progreso se guarda con él.
- `dificultad`: `facil`, `dificil` o `ultra`. Se muestra como etiqueta en la pista y en el archivo.

## Probar y empezar de cero

El **modo pruebas** está escondido. Muestra también los crípticos de días futuros y el botón **Borrar mi progreso** (puntos, rachas y respuestas de los dos idiomas en ese navegador). Se entra de dos formas:

- Pulsando **5 veces seguidas el logo κ kryptikós**.
- Añadiendo `?pruebas` a la dirección, por ejemplo `https://abderrahmanalje.github.io/kryptikos/?pruebas#/es/archivo`.

Dentro, el Archivo muestra un aviso con los botones **Salir del modo pruebas** y **Borrar mi progreso**. Fuera del modo pruebas no se ve ninguno de los dos.

Para comprobar los crípticos tras editarlos (que cada trozo resaltado esté en la pista, que los anagramas cuadren…), en la consola del navegador no debe aparecer ningún aviso `[kryptikós]`.

## Al publicar cambios

En `index.html` los archivos llevan un número de versión (`app.js?v=8`). Súbelo (`?v=9`, `?v=10`…) cada vez que publiques cambios, para que los navegadores descarguen la versión nueva en lugar de usar la que tienen guardada.

## Diseño

- Colores en variables al principio de `css/styles.css`: blanco cálido `#FAF8F3`, tinta `#111111`, acento cobalto `#2541E8` y amarillo marcador `#F2C230`. El modo oscuro usa gris muy oscuro (`#141413`), no negro puro.
- Por defecto sigue el modo claro u oscuro del sistema. El botón sol/luna de la cabecera lo fija y se recuerda en ese navegador (clave `kryptikos:theme`).
- Tipografías: **Fraunces** para títulos y pistas, **Instrument Sans** para la interfaz.

## Puntuación

Se ajusta en `js/app.js` (constante `PEN`). La página «Cómo se juega» se actualiza sola.

| Ayuda | Puntos |
|---|---|
| Resaltar definición | −20 |
| Resaltar indicador | −15 |
| Resaltar material | −15 |
| Revelar una letra | −8 |
| Respuesta incorrecta | −5 |

Se parte de 100 y el mínimo al resolver es 10. Rendirse da 0. La racha cuenta los días seguidos resolviendo el críptico del día en su propio día.

El progreso se guarda en `localStorage` del navegador (clave `kryptikos:v1`).

## Llevarla al homelab

Al ser estática, basta con servir la carpeta. Por ejemplo, con Docker y nginx:

```bash
docker run -d --name kryptikos -p 8080:80 -v "$(pwd)":/usr/share/nginx/html:ro nginx:alpine
```

Con Caddy: `file_server` apuntando a esta carpeta.
