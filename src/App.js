import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/unauthorized/Home';
import SignIn from './pages/unauthorized/SignIn';
import RecentlyFound from './pages/unauthorized/RecentlyFound';
import Page404 from './pages/unauthorized/Page404';
import Home from './pages/authorized/Home';
import AllAnimals from './pages/unauthorized/AllAnimals';
import Employees from './pages/authorized/admin/Employees'
import Owners from './pages/authorized/Owners'
import { Toaster } from 'react-hot-toast';
import Animals from './pages/authorized/Animals';
import AnimalsDataGrid from './pages/authorized/AnimalsDataGrid';
import MedicalCard from './pages/authorized/MedicalCard';
import MealAnomaly from './pages/authorized/MealAnomaly';


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* dostep dla wszytskich*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/wszystkie" element={<AllAnimals />} />
          <Route path="/logowanie" element={<SignIn />} />
          <Route path="/ostatnioznalezione" element={<RecentlyFound />} />
          {/* dostep dla admina*/}
          <Route path="/system/pracownicy" element={<Employees />} />
          {/* dostep dla zalogowanych*/}
          <Route path="/system" element={<Home />} />
          <Route path="/system/wlasciciel" element={<Owners />} />
          <Route path="/system/medyczna" element={<MedicalCard />} />
          <Route path="/system/anomalia" element={<MealAnomaly />} />
          <Route path="/system/zwierzeta" element={<Animals />} />
          <Route path="/system/zwierzeta/tabela" element={<AnimalsDataGrid />} />
          {/*przekierowanie*/}
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>

  );
}

export default App;

