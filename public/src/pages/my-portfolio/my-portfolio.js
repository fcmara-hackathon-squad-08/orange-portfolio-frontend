const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'numeric',
  year: '2-digit'
});

const selectedImage = document.getElementById('selected-image');
const submitImageCardContent = document.getElementById('submit-image-card-content');

/** Code to make search for tags bar works */
const anchorElementTags = document.getElementById('select-tags-menu');

const menuElementTags = document.getElementById('usage-menu-tags');

anchorElementTags.addEventListener('click', () => {
  menuElementTags.open = !menuElementTags.open;
});

function oberveChangesInSelectedTags(callback) {

  const targetNode = document.getElementById('selected-tags');

  const mutationCallback = function () {
    callback(Array.from(targetNode.children))
  }

  const observer = new MutationObserver(mutationCallback);

  observer.observe(targetNode, { childList: true });

  return observer;
}

const SelectedTagsObserver = oberveChangesInSelectedTags((currentChildElements) => {
  const tags = currentChildElements.map(chip => { return chip.label });

  listProjectsFilteredByTags(tags);

})

function addTagToMyProjectsSearchBar(mdMenu) {
  const headlineDiv = mdMenu.querySelector('[slot="headline"]');

  const suggestionChip = headlineDiv.querySelector('md-suggestion-chip');

  const label = suggestionChip.getAttribute('label');

  const selectedTagsContainer = document.getElementById("selected-tags");

  selectedTagsContainer.innerHTML = `${selectedTagsContainer.innerHTML} <md-filter-chip label="${label}" removable></md-filter-chip>`
}

async function listProjectsFilteredByTags(tags) {
  const apiURL = `https://sq8-orange-fcamra.onrender.com/project/list/tags/user?`;
  const token = localStorage.getItem('token');

  let requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  const params = tags.map((tag) => {
    const tags = { tags: tag }
    return tags;
  });

  console.log({ ...params });

  fetch(apiURL + new URLSearchParams(...params), requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log("Successfully recovered projects:", data);
      if (!data) {
        updateProjectDataOnLocalStorage([]);
        return;
      }
      updateProjectDataOnLocalStorage(data);
      setProjectDataOnPage();
    })
    .catch((err) => {
      throw new Error(err)
    })
}

function chooseFile() {
  document.getElementById('fileInput').click();
}

function hideSubmitImageCardContent() {
  submitImageCardContent.classList.add("hidden");
}

function showSubmitImageCardContent() {
  submitImageCardContent.classList.remove("hidden");
}

function toggleModal(modalId, state, message) {
  const modal = document.getElementById(modalId);

  if (message != undefined && modalId == "success-modal") {
    let modalTitle = document.getElementById("modal-message");

    modalTitle.innerText = message;
  }

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
      document.getElementById("edit-selected-image").src = e.target.result
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function addProject() {
  const token = localStorage.getItem("token");

  const title = document.getElementById("title-input").value;
  const tagsInput = document.getElementById("tags-input");
  const link = document.getElementById("link-input").value;
  const description = document.getElementById("description-input").value;

  const tags = tagsInput.join(",");

  const projectDTO = {
    title,
    link,
    description,
    tags,
  }

  const formData = new FormData();

  formData.append("projectDto", JSON.stringify(projectDTO));
  formData.append("file", document.querySelector('input[type=file]').files[0]);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  };

  const params = tags.map((tagObject) => {
    return { tags: tagObject.tag }
  })

  fetch('https://sq8-orange-fcamra.onrender.com/project/add?' + new URLSearchParams(...params), requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('Project added successfully:', data);

      setProjectDataOnLocalStorage();
      createProjectOnProjectGrid(data);
      toggleModal('add-project-modal', false)
      toggleModal('success-modal', true)

    })
    .catch(error => {
      console.error('Error adding project:', error);

    });
}

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

