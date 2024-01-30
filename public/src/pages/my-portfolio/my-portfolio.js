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

function openAddProjectModal() {
  addProjectModal.setAttribute("open", true);
}

function closeAddProjectModal() {
  addProjectModal.removeAttribute("open");
}

function openPreviewModal() {
  previewModal.setAttribute("open", true);
}

function closePreviewModal() {
  previewModal.removeAttribute("open");
}

function openSuccessModal() {
  successModal.setAttribute("open", true);
}

function closeSuccessModal() {
  successModal.removeAttribute("open");
}

function submitProject() {
  closeAddProjectModal();
  openSuccessModal();
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
