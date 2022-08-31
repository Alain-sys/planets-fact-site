import React from 'react';
import { useEffect, useState } from 'react';
import './Main.css';
import icon from '../../assets/icon-source.svg';

// hook for reponsive button
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    // set initial value
    const mediaWatcher = window.matchMedia(query);
    if (mediaWatcher.matches !== matches) {
      setMatches(mediaWatcher.matches);
    }
    //watch for updates
    const updateMatches = () => {
      setMatches(mediaWatcher.matches);
    };
    mediaWatcher.addEventListener('change', updateMatches);
    // clean up
    return () => {
      mediaWatcher.removeEventListener('change', updateMatches);
    };
  }, [matches, query]);
  return matches;
};

const Images = ({ dataJson, button, mainImageRef, mainImageGeologyRef }) => {
  // take the property "image" in the buttonState
  const imageName = button.image;
  return (
    <div className="image">
      {/*if the string of the property image is "geology" return the planet image and its geology image */}
      {button.image === 'geology' ? (
        <>
          <img
            ref={mainImageRef}
            className={`image__planet image__planet-${dataJson.name.toLowerCase()}`}
            src={process.env.PUBLIC_URL + dataJson.images.planet}
            alt={dataJson.name}
          />
          <img ref={mainImageGeologyRef} className="image__geology" src={process.env.PUBLIC_URL + dataJson.images[imageName]} alt={dataJson.name} />
        </>
      ) : (
        // else return the planet image only
        <img
          ref={mainImageRef}
          className={`image__planet image__planet-${dataJson.name.toLowerCase()}`}
          src={process.env.PUBLIC_URL + dataJson.images[imageName]}
          alt={dataJson.name}
        />
      )}
    </div>
  );
};

const Description = ({ dataJson, button, descriptionRef }) => {
  const buttonCategory = button.category;
  // return the description of the planet
  return (
    <div className={`description description-${dataJson.name.toLowerCase()}`}>
      <h2 className="description__title">{dataJson.name}</h2>
      {/* return the text of the planet in relation to the clicked button which is stored in the state */}
      <p ref={descriptionRef} className="description__text">
        {dataJson[buttonCategory].content}
      </p>
      <div className="description__source">
        <p>Source :</p>
        <a className="description__link" href={dataJson[buttonCategory].source}>
          <p>Wikipedia</p>
          <img src={icon} alt="link for more informations" />
        </a>
      </div>
    </div>
  );
};

const Button = ({ buttonsTab, buttonCategories, content, buttonState, mainImageRef, descriptionRef }) => {
  const mediaQueryButton = useMediaQuery('(max-width: 767px)');
  const buttonStateName = buttonState.category;

  // add animations on main elements when user click on main buttons
  const animateMainElements = (buttonCategory) => {
    if (buttonStateName !== buttonCategory.category) {
      if (mainImageRef.current !== null) {
        mainImageRef.current.animate([{ opacity: '0' }, { opacity: '1' }], {
          duration: 1000,
        });
      }

      descriptionRef.current.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: 1000,
      });
    } else {
      return;
    }
  };
  // map the array buttonsTab for return three buttons with an unique key
  const rows = buttonsTab.map((buttonCategory, index) => {
    return (
      <button
        type="button"
        className={`categories__buttons categories__buttons-${content.name.toLowerCase()} ${
          buttonStateName === buttonCategory.category ? 'active' : 'inactive'
        }`}
        key={index}
        // call the function buttonCategory for send the clicked button and its key
        onClick={() => {
          buttonCategories(buttonCategory);
          animateMainElements(buttonCategory);
        }}>
        {mediaQueryButton ? buttonCategory.textMobile : buttonCategory.text}
        <span
          className={`categories__styled-buttons categories__styled-buttons-${content.name.toLowerCase()} ${
            buttonStateName === buttonCategory.category ? 'active' : 'inactive'
          }`}></span>
      </button>
    );
  });

  return <div className="categories">{rows}</div>;
};

const Main = ({ dataJson, mainImageRef, mainImageGeologyRef, descriptionRef }) => {
  const mediaQueryButton = useMediaQuery('(max-width: 767px)');
  // array which have the necessary informations for create the buttons in the component Button
  const buttonsTab = [
    { text: 'overview', textMobile: 'overview', category: 'overview', image: 'planet' },
    { text: 'internal structure', textMobile: 'structure', category: 'structure', image: 'internal' },
    { text: 'surface geology', textMobile: 'surface', category: 'geology', image: 'geology' },
  ];

  // initial button
  const [buttonState, setbuttonState] = useState(buttonsTab[0]);

  // update the state with the appropriate button which was clicked

  const buttonCategory = (buttonCategory) => {
    if (buttonState.category !== buttonCategory.category) {
      setbuttonState(buttonCategory);
    } else {
      return;
    }
  };

  // if the window is under 48em change the position of the Button component
  if (mediaQueryButton) {
    return (
      <main>
        <Button
          buttonsTab={buttonsTab}
          buttonCategories={buttonCategory}
          content={dataJson}
          buttonState={buttonState}
          mainImageRef={mainImageRef}
          descriptionRef={descriptionRef}
        />
        <Images dataJson={dataJson} button={buttonState} mainImageRef={mainImageRef} mainImageGeologyRef={mainImageGeologyRef} />

        <div className="content">
          <Description dataJson={dataJson} button={buttonState} descriptionRef={descriptionRef} />
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <Images dataJson={dataJson} button={buttonState} mainImageRef={mainImageRef} mainImageGeologyRef={mainImageGeologyRef} />

        <div className="content">
          <Description dataJson={dataJson} button={buttonState} descriptionRef={descriptionRef} />
          <Button
            buttonsTab={buttonsTab}
            buttonCategories={buttonCategory}
            content={dataJson}
            buttonState={buttonState}
            mainImageRef={mainImageRef}
            descriptionRef={descriptionRef}
          />
        </div>
      </main>
    );
  }
};

export default Main;
