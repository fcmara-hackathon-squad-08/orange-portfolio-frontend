//Vizibilidade da senha
const password = document.getElementById('password');
const passwordVisibilityIcon = document.getElementById ('passwordVisibilityIcon');

function TogglePasswordVisibility(){
    if(password.type === 'password'){
        password.setAttribute('type', 'text');
        passwordVisibilityIcon.classList.add('hide');
    }else{
        password.setAttribute('type', 'password');
        passwordVisibilityIcon.classList.remove('hide')
    }
}

//Validação do formulário

let firstname = document.querySelector('#firstname');
let labelFirstname = document.querySelector('#labelFirstname');
let validFirstname = false;

let lastname = document.querySelector('#lastname');
let labelLastname = document.querySelector('#labelLastname');
let validLastname = false;

let emailAdd = document.querySelector('#email-add');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let passwordAdd = document.querySelector('#password');
let labelPassword = document.querySelector('#labelPassword');
let validPassword = false;

firstname.addEventListener('keyup', () =>{
    if(firstname.value.length <= 2){
        labelFirstname.setAttribute('style', 'color: red');
        labelFirstname.innerHTML = ('Nome * Insira no mínimo 3 caracteres');
        firstname.setAttribute('style', 'border-color: red');
        validFirstname = false;
    }else{
        labelFirstname.setAttribute('style', 'color: green');
        labelFirstname.innerHTML = ('Nome *');
        firstname.setAttribute('style', 'border-color: green');
        validFirstname = true;
    }
});

lastname.addEventListener('keyup', () =>{
    if(lastname.value.length <= 3){
        labelLastname.setAttribute('style', 'color: red');
        labelLastname.innerHTML = ('Sobrenome * Insira no mínimo 4 caracteres');
        lastname.setAttribute('style', 'border-color: red');
        validLastname = false;
    }else{
        labelLastname.setAttribute('style', 'color: green');
        labelLastname.innerHTML = ('Sobrenome *');
        lastname.setAttribute('style', 'border-color: green');
        validLastname = true;
    }
});

emailAdd.addEventListener('keyup', () =>{
    if(emailAdd.value.length <= 5){
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = ('Email address * Insira um email válido');
        emailAdd.setAttribute('style', 'border-color: red');
        validEmail = false;
    }else{
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = ('Email address');
        emailAdd.setAttribute('style', 'border-color: green');
        validEmail = true;
    }
});

passwordAdd.addEventListener('keyup', () =>{
    if(passwordAdd.value.length <= 5){
        labelPassword.setAttribute('style', 'color: red');
        labelPassword.innerHTML = ('Password * Insira no mínimo 6 caracteres');
        passwordAdd.setAttribute('style', 'border-color: red');
        validPassword = false;
    }else{
        labelPassword.setAttribute('style', 'color: green');
        labelPassword.innerHTML = ('Password');
        passwordAdd.setAttribute('style', 'border-color: green');
        validPassword = true;
    }
});

// Mensagem de confirmação de cadastro
let success = document.querySelector('#success');

//Função de cadastro

function register(){
    if(validFirstname && validLastname && validEmail && validPassword){

        success.setAttribute('style', 'visibility: visible');
        
        setTimeout(() => {
            window.location.href = 'login.html'
        }, 2000)
        
        
    }else{
        alert('Preencha os dados corretamente!');
    }
}