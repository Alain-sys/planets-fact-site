import React from 'react';
import { useRef } from 'react';
import './Header.css';
import hamburger from '../../assets/icon-hamburger.svg';
import chevron from '../../assets/icon-chevron.svg';

const Header = ({
  dataJson,
  handleChangePlanets,
  currentPlanet,
  mainImageRef,
  mainImageGeologyRef,
  descriptionRef,
  featuresValueRef,
  menuItemsRef,
}) => {
  const menuHamburgerRef = useRef(null);
  const logoHamburgerRef = useRef(null);

  // add and remove the class active to the .menu and .hamburger classes
  const navHamburger = () => {
    const menuHamburgerClass = menuHamburgerRef.current.classList;
    const logoHamburgerClass = logoHamburgerRef.current.classList;
    menuHamburgerClass.toggle('active');
    logoHamburgerClass.toggle('active');

    // remove .active class when a nav button is clicked
    for (let i = 0; i < menuItemsRef.current.length; i++) {
      menuItemsRef.current[i].addEventListener('click', () => {
        menuHamburgerClass.remove('active');
        logoHamburgerClass.remove('active');
      });
    }
  };

  // add animations on main elements when user click on nav buttons
  const animateMainElements = (index) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (currentPlanet !== dataJson[index]) {
      if (!mediaQuery || mediaQuery.matches) {
        return;
      } else {
        if (mainImageRef.current !== null) {
          mainImageRef.current.animate(
            [
              { transform: 'scale(0.5) translateY(-25%)', opacity: '0' },
              { transform: 'scale(1) translateY(0%)', opacity: '1' },
            ],
            {
              duration: 500,
            }
          );
        }
        if (descriptionRef.current !== null) {
          descriptionRef.current.animate(
            [
              { transform: ' translateX(-15%)', opacity: '0' },
              { transform: ' translateX(0%)', opacity: '1' },
            ],
            {
              duration: 500,
            }
          );
        }

        featuresValueRef.current.forEach((element) => {
          element.animate([{ opacity: '0' }, { opacity: '1' }], {
            duration: 1000,
          });
        });
        if (mainImageGeologyRef.current !== null) {
          mainImageGeologyRef.current.animate(
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
        ref={(el) => (menuItemsRef.current[index] = el)}
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
      <nav ref={menuHamburgerRef} className="menu">
        {rows}
      </nav>
      <img ref={logoHamburgerRef} className="hamburger" src={hamburger} alt="menu hamburger" onClick={navHamburger} />
    </header>
  );
};

export default Header;
