// Password visibility
document.querySelector('md-icon-button').addEventListener('click', () => {
  const input = document.querySelector('#password');
  const eye = document.querySelector('#eye');
  const eyeOff = document.querySelector('#eyeOff');
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

async function registerUserOnDB(userData) {

  const apiURL = `https://sq8-orange-fcamra.onrender.com/user/register`;

  let requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }


  const response = await fetch(apiURL, requestOptions)
  const data = await response.json()

  return data;
}

function register(event) {

  // Impede que a página seja recarregada
  event.preventDefault();

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validação dos campos de entrada
  if (!firstname || !lastname || !email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const data = {
    name: firstname,
    surname: lastname,
    email,
    password,
  }

  registerUserOnDB(data).then((response) => {
    // Exibir a mensagem de sucesso
    const successMessage = document.getElementById('success');
    successMessage.style.display = 'block';

    // Redirecionar para a tela de login após 2 segundos
    setTimeout(() => {
      successMessage.style.display = 'none';
      window.location.href = '../login/index.html';
    }, 2000);
  })




}

