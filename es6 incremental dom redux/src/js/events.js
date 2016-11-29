import {appStore} from './state';
import {listen} from './lib/events';
import {usernameChange, error, reposLoaded} from './actions';


export function registerEventHandlers() {

  var usernameTextbox = document.querySelector('input[type="text"]');
  listen('submit', 'form', function(e) {
      var enteredUsername = usernameTextbox.value;
      appStore.dispatch(usernameChange(enteredUsername));
      usernameTextbox.value = '';

      const url = `https://api.github.com/users/${enteredUsername}/repos`;

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 404) {
              return appStore.dispatch(error('No Github user found with that username.'));
            }
            var repos = JSON.parse(xhr.responseText);
            if (!repos.length) {
              return appStore.dispatch(error("User exists, but has no repositories."));
            }
            appStore.dispatch(reposLoaded(repos));
          }
      };
      xhr.onerror = function() {
        appStore.dispatch(error('Error loading repos'));
      };
      xhr.open('GET', url, true);
      xhr.send(null);

      e.preventDefault();
  });

}
