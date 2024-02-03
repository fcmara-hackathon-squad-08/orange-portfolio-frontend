const addProjectModal = document.getElementById('add-project-modal');

const selectedImage = document.getElementById('selected-image');
const submitImageCardContent = document.getElementById('submit-image-card-content');

const previewModal = document.getElementById('project-preview-modal');

const successModal = document.getElementById('success-modal');

function chooseFile() {
  document.getElementById('fileInput').click();
}

function hideSubmitImageCardContent() {
  submitImageCardContent.setAttribute("open", true);
}

function showSubmitImageCardContent() {
  submitImageCardContent.removeAttribute("open");
}

function submitProject() {
  toggleModal('add-project-modal', false)
  toggleModal('success-modal', true)
}

function toggleModal(modalId, state) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    console.error(`Couldn't find modal with id ${modalId}`);
    return;
  }

  if (state) {
    modal.setAttribute('open', true);
  }
  else {
    modal.removeAttribute('open');
  }
}

function uploadImage(input) {
  hideSubmitImageCardContent();
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      selectedImage.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

/**
 * Verificar se o usuário está autenticado
  * Se ele não estiver, mandar ele para /login
  * Se ele estiver, buscar dados da rota de projects/me
  * 
  * Enviar dados para a navBar
  * 
  * Alterar dados no Perfil
  * 
  * Se o usuário não tiver nenhum projeto renderizar placeholder
  * Se o usuário tiver projeto, renderizá-los no project-grid
  * 
  * Ao clicar no projeto, popular project-preview com dados do projeto
  * 
  * Criar função de adicionar projetos pelo addProjectModal
 */
async function getUserData() {
  const apiURL = `https://sq8-orange-fcamra.onrender.com/user/me`;
  const token = localStorage.getItem('token');

  let requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  try {
    const response = await fetch(apiURL, requestOptions);
    const data = await response.json();

    return data;
  }
  catch (err) {
    throw new Error(err);
  }

}

async function getProjectsData() {
  const apiURL = `https://sq8-orange-fcamra.onrender.com/project/list/tags/user`;
  const token = localStorage.getItem('token');

  let requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  try {
    const response = await fetch(apiURL, requestOptions);
    const data = await response.json();

    return data;
  }
  catch (err) {
    throw new Error(err);
  }

}

function setUserDataOnLocalStorage() {
  getUserData().then((user) => {
    localStorage.setItem("user", JSON.stringify(user));
  }).catch((err) => {
    console.error(err);
  })
}

function isUserDataOnLocalStorage() {
  if (localStorage.getItem('user')) {
    return true;
  }
  return false;
}
function isAuthenticated() {
  // Check if the user is authenticated 
  const token = localStorage.getItem('token');
  if (!token) {
    // User is not authenticated, redirect to login page 
    window.location.href = '../login/index.html';
  }

  /**
   * Se os dados do usuário não estão inseridos ainda, buscar na API
   * Salvar dados no localStorage
   * Definir dados na página.
   */

  if (!isUserDataOnLocalStorage()) {
    console.log("User not saved on local storage, saving now");
    setUserDataOnLocalStorage();
  }

  console.log("User is authenticated!");
}

isAuthenticated();