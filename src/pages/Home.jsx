import React from 'react';
import Hero from '../components/Hero';
import Showcase3D from '../components/Showcase3D';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <Showcase3D />
            <About />
            <Services />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;
