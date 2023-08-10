
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
    //First fetch call for user search
    const response = await fetch(search_users_url);
    const data = await response.json();
    const users = data.items;

    template_container.innerHTML = "";


    // Loop to process each user found
    for (const user of users) {
      const link = user_template.content.cloneNode(true);
      
      
      link.querySelector('.profile_photo').src = user.avatar_url;
      link.querySelector('.user_login').innerHTML = user.login;
      
      // Second fetch call to retrieve detailed user info
      const userResponse = await fetch(get_user_url + user.login);
      const userData = await userResponse.json();
      
      link.querySelector('.username').textContent = userData.name;
      link.querySelector('.user_country').textContent = userData.bio;
      link.querySelector('.user_login').innerHTML = user.login;
      link.querySelector('.user_repos').innerHTML = '<i class="fa fa-folder"></i>' + ' ' + userData.public_repos;
      link.querySelector('.user_followers').innerHTML = '<i class="fa fa-users"></i>' + ' ' + userData.followers;

      // Add href attribute to link
      link.querySelector('a').setAttribute('href', 'https://github.com/' + user.login);

      // Use userData to obtain specific user information
      console.log(userData);

      template_container.appendChild(link);

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

const lightDarkBtn = document.getElementById('light_dark_btn');

lightDarkBtn.addEventListener('change', () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
});




