// Vizibilidade da senha
document.querySelector('md-icon-button').addEventListener('click', function() {
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

// Validação do Login

function login() {
  // let email = document.getElementById('email-login').value;
  // let password = document.getElementById('password').value;

  // if (email === "admin@gmail.com" && password === "admin") {
  //     alert('Você está logado!');
  // } else {
  //     alert("Usuário ou senha não encontrado, caso não tenha cadastro, clique em Cadastre-se!")
  // }
  window.location.replace('../my-portfolio/index.html');
}
