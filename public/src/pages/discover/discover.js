// Modal 01
function openModal(){
    const modal = document.getElementById('modal-window');
    modal.classList.add('open-modal');

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'close-modal' || e.target.id == 'modal-window'){
            modal.classList.remove('open-modal')
        }
    })
}


// Modal 02
function openModal2(){
    const modal = document.getElementById('modal-window-02');
    modal.classList.add('open-modal');

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'close-modal' || e.target.id == 'modal-window-02'){
            modal.classList.remove('open-modal')
        }
    })
}

// Modal 03
function openModal3(){
    const modal = document.getElementById('modal-window-03');
    modal.classList.add('open-modal');

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'close-modal' || e.target.id == 'modal-window-03'){
            modal.classList.remove('open-modal')
        }
    })
}

// Modal 04
function openModal4(){
    const modal = document.getElementById('modal-window-04');
    modal.classList.add('open-modal');

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'close-modal' || e.target.id == 'modal-window-04'){
            modal.classList.remove('open-modal')
        }
    })
}