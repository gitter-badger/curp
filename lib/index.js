'use strict';

let curp = {};

const GENERO = {
  MASCULINO: 'H',
  FEMENINO: 'M'
};

const ESTADO = {
  AGUASCALIENTES: 'AS',
  BAJA_CALIFORNIA: 'BC',
  BAJA_CALIFORNIA_SUR: 'BS',
  CAMPECHE: 'CC',
  COAHUILA: 'CL',
  COLIMA: 'CM',
  CHIAPAS: 'CS',
  CHIHUAHUA: 'CH',
  DISTRITO_FEDERAL: 'DF',
  CDMX: 'DF',
  DURANGO: 'DG',
  GUANAJUATO: 'GT',
  GUERRERO: 'GR',
  HIDALGO: 'HG',
  JALISCO: 'JC',
  ESTADO_DE_MEXICO: 'MC',
  MICHOACAN: 'MN',
  MORELOS: 'MS',
  NAYARIT: 'NT',
  NUEVO_LEON: 'NL',
  OAXACA: 'OC',
  PUEBLA: 'PL',
  QUERETARO: 'QT',
  QUINTANA_ROO: 'QR',
  SAN_LUIS_POTOSI: 'SP',
  SINALOA: 'SL',
  SONORA: 'SR',
  TABASCO: 'TC',
  TAMAULIPAS: 'TS',
  TLAXCALA: 'TL',
  VERACRUZ: 'VZ',
  YUCATAN: 'YN',
  ZACATECAS: 'ZS'
};

let comunes = [
  'MARIA DEL ',
  'MARIA DE LOS ',
  'MARIA ',
  'JOSE DE ',
  'JOSE ',
  'MA. ',
  'MA ',
  'M. ',
  'J. ',
  'J '
];

const malasPalabras = {
  BACA: 'BXCA',
  LOCO: 'LXCO',
  BAKA: 'BXKA',
  BUEI: 'BXEI',
  BUEY: 'BXEY',
  CACA: 'CXCA',
  CACO: 'CXCO',
  CAGA: 'CXGA',
  CAGO: 'CXGO',
  CAKA: 'CXKA',
  CAKO: 'CXKO',
  COGE: 'CXGE',
  COGI: 'CXGI',
  COJA: 'CXJA',
  COJE: 'CXJE',
  COJI: 'CXJI',
  COJO: 'CXJO',
  COLA: 'CXLA',
  CULO: 'CXLO',
  FALO: 'FXLO',
  FETO: 'FXTO',
  GETA: 'GXTA',
  GUEI: 'GXEI',
  GUEY: 'GXEY',
  JETA: 'JXTA',
  JOTO: 'JXTO',
  KACA: 'KXCA',
  KACO: 'KXCO',
  KAGA: 'KXGA',
  KAGO: 'KXGO',
  KAKA: 'KXKA',
  KAKO: 'KXKO',
  KOGE: 'KXGE',
  KOGI: 'KXGI',
  KOJA: 'KXJA',
  KOJE: 'KXJE',
  KOJI: 'KXJI',
  KOJO: 'KXJO',
  KOLA: 'KXLA',
  KULO: 'KXLO',
  LILO: 'LXLO',
  LOKA: 'LXKA',
  LOKO: 'LXKO',
  MAME: 'MXME',
  MAMO: 'MXMO',
  MEAR: 'MXAR',
  MEAS: 'MXAS',
  MEON: 'MXON',
  MIAR: 'MXAR',
  MION: 'MXON',
  MOCO: 'MXCO',
  MOKO: 'MXKO',
  MULA: 'MXLA',
  MULO: 'MXLO',
  NACA: 'NXCA',
  NACO: 'NXCO',
  PEDA: 'PXDA',
  PEDO: 'PXDO',
  PENE: 'PXNE',
  PIPI: 'PXPI',
  PITO: 'PXTO',
  POPO: 'PXPO',
  PUTA: 'PXTA',
  PUTO: 'PXTO',
  QULO: 'QXLO',
  RATA: 'RXTA',
  ROBA: 'RXBA',
  ROBE: 'RXBE',
  ROBO: 'RXBO',
  RUIN: 'RXIN',
  SENO: 'SXNO',
  TETA: 'TXTA',
  VACA: 'VXCA',
  VAGA: 'VXGA',
  VAGO: 'VXGO',
  VAKA: 'VXKA',
  VUEI: 'VXEI',
  VUEY: 'VXEY',
  WUEI: 'WXEI',
  WUEY: 'WXEY'
};

