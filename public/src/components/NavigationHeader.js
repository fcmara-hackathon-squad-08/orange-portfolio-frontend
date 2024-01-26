class NavigationHeader extends HTMLElement {
  constructor() {
    super()

  }
  connectedCallback() {
    this.innerHTML = `
      <header>
      <div class="logoContainer">
        <img src="../../static/images/logo_orange.png" class="logo">
      </div>
      <div class="menu">
        <div class="navigation">
          <a href="../pages/my-portfolio.html">Meus projetos</a>
          <a href="../pages/discover.html">Descobrir</a>
        </div>
        <div class="avatarAndNotificationBox">
          <img src="../../static/images/avatar.png" class="avatar">
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