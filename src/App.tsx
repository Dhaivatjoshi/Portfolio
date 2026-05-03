import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <LanguageProvider>
      <div className="bg-grid"></div>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