class Persona {
  constructor(
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    genero,
    estado,
    fechaNacimiento
  ) {
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.genero = genero;
    this.estado = estado;
    this.fechaNacimiento = fechaNacimiento;
  }
}

function getPersona() {
  return new Persona();
}

function generar(persona) {
  validaDatos(persona);
  let curp = '';
  let pad = zeropad.bind(null, 2);
  let nombre = ajustaCompuesto(
    normalizaString(persona.nombre.toUpperCase())
  ).trim();

  let apellidoPaterno = ajustaCompuesto(
    normalizaString(persona.apellidoPaterno.toUpperCase())
  ).trim();

  let apellidoMaterno = persona.apellidoMaterno || '';
  apellidoMaterno = ajustaCompuesto(
    normalizaString(apellidoMaterno.toUpperCase())
  ).trim();

  let inicialNombre = extraerInicial(nombre);

  let vocalApellido = apellidoPaterno
    .trim()
    .substring(1)
    .replace(/[BCDFGHJKLMNÑPQRSTVWXYZ]/g, '')
    .substring(0, 1);
  vocalApellido = vocalApellido === '' ? 'X' : vocalApellido;

  let primeraLetraPaterno = apellidoPaterno.substring(0, 1);
  primeraLetraPaterno = primeraLetraPaterno === 'Ñ' ? 'X' : primeraLetraPaterno;

  let primeraLetraMaterno = '';
  if (!apellidoMaterno || apellidoMaterno === '') {
    primeraLetraMaterno = 'X';
  } else {
    primeraLetraMaterno = apellidoMaterno.substring(0, 1);
    primeraLetraMaterno =
      primeraLetraMaterno === 'Ñ' ? 'X' : primeraLetraMaterno;
  }

  let posicionUnoCuatro = [
    primeraLetraPaterno,
    vocalApellido,
    primeraLetraMaterno,
    inicialNombre
  ].join('');

  posicionUnoCuatro = removerMalasPalabras(filtraCaracteres(posicionUnoCuatro));

  let nombres = nombre.split(' ').filter(function(palabra) {
    return palabra !== '';
  });

  let nombreUsar =
    nombres.length > 1 && comunes.indexOf(nombres[0]) > -1
      ? nombres[1]
      : nombres[0];

  let posicionCatorceDieciseis = [
    primerConsonante(apellidoPaterno),
    primerConsonante(apellidoMaterno),
    primerConsonante(nombreUsar)
  ].join('');

  let fechaNacimiento = persona.fechaNacimiento.split('-');

  curp = [
    posicionUnoCuatro,
    pad(fechaNacimiento[2] - 1900),
    pad(fechaNacimiento[1]),
    pad(fechaNacimiento[0]),
    persona.genero,
    persona.estado,
    posicionCatorceDieciseis
  ].join('');

  curp += getSpecialChar(fechaNacimiento[2]);
  curp += agregaDigitoVerificador(curp);

  return curp;
}

/**
 * AjustaCompuesto()
 * Cuando el nombre o los apellidos son compuestos y tienen
 * proposiciones, contracciones o conjunciones, se deben eliminar esas palabras
 * a la hora de calcular el CURP.
 * @param {string} str - String donde se eliminarán las partes que lo hacen compuesto
 */
function ajustaCompuesto(str) {
  var compuestos = [
    /\bDA\b/,
    /\bDAS\b/,
    /\bDE\b/,
    /\bDEL\b/,
    /\bDER\b/,
    /\bDI\b/,
    /\bDIE\b/,
    /\bDD\b/,
    /\bEL\b/,
    /\bLA\b/,
    /\bLOS\b/,
    /\bLAS\b/,
    /\bLE\b/,
    /\bLES\b/,
    /\bMAC\b/,
    /\bMC\b/,
    /\bVAN\b/,
    /\bVON\b/,
    /\bY\b/
  ];

  compuestos.forEach(function(compuesto) {
    if (compuesto.test(str)) {
      str = str.replace(compuesto, '');
    }
  });

  return str;
}

/**
 * Zeropad()
 * Rellena con ceros un string, para que quede de un ancho determinado.
 * @param {number} ancho - Ancho deseado.
 * @param {number} num - Numero que sera procesado.
 */
function zeropad(ancho, num) {
  var pad = Array.apply(0, Array.call(0, ancho))
    .map(function() {
      return 0;
    })
    .join('');

  return (pad + num).replace(new RegExp('^.*([0-9]{' + ancho + '})$'), '$1');
}

/**
 * PrimerConsonante()
 * Saca la primer consonante interna del string, y la devuelve.
 * Si no hay una consonante interna, devuelve X.
 * @param {string} str - String del cual se va a sacar la primer consonante.
 */
