



  //Clone user element template
  const template_container = document.querySelector(".search_result_container");
  const user_template = document.querySelector(".search_result_template");
  



const search_form = document.getElementById('search_form');

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

      const users = data['items'];
      template_container.innerHTML = "";

      users.forEach(user => {
        const div = user_template.content.cloneNode(true);
        div.querySelector('.profile_photo').src = user.avatar_url;
        div.querySelector('.username').textContent = user.login;
        div.querySelector('.user_url').innerHTML = user.html_url;
        template_container.appendChild(div)

      })


      console.log(data)
    })
    .catch(error => {
      console.error(error)
    });
}


search_form.addEventListener('submit', (e) => {
  e.preventDefault();

  const prompt = search_form.querySelector('input').value
  template_container.innerHTML = "";
  
  for (let i = 0; i < 6; i++) {
    template_container.append(user_template.content.cloneNode(true));
  }
  getUsers(prompt)
})




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