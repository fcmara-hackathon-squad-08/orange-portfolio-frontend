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

