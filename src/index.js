import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ProjectContextProvider } from './context/ProjectContext';
import { UserContextProvider } from './context/UserContext';
import { ToastContainer } from "react-toastify";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <ProjectContextProvider>
 <UserContextProvider>
 <App />
<ToastContainer />

 </UserContextProvider>
   </ProjectContextProvider>
   </BrowserRouter>
  </React.StrictMode>
);


