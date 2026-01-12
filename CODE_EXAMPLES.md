# 💡 Portfolio Examples & Code Snippets

## 🎨 Example: Customizing a Lesson

### Original Lesson Data
```jsx
{
    id: 1,
    title: "React Hooks Mastery",
    category: "React",
    difficulty: "Intermediate",
    thumbnail: "📚"
}
```

### Add a Real Image Instead of Emoji
**Step 1**: Save your lesson image to `public/images/lessons/`

**Step 2**: Update the lesson object
```jsx
{
    id: 1,
    title: "Advanced React Patterns",
    category: "React",
    difficulty: "Advanced",
    thumbnail: "/images/lessons/react-advanced.jpg"  // Path to image
}
```

**Step 3**: Update the rendering in LessonsSection
```jsx
{/* Find this section: */}
<div className="h-40 bg-gradient-to-br from-primary-500/10 to-blue-500/10 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
    {lesson.thumbnail}
</div>

{/* Replace with: */}
<img 
    src={lesson.thumbnail}
    alt={lesson.title}
    className="h-40 w-full object-cover group-hover:scale-110 transition-transform duration-300"
/>
```

---

## 💰 Example: Adding a New Service Package

### Add to Services Array
```jsx
const services = [
    // ... existing services ...
    {
        id: 5,
        title: "Consulting & Mentorship",
        price: "$3,500/month",
        description: "Personal one-on-one consulting for your projects",
        features: [
            "Weekly 1-hour calls",
            "Code review support",
            "Architecture guidance",
            "Priority email support"
        ]
    }
];
```

### Mark as Popular
```jsx
{/* Change this line in the map function: */}
className={`glass-card p-8 flex flex-col h-full ${
    service.id === 3 ? 'lg:scale-105 ring-2 ring-primary-500' : ''  // Change 3 to 5
}`}
```

---

## ⬇️ Example: Adding Download Tracking

### Update Extensions Data with Analytics
```jsx
const extensions = [
    {
        id: 1,
        name: "React DevTools Pro",
        description: "Advanced debugging and profiling for React apps",
        downloads: 15420,
        icon: "⚛️",
        url: "https://marketplace.visualstudio.com/items?itemName=your-publisher.react-devtools-pro",
        lastUpdated: "2024-01-10"
    },
    // ... more extensions ...
];
```

### Track Download Click
```jsx
{/* In ExtensionsSection: */}
<motion.button
    onClick={() => {
        // Track the download
        if (window.gtag) {
            window.gtag('event', 'download_extension', {
                extension_name: ext.name,
                download_count: ext.downloads
            });
        }
        // Open download link
        window.location.href = ext.url;
    }}
    className="glass-button glass-button-primary flex-shrink-0"
>
    <Download className="w-4 h-4" />
</motion.button>
```

---

## 📧 Example: Connect "Hire Me" Button

### Option 1: Email Link
```jsx
{/* In HeroSection: */}
<motion.button
    onClick={() => window.location.href = 'mailto:your-email@example.com?subject=Hire Me - Web Development'}
    className="glass-button glass-button-primary"
>
    <MessageSquare className="w-5 h-5" />
    Hire Me
</motion.button>
```

### Option 2: Contact Form Modal
```jsx
import { useState } from 'react';

const HeroSection = () => {
    const [showContact, setShowContact] = useState(false);
    
    return (
        <>
            <motion.button
                onClick={() => setShowContact(true)}
                className="glass-button glass-button-primary"
            >
                <MessageSquare className="w-5 h-5" />
                Hire Me
            </motion.button>
            
            {showContact && <ContactForm onClose={() => setShowContact(false)} />}
        </>
    );
};
```

### Option 3: Scroll to Contact Section
```jsx
{/* In HeroSection: */}
<motion.button
    onClick={() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }}
    className="glass-button glass-button-primary"
>
    <MessageSquare className="w-5 h-5" />
    Hire Me
</motion.button>
```

---

## 🎯 Example: Add a Skills Section

### Create Skills Component
```jsx
const SkillsSection = () => {
    const skills = [
        { category: "Frontend", items: ["React", "Vue.js", "Tailwind CSS", "Framer Motion"] },
        { category: "Backend", items: ["Node.js", "PostgreSQL", "MongoDB", "GraphQL"] },
        { category: "Tools", items: ["Git", "Docker", "AWS", "Figma"] },
        { category: "3D", items: ["Three.js", "Spline", "Blender", "WebGL"] }
    ];

    return (
        <section id="skills" className="py-24 px-6 bg-dark-900">
            <div className="max-w-7xl mx-auto">
                <motion.h2 
                    className="text-4xl font-bold text-center mb-16 gradient-text-primary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Skills & Expertise
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup) => (
                        <motion.div
                            key={skillGroup.category}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true }}
                            className="glass-card p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">
                                {skillGroup.category}
                            </h3>
                            <div className="space-y-2">
                                {skillGroup.items.map((skill) => (
                                    <div 
                                        key={skill}
                                        className="flex items-center gap-2 text-neutral-300 text-sm"
                                    >
                                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
```

