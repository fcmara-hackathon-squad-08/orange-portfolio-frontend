// Modal
function openModal(){
    const modal = document.getElementById('modal-window');
    modal.classList.add('open-modal');

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'close-modal' || e.target.id == 'modal-window'){
            modal.classList.remove('open-modal')
        }
    })
}