# ⚡ Quick Start Guide

## 🎯 Get Started in 5 Minutes

### 1. Install Dependencies (If Not Done)
```bash
npm install
npm install framer-motion lucide-react react-router-dom
```

### 2. Start Development Server
```bash
npm run dev
```
Your site will be available at **http://localhost:5174** (or the next available port)

### 3. View Your Portfolio
Open your browser and visit the localhost URL. You should see:
- Hero section with title and CTAs
- Lessons section with lesson cards
- Services section with pricing
- Extensions section with download counters

---

## 🎨 First Customizations (Do These Now!)

### Change Your Name/Title
**File**: `src/App.jsx` (Line ~68)

Find:
```jsx
<motion.h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
    Software Engineer & Developer
</motion.h1>
```

Replace with your name and title.

---

### Update Lessons (Replace With Your Content)
**File**: `src/App.jsx` (Line ~153)

Find the `const lessons = [` array and replace:
```javascript
const lessons = [
    {
        id: 1,
        title: "Your First Lesson",  // Change this
        category: "Your Category",    // Change this
        difficulty: "Beginner",       // Or Intermediate, Advanced
        thumbnail: "📚"               // Change emoji or add image path
    },
    // ... keep adding lessons
];
```

---

### Update Services With Your Pricing
**File**: `src/App.jsx` (Line ~239)

Find the `const services = [` array and update:
```javascript
const services = [
    {
        id: 1,
        title: "Your Service Name",      // Change this
        price: "$X,XXX",                 // Your price
        description: "Brief description", // Change this
        features: [                       // Your features
            "Feature 1",
            "Feature 2",
            "Feature 3",
            "Feature 4"
        ]
    },
    // ... more services
];
```

---

### Update Extensions You Offer
**File**: `src/App.jsx` (Line ~327)

Find the `const extensions = [` array and update:
```javascript
const extensions = [
    {
        id: 1,
        name: "Your Extension Name",
        description: "What it does",
        downloads: 12345,  // Just a number
        icon: "⚛️"         // Use emoji or icon
    },
    // ... more extensions
];
```

---

## 🔗 Make Buttons Work

### "Hire Me" Button
**File**: `src/App.jsx` (Line ~104)

Change from:
```jsx
<button className="glass-button glass-button-primary">
    <MessageSquare className="w-5 h-5" />
    Hire Me
</button>
```

To:
```jsx
<button 
    onClick={() => window.location.href = 'mailto:your-email@example.com'}
    className="glass-button glass-button-primary"
>
    <MessageSquare className="w-5 h-5" />
    Hire Me
</button>
```

Replace `your-email@example.com` with your actual email.

---

### "Start Learning" Buttons
**File**: `src/App.jsx` (Find in LessonsSection)

Add onClick:
```jsx
<motion.button
    onClick={() => window.location.href = `/lessons/${lesson.id}`}
    className="glass-button glass-button-primary w-full"
>
    <BookOpen className="w-4 h-4" />
    Start Learning
</motion.button>
```

---

### Download Extensions Button
**File**: `src/App.jsx` (Find in ExtensionsSection)

Add onClick:
```jsx
<motion.button
    onClick={() => window.location.href = 'YOUR_MARKETPLACE_URL_HERE'}
    className="glass-button glass-button-primary flex-shrink-0"
>
    <Download className="w-4 h-4" />
</motion.button>
```

---

## 🎨 Change Colors (Optional)

### Update Primary Color
**File**: `tailwind.config.js` (Line ~8)

Find:
```javascript
primary: {
    400: '#60a5fa',      // Light blue
    500: '#3b82f6',      // Main blue
    600: '#2563eb',      // Dark blue
}
```

Replace with your color codes:
- Get colors from: https://tailwindcss.com/docs/customizing-colors
- Or generate from: https://www.colorhexa.com/

Example Purple:
```javascript
primary: {
    400: '#d8b4fe',
    500: '#a78bfa',
    600: '#9333ea',
}
```

---

## ✅ Testing Checklist

Before deploying, test:

- [ ] Navigation links work
- [ ] "Hire Me" button opens email
- [ ] Buttons have hover effects
- [ ] Page is responsive on mobile
- [ ] All text displays correctly
- [ ] No console errors (F12 > Console)
- [ ] Load time is reasonable

---

## 🚀 Deploy to Production

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel
# Follow the prompts
```

### Option 2: Netlify
```bash
npm run build
# Go to https://app.netlify.com
# Drag & drop the "dist" folder
```

### Option 3: GitHub Pages
```bash
npm run build
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io",
"deploy": "gh-pages -d dist"

npm run deploy
```

---

## 📂 File Structure You Need to Know

```
d:\my web vihanga\
├── src\
│   ├── App.jsx                 ← Your portfolio sections are here
│   ├── index.css               ← Glassmorphism styles
│   ├── portfolio.css           ← Advanced animations
│   ├── main.jsx                ← Entry point
│   └── components\             ← Your existing components
│
├── tailwind.config.js          ← Color configuration
├── package.json                ← Dependencies
│
├── PORTFOLIO_SETUP.md          ← Read this for detailed info
├── CODE_REFERENCE.md           ← Code examples
├── CUSTOMIZATION_GUIDE.md      ← How to customize
├── CODE_EXAMPLES.md            ← More code snippets
└── IMPLEMENTATION_SUMMARY.md   ← What was built
```

---

## 🐛 Common Issues & Fixes

### Issue: Styles not showing
**Fix**: Make sure you imported portfolio.css in main.jsx
```javascript
import './portfolio.css'
```

### Issue: Buttons not responding
**Fix**: Check browser console (F12) for errors

### Issue: Port already in use
**Fix**: npm will auto-select next port. Or kill process:
```bash
# On Windows
netstat -ano | findstr :5174
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5174
kill -9 <PID>
```

### Issue: Build fails
**Fix**: 
```bash
npm install
npm run build
```

---

## 📚 Documentation Map

Read in this order:

1. **IMPLEMENTATION_SUMMARY.md** ← Start here! Overview of what was built
2. **PORTFOLIO_SETUP.md** ← Detailed feature explanations
3. **CODE_REFERENCE.md** ← Code snippets for each section
4. **CUSTOMIZATION_GUIDE.md** ← How to modify everything
5. **CODE_EXAMPLES.md** ← Extra examples and patterns

---

## 🔥 Pro Tips

1. **Always test on mobile**: Use Chrome DevTools (F12) → Toggle Device Toolbar
2. **Lighthouse audit**: F12 → Lighthouse → Generate report
3. **Use Git**: `git add . && git commit -m "Update portfolio content"`
4. **Keep backups**: Save a copy before making big changes
5. **Test animations**: Keep animations under 300ms for best UX

---

## 💡 What to Do Next

After customizing:

1. ✅ Update all your content
2. ✅ Test all buttons
3. ✅ Check on mobile
4. ✅ Deploy to production
5. ✅ Share your portfolio! 🚀

---

## 📞 Need Help?

### Common Resources
- **Framer Motion Docs**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Docs**: https://react.dev/
- **MDN Web Docs**: https://developer.mozilla.org/

### Troubleshooting
- Check browser console: F12
- Check terminal output for errors
- Read the error message carefully
- Search error message + "React" on Google

---

## ✨ You're Ready!

Your professional portfolio website is ready to showcase your skills. Now just:

1. **Customize** your content
2. **Test** on different devices
3. **Deploy** to production
4. **Share** your portfolio!

Good luck! 🚀

---

**Need support?** Check the other .md files in your project root for detailed guides.

**Version**: 1.0.0  
**Last Updated**: January 2026
