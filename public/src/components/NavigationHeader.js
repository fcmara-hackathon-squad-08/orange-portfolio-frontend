class NavigationHeader extends HTMLElement {
  constructor() {
    super()

  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const fetchNavigationHeaderTemplate = async () => {

      var templates = document.createElement('template')
      templates.innerHTML = await (await fetch('../../components/navigation-header-template.html')).text()

      var template = templates.content.querySelector('#navigation-header-template');

      return template;
    }

    fetchNavigationHeaderTemplate().then((template) => {
      let navigationHeaderTemplate = template;

      shadow.appendChild(navigationHeaderTemplate.content.cloneNode(true));

      customElements.whenDefined('navigation-header').then(() => {
        const navBar = document.querySelector("navigation-header").shadowRoot;

        const anchorEl = navBar.querySelector('#mobile-nav-menu');

        const menuEl = navBar.querySelector('#usage-menu');

        anchorEl.addEventListener('click', () => {
          menuEl.open = !menuEl.open;
        });

        /**
         * Pegar dados do usuário do localStorage.
         * Substituir dados no frontend.
        */
        const userImg = navBar.getElementById("user-image");
        const userName = navBar.getElementById("user-name");
        const userEmail = navBar.getElementById("user-email");

        const userData = JSON.parse(localStorage.getItem("user"));

        if (userImg.src != userData.imageUrl) {
          userImg.src = userData.imageUrl;
        }
        if (userName.innerText != `${userData.name} ${userData.surname}`) {
          userName.innerText = `${userData.name} ${userData.surname}`;
        }
        if (userEmail.innerText != userData.email) {
          userEmail.innerText = userData.email;
        }
      })
    });
  }
}

customElements.define('navigation-header', NavigationHeader);