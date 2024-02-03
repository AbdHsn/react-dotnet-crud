import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import ServiceList from '../pages/service/ServiceList';

const Routing = () => {
  return (
    <main className="container py-4">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServiceList />} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </main>
  );
};


export default Routing;