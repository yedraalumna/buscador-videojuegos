import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import BuscadorJuegos from './components/BuscadorJuegos';

function App() {
  return (
    <BrowserRouter>
      <Dashboard />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscador" element={<BuscadorJuegos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
