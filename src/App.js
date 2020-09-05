import React from 'react';
import './App.css';
import Main from './views/Main';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main></Main>
      </Provider>
    </div>
  );
}

export default App;
