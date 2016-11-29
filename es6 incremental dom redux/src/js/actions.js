export function usernameChange(username) {
  return {
    type: 'USERNAME_CHANGE',
    username
  };
}

export function error(text) {
  return {
    type: 'ERROR',
    text
  };
}

export function reposLoaded(repos) {
  return {
    type: 'REPOS_LOADED',
    repos
  };
}
