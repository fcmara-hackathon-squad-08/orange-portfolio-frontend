const openModalButton = document.getElementById("add-project-button");
const modalContainer = document.getElementById("add-project-modal");
const closeModalButton = document.getElementById("cancel-add-project-button");


openModalButton.addEventListener('click', () => {
  modalContainer.classList.add('show');
});

closeModalButton.addEventListener('click', () => {
  modalContainer.classList.remove('show');
})