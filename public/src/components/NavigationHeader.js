class NavigationHeader extends HTMLElement {
  constructor() {
    super()
       
  }
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});

     const fetchNavigationHeaderTemplate = async () => {

      var templates = document.createElement( 'template' )
      templates.innerHTML = await ( await fetch( '../../components/navigation-header-template.html' ) ).text()
    
      var template = templates.content.querySelector( '#navigation-header-template' );
      
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
      })
    });
  }
}

customElements.define('navigation-header', NavigationHeader);