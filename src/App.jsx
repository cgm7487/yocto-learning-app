import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import Lesson from './pages/Lesson';
import Sandbox from './pages/Sandbox';
import About from './pages/About';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleId" element={<ModuleDetail />} />
          <Route path="/lesson/:moduleId/:lessonId" element={<Lesson />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
