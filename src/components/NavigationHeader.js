class NavigationHeader extends HTMLElement {
  constructor() {
    super()

  }
  connectedCallback() {
    this.innerHTML = `
      <header>
      <div class="logoContainer">
        <img src="../../imgs/logo_orange.png" class="logo">
      </div>
      <div class="menu">
        <div class="navigation">
          <a href="">Meus projetos</a>
          <a href="">Descobrir</a>
        </div>
        <div class="avatarAndNotificationBox">
          <img src="../../imgs/avatar.png" class="avatar">
          <span class="material-symbols-outlined">
            notifications
          </span>
        </div>
      </div>
    </header>
      `
  }

}

customElements.define('navigation-header', NavigationHeader);