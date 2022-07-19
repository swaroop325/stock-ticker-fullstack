import logo from './logo.svg';
import { useState, useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

function App() {
  const URL = 'ws://localhost:8000';

  useEffect(() => {
    const socket = socketIOClient(URL);
    socket.on("stock price", data => {
      console.log(data);
    });
    return () => {
      socket.disconnect()
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Stock Ticker
        </p>
      </header>
    </div>
  );
}

export default App;
