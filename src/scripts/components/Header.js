/** Composante Header de Timtools */
export default class Header {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.scrollLimit = document.querySelector('.header');
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;
    this.init();
    this.initNavMobile();
  }
  /**
   * Méthode d'initialisation
   */
  init() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  /**
   * Méthode de récupération du scroll
   */
  onScroll() {
    //Détermine la position initiale
    this.lastScrollPosition = this.scrollPosition;
    //Détermine la nouvelle position
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirectionState();
  }

  /**
   * Méthode de déterminant l'activation du scroll par rapport au Header
   */
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;

    // Détermine si la position du scroll sur la page est
    // supérieure à la limite du scroll pour la visibilité du Header
    if (this.scrollLimit.dataset.autoHide == 'false') {
      this.html.classList.remove('header-is-hidden');
    } else if (
      this.scrollPosition >
      scrollHeight * this.scrollLimit.dataset.scrollLimit
    ) {
      this.html.classList.add('header-is-hidden');
    }
  }

  /**
   * Méthode déterminant la visibilité du Header
   */
  setDirectionState() {
    // Détermine si le scroll remonte ou descend affin d'afficher
    // ou non le Header
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
      this.html.classList.remove('header-is-hidden');
    }
  }

  /**
   * Méthode déterminant si le menu Hamburger a été activé suite à un clic
   */
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  /**
   * Méthode qui permet d'afficher le menu mobile
   */
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
