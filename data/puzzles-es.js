/*
 * Crípticos en ESPAÑOL
 * ---------------------------------------------------------------
 * Cada críptico:
 *   id          identificador único (no lo cambies una vez publicado: el progreso se guarda con él)
 *   fecha       AAAA-MM-DD: día en que es «el críptico del día». Los de fecha futura no se ven.
 *   pista       el texto de la pista, SIN el número de letras (se calcula solo)
 *   respuesta   la solución (los espacios separan palabras: "BAJO CERO" → (4,4))
 *   tipo        anagram | hidden | hiddenReversal | reversal | container | charade |
 *               deletion | double | acrostic | homophone | compound
 *   definicion / indicador / material
 *               trozos LITERALES de la pista (se resaltan al pedir pistas).
 *               Lista vacía [] si la pista no tiene esa pieza.
 *   explicacion se muestra al resolver. **texto** = negrita.
 */
window.KRYPTIKOS_PUZZLES = window.KRYPTIKOS_PUZZLES || {};
window.KRYPTIKOS_PUZZLES.es = [
  {
    id: 'es-001', fecha: '2026-11-08',
    pista: 'Capital que devuelve el cariño',
    respuesta: 'ROMA', tipo: 'reversal',
    definicion: ['Capital'], indicador: ['devuelve'], material: ['el cariño'],
    explicacion: '**El cariño** = AMOR. «Devuelve» indica que hay que leerlo al revés: **ROMA**, una capital.'
  },
  {
    id: 'es-002', fecha: '2026-11-09',
    pista: 'Poco caso oculta el final del día',
    respuesta: 'OCASO', tipo: 'hidden',
    definicion: ['el final del día'], indicador: ['oculta'], material: ['Poco caso'],
    explicacion: 'Dentro de «poc**O CASO**» se esconde **OCASO**, el final del día.'
  },
  {
    id: 'es-003', fecha: '2026-11-10',
    pista: 'Número y roedor: bandido del mar',
    respuesta: 'PIRATA', tipo: 'charade',
    definicion: ['bandido del mar'], indicador: ['y'], material: ['Número', 'roedor'],
    explicacion: '**PI** (un número) + **RATA** (un roedor) = **PIRATA**, bandido del mar.'
  },
  {
    id: 'es-004', fecha: '2026-11-11',
    pista: 'Espalda que pierde un litro: arma',
    respuesta: 'ESPADA', tipo: 'deletion',
    definicion: ['arma'], indicador: ['que pierde'], material: ['Espalda', 'un litro'],
    explicacion: '**ESPALDA** pierde la **L** (símbolo del litro): **ESPADA**, un arma.'
  },
  {
    id: 'es-005', fecha: '2026-11-12',
    pista: 'Satélite: las urracas nocturnas aletean, al principio',
    respuesta: 'LUNA', tipo: 'acrostic',
    definicion: ['Satélite'], indicador: ['al principio'], material: ['las urracas nocturnas aletean'],
    explicacion: 'Las iniciales («al principio») de **l**as **u**rracas **n**octurnas **a**letean forman **LUNA**, el satélite.'
  },
  {
    id: 'es-006', fecha: '2026-11-13',
    pista: 'Prenda con nota dentro de casa',
    respuesta: 'CAMISA', tipo: 'container',
    definicion: ['Prenda'], indicador: ['dentro de'], material: ['nota', 'casa'],
    explicacion: '**MI** (una nota musical) dentro de **CASA**: CA·MI·SA = **CAMISA**, una prenda.'
  },
  {
    id: 'es-007', fecha: '2026-11-14',
    pista: 'Galería alborotada causa felicidad',
    respuesta: 'ALEGRÍA', tipo: 'anagram',
    definicion: ['felicidad'], indicador: ['alborotada'], material: ['Galería'],
    explicacion: 'Las letras de **GALERÍA**, alborotadas, forman **ALEGRÍA**, sinónimo de felicidad.'
  },
  {
    id: 'es-008', fecha: '2026-11-15',
    pista: 'Asiento de cuentas corrientes',
    respuesta: 'BANCO', tipo: 'double',
    definicion: ['Asiento', 'de cuentas corrientes'], indicador: [], material: [],
    explicacion: 'Doble definición: un **banco** es un asiento y también la entidad donde se abren las cuentas corrientes. No hay indicador ni material.'
  },
  {
    id: 'es-009', fecha: '2026-11-16',
    pista: 'Astro y cubo con puntos forman un militar',
    respuesta: 'SOLDADO', tipo: 'charade',
    definicion: ['un militar'], indicador: ['y', 'forman'], material: ['Astro', 'cubo con puntos'],
    explicacion: '**SOL** (astro) + **DADO** (cubo con puntos) = **SOLDADO**, un militar.'
  },
  {
    id: 'es-010', fecha: '2026-11-17',
    pista: 'Terreno que, en parte, tira los dados de vuelta',
    respuesta: 'SOLAR', tipo: 'hiddenReversal',
    definicion: ['Terreno'], indicador: ['en parte', 'de vuelta'], material: ['tira los'],
    explicacion: 'En «ti**RA LOS**» se esconde (en parte) RALOS, que leído al revés («de vuelta») da **SOLAR**, un terreno. La imagen de los dados es solo una distracción.'
  },
  {
    id: 'es-011', fecha: '2026-11-18',
    pista: 'Rostro y fruta de verano sin final: golosina',
    respuesta: 'CARAMELO', tipo: 'compound',
    definicion: ['golosina'], indicador: ['y', 'sin final'], material: ['Rostro', 'fruta de verano'],
    explicacion: '**CARA** (rostro) + **MELO** (MELÓN sin su última letra) = **CARAMELO**, una golosina.'
  },
  {
    id: 'es-012', fecha: '2026-11-19',
    pista: 'Toro sin cola junto a hierba aromática: tempestad',
    respuesta: 'TORMENTA', tipo: 'compound',
    definicion: ['tempestad'], indicador: ['sin cola', 'junto a'], material: ['Toro', 'hierba aromática'],
    explicacion: '**TOR** (TORO sin la última letra, «sin cola») + **MENTA** (hierba aromática) = **TORMENTA**, una tempestad.'
  },
  {
    id: 'es-013', fecha: '2026-11-20',
    pista: 'Ignorante, perdido, nacido junto al Plata',
    respuesta: 'ARGENTINO', tipo: 'anagram',
    definicion: ['nacido junto al Plata'], indicador: ['perdido'], material: ['Ignorante'],
    explicacion: '**IGNORANTE** con las letras desordenadas («perdido») da **ARGENTINO**: alguien nacido junto al Río de la Plata.'
  }
];
