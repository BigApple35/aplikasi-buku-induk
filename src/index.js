import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import route from './utils/route';
import "./index.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "./css/navbar.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={route}/>
);

