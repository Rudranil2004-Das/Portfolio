import { useState, useEffect, useRef } from "react";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import {
  profile, about, careerObjective, highlights, stats, skills, skillGroups, tools, softSkills, languages, interests,
  experience, certifications, education, projects, projectCategories,
} from "../data";

const Reveal = ({ children, delay = 0, x = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 50, x }} whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay }}>
    {children}
  </motion.div>
);

const Head = ({ a, b, sub }) => (
  <Reveal>
    <h2 className="title">{a} <span className="gradient-text">{b}</span></h2>
    {sub && <p className="sub">{sub}</p>}
  </Reveal>
);

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, onUpdate: (v) => setN(Number.isInteger(value) ? Math.round(v) : v.toFixed(2)) });
    return () => c.stop();
  }, [inView, value]);
  return <h3 ref={ref} className="gradient-text">{n}{Number.isInteger(value) ? "+" : ""}</h3>;
}

export function Highlights() {
  const items = [...highlights, ...highlights];
  return (
    <div className="marquee">
      <div className="track">
        {items.map((h, i) => <span key={i}>✦ {h}</span>)}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about">
      <Head a="About" b="Me" sub={profile.headline} />
      <Reveal>
        <div className="card prose">
          {about.map((p) => <p key={p}>{p}</p>)}
        </div>
      </Reveal>
      <div className="grid2" style={{ marginTop: 30 }}>
        <Reveal x={-60}>
          <div className="card">
            <h3 style={{ marginBottom: 12 }}>Education</h3>
            {education.map((e) => (
              <div className="edu" key={e.title}>
                <strong>{e.title}</strong><br />
                <span style={{ color: "var(--muted)" }}>{e.place}</span><br />
                <small>{e.meta}</small>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal x={60} delay={0.15}>
          <div className="card">
            <h3 style={{ marginBottom: 12 }}>Languages</h3>
            {languages.map((l) => (
              <div className="lang-row" key={l.name}><span>{l.name}</span><small>{l.level}</small></div>
            ))}
            <h3 style={{ margin: "26px 0 4px" }}>Interests & Passions</h3>
            <div className="chips" style={{ marginTop: 14 }}>
              {interests.map((t) => <span className="chip" key={t}>{t}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
      <div className="grid2" style={{ marginTop: 30 }}>
        <Reveal>
          <div className="card">
            <h3>Soft Skills</h3>
            <div className="chips" style={{ marginTop: 14 }}>
              {softSkills.map((t, i) => (
                <motion.span key={t} className="chip" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06, type: "spring" }}
                  whileHover={{ y: -6, borderColor: "#4f8cff" }}>{t}</motion.span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="card">
            <h3>Career Objective</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, marginTop: 12 }}>{careerObjective}</p>
          </div>
        </Reveal>
      </div>
      <div className="stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="stat"><Counter value={s.value} /><span>{s.label}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills">
      <Head a="Technical" b="Skills" sub="The tools and technologies I use to build full-stack products." />
      <div className="grid2">
        <div>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="bar-row">
                <div className="bar-top"><span>{s.name}</span><span>{s.level}%</span></div>
                <div className="bar">
                  <motion.div className="bar-fill" initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div>
          <Reveal><h3>Tools & Others</h3></Reveal>
          <div className="chips">
            {tools.map((t, i) => (
              <motion.span key={t} className="chip" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, type: "spring" }}
                whileHover={{ y: -6, borderColor: "#4f8cff" }}>{t}</motion.span>
            ))}
          </div>
        </div>
      </div>
      <div className="group-grid">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <div className="card group">
              <h3>{g.title}</h3>
              <div className="tags">{g.items.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience">
      <Head a="Work" b="Experience" />
      {experience.map((e) => (
        <Reveal key={e.role}>
          <div className="timeline">
            <div className="card">
              <span className="period">{e.period}</span>
              <h3>{e.role}</h3>
              <p style={{ color: "var(--accent)" }}>{e.company}</p>
              <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
        </Reveal>
      ))}
      <Reveal>
        <h3 className="subhead">Certification</h3>
        {certifications.map((c) => (
          <div className="card" key={c.title}>
            <h3>🎓 {c.title}</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "10px 0 16px" }}>{c.desc}</p>
            <div className="tags">{c.tech.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Tilt({ children }) {
  const [s, setS] = useState({});
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setS({ transform: `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)` });
  };
  return <div className="card project" style={s} onMouseMove={move} onMouseLeave={() => setS({})}>{children}</div>;
}

export function Projects() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <section id="projects">
      <Head a="Featured" b="Projects" sub="Things I've built, from full-stack MERN apps and Python programs to Power BI dashboards and enterprise ERP automation." />
      <div className="filters">
        {projectCategories.map((c) => (
          <motion.button key={c} type="button" className={`filter ${cat === c ? "active" : ""}`} whileTap={{ scale: 0.93 }} onClick={() => setCat(c)}>{c}</motion.button>
        ))}
      </div>
      <motion.div layout className="projects">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div key={p.title} layout initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.45, delay: i * 0.06 }}>
              <Tilt>
                <span className="period">{p.period || p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                <a className="proj-link" href={profile.githubRepos} target="_blank" rel="noreferrer">View on GitHub →</a>
              </Tilt>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = async () => {
    if (!f.name || !f.email || !f.message) return setStatus("Please fill all fields.");
    setStatus("Sending...");
    try {
      const r = await fetch("http://localhost:5000/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f),
      });
      const d = await r.json();
      setStatus(r.ok ? "✅ Message sent. Thank you!" : d.error || "Something went wrong.");
      if (r.ok) setF({ name: "", email: "", message: "" });
    } catch {
      setStatus("Server not reachable. Is the Python backend running?");
    }
  };

  return (
    <section id="contact">
      <Head a="Get In" b="Touch" sub={`Let's build something great together. Based in ${profile.location}.`} />
      <Reveal>
        <div className="contact-links">
          <a className="card link-card" href={`mailto:${profile.email}`}><span>✉️ Email</span><strong>{profile.email}</strong></a>
          <a className="card link-card" href={`tel:${profile.phone.replace(/\s/g, "")}`}><span>📞 Phone</span><strong>{profile.phone}</strong></a>
          <a className="card link-card" href={profile.github} target="_blank" rel="noreferrer"><span>💻 GitHub</span><strong>Rudranil2004-Das</strong></a>
        </div>
      </Reveal>
      <Reveal>
        <form onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input type="email" placeholder="Your email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <textarea rows="5" placeholder="Your message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
          <motion.button type="button" className="btn primary" whileTap={{ scale: 0.95 }} onClick={submit}>Send Message</motion.button>
          <p className="status">{status}</p>
        </form>
      </Reveal>
    </section>
  );
}
