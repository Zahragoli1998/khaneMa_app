/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Provider from "./context/NewContext";
import App from "App";
import "./App.css"

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import CustomApolloProvider from "./CustomApolloProvider";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <CustomApolloProvider>
      <SoftUIControllerProvider>
        <Provider>
          <App />
        </Provider>
      </SoftUIControllerProvider>
    </CustomApolloProvider>
  </BrowserRouter>
)
