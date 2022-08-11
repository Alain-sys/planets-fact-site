import React from 'react';
import { useState } from 'react';
import data from '../../data.json';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';

const App = () => {
  const [currentPlanet, setCurrentPlanet] = useState(data[0]);

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
      <Header dataJson={data} handleChangePlanets={handleChangePlanets} currentPlanet={currentPlanet} />
      <Main dataJson={currentPlanet} />
      <Footer dataJson={currentPlanet} />
    </>
  );
};

export default App;
