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

function addProject() {
  const project = {
    title: "Ecommerce One Page",
    link: "https://gumroad.com/products/wxCSL",
    description: "Description of the project...",
    imageUrl: "URL of the project image",
    tags: ["UX", "WEB"]

  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  };


  fetch('https://sq8-orange-fcamra.onrender.com/swagger-ui/project/add', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('Project added successfully:', data);


      toggleModal('success-modal', true);


      addProjectToBody(data);
    })
    .catch(error => {
      console.error('Error adding project:', error);

    });
}

function showProjectDetails(projectId) {
  console.log(`Show details for project with ID ${projectId}`);
}


/**
 * Verificar se o usuário está autenticado OK
  * Se ele não estiver, mandar ele para /login OK
  * Se ele estiver, buscar dados da rota de projects/me OK
  * 
  * Enviar dados para a navBar OK
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

function setProjectDataOnLocalStorage() {
  getProjectsData().then((projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }).catch((err) => {
    console.error(err);
  })
}

function setUserDataOnLocalStorage() {
  getUserData().then((user) => {
    localStorage.setItem("user", JSON.stringify(user));
  }).catch((err) => {
    console.error(err);
  })
}

function setUserDataOnPage() {
  let userImage = document.getElementById("user-image");
  let userName = document.getElementById("user-name");

  let userData = JSON.parse(localStorage.getItem("user"));

  if (userImage.src != userData.imageUrl) {
    userImage.src = userData.imageUrl;
  }
  if (userName.innerText != `${userData.name} ${userData.surname}`) {
    userName.innerText = `${userData.name} ${userData.surname}`;
  }
}

function createProjectOnProjectGrid(project) {
  const projectsGrid = document.getElementById('projects-grid');

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    month: 'numeric',
    year: '2-digit'
  });

  const projectDate = new Date(project.updatedAt);
  const formattedDate = dateFormatter.format(projectDate);

  const newProject = document.createElement('div');
  newProject.id = `${project.id}-project-card`;
  newProject.className = 'item project-card';
  newProject.innerHTML = `
    <md-filled-icon-button class="edit-project-button">
      <md-icon>edit</md-icon>
    </md-filled-icon-button>
    <button type="button" onclick="showProjectDetails(${project.id})" class="open-project-button">
      <img src="${project.imageUrl}" class="project-banner" />
      <footer>
        <div class="user-info-container">
          <img src="${project.user.imageUrl}" class="avatar" />
          <p class="subtitle1">${project.user.name} ${project.user.surname} • ${formattedDate}</p>
        </div>
        <chip-set class="tag-list">
          ${project.tags.map(tagObject => `<md-suggestion-chip label="${tagObject.tag}" aria-label="${tagObject.tag}"></md-suggestion-chip>`).join('')}
        </chip-set>
      </footer>
    </button>
  `;

  projectsGrid.appendChild(newProject);
}

function createProjectPlaceholderOnProjectGrid() {
  const projectsGrid = document.getElementById('projects-grid');

  const projectPlaceholder = document.createElement('div');
  projectPlaceholder.id = `${project.id}-project-card`;
  projectPlaceholder.className = 'item project-card';
  projectPlaceholder.innerHTML = `
    <button id="project-card-placeholder" onclick="toggleModal('add-project-modal', true)" class="hidden">
      <div class="item project-card-placeholder">
        <img src="../../../static/images/filter.svg" class="filter-icon">
        <div>
          <p class="title">Adicione seu primeiro projeto</p>
          <p class="description">Compartilhe seu talento com milhares de pessoas</p>
        </div>
      </div>
  </button>
  `;

  const projectSkeleton = `
    <div class="item project-skeleton"></div>
    <div class="item project-skeleton"></div>
  `;

  projectsGrid.appendChild(newProject);
  projectsGrid.appendChild(projectSkeleton);
}
function setProjectDataOnPage() {
  const projects = JSON.parse(localStorage.getItem("projects"));

  if (projects.length < 1) {
    createProjectPlaceholderOnProjectGrid()
    return;
  }

  projects.forEach(project => {
    createProjectOnProjectGrid(project);
  });
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

  if (!localStorage.getItem('user')) {
    console.log("User not saved on local storage, saving now.");
    setUserDataOnLocalStorage();
  }

  if (!localStorage.getItem("projects")) {
    console.log("Project not saved on local storage, saving now.")
    setProjectDataOnLocalStorage();
  }

  setUserDataOnPage();
  setProjectDataOnPage();


  console.log("User is authenticated!");
}

isAuthenticated();

