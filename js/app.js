
import { TOKEN } from './token.js';

const search_users_url = `https://api.github.com/search/users?q=`;

const get_user_url = 'https://api.github.com/users/';

const headers = {
  'Accept': 'application/vnd.github+json',
  'Authorization': `Bearer ${TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28'
}

//Clone user element template
const template_container = document.querySelector(".search_result_container");
const user_template = document.querySelector(".search_result_template");
const search_form = document.getElementById('search_form');


async function searchUsersAndFetchInfo(prompt) {
  const search_users_url = `https://api.github.com/search/users?q=${prompt}`;
  const get_user_url = 'https://api.github.com/users/';

  try {
    // Premier appel fetch pour la recherche des utilisateurs
    const response = await fetch(search_users_url);
    const data = await response.json();
    const users = data.items;

    template_container.innerHTML = "";


    // Boucle pour traiter chaque utilisateur trouvé
    for (const user of users) {
      const div = user_template.content.cloneNode(true);

      div.querySelector('.profile_photo').src = user.avatar_url;
      div.querySelector('.user_login').innerHTML = user.login;
      
      // Deuxième appel fetch pour récupérer les infos détaillées de l'utilisateur
      const userResponse = await fetch(get_user_url + user.login);
      const userData = await userResponse.json();
      
      div.querySelector('.username').textContent = userData.name;
      div.querySelector('.user_country').textContent = userData.bio;
      div.querySelector('.user_login').innerHTML = user.login;
      div.querySelector('.user_repos').innerHTML = '<i class="fa fa-folder"></i>' + ' ' + userData.public_repos;
      div.querySelector('.user_followers').innerHTML = '<i class="fa fa-users"></i>' + ' ' + userData.followers;

      // Utilisez userData pour obtenir les informations de l'utilisateur spécifique
      console.log(userData); // Vous pouvez faire ce que vous voulez avec les données récupérées
      template_container.appendChild(div);
    }
  } catch (error) {
      console.error('Une erreur s\'est produite :', error);
  }
}


search_form.addEventListener('submit', (e) => {
  e.preventDefault();

  const prompt = search_form.querySelector('input').value
  template_container.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    template_container.append(user_template.content.cloneNode(true));
  }
  searchUsersAndFetchInfo(prompt)
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