function updateProjectDataOnLocalStorage(updatedProjects) {
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
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

function setProjectDataOnAddProjectPreview(mode) {
  let title;
  let tags;
  let link;
  let description;
  let bannerImage;

  if (mode == 'edit') {
    title = document.getElementById("edit-title-input").value;
    tags = document.getElementById("edit-tags-input").value;
    link = document.getElementById("edit-link-input").value;
    description = document.getElementById("edit-description-input").value;
    bannerImage = document.getElementById("edit-selected-image")
  }
  else {
    title = document.getElementById("title-input").value;
    tags = document.getElementById("tags-input").value;
    link = document.getElementById("link-input").value;
    description = document.getElementById("description-input").value;
    bannerImage = selectedImage;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const projectPreviewAvatar = document.getElementById("project-preview-avatar");
  const projectPreviewUsername = document.getElementById("project-preview-username");
  const projectPreviewDate = document.getElementById("project-preview-date");
  const projectPreviewMobileTitle = document.getElementById("project-preview-mobile-title");
  const projectPreviewWebTitle = document.getElementById("project-preview-web-title");
  const projectPreviewTags = document.getElementById("project-preview-tags");
  const projectPreviewBanner = document.getElementById("project-preview-banner");
  const projectPreviewDescription = document.getElementById("project-preview-description");
  const projectPreviewLink = document.getElementById("project-preview-link");

  projectPreviewAvatar.src = user.imageUrl;

  projectPreviewUsername.innerHTML = `${user.name} ${user.surname}`;

  projectPreviewDate.innerHTML = dateFormatter.format(new Date());

  projectPreviewMobileTitle.innerHTML = title;
  projectPreviewWebTitle.innerHTML = title;

  tags = tags.split(",");

  projectPreviewTags.innerHTML =
    tags.map(tag => `<md-suggestion-chip label="${tag}" aria-label="${tag}"></md-suggestion-chip>`).join('');

  projectPreviewBanner.src = bannerImage.src;

  projectPreviewDescription.innerHTML = description;
  projectPreviewLink.innerHTML = link;

  toggleModal('project-preview-modal', true);

}

function setProjectDataOnProjectPreview(project) {
  const projectPreviewAvatar = document.getElementById("project-preview-avatar");
  const projectPreviewUsername = document.getElementById("project-preview-username");
  const projectPreviewDate = document.getElementById("project-preview-date");
  const projectPreviewMobileTitle = document.getElementById("project-preview-mobile-title");
  const projectPreviewWebTitle = document.getElementById("project-preview-web-title");
  const projectPreviewTags = document.getElementById("project-preview-tags");
  const projectPreviewBanner = document.getElementById("project-preview-banner");
  const projectPreviewDescription = document.getElementById("project-preview-description");
  const projectPreviewLink = document.getElementById("project-preview-link");

  projectPreviewAvatar.src = project.user.imageUrl;

  projectPreviewUsername.innerHTML = `${project.user.name} ${project.user.surname}`;
  projectPreviewDate.innerHTML = dateFormatter.format(new Date(project.updatedAt));

  projectPreviewMobileTitle.innerHTML = project.title;
  projectPreviewWebTitle.innerHTML = project.title;

  projectPreviewTags.innerHTML =
    `${project.tags.map(tagObject => `<md-suggestion-chip label="${tagObject.tag}" aria-label="${tagObject.tag}"></md-suggestion-chip>`).join('')}`
    ;

  projectPreviewBanner.src = project.imageUrl;

  projectPreviewDescription.innerHTML = project.description;
  projectPreviewLink.innerHTML = project.link;

}

function setProjectDataOnEditProjectPreview(projectData) {
  const titleInput = document.getElementById("edit-title-input");
  const tagsInput = document.getElementById("edit-tags-input");
  const linkInput = document.getElementById("edit-link-input");
  const descriptionInput = document.getElementById("edit-description-input");
  const editSubmitImageCard = document.getElementById("edit-selected-image");

  titleInput.value = projectData.title;

  const tags = projectData.tags.map((tagObject) => {
    return tagObject.tag;
  }).join(",");

  tagsInput.value = tags;

  linkInput.value = projectData.link;

  editSubmitImageCard.src = projectData.imageUrl;

  descriptionInput.value = projectData.description;

}

async function getProjectWithId(projectId) {
  try {
    const projects = await getProjectsData();

    const selectedProject = projects.filter(
      (project) => (project.id == projectId)
    )

    return selectedProject;
  }
  catch (err) {
    throw new Error(err);
  }

}

function showProjectDetailsOnProjectPreview(projectId) {
  getProjectWithId(projectId).then((selectedProject) => {
    console.log(...selectedProject);

    setProjectDataOnProjectPreview(selectedProject[0])
    toggleModal('project-preview-modal', true);

  }).catch((err) => {
    console.error(err);
  })
}
let editProjectId;

function editProject() {
  const token = localStorage.getItem("token");

  const title = document.getElementById("edit-title-input").value;
  const tagsInput = document.getElementById("edit-tags-input").value;
  const link = document.getElementById("edit-link-input").value;
  const description = document.getElementById("edit-description-input").value;

  const tags = tagsInput.split(",");

  const projectDTO = {
    title,
    link,
    description,
  }

  const formData = new FormData();

  formData.append("projectDto", JSON.stringify(projectDTO));
  formData.append("file", document.querySelector('input[type=file]').files[0]);

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  };

  const params = new URLSearchParams();

  tags.forEach(tag => {
    params.append('tags', tag)
  });

  fetch(`https://sq8-orange-fcamra.onrender.com/project/${editProjectId}?` + new URLSearchParams(params), requestOptions)
    .then(response => response.json())
    .then(data => {
      setProjectDataOnLocalStorage();
      toggleModal('edit-project-modal', false)
      toggleModal('success-modal', true, "Edição concluída com sucesso!")
      listProjectsFilteredByTags([])
    })
    .catch(error => {
      console.error('Error adding project:', error);

    });
}

function openEditProjectModal(projectId) {
  editProjectId = projectId;

  getProjectWithId(projectId).then((selectedProject) => {
    console.log(...selectedProject);

    setProjectDataOnEditProjectPreview(selectedProject[0])
    toggleModal('edit-project-modal', true);

  }).catch((err) => {
    console.error(err);
  })
}

function openConfirmDeleteProjectModal(id) {
  toggleModal('confirm-modal', true);
  editProjectId = id;
}

function deleteProject() {
  const token = localStorage.getItem("token");

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  fetch(`https://sq8-orange-fcamra.onrender.com/project/${editProjectId}`, requestOptions)
    .then(response => {
      setProjectDataOnLocalStorage();
      toggleModal('confirm-modal', false)
      toggleModal('success-modal', true, "Projeto deletado com sucesso!")
      listProjectsFilteredByTags([])
    })
    .catch(error => {
      console.error('Error adding project:', error);
    });
}

function createProjectOnProjectGrid(project) {
  const projectsGrid = document.getElementById('projects-grid');

  const projectDate = new Date(project.updatedAt);
  const formattedDate = dateFormatter.format(projectDate);

  const newProject = document.createElement('div');
  newProject.id = `${project.id}-project-card`;
  newProject.className = 'item project-card';
  newProject.innerHTML = `
    <header>
      <md-filled-icon-button onclick=openEditProjectModal(${project.id}) class="edit-project-button">
      <md-icon>edit</md-icon>
    </md-filled-icon-button>
    <md-filled-icon-button onclick=openConfirmDeleteProjectModal(${project.id}) class="delete-project-button">
      <md-icon>delete</md-icon>
    </md-filled-icon-button>
    </header>
    <button type="button" onclick="showProjectDetailsOnProjectPreview(${project.id})" class="open-project-button">
      <img id="project-banner" src="${project.imageUrl}" class="project-banner" />
      <footer>
        <div class="user-info-container">
          <img id="project-avatar" src="${project.user.imageUrl}" class="avatar" />
          <p id="project-user-info" class="subtitle1">${project.user.name} ${project.user.surname} • ${formattedDate}</p>
        </div>
        <chip-set id="project-tags" class="tag-list">
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
  projectPlaceholder.id = `project-card-placeholder-id`;
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

  projectsGrid.append(projectPlaceholder);
  projectsGrid.innerHTML = `${projectsGrid.innerHTML} ${projectSkeleton}`
}

function setProjectDataOnPage() {
  const projects = JSON.parse(localStorage.getItem("projects"));
  let projectsGrid = document.getElementById("projects-grid");

  projectsGrid.innerHTML = "";

  if (projects.length < 1) {
    createProjectPlaceholderOnProjectGrid()
    return;
  }


  projects.forEach(project => {
    createProjectOnProjectGrid(project);
  });
}

function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../login/index.html';
  }

  if (!localStorage.getItem('user')) {
    console.log("User not saved on local storage, saving now.");
    setUserDataOnLocalStorage();
  }

  if (!localStorage.getItem("projects") || localStorage.getItem("projects").length < 1) {
    console.log("Project not saved on local storage, saving now.")
    setProjectDataOnLocalStorage();
  }

  setUserDataOnPage();
  setProjectDataOnPage();


  console.log("User is authenticated!");
}

isAuthenticated();
