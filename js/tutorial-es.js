/*
 * «Cómo se juega» en español.
 * Los ejemplos usan el mismo formato que los crípticos y, además, un campo opcional `viz`
 * para la animación de letras:
 *   { type: 'rearrange', from, to }          anagramas e inversiones
 *   { type: 'pick', text, mode, answer }     mode: 'hidden' | 'hiddenRev' | 'acrostic'
 *   { type: 'insert', outer, inner, at }     contenedores (at = posición donde entra)
 *   { type: 'join', parts: [...] }           charadas
 *   { type: 'delete', word, remove: [...] }  supresiones (posiciones que se quitan, desde 0)
 */
window.KRYPTIKOS_TUTORIAL = window.KRYPTIKOS_TUTORIAL || {};
window.KRYPTIKOS_TUTORIAL.es = {
  title: 'Cómo se juega',
  lede: 'Todo lo que necesitas para resolver tu primer críptico. En cada ejemplo, pulsa los botones de colores para ver cómo se descompone la pista.',
  sections: [
    {
      id: 'que-es',
      title: '¿Qué es un críptico?',
      html: `
        <p>Un críptico es una pista de crucigrama con trampa. Se lee como una frase normal (a veces un poco absurda), pero esconde <strong>dos caminos hacia la misma respuesta</strong>:</p>
        <ol>
          <li>Una <strong>definición</strong> corriente, como en cualquier crucigrama.</li>
          <li>Un <strong>juego de palabras</strong> que construye la respuesta letra a letra.</li>
        </ol>
        <p>Como las dos mitades llevan a la misma palabra, cuando aciertas lo sabes: todo encaja. El número entre paréntesis indica cuántas letras tiene la respuesta; si son varias palabras verás algo como (4,5).</p>
        <p>La regla de oro: <strong>la definición siempre está al principio o al final de la pista</strong>, nunca en medio.</p>`
    },
    {
      id: 'piezas',
      title: 'Las tres piezas',
      html: `
        <p>Casi todas las pistas se pueden partir en tres tipos de pieza:</p>
        <dl class="pieces">
          <dt><span class="tag tag-definicion">Definición</span></dt>
          <dd>Significa lo mismo que la respuesta. Puede ser un sinónimo, una descripción o un ejemplo («un militar», «el final del día»).</dd>
          <dt><span class="tag tag-indicador">Indicador</span></dt>
          <dd>Te dice <em>qué hacer</em> con el material: desordenarlo, darle la vuelta, meter una cosa dentro de otra… Son palabras como «loco», «vuelve» o «dentro de».</dd>
          <dt><span class="tag tag-material">Material</span></dt>
          <dd>Las letras con las que trabajas. A veces aparecen tal cual («jamón») y otras hay que traducirlas primero («astro» → SOL, «litro» → L).</dd>
        </dl>
        <p>Entre las piezas puede haber pequeñas palabras de enlace («es», «da», «con», dos puntos…) que solo sirven para que la frase suene natural.</p>
        <p>Pulsa los botones para ver cada pieza en este ejemplo:</p>`,
      examples: [
        {
          pista: 'Religiosa con jamón echado a perder',
          respuesta: 'MONJA',
          definicion: ['Religiosa'], indicador: ['echado a perder'], material: ['jamón'],
          explicacion: 'Las letras de **JAMÓN**, «echadas a perder» (desordenadas), forman **MONJA**: una religiosa.',
          viz: { type: 'rearrange', from: 'JAMON', to: 'MONJA' }
        }
      ],
      practice: {
        pista: 'Mora alterada: pasión',
        respuesta: 'AMOR',
        definicion: ['pasión'],
        explicacion: 'La definición es «pasión». **MORA**, alterada (desordenada), da **AMOR**.'
      }
    },
    {
      id: 'anagrama',
      title: 'Anagrama',
      html: `<p>Las letras del material se reordenan para formar la respuesta. El indicador sugiere desorden, movimiento, error o transformación. Truco: cuenta las letras del posible material; si no coinciden con las de la respuesta, no es un anagrama.</p>`,
      indicadores: ['loco', 'perdido', 'revuelto', 'alborotado', 'echado a perder', 'roto', 'mezclado', 'nuevo', 'extraño', 'en desorden'],
      examples: [
        {
          pista: 'Sacó, revuelto, un lío',
          respuesta: 'CAOS',
          definicion: ['un lío'], indicador: ['revuelto'], material: ['Sacó'],
          explicacion: '**SACO** revuelto = **CAOS**, un lío. Los acentos se ignoran.',
          viz: { type: 'rearrange', from: 'SACO', to: 'CAOS' }
        }
      ]
    },
    {
      id: 'oculta',
      title: 'Palabra oculta',
      html: `<p>La respuesta está escrita, tal cual, dentro de la propia pista, saltando de una palabra a otra. Ignora los espacios y busca. Una variante más retorcida: la palabra está escondida <em>al revés</em>.</p>`,
      indicadores: ['en', 'dentro de', 'esconde', 'oculta', 'guarda', 'parte de', 'algo de', 'contiene'],
      examples: [
        {
          pista: 'Roedor escondido para tapar',
          respuesta: 'RATA',
          definicion: ['Roedor'], indicador: ['escondido'], material: ['para tapar'],
          explicacion: 'En «pa**RA TA**par» se esconde **RATA**, un roedor.',
          viz: { type: 'pick', text: 'para tapar', mode: 'hidden', answer: 'RATA' }
        }
      ]
    },
    {
      id: 'inversion',
      title: 'Inversión',
      html: `<p>El material se lee de derecha a izquierda.</p>`,
      indicadores: ['vuelve', 'devuelve', 'al revés', 'de vuelta', 'retrocede', 'hacia atrás', 'regresa'],
      examples: [
        {
          pista: 'Los, al revés, dan una estrella',
          respuesta: 'SOL',
          definicion: ['una estrella'], indicador: ['al revés'], material: ['Los'],
          explicacion: '**LOS** al revés = **SOL**, una estrella.',
          viz: { type: 'rearrange', from: 'LOS', to: 'SOL' }
        }
      ]
    },
    {
      id: 'contenedor',
      title: 'Contenedor',
      html: `<p>Una parte del material se mete dentro de otra (o, visto al revés, una rodea a la otra). A menudo hay que traducir antes las piezas.</p>`,
      indicadores: ['dentro de', 'en', 'abraza', 'rodea', 'guarda', 'acoge', 'recibe', 'encierra'],
      examples: [
        {
          pista: 'Costoso con una erre dentro: vehículo',
          respuesta: 'CARRO',
          definicion: ['vehículo'], indicador: ['dentro'], material: ['Costoso', 'una erre'],
          explicacion: '**COSTOSO** = CARO. Con una **R** dentro: CAR·R·O = **CARRO**, un vehículo.',
          viz: { type: 'insert', outer: 'CARO', inner: 'R', at: 3 }
        }
      ]
    },
    {
      id: 'charada',
      title: 'Charada',
      html: `<p>La respuesta se construye pegando piezas una detrás de otra, como en las charadas de toda la vida. A veces hay un indicador de unión y a veces las piezas van simplemente seguidas.</p>`,
      indicadores: ['y', 'con', 'junto a', 'tras', 'después de', 'antes de', 'más', 'seguido de'],
      examples: [
        {
          pista: 'Da vueltas el astro: flor',
          respuesta: 'GIRASOL',
          definicion: ['flor'], indicador: [], material: ['Da vueltas', 'el astro'],
          explicacion: '**GIRA** (da vueltas) + **SOL** (el astro) = **GIRASOL**, una flor.',
          viz: { type: 'join', parts: ['GIRA', 'SOL'] }
        }
      ]
    },
    {
      id: 'supresion',
      title: 'Supresión',
      html: `<p>Al material se le quita una letra o un trozo. Fíjate en qué parte: la primera letra (la «cabeza»), la última (la «cola») o la del centro (el «corazón»).</p>`,
      indicadores: ['sin', 'pierde', 'falto de', 'descabezado', 'sin cola', 'sin final', 'sin corazón', 'recortado'],
      examples: [
        {
          pista: 'Unir en matrimonio, sin final: hogar',
          respuesta: 'CASA',
          definicion: ['hogar'], indicador: ['sin final'], material: ['Unir en matrimonio'],
          explicacion: 'Unir en matrimonio = **CASAR**; sin la letra final: **CASA**, el hogar.',
          viz: { type: 'delete', word: 'CASAR', remove: [4] }
        }
      ]
    },
    {
      id: 'doble',
      title: 'Doble definición',
      html: `<p>Dos definiciones distintas de la misma palabra, una detrás de otra. No hay indicador ni material: suelen ser las pistas más cortas y, a menudo, las más traicioneras.</p>`,
      examples: [
        {
          pista: 'Ilumina y empuja el barco',
          respuesta: 'VELA',
          definicion: ['Ilumina', 'empuja el barco'], indicador: [], material: [],
          explicacion: 'Una **vela** ilumina (la de cera) y empuja el barco (la de tela).'
        }
      ]
    },
    {
      id: 'acrostico',
      title: 'Acróstico',
      html: `<p>Se toman las primeras letras (o, a veces, las últimas) de un grupo de palabras seguidas.</p>`,
      indicadores: ['al principio', 'inicialmente', 'cabezas de', 'primeras', 'para empezar', 'al final (últimas letras)'],
      examples: [
        {
          pista: 'Al principio sale otra luz: estrella',
          respuesta: 'SOL',
          definicion: ['estrella'], indicador: ['Al principio'], material: ['sale otra luz'],
          explicacion: 'Las iniciales de **s**ale **o**tra **l**uz forman **SOL**, una estrella.',
          viz: { type: 'pick', text: 'sale otra luz', mode: 'acrostic' }
        }
      ]
    },
    {
      id: 'homofono',
      title: 'Homófono',
      html: `<p>La respuesta suena igual que el material, aunque se escriba distinto. En español son poco frecuentes (h muda, b/v, ll/y…), pero aparecen de vez en cuando.</p>`,
      indicadores: ['se oye', 'según dicen', 'de oído', 'en voz alta', 'suena a'],
      examples: [
        {
          pista: 'Movimiento del mar que suena a saludo',
          respuesta: 'OLA',
          definicion: ['Movimiento del mar'], indicador: ['suena a'], material: ['saludo'],
          explicacion: 'Un saludo = HOLA, que suena igual que **OLA** (la hache es muda).'
        }
      ]
    },
    {
      id: 'combinadas',
      title: 'Pistas combinadas',
      html: `
        <p>Las pistas difíciles mezclan mecanismos: una charada en la que una pieza ha perdido la cola, una palabra oculta que además está al revés, un anagrama metido dentro de otra palabra… Los crípticos diarios de kryptikós son de este nivel.</p>
        <p>Resuélvelas por partes: primero localiza la definición en un extremo, luego separa el resto en piezas y pregúntate qué hace cada palabra.</p>`
    },
    {
      id: 'trucos',
      title: 'Abreviaturas y trucos',
      html: `
        <p>Muchas palabras de la pista se traducen a una o dos letras. Algunas habituales:</p>
        <ul>
          <li><strong>Puntos cardinales:</strong> norte N, sur S, este E, oeste O.</li>
          <li><strong>Números romanos:</strong> uno I, cinco V, diez X, cincuenta L, cien C, quinientos D, mil M.</li>
          <li><strong>Notas musicales:</strong> DO, RE, MI, FA, SOL, LA, SI.</li>
          <li><strong>Símbolos:</strong> litro L, metro M, gramo G, hierro FE, oro AU, plata AG.</li>
          <li><strong>Letras por su nombre:</strong> «erre» R, «equis» X, «hache» H.</li>
        </ul>
        <p><strong>Consejos</strong></p>
        <ul>
          <li>Empieza buscando la definición en los extremos.</li>
          <li>Sospecha de las palabras que encajan raro en la frase: suelen ser indicadores.</li>
          <li>Olvida el sentido de la frase: está escrita para despistarte.</li>
          <li>Si dudas entre dos respuestas, la buena es la que explica <em>todas</em> las palabras de la pista.</li>
        </ul>`
    },
    { id: 'puntuacion', title: 'Pistas y puntuación', scoring: true }
  ]
};
