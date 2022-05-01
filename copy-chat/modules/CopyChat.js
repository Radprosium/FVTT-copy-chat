import { warn, error, debug, log } from '../main.js';
import { MODULE_NAME } from './Settings.js';
export class CopyChat {
  static showDiscordDie = true;
  static init() {
    warn('Init Copy Chat...');
    CopyChat.updateSettings();
  }
  static updateSettings() {
    warn('Update Discord Copy Chat Setting...');
    CopyChat.showDiscordDie = game.settings.get(MODULE_NAME, 'copy-chat-dice-icons');
    CopyChat.copyNewJournal = game.settings.get(MODULE_NAME, 'copy-chat-new-journal');
    CopyChat.autoOpen = game.settings.get(MODULE_NAME, 'copy-chat-new-journal-autoopen');
  }
  static prepareEvent() {
    warn('Set Clickable Icon...');
    CopyChat.clickable = 'i.fas.fa-copy';
    CopyChat.clickable2 = 'i.fas.fa-book-medical';


    function copyToClipboard(text) {
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val(text).select();
      document.execCommand('copy');
      $temp.remove();
    }

    function copyToNewJournal(text){
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val(text).select();
      document.execCommand('copy');
      $temp.remove();
      let textTitle = $('<div/>').append(text).find('.message-content').text().slice(0,40).trim();
      let folderId ="";
      try{
        folderId = game.folders.getName('Autocopy').data._id;
      }catch(exception){
      }
      let journalEntry = game.journal.documentClass.create({
        name: "AutoCopy "+ textTitle,
        content : text,
        'folder' : folderId
      });
      if(CopyChat.autoOpen){
        setTimeout(function(){
          var newJournalId = game.journal.getName("AutoCopy "+ textTitle).id;
          _dthOpenJournal(newJournalId);
          setTimeout(function(){
            $('#journalentry-sheet-'+newJournalId).find('.editor-edit .fa-edit').click();
          },50);   
        },10);
      }
    }

    function copyHandler(context = null, target = "clipboard"){
      CopyChat.updateSettings();
      let diceIcons = ['fa-dice', 'die-one', 'die-two', 'die-three', 'die-four', 'die-five', 'die-six', 'die-d6', 'die-d20'];
      let foundDieIcon = false;
      let content = "";
      if(target === "journal"){
        content = $(context).closest('.chat-message').html();
      }else{
        content = $(context).closest('.chat-message').text().replace(/\s+/g, ' ');
      }

      let fa_dice = $(context).closest('.chat-message').html();
      for (let dieIcon of diceIcons) {
        if (fa_dice.includes(dieIcon)) {
          foundDieIcon = true;
        }
      }
      if (foundDieIcon && CopyChat.showDiscordDie) {
        fa_dice = ':game_die: ';
      } else {
        fa_dice = '';
      }

      let copyClipboard = fa_dice + content.trim();
      debug(copyClipboard);
      
      if(target === "journal"){
        copyToNewJournal(copyClipboard)
        ui.notifications.notify('Copied to New Journal');
      }else{
        copyToClipboard(copyClipboard);
        ui.notifications.notify('Copied to clipboard');
      }
    }

    $(document).on('click', CopyChat.clickable, function(event) {
      copyHandler(this);
    });
    $(document).on('click', CopyChat.clickable2, function(event) {
      copyHandler(this,'journal');
    });
  }
}
