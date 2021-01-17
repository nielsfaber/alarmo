import * as en from './languages/en.json';
import * as et from './languages/et.json';
import * as nl from './languages/nl.json';

var languages: any = {
  en: en,
  et: et,
  nl: nl,
};

export function localize(string: string, language: string, search: string | string[] = '', replace: string | string[] = '') {

  const lang = language.replace(/['"]+/g, '').replace('-', '_');

  var translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);


  if (search !== '' && replace !== '') {
    if (!Array.isArray(search)) search = [search];
    if (!Array.isArray(replace)) replace = [replace];
    for (let i = 0; i < search.length; i++) {
      translated = translated.replace(search[i], replace[i]);
    }
  }
  return translated;
}
