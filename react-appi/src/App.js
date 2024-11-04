import 'leaflet/dist/leaflet.css'

import './App.css';



import React from 'react';
import { PrintLayer } from './layers/PrintLayer.js';

export const App = () => {
  return (<PrintLayer />);
}
