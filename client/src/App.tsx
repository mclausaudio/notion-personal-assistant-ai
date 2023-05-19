import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Helmet } from 'react-helmet';

import Homepage from './pages/Homepage';
import About from './pages/About';

import './App.css';

function App() {

  return (
    <Router>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
      </Helmet>
      <Routes>
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<Homepage/>} />
      </Routes>
    </Router>
  );
}

export default App;
