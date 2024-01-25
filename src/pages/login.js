//ìcone de vizibilidade da senha
const password = document.getElementById('password');
const icon = document.getElementById ('icon');

function showHide(){
    if(password.type === 'password'){
        password.setAttribute('type', 'text');
        icon.classList.add('hide');
    }else{
        password.setAttribute('type', 'password');
        icon.classList.remove('hide')
    }
}

//Validação do Login

function login(){
    let email = document.getElementById('email-login').value;
    let password = document.getElementById('password').value;

    if(email === "admin@gmail.com" && password === "admin"){
        alert('Você está logado!');
    }else{
        alert("Usuário ou senha não encontrado, caso não tenha cadastro, clique em Cadastre-se!")
    }
}