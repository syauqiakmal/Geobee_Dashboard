import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrintLayer from "./layers/PrintLayer.js";
import './App.css';
import Landing from './Map/Landing_page.js';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            {/* Set Landing sebagai halaman utama dengan path "/" */}
            <Route path="/" element={<Landing />} />
            <Route path="insights/Waste-Management" element={<PrintLayer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
