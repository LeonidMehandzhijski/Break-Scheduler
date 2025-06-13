import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// The <React.StrictMode> component has been removed from here to prevent
// the double-rendering issue in development that conflicts with react-beautiful-dnd.
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
