import * as en from './languages/en.json';
import * as et from './languages/et.json';

var languages: any = {
  en: en,
  et: et,
};

export function localize(string: string, language: string, search: string = '', replace: string = '') {

  const lang = language.replace(/['"]+/g, '').replace('-', '_');

  var translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
