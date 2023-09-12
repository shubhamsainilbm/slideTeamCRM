import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';

const About = () => <h1>About Page</h1>;

const App = () => {
  const [dynamicText, setDynamicText] = useState('Welcome to the Home Page');

  const handleTextChange = (newText) => {
    setDynamicText(newText);
  };

  return (
    <Router>
      <Navbar />
      <div>
        <h2>{dynamicText}</h2>
      </div>
      <Switch>
          <About changeText={handleTextChange} />
      </Switch>
    </Router>
  );
};

export default App;
