//Password Visibility
document.querySelector('md-icon-button').addEventListener('click', function () {
  var input = document.querySelector('#password');
  var eye = document.querySelector('#eye');
  var eyeOff = document.querySelector('#eyeOff');
  if (input.type === "password") {
    input.type = "text";
    eye.style.display = "none";
    eyeOff.style.display = "block";
  } else {
    input.type = "password";
    eye.style.display = "block";
    eyeOff.style.display = "none";
  }
});

function login() {
  const apiURL = `https://sq8-orange-fcamra.onrender.com/auth/login`;

  let email = document.getElementById('email-login').value;
  let password = document.getElementById('password').value;

  const data = {
    login: email,
    password: password
  };

  let requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  fetch(apiURL, requestOptions)
    .then((response) => {
      return response.json();
    }).then((data) => {
      const { token } = data;

      localStorage.setItem('token', token);

      console.log(localStorage.getItem('token'));

      window.location.href = '../my-portfolio/index.html';
    }).catch((err) => {
      console.log(err.message);
    })


}