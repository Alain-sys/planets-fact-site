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

const Images = (props) => {
  // take the property "image" in the buttonState
  const imageName = props.button.image;
  return (
    <div className="image">
      {/*if the string of the property image is "geology" return the planet image and its geology image */}
      {props.button.image === 'geology' ? (
        <>
          <img
            className={`image__planet image__planet-${props.content.name.toLowerCase()}`}
            src={process.env.PUBLIC_URL + props.content.images.planet}
            alt={props.content.name}
          />
          <img className="image__geology" src={process.env.PUBLIC_URL + props.content.images[imageName]} alt={props.content.name} />
        </>
      ) : (
        // else return the planet image only
        <img
          className={`image__planet image__planet-${props.content.name.toLowerCase()}`}
          src={process.env.PUBLIC_URL + props.content.images[imageName]}
          alt={props.content.name}
        />
      )}
    </div>
  );
};

const Description = (props) => {
  const buttonCategory = props.button.category;
  // return the description of the planet
  return (
    <div className={`description description-${props.content.name.toLowerCase()}`}>
      <h2 className="description__title">{props.content.name}</h2>
      {/* return the text of the planet in relation to the clicked button which is stored in the state */}
      <p className="description__text">{props.content[buttonCategory].content}</p>
      <div className="description__source">
        <p>Source :</p>
        <a className="description__link" href={props.content[buttonCategory].source}>
          <p>Wikipedia</p>
          <img src={icon} alt="link for more informations" />
        </a>
      </div>
    </div>
  );
};

const Button = (props) => {
  const mediaQueryButton = useMediaQuery('(max-width: 767px)');
  const buttonStateName = props.buttonState.category;

  // add animations on main elements when user click on main buttons
  const animateMainElements = (buttonCategory) => {
    if (buttonStateName !== buttonCategory.category) {
      const mainImage = document.querySelector('.image__planet');
      mainImage.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: 1000,
      });

      const mainText = document.querySelector('.description__text');
      mainText.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: 1000,
      });
    } else {
      return;
    }
  };
  // map the array buttonsTab for return three buttons with an unique key
  const rows = props.buttonsTab.map((buttonCategory, index) => {
    return (
      <button
        type="button"
        className={`categories__buttons categories__buttons-${props.content.name.toLowerCase()} ${
          buttonStateName === buttonCategory.category ? 'active' : 'inactive'
        }`}
        key={index}
        // call the function buttonCategory for send the clicked button and its key
        onClick={() => {
          props.buttonCategory(buttonCategory);
          animateMainElements(buttonCategory);
        }}>
        {mediaQueryButton ? buttonCategory.textMobile : buttonCategory.text}
        <span
          className={`categories__styled-buttons categories__styled-buttons-${props.content.name.toLowerCase()} ${
            buttonStateName === buttonCategory.category ? 'active' : 'inactive'
          }`}></span>
      </button>
    );
  });

  return <div className="categories">{rows}</div>;
};

const Main = (props) => {
  const mediaQueryButton = useMediaQuery('(max-width: 767px)');
  const content = props.dataJson;
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
        <Button buttonsTab={buttonsTab} buttonCategory={buttonCategory} content={content} buttonState={buttonState} />
        <Images content={content} button={buttonState} />

        <div className="content">
          <Description content={content} button={buttonState} />
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <Images content={content} button={buttonState} />

        <div className="content">
          <Description content={content} button={buttonState} />
          <Button buttonsTab={buttonsTab} buttonCategory={buttonCategory} content={content} buttonState={buttonState} />
        </div>
      </main>
    );
  }
};

export default Main;
