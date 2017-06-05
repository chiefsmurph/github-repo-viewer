import { h, app } from "hyperapp"

app({
  state: {
    isLoading: false,
    currentUsername: "",
    currentRepos: null,
    errorMessage: null
  },
  view: (state, actions) => (
    <div class="container">

        <h1>Github Repo Viewer</h1>

        <form onsubmit={actions.submitUsername}>
          <input type="text" id="username" placeholder="Enter a Github username" size="35" />
          <input value="Get Github Projects" type="submit" />
        </form>

        <hr />

        {state.errorMessage && <span id="error" class="text-danger">{state.errorMessage}</span>}

        {state.isLoading && <span id="loading">Loading repos for that user...</span>}

        {state.currentRepos && (
          <div id="repoViewer">
            <h2>Repos for <i id="usernameLabel">{state.currentUsername}</i></h2>
            <table class="table table-responsive table-hover">
                <thead>
                    <th>Name</th>
                    <th>Language</th>
                    <th>URL</th>
                </thead>
                <tbody id="repoContainer">
                  {state.currentRepos.map(repo => (
                    <tr>
                      <td>{repo.name}</td>
                      <td>{repo.language}</td>
                      <td><a href={repo.html_url}>{repo.html_url}</a></td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
      )}

    </div>
  ),
  actions: {
    error: (state, actions, errorMessage) => ({ errorMessage }),
    setRepos: (state, actions, repos) => ({ currentRepos: repos }),
    setLoading: (state, actions, loading) => ({ isLoading: loading }),
    setUsernameAndReset: (state, actions, username) => ({
        currentUsername: username,
        currentRepos: null,
        errorMessage: null
    }),
    fetchRepos: (state, actions, username) => {
      actions.setLoading(true);
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
          actions.setLoading(false);
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(response);
          }
        })
        .then(data => {
          if (data.length) {
            actions.setRepos(data);
          } else {
            actions.error("User exists, but has no repositories.");
          }
        })
        .catch(error => {
          actions.error("404 User does not exist")
        });
    },
    submitUsername: (state, actions, event) => {
      const usernameInput = document.getElementById("username");
      const typedUsername = usernameInput.value;
      console.log('submitting ', typedUsername);

      event.preventDefault();

      usernameInput.value = '';
      actions.setUsernameAndReset(typedUsername);
      actions.fetchRepos(typedUsername);
    }
  }
})
