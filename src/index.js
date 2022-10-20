import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Credential,{loader as getId} from './pages/Credential';
import Home,{loader as loadHome} from './pages/Home';
import { SociosProvider } from './context/SociosProvider';
import DigitalCredential from './pages/DigitalCredential';


const router = createBrowserRouter([
  {
    path: '/home/:id',
    element: <Home/>,
    loader: loadHome
  },
  {
    path: '/credential',
    //element: <Navigate  replace to="/home/:id"/>,
    element: <Credential/>,
    //loader: getId
  },
  {
    path: '/DigitalCredential',
    element: <DigitalCredential/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <SociosProvider>
      <RouterProvider router={router}/>
    </SociosProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