### Add to Home Route
```jsx
<Route path="/" element={
    <UserProtectedRoute>
        <div>
            <HeroSection />
            <LessonsSection />
            <SkillsSection />        {/* Add this */}
            <ServicesSection />
            <ExtensionsSection />
        </div>
    </UserProtectedRoute>
} />
```

---

## 🎬 Example: Custom Animation

### Add Parallax Scroll Effect
```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

const ParallaxSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <motion.div ref={ref} style={{ y }} className="space-y-4">
            {/* Content will move faster as you scroll */}
        </motion.div>
    );
};
```

### Add Text Reveal Animation
```jsx
import { motion } from 'framer-motion';

const RevealText = ({ text }) => {
    const words = text.split(" ");
    
    return (
        <motion.h1 className="text-4xl font-bold">
            {words.map((word, idx) => (
                <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                >
                    {word}{" "}
                </motion.span>
            ))}
        </motion.h1>
    );
};
```

---

## 🌈 Example: Change Color Theme to Purple

### Update Tailwind Config
```javascript
// tailwind.config.js
colors: {
    primary: {
        400: '#d8b4fe',  // Purple light
        500: '#a78bfa',  // Purple main
        600: '#9333ea',  // Purple dark
    }
}
```

### Update CSS Variables (Optional)
```css
/* In portfolio.css or index.css */
:root {
    --primary-400: #d8b4fe;
    --primary-500: #a78bfa;
    --primary-600: #9333ea;
}
```

### Update Gradient
```jsx
{/* Update gradient text colors */}
background: linear-gradient(to right, #d8b4fe, #a78bfa, #c084fc);
```

---

## 📊 Example: Add Testimonials Section

```jsx
const TestimonialSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            title: "CEO, Tech Startup",
            comment: "Amazing portfolio and great web development work!",
            avatar: "👤"
        },
        {
            id: 2,
            name: "Jane Smith",
            title: "Product Manager, SaaS Co",
            comment: "Excellent communication and delivered on time.",
            avatar: "👩"
        }
    ];

    return (
        <section className="py-24 px-6 bg-dark-950">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 gradient-text-primary">
                    What People Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl">{testimonial.avatar}</div>
                                <div>
                                    <p className="font-bold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-neutral-400">{testimonial.title}</p>
                                </div>
                            </div>
                            <p className="text-neutral-300 italic">"{testimonial.comment}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
```

---

## 🔄 Example: Add Loading State

```jsx
import { useState } from 'react';

const DownloadButton = ({ extension }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            // Simulate download
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.location.href = extension.url;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.button
            onClick={handleDownload}
            disabled={isLoading}
            className="glass-button glass-button-primary flex-shrink-0"
            whileHover={!isLoading ? { scale: 1.05 } : {}}
        >
            {isLoading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    ⏳
                </motion.div>
            ) : (
                <>
                    <Download className="w-4 h-4" />
                    Download
                </>
            )}
        </motion.button>
    );
};
```

---

## 🎯 Example: Form Validation

```jsx
import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ email: '', message: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.email.includes('@')) {
            newErrors.email = 'Invalid email';
        }
        if (formData.message.length < 10) {
            newErrors.message = 'Message too short';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Send form data
        console.log('Form submitted:', formData);
        alert('Message sent successfully!');
    };

    return (
        <motion.form onSubmit={handleSubmit} className="glass-card p-8 max-w-md mx-auto">
            <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="w-full h-32 bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary-500"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button glass-button-primary w-full"
            >
                Send Message
            </motion.button>
        </motion.form>
    );
};
```

---

## 📱 Example: Mobile Menu

```jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { label: 'Lessons', href: '#lessons' },
        { label: 'Services', href: '#services' },
        { label: 'Extensions', href: '#extensions' }
    ];

    return (
        <div className="lg:hidden">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-button p-2"
            >
                {isOpen ? <X /> : <Menu />}
            </motion.button>

            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="glass-card mt-2 p-4 space-y-2">
                    {links.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-white hover:text-primary-400 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
```

---

## 🎉 Tips & Best Practices

### Performance
- Always use `viewport={{ once: true }}` on `whileInView` to prevent re-animations
- Use `useMemo` for expensive computations
- Lazy load images with `<img loading="lazy" />`

### Accessibility
- Always include `alt` text on images
- Use semantic HTML elements
- Ensure color contrast ratios meet WCAG standards
- Test keyboard navigation

### SEO
- Add descriptive `<title>` and meta tags
- Use heading hierarchy (h1, h2, h3)
- Add `alt` text to all images
- Create XML sitemap

### Animation Best Practices
- Keep animations under 300ms for UI feedback
- Use `easeInOut` for natural motion
- Don't animate more than 3 properties at once
- Test on lower-end devices

---

**Last Updated**: January 2026  
**Version**: 1.0.0
