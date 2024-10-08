import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.tsx'
import {Toaster} from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster/>
        </BrowserRouter>
    </React.StrictMode>,
)