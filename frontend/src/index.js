import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from "./services/authContext" 
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
    <HelmetProvider>
        <AuthProvider> 
            <App/> 
        </AuthProvider>
    </HelmetProvider>, 
    document.getElementById('root')
);
