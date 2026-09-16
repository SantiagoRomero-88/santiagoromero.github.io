# Santiago Romero · Sitio profesional

Landing estática bilingüe, realizada con HTML5, CSS3 y JavaScript vanilla. No necesita npm, compilación, servidor de aplicaciones ni servicios externos. No se ha publicado ni creado un repositorio remoto.

## Previsualizar

Abre `index.html` con Edge, Chrome, Firefox o Safari actualizado. Conserva las carpetas junto al HTML. El selector ES/EN, los filtros y las fichas funcionan también con `file://`.

Opcionalmente, desde esta carpeta, con Python instalado:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Visita [la vista previa local](http://127.0.0.1:4173). Detén el servidor con `Ctrl+C`.

Los PDF se abren con el visor incorporado del navegador, que permite páginas y zoom. Algunos navegadores móviles o configuraciones locales no admiten PDF dentro de un iframe; cada documento ofrece también **Abrir en otra pestaña**. Las imágenes de las fichas se pueden abrir a tamaño completo. Los documentos originales están en español y no cambian al seleccionar EN; sí cambia toda la interfaz y la redacción de las fichas.

## Estructura

```text
index.html
css/styles.css
js/script.js
assets/
  img/santiago-romero.webp
  cv/santiago-romero-cv-es.pdf
  cv/santiago-romero-cv-en.pdf
  portfolio/
    luminotecnia/
    electrico/
    inventor/
    automatizacion/
data/projects.json
data/projects.js
scripts/sync-projects.py
.nojekyll
```

`CONTENIDO_CV.md`, `INVENTARIO_PORTAFOLIO.md` y `RESUMEN_ENTREGA.md` documentan las fuentes y decisiones. `tmp/` guarda la extracción y las comprobaciones locales. Los CVs, la fotografía y la carpeta originales permanecen intactos.

## Editar el contenido

- **Textos:** en `index.html`, cada texto traducible tiene `data-es` y `data-en`. Actualiza ambos atributos y el texto español que aparece entre las etiquetas. Así también se conserva una versión legible sin JavaScript.
- **Contacto:** actualiza tanto los enlaces del hero como los de Contacto. Correo usa `mailto:` y teléfono usa `tel:`.
- **Estética:** colores, anchura y espaciados están organizados en `css/styles.css`. La tipografía es del sistema; no se descargan fuentes externas.
- **Foto:** sustituye `assets/img/santiago-romero.webp`, manteniendo el nombre o cambiando el `src` en el HTML.
- **CV:** sustituye los dos archivos de `assets/cv/` conservando sus nombres.
- **Proyectos:** edita `data/projects.json`. Después ejecuta:

```sh
python scripts/sync-projects.py
```

Esto actualiza `data/projects.js`, una copia que evita las restricciones de `fetch()` al abrir archivos locales. **El sitio lee projects.js; después de editar el JSON hay que sincronizarlo.** No hace falta ejecutar el script para previsualizar o publicar la versión entregada.

Cada proyecto tiene `id`, `title`, `category`, `description`, `cover`, `gallery`, `documents`, `specs`, `notes` y `sources`. Los textos se guardan como `{"es": "Texto español", "en": "English text"}`. Las categorías válidas son `luminotecnia`, `electrico`, `inventor` y `automatizacion`; la interfaz muestra sus nombres completos. Usa rutas relativas con `/`, nombres sin acentos y sin espacios en los recursos nuevos. `sourcePage` indica la página de origen de una vista. `group` relaciona los isométricos de Wañoma Baja.

Los scripts `process_assets.py`, `curate_portfolio.py` y `complete_content.py` conservan la preparación inicial. **No los ejecutes después de editar tus textos o fichas**, porque regeneran la versión inicial. Solo `sync-projects.py` forma parte de la edición habitual; utiliza exclusivamente la biblioteca estándar de Python. La preparación de recursos requiere Pillow y pypdfium2.

## Publicar gratis en GitHub Pages

1. Crea o inicia sesión en tu cuenta de GitHub.
2. Crea un repositorio **público**, por ejemplo `portafolio`. Para una dirección personal corta, puedes usar `TU_USUARIO.github.io` como nombre del repositorio.
3. Extrae `sitio-para-publicar.zip` en una carpeta nueva. En el repositorio, usa **Add file → Upload files** y sube su contenido conservando las carpetas. `index.html` debe quedar en la raíz, no dentro de otra carpeta. Confirma la carga en `main`.
4. Abre **Settings → Pages**. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama **main**, carpeta **/(root)**, y pulsa **Save**.
6. Espera a que termine la publicación; en **Settings → Pages** aparecerá el enlace. Habitualmente será `https://TU_USUARIO.github.io/portafolio/`, o `https://TU_USUARIO.github.io/` para el repositorio personal.
7. Abre el enlace y prueba idiomas, filtros y descargas. Para actualizarlo, vuelve a subir los archivos modificados a la misma rama.

Referencia: [configurar la publicación en GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

El ZIP contiene solo los archivos del sitio y esta guía. Si prefieres subir manualmente desde el proyecto, selecciona `index.html`, `css/`, `js/`, `assets/`, `data/`, `.nojekyll`, `README.md` y `scripts/sync-projects.py`. Los materiales nativos PTAR, los originales duplicados y `tmp/` no son necesarios para alojarlo. Los enlaces son relativos y funcionan también bajo el nombre de un repositorio, sin ajustes.

## Alternativas rápidas

**Netlify:** extrae el ZIP y arrastra la carpeta que contiene `index.html` a [Netlify Drop](https://app.netlify.com/drop). La plataforma proporciona una dirección; inicia sesión para administrar el sitio y sus actualizaciones. No se requiere comando de build. Consulta la [guía oficial de Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).

**Vercel:** importa el repositorio del sitio, elige **Other** como framework, deja vacío el comando de build y usa `.` como directorio de salida si te lo solicita. Publica desde tu cuenta y copia la URL del despliegue. Consulta la [configuración oficial para sitios sin build](https://vercel.com/docs/builds/configure-a-build#output-directory).

## Pendientes y decisiones de contenido

- Tres fichas de tableros incluyen **[COMPLETAR]** para identificar el contexto o proyecto concreto.
- La planta de sal incluye **[COMPLETAR]** para nombrar los componentes cuyo diseño supervisó Santiago. Su participación general ya está aclarada.
- PTAR requiere exportaciones a PDF o imágenes de `PROGRAMACION PTAR.ap15` y `SIMULACION PTAR.sim15`. Se conservan los 134 archivos asociados en el material original; no se publican como proyectos renderizados.
- El enlace de LinkedIn se transcribió del CV; conviene comprobar desde la cuenta del titular que corresponde al perfil deseado.
- Las fechas laborales se conservan por años, como en los CVs. No se inventan meses ni se sustituye 2026 por «actualidad».
- En la foto se usó un tratamiento monocromo azul grisáceo y un marco circular. La segmentación automática por color no dio un contorno limpio y no se utiliza en el resultado.
- Los resultados de DIALux se muestran con sus fuentes y superficies de cálculo. Los valores de uniformidad cero se conservan. En el área verde, la memoria describe 4 W/m de tira LED y la lista del modelo indica 3.5 W; ambas referencias se aclaran en la ficha.

El detalle de cada extracción y los datos utilizados están en `RESUMEN_ENTREGA.md`.
