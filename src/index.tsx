import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppXY from './AppXY';
import reportWebVitals from './reportWebVitals';
import AppMentor from "./AppMentor";
import AppMentors from "./AppMentors";
import AppForm from "./AppForm";
import AppWrap from "./AppWrap";
import AppTheme from "./AppTheme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppTheme />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
