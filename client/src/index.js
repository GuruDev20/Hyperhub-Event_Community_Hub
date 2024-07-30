import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import {Toaster} from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Toaster/>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
