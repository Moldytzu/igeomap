import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element=<App /> />
        <Route path='*' element=<NotFound /> />
      </Routes>
    </Router>
  </React.StrictMode>
);
