import React from 'react';
import './bulma.css';
import Form from './components/Form'

function App() {
  return (

    <div className="section">
      <div className="columns is-centered">
        <div className="column is-half ">
          <div className="container">
            <Form />
          </div>
        </div>
      </div>
    </div>


  );
}

export default App;
