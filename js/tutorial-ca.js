/*
 * «Com es juga» en català. Mateix format que js/tutorial-es.js.
 */
window.KRYPTIKOS_TUTORIAL = window.KRYPTIKOS_TUTORIAL || {};
window.KRYPTIKOS_TUTORIAL.ca = {
  title: 'Com es juga',
  lede: 'Tot el que necessites per resoldre el teu primer críptic. A cada exemple, prem els botons de colors per veure com es descompon la pista.',
  sections: [
    {
      id: 'que-es',
      title: 'Què és un críptic?',
      html: `
        <p>Un críptic és una pista de mots encreuats amb trampa. Es llegeix com una frase normal (de vegades una mica absurda), però amaga <strong>dos camins cap a la mateixa resposta</strong>:</p>
        <ol>
          <li>Una <strong>definició</strong> corrent, com a qualsevol mot encreuat.</li>
          <li>Un <strong>joc de paraules</strong> que construeix la resposta lletra a lletra.</li>
        </ol>
        <p>Com que les dues meitats porten a la mateixa paraula, quan l’encertes ho saps: tot encaixa. El número entre parèntesis indica quantes lletres té la resposta; si són diverses paraules veuràs una cosa com (4,5).</p>
        <p>La regla d’or: <strong>la definició sempre és al principi o al final de la pista</strong>, mai al mig.</p>`
    },
    {
      id: 'peces',
      title: 'Les tres peces',
      html: `
        <p>Gairebé totes les pistes es poden partir en tres tipus de peça:</p>
        <dl class="pieces">
          <dt><span class="tag tag-definicion">Definició</span></dt>
          <dd>Vol dir el mateix que la resposta. Pot ser un sinònim, una descripció o un exemple («un rèptil», «una estrella»).</dd>
          <dt><span class="tag tag-indicador">Indicador</span></dt>
          <dd>Et diu <em>què has de fer</em> amb el material: desordenar-lo, girar-lo, ficar una cosa dins d’una altra… Són paraules com «boig», «torna» o «dins».</dd>
          <dt><span class="tag tag-material">Material</span></dt>
          <dd>Les lletres amb què treballes. De vegades apareixen tal qual («Roma») i d’altres cal traduir-les primer («astre» → SOL, «litre» → L).</dd>
        </dl>
        <p>Entre les peces hi pot haver petites paraules d’enllaç («és», «fa», «amb», dos punts…) que només serveixen perquè la frase soni natural.</p>
        <p>Prem els botons per veure cada peça en aquest exemple:</p>`,
      examples: [
        {
          pista: 'Roma, tota trasbalsada, és estimació',
          respuesta: 'AMOR',
          definicion: ['estimació'], indicador: ['tota trasbalsada'], material: ['Roma'],
          explicacion: 'Les lletres de **ROMA**, trasbalsades (desordenades), formen **AMOR**: estimació.',
          viz: { type: 'rearrange', from: 'ROMA', to: 'AMOR' }
        }
      ],
      practice: {
        pista: 'Pera desfeta: progenitor',
        respuesta: 'PARE',
        definicion: ['progenitor'],
        explicacion: 'La definició és «progenitor». **PERA**, desfeta (desordenada), dona **PARE**.'
      }
    },
    {
      id: 'anagrama',
      title: 'Anagrama',
      html: `<p>Les lletres del material es reordenen per formar la resposta. L’indicador suggereix desordre, moviment, error o transformació. Truc: compta les lletres del possible material; si no coincideixen amb les de la resposta, no és un anagrama.</p>`,
      indicadores: ['boig', 'perdut', 'remenat', 'desfet', 'trasbalsat', 'barrejat', 'esbojarrat', 'trencat', 'nou', 'estrany'],
      examples: [
        {
          pista: 'Nota boja: mil quilos',
          respuesta: 'TONA',
          definicion: ['mil quilos'], indicador: ['boja'], material: ['Nota'],
          explicacion: '**NOTA** boja (desordenada) = **TONA**, mil quilos.',
          viz: { type: 'rearrange', from: 'NOTA', to: 'TONA' }
        }
      ]
    },
    {
      id: 'amagada',
      title: 'Paraula amagada',
      html: `<p>La resposta és escrita, tal qual, dins de la mateixa pista, saltant d’una paraula a una altra. Ignora els espais i busca. Una variant més retorçada: la paraula està amagada <em>al revés</em>.</p>`,
      indicadores: ['dins', 'amaga', 'conté', 'guarda', 'part de', 'una mica de', 'en'],
      examples: [
        {
          pista: 'Boig atac amaga un felí',
          respuesta: 'GAT',
          definicion: ['un felí'], indicador: ['amaga'], material: ['Boig atac'],
          explicacion: 'A «boi**G AT**ac» s’amaga **GAT**, un felí.',
          viz: { type: 'pick', text: 'boig atac', mode: 'hidden', answer: 'GAT' }
        }
      ]
    },
    {
      id: 'inversio',
      title: 'Inversió',
      html: `<p>El material es llegeix de dreta a esquerra.</p>`,
      indicadores: ['torna', 'fa tornar', 'al revés', 'de tornada', 'enrere', 'recula', 'gira'],
      examples: [
        {
          pista: 'Volum que torna: paraula',
          respuesta: 'MOT',
          definicion: ['paraula'], indicador: ['que torna'], material: ['Volum'],
          explicacion: 'Un volum = **TOM**; al revés: **MOT**, una paraula.',
          viz: { type: 'rearrange', from: 'TOM', to: 'MOT' }
        }
      ]
    },
    {
      id: 'contenidor',
      title: 'Contenidor',
      html: `<p>Una part del material es fica dins d’una altra (o, vist al revés, una envolta l’altra). Sovint cal traduir abans les peces.</p>`,
      indicadores: ['dins', 'dins de', 'abraça', 'envolta', 'acull', 'conté', 'rep', 'tanca'],
      examples: [
        {
          pista: 'Nota dins de casa: peça de roba',
          respuesta: 'CAMISA',
          definicion: ['peça de roba'], indicador: ['dins de'], material: ['Nota', 'casa'],
          explicacion: '**MI** (una nota musical) dins de **CASA**: CA·MI·SA = **CAMISA**, una peça de roba.',
          viz: { type: 'insert', outer: 'CASA', inner: 'MI', at: 2 }
        }
      ]
    },
    {
      id: 'xarada',
      title: 'Xarada',
      html: `<p>La resposta es construeix enganxant peces una darrere l’altra. De vegades hi ha un indicador d’unió i de vegades les peces simplement van seguides.</p>`,
      indicadores: ['i', 'amb', 'després de', 'davant de', 'més', 'seguit de', 'al costat de'],
      examples: [
        {
          pista: 'Fa voltes l’astre: flor',
          respuesta: 'GIRASOL',
          definicion: ['flor'], indicador: [], material: ['Fa voltes', 'l’astre'],
          explicacion: '**GIRA** (fa voltes) + **SOL** (l’astre) = **GIRASOL**, una flor.',
          viz: { type: 'join', parts: ['GIRA', 'SOL'] }
        }
      ]
    },
    {
      id: 'supressio',
      title: 'Supressió',
      html: `<p>Al material se li treu una lletra o un tros. Fixa’t en quina part: la primera lletra (el «cap»), l’última (la «cua») o la del mig (el «cor»).</p>`,
      indicadores: ['sense', 'perd', 'escapçat', 'sense cap', 'sense cua', 'sense final', 'sense cor', 'retallat'],
      examples: [
        {
          pista: 'Plat sense final: terreny llis',
          respuesta: 'PLA',
          definicion: ['terreny llis'], indicador: ['sense final'], material: ['Plat'],
          explicacion: '**PLAT** sense la lletra final = **PLA**, un terreny llis.',
          viz: { type: 'delete', word: 'PLAT', remove: [3] }
        }
      ]
    },
    {
      id: 'doble',
      title: 'Doble definició',
      html: `<p>Dues definicions diferents de la mateixa paraula, una darrere l’altra. No hi ha indicador ni material: solen ser les pistes més curtes i, sovint, les més traïdores.</p>`,
      examples: [
        {
          pista: 'Promontori que mana',
          respuesta: 'CAP',
          definicion: ['Promontori', 'que mana'], indicador: [], material: [],
          explicacion: 'Un **cap** és un promontori (el cap de Creus) i també qui mana.'
        }
      ]
    },
    {
      id: 'acrostic',
      title: 'Acròstic',
      html: `<p>Es prenen les primeres lletres (o, de vegades, les últimes) d’un grup de paraules seguides.</p>`,
      indicadores: ['al principi', 'd’entrada', 'inicialment', 'caps de', 'primeres', 'per començar', 'al final (últimes lletres)'],
      examples: [
        {
          pista: 'Sempre obre lliçons, d’entrada: astre',
          respuesta: 'SOL',
          definicion: ['astre'], indicador: ['d’entrada'], material: ['Sempre obre lliçons'],
          explicacion: 'Les inicials de **s**empre **o**bre **l**liçons formen **SOL**, un astre.',
          viz: { type: 'pick', text: 'sempre obre lliçons', mode: 'acrostic' }
        }
      ]
    },
    {
      id: 'homofon',
      title: 'Homòfon',
      html: `<p>La resposta sona igual que el material, encara que s’escrigui diferent. En català n’hi ha més que en castellà: b/v en molts parlars, vocals neutres, la hac muda…</p>`,
      indicadores: ['segons diuen', 'se sent', 'de sentida', 'en veu alta', 'sona com'],
      examples: [
        {
          pista: 'Elegeix un calçat, segons diuen',
          respuesta: 'VOTA',
          definicion: ['Elegeix'], indicador: ['segons diuen'], material: ['un calçat'],
          explicacion: 'Un calçat = BOTA, que en molts parlars sona igual que **VOTA** (elegeix).'
        }
      ]
    },
    {
      id: 'combinades',
      title: 'Pistes combinades',
      html: `
        <p>Les pistes difícils barregen mecanismes: una xarada en què una peça ha perdut la cua, una paraula amagada que a més és al revés, un anagrama ficat dins d’una altra paraula… Els críptics diaris de kryptikós són d’aquest nivell.</p>
        <p>Resol-les per parts: primer localitza la definició en un extrem, després separa la resta en peces i pregunta’t què fa cada paraula.</p>`
    },
    {
      id: 'trucs',
      title: 'Abreviatures i trucs',
      html: `
        <p>Moltes paraules de la pista es tradueixen a una o dues lletres. Algunes de freqüents:</p>
        <ul>
          <li><strong>Punts cardinals:</strong> nord N, sud S, est E, oest O.</li>
          <li><strong>Nombres romans:</strong> un I, cinc V, deu X, cinquanta L, cent C, cinc-cents D, mil M.</li>
          <li><strong>Notes musicals:</strong> DO, RE, MI, FA, SOL, LA, SI.</li>
          <li><strong>Símbols:</strong> litre L, metre M, gram G, ferro FE, or AU, plata AG.</li>
          <li><strong>Lletres pel seu nom:</strong> «erra» R, «ics» X, «hac» H.</li>
        </ul>
        <p><strong>Consells</strong></p>
        <ul>
          <li>Comença buscant la definició als extrems.</li>
          <li>Desconfia de les paraules que encaixen estrany a la frase: solen ser indicadors.</li>
          <li>Oblida el sentit de la frase: està escrita per despistar-te.</li>
          <li>Si dubtes entre dues respostes, la bona és la que explica <em>totes</em> les paraules de la pista.</li>
        </ul>`
    },
    { id: 'puntuacio', title: 'Pistes i puntuació', scoring: true }
  ]
};
