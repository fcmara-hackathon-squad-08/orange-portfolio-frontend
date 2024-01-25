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

