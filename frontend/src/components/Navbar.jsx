import { motion } from "framer-motion";

const links = ["about", "skills", "experience", "projects", "contact"];

export default function Navbar() {
  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7 }}>
      <a href="#home" className="logo gradient-text">&lt;RD /&gt;</a>
      <ul>
        {links.map((l) => (
          <li key={l}><a href={`#${l}`}>{l[0].toUpperCase() + l.slice(1)}</a></li>
        ))}
      </ul>
    </motion.nav>
  );
}
