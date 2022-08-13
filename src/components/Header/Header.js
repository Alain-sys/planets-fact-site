import React from 'react';
import './Header.css';
import hamburger from '../../assets/icon-hamburger.svg';
import chevron from '../../assets/icon-chevron.svg';

const Header = ({ dataJson, handleChangePlanets, currentPlanet }) => {
  // add and remove the class active to the .menu and .hamburger classes
  const navHamburger = () => {
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
  };

  // add animations on main elements when user click on nav buttons
  const animateMainElements = (index) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mainImage = document.querySelector('.image__planet');
    const mainImageGeology = document.querySelector('.image__geology');
    const description = document.querySelector('.description');
    const featuresValue = document.querySelectorAll('.features__value');

    if (currentPlanet !== dataJson[index]) {
      if (!mediaQuery || mediaQuery.matches) {
        return;
      } else {
        mainImage.animate(
          [
            { transform: 'scale(0.5) translateY(-25%)', opacity: '0' },
            { transform: 'scale(1) translateY(0%)', opacity: '1' },
          ],
          {
            duration: 500,
          }
        );

        description.animate(
          [
            { transform: ' translateX(-15%)', opacity: '0' },
            { transform: ' translateX(0%)', opacity: '1' },
          ],
          {
            duration: 500,
          }
        );

        featuresValue.forEach((element) => {
          element.animate([{ opacity: '0' }, { opacity: '1' }], {
            duration: 1000,
          });
        });

        if (mainImageGeology) {
          mainImageGeology.animate(
            [
              { transform: 'scale(0.5) translateY(-100%)', timing: 'ease-in-out', opacity: '0' },
              { transform: 'scale(1) translateY(0%)', opacity: '1' },
            ],
            {
              duration: 500,
            }
          );
        } else {
          return;
        }
      }
    } else {
      return;
    }
  };

  // return a button for each planet in the dataJson, when a button is clicked send it's index at the function handleChangePlanets in the App.js component
  const rows = dataJson.map((planet, index) => {
    return (
      <button
        type="button"
        // eslint-disable-next-line no-useless-concat
        className={`menu__items   menu__items-${planet.name.toLowerCase()} ${currentPlanet.name === planet.name ? 'active' : 'inactive'}`}
        key={index}
        onClick={() => {
          handleChangePlanets(index);
          animateMainElements(index);
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
