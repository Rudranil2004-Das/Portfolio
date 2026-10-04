import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Highlights, About, Skills, Experience, Projects, Contact } from "./components/Sections";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const m = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <div className="glow" style={{ left: pos.x, top: pos.y }} />
      <Particles />
      <Navbar />
      <Hero />
      <Highlights />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer>© {new Date().getFullYear()} Rudranil Das · Built with React & Python</footer>
    </>
  );
}
