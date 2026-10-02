import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data";

export default function Hero() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = profile.roles[idx];
    const t = setTimeout(() => {
      if (!del) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1200);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setIdx((idx + 1) % profile.roles.length); }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  const item = (i) => ({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 + i * 0.15, duration: 0.7 } });

  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <motion.span className="badge" {...item(0)}>● Open to opportunities</motion.span>
        <motion.h1 {...item(1)}>Hi, I'm <span className="gradient-text">{profile.name}</span></motion.h1>
        <motion.div className="typing" {...item(2)}>
          <span className="gradient-text">{text}</span><span className="cursor">|</span>
        </motion.div>
        <motion.p {...item(3)}>{profile.tagline}</motion.p>
        <motion.div className="btns" {...item(4)}>
          <a href="#projects" className="btn primary">View My Work</a>
          <a href="#contact" className="btn">Contact Me</a>
        </motion.div>
      </div>
      <motion.div className="avatar-wrap float" initial={{ opacity: 0, scale: 0.6, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.4, type: "spring" }}>
        <div className="ring" />
        <img src="/profile.jpg" alt={profile.name} />
      </motion.div>
    </section>
  );
}
