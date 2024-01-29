const addProjectModal = document.getElementById('add-project-modal');

const selectedImage = document.getElementById('selected-image');
const submitImageCardContent = document.getElementById('submit-image-card-content');

const previewModal = document.getElementById('project-preview-modal');

const successModal = document.getElementById('success-modal');

function chooseFile() {
  document.getElementById('fileInput').click();
}

function hideSubmitImageCardContent() {
  submitImageCardContent.classList.add('hidden');
}

function showSubmitImageCardContent() {
  submitImageCardContent.classList.remove('hidden');
}

function openAddProjectModal() {
  addProjectModal.classList.add('show');
}

function closeAddProjectModal() {
  addProjectModal.classList.remove('show');
}

function openPreviewModal() {
  previewModal.classList.add('show');
}

function closePreviewModal() {
  previewModal.classList.remove('show');
}

function openSuccessModal() {
  successModal.classList.add('show');
}

function closeSuccessModal() {
  successModal.classList.remove('show');
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