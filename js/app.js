
const url = `https://api.github.com/search/users?q=`;
const token = "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";
const headers = {
  'Accept': 'application/vnd.github+json',
  'Authorization' : `Bearer ${token}`,
  'X-GitHub-Api-Version' : '2022-11-28'
}




async function getUsers(prompt) {
    
  fetch(`${url}${prompt}`, { headers })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    });
}


getUsers("samuel");




// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
//localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
//localStorage.removeItem('theme')