import axios from 'axios';


import { TOKEN } from './token.js';
const search_users_url = 'https://api.github.com/search/users?q=';
const get_user_url = 'https://api.github.com/users/';

const headers = {
  'Accept': 'application/vnd.github+json',
  'Authorization': `Bearer ${TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28'
}

// Clone user element template
const template_container = document.querySelector(".search_result_container");
const user_template = document.querySelector(".search_result_template");
const search_form = document.getElementById('search_form');

async function searchUsersAndFetchInfo(prompt) {
  try {
    // First Axios call for user search
    const response = await axios.get(search_users_url + prompt);
    const users = response.data.items;

    template_container.innerHTML = "";

    // Loop to process each user found
    for (const user of users) {
      const link = user_template.content.cloneNode(true);

      link.querySelector('.profile_photo').src = user.avatar_url;
      link.querySelector('.user_login').innerHTML = user.login;

      // Second Axios call to retrieve detailed user info
      const userResponse = await axios.get(get_user_url + user.login);
      const userData = userResponse.data;

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

search_form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const prompt = search_form.querySelector('input').value
  template_container.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    template_container.append(user_template.content.cloneNode(true));
  }

  await searchUsersAndFetchInfo(prompt);
});




// Check if 'dark' theme is stored in local storage or if the user's preference is for dark mode
if (
  localStorage.theme === 'dark' || // Check if the theme in local storage is 'dark'
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) // Check if user's preference is for dark mode based on system settings
) {
  // If any of the above conditions are true, add the 'dark' class to the root HTML element
  document.documentElement.classList.add('dark');
} else {
  // If none of the conditions are true, remove the 'dark' class from the root HTML element
  document.documentElement.classList.remove('dark');
}

// Get the reference to the light/dark mode toggle button
const lightDarkBtn = document.getElementById('light_dark_btn');

// Listen for changes in the light/dark mode toggle button
lightDarkBtn.addEventListener('change', () => {
  
  if (document.documentElement.classList.contains('dark')) {
    
    document.documentElement.classList.remove('dark');
   
    localStorage.theme = 'light';
    
  } else {
    
    document.documentElement.classList.add('dark');
    
    localStorage.theme = 'dark';
  }
});
