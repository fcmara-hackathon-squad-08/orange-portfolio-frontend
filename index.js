// Material Design components
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';

import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/icon/icon.js';

import '@material/web/ripple/ripple.js';

import '@material/web/textfield/outlined-text-field.js';
import '@material/web/textfield/filled-text-field.js';

import '@material/web/chips/chip-set.js';
import '@material/web/chips/suggestion-chip.js';

import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

import '@material/web/dialog/dialog.js';

import '@material/web/divider/divider.js';

// Define protected routes 
const protectedRoutes = {
  '/discover/index.html': true,
  '/my-projects/index.html': true,
};

// Check if the user is authenticated 
function isAuthenticated() {
  // Check if the user is authenticated 
  const token = localStorage.getItem('authToken');
  if (!token) {
    // User is not authenticated, redirect to login page 
    window.location.href = '/login.html';
  }
}

// Handle routing 
function router() {
  // Get the requested route path 
  const path = window.location.pathname;

  // Check if the route is protected 
  const isProtected = Object.keys(protectedRoutes).includes(path);

  // Check if the user is authenticated for protected routes 
  if (isProtected) {
    isAuthenticated();
  }
}

// Call router on page load and URL change 
window.onload = router();
window.onpopstate = router(); 