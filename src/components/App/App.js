import { Component } from 'react';
import data from '../../data.json';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlanet: data[0],
    };
  }

  // update the state for contain the data with the good index which was send by the header component
  handleChangePlanets = (index) => {
    this.setState({
      currentPlanet: data[index],
    });
  };

  render() {
    const currentPlanet = this.state.currentPlanet;
    return (
      <>
        <Header dataJson={data} handleChangePlanets={this.handleChangePlanets} currentPlanet={currentPlanet} />
        <Main dataJson={currentPlanet} />
        <Footer dataJson={currentPlanet} />
      </>
    );
  }
}

export default App;
