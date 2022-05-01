import { warn, error, debug, log } from '../main.js';
import { CopyChat } from './CopyChat.js';
export let readyHooks = async () => {
  warn('Ready Hooks processing...');
  Hooks.on('ready', function() {});
};
export const setupHooks = async () => {
  warn('Setup Hooks processing...');
  CopyChat.init();
  CopyChat.prepareEvent();
  Hooks.on('renderChatMessage', (message, html, speakerInfo) => {
    warn('Processing chat messages...');
    CopyChat.updateSettings();
      
    html.children('header').prepend("<a class='button message-copy'><i class='fas fa-copy'></i></a>");
    
    if(CopyChat.copyNewJournal){
      $('<a class="button message-copy"><i class="fas fa-book-medical"></i></a>').insertAfter(html.children('header').find("a.button.message-copy"));
    }   
  });
};
export const initHooks = async () => {
  warn('Init Hooks processing...');
  Hooks.on('init', function() {});
};
