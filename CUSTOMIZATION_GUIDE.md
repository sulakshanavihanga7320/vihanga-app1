# Quick Customization & Implementation Guide

## 🎯 Immediate Customizations

### 1. Change Hero Section Title
**File**: `src/App.jsx`

Find this line:
```jsx
<motion.h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
    Software Engineer & Developer
</motion.h1>
```

Replace with your title:
```jsx
<motion.h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
    Your Name - Your Title
</motion.h1>
```

---

### 2. Update Lessons Data
**File**: `src/App.jsx` - Find `const lessons = [`

Replace the lessons array:
```jsx
const lessons = [
    {
        id: 1,
        title: "Your Lesson Title",
        category: "Your Category",
        difficulty: "Beginner|Intermediate|Advanced",
        thumbnail: "🎯" // Use any emoji or import image
    },
    // Add more lessons...
];
```

**To use images instead of emojis**:
```jsx
// In components, replace:
<div className="text-6xl group-hover:scale-110">{lesson.thumbnail}</div>

// With:
<img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover" />
```

---

### 3. Update Services & Pricing
**File**: `src/App.jsx` - Find `const services = [`

```jsx
const services = [
    {
        id: 1,
        title: "Your Service Name",
        price: "$X,XXX",
        description: "Your service description here",
        features: [
            "Feature 1",
            "Feature 2",
            "Feature 3",
            "Feature 4"
        ]
    },
    // Add more services...
];
```

**To mark a service as popular**:
Change line with `service.id === 3` to match your popular service ID:
```jsx
className={`glass-card p-8 flex flex-col h-full ${
    service.id === 2 ? 'lg:scale-105 ring-2 ring-primary-500' : ''  // Change 3 to 2
}`}
```

---

### 4. Update Extensions/Downloads
**File**: `src/App.jsx` - Find `const extensions = [`

```jsx
const extensions = [
    {
        id: 1,
        name: "Extension Name",
        description: "Brief description of what it does",
        downloads: 12345, // Just the number, will auto-format
        icon: "⚛️" // Emoji icon
    },
    // Add more extensions...
];
```

---

## 🎨 Color Customization

### Change Primary Blue to Different Color

**Step 1**: Edit `tailwind.config.js`
```javascript
colors: {
    primary: {
        400: '#YOUR_LIGHT_COLOR',  // e.g., '#a78bfa' for purple
        500: '#YOUR_MAIN_COLOR',   // e.g., '#8b5cf6' for purple
        600: '#YOUR_DARK_COLOR',   // e.g., '#7c3aed' for purple
    }
}
```

**Step 2**: Update Tailwind CSS build:
```bash
npm run dev
# or
npm run build
```

### Example Color Palettes

**Purple Theme**:
```javascript
primary: {
    400: '#d8b4fe',
    500: '#a78bfa',
    600: '#9333ea',
}
```

**Green Theme**:
```javascript
primary: {
    400: '#86efac',
    500: '#22c55e',
    600: '#16a34a',
}
```

**Orange Theme**:
```javascript
primary: {
    400: '#fdba74',
    500: '#f97316',
    600: '#ea580c',
}
```

---

## 🔗 Connect Buttons to Actions

### "Hire Me" Button
**File**: `src/App.jsx` - Find `<button className="glass-button glass-button-primary">`

Add onClick handler:
```jsx
<button 
    onClick={() => window.location.href = 'mailto:your-email@example.com'}
    className="glass-button glass-button-primary"
>
    <MessageSquare className="w-5 h-5" />
    Hire Me
</button>
```

Or scroll to contact section:
```jsx
<button 
    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
    className="glass-button glass-button-primary"
>
    <MessageSquare className="w-5 h-5" />
    Hire Me
</button>
```

### "Start Learning" Button
Add onClick handler in lessons:
```jsx
<motion.button
    onClick={() => window.location.href = `/lessons/${lesson.id}`}
    className="glass-button glass-button-primary w-full"
>
    <BookOpen className="w-4 h-4" />
    Start Learning
</motion.button>
```

### "Request Order" Button
Add onClick handler in services:
```jsx
<motion.button
    onClick={() => alert(`Order for ${service.title} requested!`)}
    className="glass-button w-full"
>
    Request Order
</motion.button>
```

### Download Extensions Button
Add onClick handler in extensions:
```jsx
<motion.button
    onClick={() => window.location.href = `https://marketplace.visualstudio.com/items?itemName=your-publisher.${ext.name}`}
    className="glass-button glass-button-primary flex-shrink-0"
>
    <Download className="w-4 h-4" />
