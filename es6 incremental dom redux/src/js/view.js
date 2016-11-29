import {elementOpen, elementClose, elementVoid, text, patch} from 'incremental-dom';

export function render(el, state) {
    patch(el, function() {
      incRender(state);
    });
}

function incRender(state) {
    return (
      <div class="container">
        <h1>Github Repo Viewer</h1>
        {usernameSelector()}
        <hr />
        { !(state.error) || <span class="text-danger">{state.error}</span> }
        { !(state.isLoading) || <span>Loading repos for that user...</span>}
        { !(state.repos.length) || repoViewer(state)}
      </div>
    );
}

function usernameSelector() {
  return (
      <form>
        <input type="text" placeholder="Enter a Github username" size="35" />
        <input value="Get Github Projects" type="submit" />
      </form>
  );
}

function repoViewer(state) {
  return (
    <div id="repoViewer">
      <h2>Repos for <i>{state.username}</i></h2>
      <table class="table table-responsive table-hover">
          <thead>
              <th>Name</th>
              <th>Language</th>
              <th>URL</th>
          </thead>
          <tbody>
              {state.repos.map(function(repo) {
                return (
                  <tr>
                      <td>{repo.name}</td>
                      <td>{repo.language}</td>
                      <td><a href="{repo.html_url}">{repo.html_url}</a></td>
                  </tr>
                );
              })}
          </tbody>
      </table>
    </div>
  );
}
