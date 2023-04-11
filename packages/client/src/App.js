import React, { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const handleClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time`);
      const responseText = await response.text();
      setResponse(`The server time is: ${responseText}`);
    } catch (error) {
      setResponse(`Request error: ${error}`);
    }
  };

  return (
    <div className='App'>
      <h1 className='App-title'>Hello World!</h1>
      <h2 className='App-subTitle'>Simple React App (0.0.5)</h2>

      {response && <pre className='App-response'>{response}</pre>}

      <button onClick={handleClick}>Send Request</button>
    </div>
  );
}

export default App;
