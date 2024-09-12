// src/i18n/index.js
import i18n from 'i18n-js';
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n.translations = { en, ar };
i18n.fallbacks = true;

export default i18n;