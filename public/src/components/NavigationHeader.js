class NavigationHeader extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = `
    <script>
    const anchorEl = document.body.querySelector('#mobile-nav-menu');
    
    const menuEl = document.body.querySelector('#usage-menu');

    anchorEl.addEventListener('click', () => {menuEl.open = !menuEl.open;});

    </script>
    <header>
    <md-icon-button id="mobile-nav-menu">
      <md-icon>menu</md-icon>
      <nav id="usage-anchor">
        <md-menu id="usage-menu" anchor="usage-anchor">
          <md-menu-item>
            <div slot="headline">
              <p class="body-text1">Camila</p>
              <p class="body-text2 low-opacity">Camila.ux@gmail.com</p>
            </div>
          </md-menu-item>
          <md-divider inset></md-divider>
          <md-menu-item>
            <div slot="headline">
              <a href="../../pages/my-portfolio/index.html">Meus projetos</a>
            </div>
          </md-menu-item>
          <md-menu-item>
            <div slot="headline">
              <a href="../../pages/discover/index.html">Descobrir</a>
            </div>
          </md-menu-item>
          <md-divider inset></md-divider>
          <md-menu-item>
            <div class="logout-container" slot="headline">
              <md-button>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
                Sair
              </md-button>
            </div>
          </md-menu-item>
        </md-menu>
      </nav>
    </md-icon-button>
    <div class="logoContainer">
      <img src="../../../static/images/logo_orange.png" class="logo">
    </div>
    <div id="web-nav-menu" class="menu">
      <nav class="navigation">
        <a href="../../pages/my-portfolio/index.html">Meus projetos</a>
        <a href="../../pages/discover/index.html">Descobrir</a>
      </nav>
      <div class="avatarAndNotificationBox">
        <img src="../../../static/images/avatar.png" class="avatar">
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