// Vizibilidade da senha
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

const register = (event) => {
  // Impede que a página seja recarregada
  event.preventDefault();

  const firstname = document.getElementById('fristname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validação dos campos de entrada
  if (!firstname || !lastname || !email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Exibir a mensagem de sucesso
  const successMessage = document.getElementById('success');
  successMessage.style.display = 'block';

  // Redirecionar para a tela de login após 2 segundos
  setTimeout(() => {
    successMessage.style.display = 'none';
    window.location.href = '../login/index.html';
  }, 2000);
}
