// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    }).then(()=>{

      let entries = document.getElementsByTagName('journal-entry');
      let index = 1;
      Array.from(entries).forEach(journalEntryElement => {
        
        const jsonVersion = journalEntryElement.entry;
        jsonVersion["number"] = index++;

        journalEntryElement.addEventListener('click',event=>{
          setState('entry', jsonVersion);
        });
      });

      let settingsIcon = document.getElementsByTagName('img');
      settingsIcon[0].addEventListener('click', e=>{
        setState('settings', null);
      });

      let header = document.getElementsByTagName('h1');
      header[0].addEventListener('click',e=>{
        setState('home', null);
      });

      window.addEventListener('popstate', e=>{
        if(e.state){
          if(e.state.json){
            history.replaceState(e.state.title, e.state.json);
          }else{
            history.replaceState(e.state.title, null);
          }
        }else{
          history.back();
        }
      });
    });  
});

