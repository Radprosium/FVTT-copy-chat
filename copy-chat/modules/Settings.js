import { warn, error, debug, log } from '../main.js';

export const requestURL = '../modules/copy-chat/module.json';
export var MODULE_TITLE = '';
export var MODULE_NAME = '';
export var MODULE_VERSION = '';

$.getJSON(requestURL, function(json) { 
  MODULE_TITLE = json.title;
  MODULE_NAME = json.name;
  MODULE_VERSION = json.version;
}); 

export const registerSettings = function() {
  warn('Register module settings...');
  game.settings.register(MODULE_NAME, 'copy-chat-dice-icons', {
    name: 'Copy Chat for Discord',
    hint: 'This setting looks for Font Awesome dice icon (e.g. fa-dice) and puts the Discord dice icon (:game_die:) in the front of the copied text.',
    scope: 'client',
    config: true,
    default: true,
    type: Boolean,
  });
  game.settings.register(MODULE_NAME, 'copy-chat-new-journal', {
    name: 'Copy Chat to new journal entry',
    hint: 'This setting adds a copy to new journal e clickable icon.',
    scope: 'client',
    config: true,
    default: true,
    type: Boolean,
  });
  game.settings.register(MODULE_NAME, 'copy-chat-new-journal-autoopen', {
    name: 'Open created journal entry',
    hint: 'This setting Automatically opens the new journal entry created with "Copy Chat to new journal entry"',
    scope: 'client',
    config: true,
    default: true,
    type: Boolean,
  });
};
