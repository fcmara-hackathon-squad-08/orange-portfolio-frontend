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

function callAPI(method, url, data) {
  const apiURL = `https://sq8-orange-fcamra.onrender.com/${url}`;

  let requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  fetch(apiURL, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.json());
      }

      console.log(JSON.stringify(data, null, 2));
      return response;

    })
    .catch((err) => {
      console.error(err + response.json());
    })
}

function login() {
  let email = document.getElementById('email-login').value;
  let password = document.getElementById('password').value;

  const data = {
    login: "kaua@gmail.com",
    password: "123456"
  };

  const response = callAPI('POST', 'auth/login', data);

  if (!response) {
    console.error("Response is undefined!");
    return;
  }

  const { token } = response.data;

  localStorage.setItem('token', token);

  console.log(localStorage.getItem('token'));

}
