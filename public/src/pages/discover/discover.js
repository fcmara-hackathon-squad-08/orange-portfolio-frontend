//Função abrir menu no mobile
const anchorEl = document.body.querySelector('#mobile-nav-menu');
const menuEl = document.body.querySelector('#usage-menu');

anchorEl.addEventListener('click', () => {menuEl.open = !menuEl.open;});

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

