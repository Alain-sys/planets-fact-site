import React from 'react';
import { useState, useRef } from 'react';
import data from '../../data.json';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';

const App = () => {
  const [currentPlanet, setCurrentPlanet] = useState(data[0]);

  const mainImageRef = useRef(null);
  const mainImageGeologyRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresValueRef = useRef([]);

  // update the state for contain the data with the good index which was send by the header component
  const handleChangePlanets = (index) => {
    if (currentPlanet !== data[index]) {
      setCurrentPlanet(data[index]);
    } else {
      return;
    }
  };

  return (
    <>
      <Header
        dataJson={data}
        handleChangePlanets={handleChangePlanets}
        currentPlanet={currentPlanet}
        mainImageRef={mainImageRef}
        mainImageGeologyRef={mainImageGeologyRef}
        descriptionRef={descriptionRef}
        featuresValueRef={featuresValueRef}
      />
      <Main dataJson={currentPlanet} mainImageRef={mainImageRef} mainImageGeologyRef={mainImageGeologyRef} descriptionRef={descriptionRef} />
      <Footer dataJson={currentPlanet} featuresValueRef={featuresValueRef} />
    </>
  );
};

export default App;
