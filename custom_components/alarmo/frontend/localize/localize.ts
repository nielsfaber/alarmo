import * as ca from './languages/ca.json';
import * as cs from './languages/cs.json';
import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as et from './languages/et.json';
import * as fr from './languages/fr.json';
import * as it from './languages/it.json';
import * as nl from './languages/nl.json';
import * as sk from './languages/sk.json';
import * as sv from './languages/sv.json';
import * as zh_Hans from './languages/zh-Hans.json';

import IntlMessageFormat from 'intl-messageformat';

var languages: any = {
  ca: ca,
  cs: cs,
  en: en,
  et: et,
  es: es,
  fr: fr,
  it: it,
  nl: nl,
  sk: sk,
  sv: sv,
  'zh-Hans': zh_Hans,
};

export function localize(string: string, language: string, ...args: any[]): string {
  const lang = language.replace(/['"]+/g, '');

  var translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (!args.length) return translated;

  const argObject = {};
  for (let i = 0; i < args.length; i += 2) {
    let key = args[i];
    key = key.replace(/^{([^}]+)?}$/, '$1');
    argObject[key] = args[i + 1];
  }

  try {
    const message = new IntlMessageFormat(translated, language);
    return message.format(argObject) as string;
  } catch (err) {
    return 'Translation ' + err;
  }
}
