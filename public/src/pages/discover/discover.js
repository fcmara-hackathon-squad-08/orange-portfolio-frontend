// Função genérica para abrir modal
function openModal(modalId){
    const modal = document.getElementById(modalId);
    modal.classList.add('open-modal');

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'close-modal' || e.target.id == modalId){
            modal.classList.remove('open-modal')
        }
    })
}