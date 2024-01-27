const addProjectModal = document.getElementById("add-project-modal");

let selectedImage = document.getElementById("selected-image");
const submitImageCardContent = document.getElementById("submit-image-card-content");

function uploadImage(input) {
  hideSubmitImageCardContent()
  if (input.files && input.files[0]) {
    let reader = new FileReader();


    reader.onload = function (e) {
      selectedImage.src = e.target.result
    }

    reader.readAsDataURL(input.files[0]);

  }
}

function chooseFile() {
  document.getElementById("fileInput").click();
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
