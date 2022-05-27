import './Header.css';
import hamburger from '../../assets/icon-hamburger.svg';
import chevron from '../../assets/icon-chevron.svg';

const Header = (props) => {
  const currentPlanetName = props.currentPlanet.name;

  // add and remove the class active to the .menu and .hamburger classes
  function navHamburger() {
    const menuHamburger = document.querySelector('.menu');
    const logoHamburger = document.querySelector('.hamburger');
    const menuHamburgerClasse = menuHamburger.classList;
    const logoHamburgerClasse = logoHamburger.classList;
    menuHamburgerClasse.toggle('active');
    logoHamburgerClasse.toggle('active');

    // remove .active class when a nav button is clicked
    const menuItems = document.querySelectorAll('.menu__items');
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('click', () => {
        menuHamburgerClasse.remove('active');
        logoHamburgerClasse.remove('active');
      });
    }
  }

  // return a button for each planet in the dataJson, when a button is clicked send it's index at the function handleChangePlanets in the App.js component
  const rows = props.dataJson.map((planet, index) => {
    return (
      <button
        type="button"
        // eslint-disable-next-line no-useless-concat
        className={`menu__items   menu__items-${planet.name.toLowerCase()} ${currentPlanetName === planet.name ? 'active' : 'inactive'}`}
        key={index}
        onClick={() => {
          props.handleChangePlanets(index);
        }}>
        {planet.name}
        <img className="menu__images" src={chevron} alt="chevron icon" />
      </button>
    );
  });

  return (
    <header>
      <h1 className="logo">The planets</h1>
      <nav className="menu">{rows}</nav>
      <img className="hamburger" src={hamburger} alt="menu hamburger" onClick={navHamburger} />
    </header>
  );
};

export default Header;