function primerConsonante(str) {
  str = str
    .trim()
    .substring(1)
    .replace(/[AEIOU]/gi, '')
    .substring(0, 1);
  return str === '' || str === 'Ñ' ? 'X' : str;
}

/**
 * FiltraCaracteres()
 * Filtra convirtiendo todos los caracteres no alfabeticos a X.
 * @param {string} str - String el cual sera convertido.
 */
function filtraCaracteres(str) {
  return str.toUpperCase().replace(/[\d_\-./\\,]/g, 'X');
}

/**
 * NormalizaString()
 * Elimina los acentos, eñes y diéresis que pudiera tener el nombre.
 * @param {string} str - String con el nombre o los apellidos.
 */
function normalizaString(str) {
  var origen;
  var destino;
  var salida;
  origen = [
    'Ã',
    'À',
    'Á',
    'Ä',
    'Â',
    'È',
    'É',
    'Ë',
    'Ê',
    'Ì',
    'Í',
    'Ï',
    'Î',
    'Ò',
    'Ó',
    'Ö',
    'Ô',
    'Ù',
    'Ú',
    'Ü',
    'Û',
    'ã',
    'à',
    'á',
    'ä',
    'â',
    'è',
    'é',
    'ë',
    'ê',
    'ì',
    'í',
    'ï',
    'î',
    'ò',
    'ó',
    'ö',
    'ô',
    'ù',
    'ú',
    'ü',
    'û',
    'Ç',
    'ç'
  ];
  destino = [
    'A',
    'A',
    'A',
    'A',
    'A',
    'E',
    'E',
    'E',
    'E',
    'I',
    'I',
    'I',
    'I',
    'O',
    'O',
    'O',
    'O',
    'U',
    'U',
    'U',
    'U',
    'a',
    'a',
    'a',
    'a',
    'a',
    'e',
    'e',
    'e',
    'e',
    'i',
    'i',
    'i',
    'i',
    'o',
    'o',
    'o',
    'o',
    'u',
    'u',
    'u',
    'u',
    'c',
    'c'
  ];
  str = str.split('');
  salida = str.map(function(char) {
    var pos = origen.indexOf(char);
    return pos > -1 ? destino[pos] : char;
  });

  return salida.join('');
}

/**
 * AgregaDigitoVerificador()
 * Agrega el dígito que se usa para validar el CURP.
 * @param {string} curpStr - String que contiene los primeros 17 caracteres del CURP.
 */
function agregaDigitoVerificador(incompleteCurp) {
  const dictionary = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  let lnSum = 0.0;
  let lnDigt = 0.0;

  for (let i = 0; i < 17; i++) {
    lnSum += dictionary.indexOf(incompleteCurp.charAt(i)) * (18 - i);
  }

  lnDigt = 10 - (lnSum % 10);
  if (lnDigt === 10) return 0;
  return lnDigt;
}

function getSpecialChar(bornYear) {
  if (bornYear[0] === '1') {
    return '0';
  }

  return 'A';
}

/**
 * ExtraerInicial()
 * Funcion que extrae la inicial del primer nombre, o, si tiene mas de 1 nombre Y el primer
 * nombre es uno de la lista de nombres comunes, la inicial del segundo nombre
 * @param {string} nombre - String que representa todos los nombres (excepto los apellidos) separados por espacio
 */
function extraerInicial(nombre) {
  var nombres;
  var primerNombreEsComun;
  nombres = nombre
    .toUpperCase()
    .trim()
    .split(/\s+/);
  primerNombreEsComun = nombres.length > 1 && comunes.indexOf(nombres[0]) > -1;

  if (primerNombreEsComun) {
    return nombres[1].substring(0, 1);
  }

  return nombres[0].substring(0, 1);
}

function removerMalasPalabras(palabra) {
  if (malasPalabras[palabra]) {
    return malasPalabras[palabra];
  }

  return palabra;
}

function validaDatos(persona) {
  if (!persona.nombre) {
    throw Error('Falta el nombre de la persona');
  }

  if (!persona.apellidoPaterno) {
    throw new Error('Falta el nombre de la persona');
  }

  if (!persona.fechaNacimiento) {
    throw new Error('Falta la fecha de nacimiento');
  }

  if (!persona.genero) {
    throw new Error('Falta el genero');
  }

  if (!persona.estado) {
    throw new Error('Falta el estado');
  }
}

curp.getPersona = getPersona;
curp.generar = generar;
curp.GENERO = GENERO;
curp.ESTADO = ESTADO;
module.exports = curp;