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

function createProjectOnProjectGrid(project) {
  const projectsGrid = document.getElementById('projects-grid');

  const projectDate = new Date(project.updatedAt);
  const formattedDate = dateFormatter.format(projectDate);

  const newProject = document.createElement('div');
  newProject.id = `${project.id}-project-card`;
  newProject.className = 'item project-card';
  newProject.innerHTML = `
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

function updateProjectDataOnLocalStorage(updatedProjects) {
  localStorage.setItem("projects-other", JSON.stringify(updatedProjects));
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

function showProjectDetailsOnProjectPreview(projectId) {
  getProjectWithId(projectId).then((selectedProject) => {
    console.log(...selectedProject);

    setProjectDataOnProjectPreview(selectedProject[0])
    toggleModal('project-preview-modal', true);

  }).catch((err) => {
    console.error(err);
  })
}

async function getTags() {
  const token = localStorage.getItem("token");

  const baseUrl = "https://sq8-orange-fcamra.onrender.com/tag";

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(baseUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`API error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (err) {
    throw new Error(err);
  }
}

async function loadValidTagsInSearchMenu() {
  const menu = document.getElementById("usage-menu-tags");

  try {
    const tags = await getTags();

    tags.forEach((tagObject) => {
      const mdMenuItem = `
      <md-menu-item onclick="addTagToMyProjectsSearchBar(this)">
          <div slot="headline">
            <md-suggestion-chip label="${tagObject.tag}" aria-label="${tagObject.tag}"></md-suggestion-chip>
          </div>
      </md-menu-item>
      `;

      menu.innerHTML = `${menu.innerHTML} ${mdMenuItem}`;
    })
  }
  catch (err) {
    console.error(err);
  }
}

async function listProjectsFilteredByTags(tags) {
  const apiURL = `https://sq8-orange-fcamra.onrender.com/project/list/tags?`;
  const token = localStorage.getItem('token');

  let requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  let params = new URLSearchParams();

  tags.forEach(tag => {
    params.append('tags', tag)
  });

  fetch(apiURL + new URLSearchParams(params), requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
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

async function getProjectsData() {
  const apiURL = `https://sq8-orange-fcamra.onrender.com/project/list/tags`;
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

function setProjectDataOnPage() {
  const projects = JSON.parse(localStorage.getItem("projects-other"));
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

async function setProjectDataOnLocalStorage() {
  try {
    const projects = await getProjectsData();

    localStorage.setItem("projects-other", JSON.stringify(projects));
  }
  catch (err) {
    console.error(err);
  }
}

async function isAuthenticated() {
  const token = localStorage.getItem('token');
  const projects = localStorage.getItem('projects-other');

  if (!token) {
    window.location.href = '../login/index.html';
  }

  if (!projects || projects.length < 1) {
    console.log("Project not saved on local storage, saving now.")
    await setProjectDataOnLocalStorage();
  }

  await loadValidTagsInSearchMenu()
  setProjectDataOnPage();

  console.log("User is authenticated!");
}

function logout() {
  // Backend route to actually cancel the token didn't work on the frontend. And we didn't have time to implement it.
  localStorage.removeItem('token');

  window.location.href = '../login/index.html';

}

isAuthenticated();


