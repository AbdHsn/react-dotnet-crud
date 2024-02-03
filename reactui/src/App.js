import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Routing from './components/Routing';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Header />
      <Routing />
      <Footer />
    </Router>
  );
};

export default App;
