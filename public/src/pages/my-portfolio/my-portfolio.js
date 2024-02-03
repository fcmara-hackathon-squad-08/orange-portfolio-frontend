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

function toggleModal(modalId, state){
  const modal = document.getElementById(modalId);

  if(!modal){
    console.error(`Couldn't find modal with id ${modalId}`);
    return;
  }

  if(state){
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

function addProjectToBody(project) {

  const bodyOfPage = document.getElementById('body-of-page');

  const newProject = document.createElement('div');
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
          <p class="subtitle1">${project.user.name} ${project.user.surname} • ${project.createdAt}</p>
        </div>
        <chip-set class="tag-list">
          ${project.tags.map(tag => `<md-suggestion-chip label="${tag}" aria-label="${tag}"></md-suggestion-chip>`).join('')}
        </chip-set>
      </footer>
    </button>
  `;

  bodyOfPage.appendChild(newProject);
}

function showProjectDetails(projectId) {
  console.log(`Show details for project with ID ${projectId}`);
}