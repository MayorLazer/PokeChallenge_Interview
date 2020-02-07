import React from 'react';
import Header from './components/Header'
import PokeListContainer from './components/PokeListContainer'

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <PokeListContainer/>
      </header>
    </div>
  );
}

export default App;