</motion.button>
```

---

## 🌐 Add Contact Section

**File**: `src/App.jsx`

Add this new component before the closing `App()` function:

```jsx
const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-6 bg-dark-900">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                        Let's Work Together
                    </h2>
                    
                    <p className="text-neutral-400 text-lg mb-8">
                        Have a project in mind? Let's build something amazing together.
                    </p>
                    
                    <div className="glass-card p-8 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="your@email.com"
                            className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white outline-none mb-4 focus:border-primary-500"
                        />
                        
                        <button className="glass-button glass-button-primary w-full">
                            Send Me a Message
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
```

Then add to the home route:
```jsx
<Route path="/" element={
    <UserProtectedRoute>
        <div>
            <HeroSection />
            <LessonsSection />
            <ServicesSection />
            <ExtensionsSection />
            <ContactSection />  {/* Add this */}
        </div>
    </UserProtectedRoute>
} />
```

---

## 🎬 Add 3D Spline Scene

### Option 1: Using Spline Web Viewer (Recommended)

**Install Spline**:
```bash
npm install @spline/react-spline @splinetool/runtime
```

**Update Hero Section**:
```jsx
import Spline from '@spline/react-spline';

// In HeroSection component, replace the placeholder:
<motion.div
    variants={itemVariants}
    className="relative h-96 rounded-2xl glass-card overflow-hidden mt-16"
>
    <Spline scene="https://prod.spline.design/YOUR_SPLINE_FILE_ID/scene.splinecode" />
</motion.div>
```

### Option 2: Using Three.js with Canvas

Create a new file `src/components/3DScene.jsx`:
```jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';

export const Scene3D = () => {
    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Sphere args={[1, 100, 100]} scale={2}>
                <meshPhongMaterial color="#3b82f6" />
            </Sphere>
        </Canvas>
    );
};
```

Then use in Hero:
```jsx
import { Scene3D } from './components/3DScene';

// Replace placeholder with:
<Scene3D />
```

---

## 🚀 Deploy to Production

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
# Follow the prompts
```

### Netlify
```bash
npm run build
# Go to netlify.com > drag & drop build folder
```

### GitHub Pages
```bash
npm run build
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

npm run deploy
```

---

## 📊 Add Analytics

### Google Analytics
```bash
npm install @react-ga/core @react-ga/page_view
```

**In `src/App.jsx`**:
```jsx
import ReactGA from '@react-ga/core';

ReactGA.initialize('GA_MEASUREMENT_ID');

// Track page views:
useEffect(() => {
    ReactGA.pageview(window.location.pathname);
}, [location]);
```

---

## ✅ Performance Checklist

- [ ] Images are optimized (use WebP format)
- [ ] Lazy load images and components
- [ ] Minify CSS and JavaScript
- [ ] Use CDN for static assets
- [ ] Enable gzip compression
- [ ] Set up caching headers
- [ ] Remove unused CSS with PurgeCSS
- [ ] Test Core Web Vitals

---

## 🔍 SEO Optimization

### Add Meta Tags
**File**: `index.html`

```html
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Professional Software Engineer Portfolio - Web Development Services">
    <meta name="keywords" content="React, Web Development, Portfolio, Software Engineer">
    <meta property="og:title" content="Your Name - Software Engineer">
    <meta property="og:description" content="Professional portfolio showcasing my work">
    <meta property="og:image" content="https://your-domain.com/og-image.jpg">
    <title>Your Name - Software Engineer Portfolio</title>
</head>
```

### Sitemap
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://your-domain.com</loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://your-domain.com/#lessons</loc>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://your-domain.com/#services</loc>
        <priority>0.8</priority>
    </url>
</urlset>
```

---

## 🐛 Troubleshooting

### Issue: Blur effect not working
**Solution**: Ensure browser supports `backdrop-filter`. Add webkit prefix:
```css
.glass-card {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* Safari */
}
```

### Issue: Animations feeling jerky
**Solution**: Enable GPU acceleration:
```css
will-change: transform;
transform: translateZ(0);
```

### Issue: Button text not visible
**Solution**: Adjust text color opacity:
```jsx
className="glass-button text-white/90"
```

### Issue: Mobile view looks cramped
**Solution**: Adjust padding in responsive section:
```jsx
className="py-24 px-6 md:px-12 lg:px-24"
```

---

## 📚 Useful Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)
- [Web Vitals](https://web.dev/vitals/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🎁 Bonus: Dark/Light Mode Toggle

**File**: `src/App.jsx`

Add state and toggle function:
```jsx
const [isDark, setIsDark] = useState(true);

const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
};
```

Add to Navbar or create a button:
```jsx
<button 
    onClick={toggleTheme}
    className="glass-button"
>
    {isDark ? '☀️' : '🌙'}
</button>
```

---

**Last Updated**: January 2026
**Version**: 1.0.0
