import React from 'react';
import App from "./App";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import '../static/css/index.css';
import './style.css'
import "./center.css"
import "./artist.css"


const container = document.getElementById('app');
const root = createRoot(container);
root.render(
        <App tab="home" />
);