/*
 * Crípticos en ESPAÑOL
 * ---------------------------------------------------------------
 * Cada críptico:
 *   id          identificador único (no lo cambies una vez publicado: el progreso se guarda con él)
 *   fecha       AAAA-MM-DD: día en que es «el críptico del día». Los de fecha futura no se ven
 *               (salvo en modo pruebas: añade ?pruebas a la dirección).
 *   dificultad  facil | dificil | ultra
 *   pista       el texto de la pista, SIN el número de letras (se calcula solo)
 *   respuesta   la solución (los espacios separan palabras: "BAJO CERO" → (4,4))
 *   tipo        anagram | hidden | hiddenReversal | reversal | container | charade | deletion |
 *               double | acrostic | telestich | homophone | compound | letterplay
 *   definicion / indicador / material
 *               trozos LITERALES de la pista (se resaltan al pedir pistas).
 *               Lista vacía [] si la pista no tiene esa pieza.
 *   explicacion se muestra al resolver. **texto** = negrita.
 */
window.KRYPTIKOS_PUZZLES = window.KRYPTIKOS_PUZZLES || {};
window.KRYPTIKOS_PUZZLES.es = [
  {
    id: 'es-001', fecha: '2026-11-08', dificultad: 'dificil',
    pista: 'Capital que devuelve el cariño',
    respuesta: 'ROMA', tipo: 'reversal',
    definicion: ['Capital'], indicador: ['devuelve'], material: ['el cariño'],
    explicacion: '**El cariño** = AMOR. «Devuelve» indica que hay que leerlo al revés: **ROMA**, una capital.'
  },
  {
    id: 'es-002', fecha: '2026-11-09', dificultad: 'facil',
    pista: 'Poco caso oculta el final del día',
    respuesta: 'OCASO', tipo: 'hidden',
    definicion: ['el final del día'], indicador: ['oculta'], material: ['Poco caso'],
    explicacion: 'Dentro de «poc**O CASO**» se esconde **OCASO**, el final del día.'
  },
  {
    id: 'es-003', fecha: '2026-11-10', dificultad: 'dificil',
    pista: 'Ignorante, perdido, nacido junto al Plata',
    respuesta: 'ARGENTINO', tipo: 'anagram',
    definicion: ['nacido junto al Plata'], indicador: ['perdido'], material: ['Ignorante'],
    explicacion: '**IGNORANTE** con las letras desordenadas («perdido») da **ARGENTINO**: alguien nacido junto al Río de la Plata.'
  },
  {
    id: 'es-004', fecha: '2026-11-11', dificultad: 'dificil',
    pista: 'Espalda que pierde un litro: arma',
    respuesta: 'ESPADA', tipo: 'deletion',
    definicion: ['arma'], indicador: ['que pierde'], material: ['Espalda', 'un litro'],
    explicacion: '**ESPALDA** pierde la **L** (símbolo del litro): **ESPADA**, un arma.'
  },
  {
    id: 'es-005', fecha: '2026-11-12', dificultad: 'dificil',
    pista: 'Satélite: las urracas nocturnas aletean, al principio',
    respuesta: 'LUNA', tipo: 'acrostic',
    definicion: ['Satélite'], indicador: ['al principio'], material: ['las urracas nocturnas aletean'],
    explicacion: 'Las iniciales («al principio») de **l**as **u**rracas **n**octurnas **a**letean forman **LUNA**, el satélite.'
  },
  {
    id: 'es-006', fecha: '2026-11-13', dificultad: 'dificil',
    pista: 'Prenda con nota dentro de casa',
    respuesta: 'CAMISA', tipo: 'container',
    definicion: ['Prenda'], indicador: ['dentro de'], material: ['nota', 'casa'],
    explicacion: '**MI** (una nota musical) dentro de **CASA**: CA·MI·SA = **CAMISA**, una prenda.'
  },
  {
    id: 'es-007', fecha: '2026-11-14', dificultad: 'dificil',
    pista: 'Galería alborotada causa felicidad',
    respuesta: 'ALEGRÍA', tipo: 'anagram',
    definicion: ['felicidad'], indicador: ['alborotada'], material: ['Galería'],
    explicacion: 'Las letras de **GALERÍA**, alborotadas, forman **ALEGRÍA**, sinónimo de felicidad.'
  },
  {
    id: 'es-008', fecha: '2026-11-15', dificultad: 'dificil',
    pista: 'Asiento de cuentas corrientes',
    respuesta: 'BANCO', tipo: 'double',
    definicion: ['Asiento', 'de cuentas corrientes'], indicador: [], material: [],
    explicacion: 'Doble definición: un **banco** es un asiento y también la entidad donde se abren las cuentas corrientes. No hay indicador ni material.'
  },
  {
    id: 'es-009', fecha: '2026-11-16', dificultad: 'dificil',
    pista: 'Astro y cubo con puntos forman un militar',
    respuesta: 'SOLDADO', tipo: 'charade',
    definicion: ['un militar'], indicador: ['y', 'forman'], material: ['Astro', 'cubo con puntos'],
    explicacion: '**SOL** (astro) + **DADO** (cubo con puntos) = **SOLDADO**, un militar.'
  },
  {
    id: 'es-010', fecha: '2026-11-17', dificultad: 'ultra',
    pista: 'Terreno que, en parte, tira los dados de vuelta',
    respuesta: 'SOLAR', tipo: 'hiddenReversal',
    definicion: ['Terreno'], indicador: ['en parte', 'de vuelta'], material: ['tira los'],
    explicacion: 'En «ti**RA LOS**» se esconde (en parte) RALOS, que leído al revés («de vuelta») da **SOLAR**, un terreno. La imagen de los dados es solo una distracción.'
  },
  {
    id: 'es-011', fecha: '2026-11-18', dificultad: 'ultra',
    pista: 'Rostro y fruta de verano sin final: golosina',
    respuesta: 'CARAMELO', tipo: 'compound',
    definicion: ['golosina'], indicador: ['y', 'sin final'], material: ['Rostro', 'fruta de verano'],
    explicacion: '**CARA** (rostro) + **MELO** (MELÓN sin su última letra) = **CARAMELO**, una golosina.'
  },
  {
    id: 'es-012', fecha: '2026-11-19', dificultad: 'ultra',
    pista: 'Toro sin cola junto a hierba aromática: tempestad',
    respuesta: 'TORMENTA', tipo: 'compound',
    definicion: ['tempestad'], indicador: ['sin cola', 'junto a'], material: ['Toro', 'hierba aromática'],
    explicacion: '**TOR** (TORO sin la última letra, «sin cola») + **MENTA** (hierba aromática) = **TORMENTA**, una tempestad.'
  },
  {
    id: 'es-013', fecha: '2026-11-20', dificultad: 'facil',
    pista: 'Número y roedor: bandido del mar',
    respuesta: 'PIRATA', tipo: 'charade',
    definicion: ['bandido del mar'], indicador: ['y'], material: ['Número', 'roedor'],
    explicacion: '**PI** (un número) + **RATA** (un roedor) = **PIRATA**, bandido del mar.'
  },

  /* ---------- Tanda 2 ---------- */
  {
    id: 'es-014', fecha: '2026-11-21', dificultad: 'facil',
    pista: 'Rata loca: defecto',
    respuesta: 'TARA', tipo: 'anagram',
    definicion: ['defecto'], indicador: ['loca'], material: ['Rata'],
    explicacion: 'Las letras de **RATA**, locas (desordenadas), forman **TARA**, un defecto.'
  },
  {
    id: 'es-015', fecha: '2026-11-22', dificultad: 'dificil',
    pista: 'Cantor alterado: en oposición',
    respuesta: 'CONTRA', tipo: 'anagram',
    definicion: ['en oposición'], indicador: ['alterado'], material: ['Cantor'],
    explicacion: 'Las letras de **CANTOR**, alteradas, forman **CONTRA**: en oposición.'
  },
  {
    id: 'es-016', fecha: '2026-11-23', dificultad: 'dificil',
    pista: 'Rostro y verdura: lleva su casa a cuestas',
    respuesta: 'CARACOL', tipo: 'charade',
    definicion: ['lleva su casa a cuestas'], indicador: ['y'], material: ['Rostro', 'verdura'],
    explicacion: '**CARA** (rostro) + **COL** (verdura) = **CARACOL**, que lleva su casa a cuestas.'
  },
  {
    id: 'es-017', fecha: '2026-11-24', dificultad: 'ultra',
    pista: 'Cero escondido en cada noche, al revés',
    respuesta: 'NADA', tipo: 'hiddenReversal',
    definicion: ['Cero'], indicador: ['escondido en', 'al revés'], material: ['cada noche'],
    explicacion: 'En «c**ADA N**oche» se esconde ADAN, que leído al revés da **NADA**: cero.'
  },
  {
    id: 'es-018', fecha: '2026-11-25', dificultad: 'facil',
    pista: 'Canta jota y esconde un río',
    respuesta: 'TAJO', tipo: 'hidden',
    definicion: ['un río'], indicador: ['esconde'], material: ['Canta jota'],
    explicacion: 'En «can**TA JO**ta» se esconde **TAJO**, un río.'
  },
  {
    id: 'es-019', fecha: '2026-11-26', dificultad: 'dificil',
    pista: 'Felino que levanta coches',
    respuesta: 'GATO', tipo: 'double',
    definicion: ['Felino', 'que levanta coches'], indicador: [], material: [],
    explicacion: 'Doble definición: un **gato** es un felino y también la herramienta con la que se levanta el coche para cambiar una rueda.'
  },
  {
    id: 'es-020', fecha: '2026-11-27', dificultad: 'ultra',
    pista: 'Mano abierta abraza un anillo: ave de la paz',
    respuesta: 'PALOMA', tipo: 'container',
    definicion: ['ave de la paz'], indicador: ['abraza'], material: ['Mano abierta', 'un anillo'],
    explicacion: '**PALMA** (la mano abierta) abraza una **O** (un anillo, por su forma): PAL·O·MA = **PALOMA**, el ave de la paz.'
  },
  {
    id: 'es-021', fecha: '2026-11-28', dificultad: 'dificil',
    pista: 'Corriente al revés para escuchar',
    respuesta: 'OÍR', tipo: 'reversal',
    definicion: ['escuchar'], indicador: ['al revés'], material: ['Corriente'],
    explicacion: 'Una corriente de agua = **RÍO**; al revés: **OÍR**, escuchar.'
  },
  {
    id: 'es-022', fecha: '2026-11-29', dificultad: 'dificil',
    pista: 'Esponja rota: de Tokio, quizá',
    respuesta: 'JAPONÉS', tipo: 'anagram',
    definicion: ['de Tokio, quizá'], indicador: ['rota'], material: ['Esponja'],
    explicacion: 'Las letras de **ESPONJA**, rotas y recompuestas, forman **JAPONÉS**: alguien de Tokio, quizá.'
  },
  {
    id: 'es-023', fecha: '2026-11-30', dificultad: 'ultra',
    pista: 'Nota grave: pobreza extrema',
    respuesta: 'MISERIA', tipo: 'charade',
    definicion: ['pobreza extrema'], indicador: [], material: ['Nota', 'grave'],
    explicacion: '**MI** (una nota) + **SERIA** (grave) = **MISERIA**, pobreza extrema. La trampa es leer «nota grave» como un sonido bajo.'
  },
  {
    id: 'es-024', fecha: '2026-12-01', dificultad: 'facil',
    pista: 'Alimento básico da un oso',
    respuesta: 'PANDA', tipo: 'charade',
    definicion: ['un oso'], indicador: [], material: ['Alimento básico', 'da'],
    explicacion: '**PAN** (alimento básico) + **DA** = **PANDA**, un oso.'
  },
  {
    id: 'es-025', fecha: '2026-12-02', dificultad: 'dificil',
    pista: 'Piano sin corazón: árbol',
    respuesta: 'PINO', tipo: 'deletion',
    definicion: ['árbol'], indicador: ['sin corazón'], material: ['Piano'],
    explicacion: '**PIANO** pierde su letra central, la A («sin corazón»): **PINO**, un árbol.'
  },
  {
    id: 'es-026', fecha: '2026-12-03', dificultad: 'dificil',
    pista: 'Animal que, según se oye, va sobre el coche',
    respuesta: 'VACA', tipo: 'homophone',
    definicion: ['Animal'], indicador: ['según se oye'], material: ['va sobre el coche'],
    explicacion: 'Lo que va sobre el coche es la **BACA** (el portaequipajes del techo), que suena igual que **VACA**, el animal.'
  },
  {
    id: 'es-027', fecha: '2026-12-04', dificultad: 'ultra',
    pista: 'Té dentro del vehículo: lleva cartas',
    respuesta: 'CARTERO', tipo: 'container',
    definicion: ['lleva cartas'], indicador: ['dentro'], material: ['Té', 'vehículo'],
    explicacion: '**TE** dentro de **CARRO** (vehículo): CAR·TE·RO = **CARTERO**, el que lleva las cartas.'
  },
  {
    id: 'es-028', fecha: '2026-12-05', dificultad: 'dificil',
    pista: 'Hola, Sonia: escondes el oleaje',
    respuesta: 'OLAS', tipo: 'hidden',
    definicion: ['el oleaje'], indicador: ['escondes'], material: ['Hola, Sonia'],
    explicacion: 'En «h**OLA, S**onia» se esconde **OLAS**: el oleaje. La coma no cuenta.'
  },
  {
    id: 'es-029', fecha: '2026-12-06', dificultad: 'dificil',
    pista: 'Madrid, por ejemplo, es dinero',
    respuesta: 'CAPITAL', tipo: 'double',
    definicion: ['Madrid, por ejemplo', 'dinero'], indicador: [], material: [],
    explicacion: 'Doble definición: Madrid es una **capital** y el **capital** es también el dinero de una empresa o inversión.'
  },
  {
    id: 'es-030', fecha: '2026-12-07', dificultad: 'ultra',
    pista: 'Número y que engañe: condimento picante',
    respuesta: 'PIMIENTA', tipo: 'charade',
    definicion: ['condimento picante'], indicador: ['y'], material: ['Número', 'que engañe'],
    explicacion: '**PI** (un número) + **MIENTA** (que engañe, del verbo mentir) = **PIMIENTA**, un condimento picante.'
  },
  {
    id: 'es-031', fecha: '2026-12-08', dificultad: 'facil',
    pista: 'Plato sin la ele: animal del estanque',
    respuesta: 'PATO', tipo: 'deletion',
    definicion: ['animal del estanque'], indicador: ['sin'], material: ['Plato', 'la ele'],
    explicacion: '**PLATO** sin la **L** («la ele»): **PATO**, un animal del estanque.'
  },
  {
    id: 'es-032', fecha: '2026-12-09', dificultad: 'dificil',
    pista: 'Roedor de vuelta para sujetar',
    respuesta: 'ATAR', tipo: 'reversal',
    definicion: ['sujetar'], indicador: ['de vuelta'], material: ['Roedor'],
    explicacion: 'Roedor = **RATA**; de vuelta (al revés): **ATAR**, sujetar.'
  },
  {
    id: 'es-033', fecha: '2026-12-10', dificultad: 'ultra',
    pista: 'Al final, ver así todo: corriente de agua',
    respuesta: 'RÍO', tipo: 'telestich',
    definicion: ['corriente de agua'], indicador: ['Al final'], material: ['ver así todo'],
    explicacion: 'Las últimas letras («al final») de ve**R** as**Í** tod**O** forman **RÍO**, una corriente de agua.'
  },
  {
    id: 'es-034', fecha: '2026-12-11', dificultad: 'dificil',
    pista: 'Cerdo convertido en oración',
    respuesta: 'CREDO', tipo: 'anagram',
    definicion: ['oración'], indicador: ['convertido'], material: ['Cerdo'],
    explicacion: 'Las letras de **CERDO**, convertidas (reordenadas), forman **CREDO**, una oración.'
  },
  {
    id: 'es-035', fecha: '2026-12-12', dificultad: 'dificil',
    pista: 'Bastidor descabezado lanza flechas',
    respuesta: 'ARCO', tipo: 'deletion',
    definicion: ['lanza flechas'], indicador: ['descabezado'], material: ['Bastidor'],
    explicacion: 'Un bastidor = **MARCO**; descabezado (sin la primera letra): **ARCO**, que lanza flechas.'
  },
  {
    id: 'es-036', fecha: '2026-12-13', dificultad: 'ultra',
    pista: 'Temor: muchos imaginan espectros de ojos, al principio',
    respuesta: 'MIEDO', tipo: 'acrostic',
    definicion: ['Temor'], indicador: ['al principio'], material: ['muchos imaginan espectros de ojos'],
    explicacion: 'Las iniciales de **m**uchos **i**maginan **e**spectros **d**e **o**jos forman **MIEDO**: temor.'
  },
  {
    id: 'es-037', fecha: '2026-12-14', dificultad: 'dificil',
    pista: 'Ensenada y océano: animal con tinta',
    respuesta: 'CALAMAR', tipo: 'charade',
    definicion: ['animal con tinta'], indicador: ['y'], material: ['Ensenada', 'océano'],
    explicacion: '**CALA** (ensenada) + **MAR** (océano) = **CALAMAR**, un animal con tinta.'
  },
  {
    id: 'es-038', fecha: '2026-12-15', dificultad: 'dificil',
    pista: 'Calzado que salta',
    respuesta: 'BOTA', tipo: 'double',
    definicion: ['Calzado', 'que salta'], indicador: [], material: [],
    explicacion: 'Doble definición: una **bota** es un calzado, y «bota» es también lo que hace una pelota al saltar (del verbo botar).'
  },
  {
    id: 'es-039', fecha: '2026-12-16', dificultad: 'ultra',
    pista: 'Pan dentro de la cama suena en la iglesia',
    respuesta: 'CAMPANA', tipo: 'container',
    definicion: ['suena en la iglesia'], indicador: ['dentro de'], material: ['Pan', 'la cama'],
    explicacion: '**PAN** dentro de **CAMA**: CAM·PAN·A = **CAMPANA**, que suena en la iglesia.'
  },
  {
    id: 'es-040', fecha: '2026-12-17', dificultad: 'dificil',
    pista: 'El pan con un rulo. Oigo, huelo y seco mis lágrimas',
    respuesta: 'PAÑUELO', tipo: 'compound',
    definicion: ['seco mis lágrimas'], indicador: ['con un rulo', 'Oigo'], material: ['pan', 'huelo'],
    explicacion: '**PAN** con un rulo (la tilde de la ñ) se convierte en **PAÑ**. «Oigo» indica que suena: **HUELO** se oye igual que **UELO**, porque la hache es muda. PAÑ + UELO = **PAÑUELO**, con el que seco mis lágrimas.'
  }
];
