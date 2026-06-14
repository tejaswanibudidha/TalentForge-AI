# 🚀 TalentForge AI Landing Page - Quick Start Guide

## 📍 Access the Landing Page

### Method 1: Direct URL
Visit: `http://localhost:5173/talentforge`

### Method 2: Update Navigation Links
Add a link in your navigation or header:

```jsx
<Link to="/talentforge">View Landing Page</Link>
```

### Method 3: Make it the Default
To make TalentForge the main landing page, update `src/App.jsx`:

```jsx
// Change this:
<Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />

// To this:
<Route path="/" element={<TalentForgeLandingPage />} />
```

---

## 🎨 Quick Customization

### 1. Change Color Scheme
**File**: `src/utils/animations.js`

```javascript
export const colors = {
  primary: "#4F46E5",      // Change this
  secondary: "#8B5CF6",    // Or this
  accent: "#3B82F6",       // Or this
  // ... rest of colors
};
```

### 2. Update Company Logos
**File**: `src/data/talentForgeData.js`

```javascript
export const trustedCompanies = [
  { id: 1, name: "Google", logo: "🔵" },      // Change emoji or add real logos
  { id: 2, name: "Microsoft", logo: "🟦" },   // Replace with your companies
  // ...
];
```

### 3. Modify Features
**File**: `src/data/talentForgeData.js`

```javascript
export const talentForgeFeatures = [
  {
    id: 1,
    title: "Your Feature Title",
    description: "Feature description",
    icon: "FileText", // Icon from Lucide React
  },
  // Add more features...
];
```

### 4. Add/Edit Testimonials
**File**: `src/data/talentForgeData.js`

```javascript
export const testimonials = [
  {
    id: 1,
    name: "User Name",
    role: "Their Role",
    company: "Their Company",
    review: "Their testimonial text...",
    rating: 5,
    image: "👤", // Emoji or image URL
  },
  // Add more testimonials...
];
```

### 5. Update Statistics
**File**: `src/data/talentForgeData.js`

```javascript
export const statistics = [
  { id: 1, number: "500+", label: "Companies", suffix: "" },
  { id: 2, number: "10,000+", label: "Candidates", suffix: "" },
  // Modify numbers and labels...
];
```

---

## 🔗 Linking Buttons to Actions

### Update CTA Buttons in Hero Section
**File**: `src/components/landing/TFHeroSection.jsx`

Find and update button `onClick` handlers:

```jsx
<motion.button
  onClick={() => {
    // Navigate to your signup page
    window.location.href = "/register";
  }}
>
  Get Started
</motion.button>
```

### Update Footer Links
**File**: `src/components/landing/TFFooter.jsx`

Replace `href="#"` with actual links:

```jsx
<a href="/about">About</a>      // Change to actual route
<a href="/careers">Careers</a>  // Add real links
```

### Update Navbar Buttons
**File**: `src/components/landing/TFNavbar.jsx`

```jsx
<motion.button
  onClick={() => navigate("/login")}  // Add navigation
>
  Login
</motion.button>
```

---

## 🎬 Animation Customization

### Change Animation Speed
**File**: `src/utils/animations.js`

```javascript
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },  // Change duration here
  },
};
```

### Modify Hover Effects
**File**: Any component, look for `whileHover`

```jsx
<motion.div
  whileHover={{ scale: 1.05 }}  // Change scale value
  whileTap={{ scale: 0.95 }}    // Change tap effect
>
```

---

## 📱 Responsive Design

The page is fully responsive and works on:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

Key responsive breakpoints used:
- `sm:` - Small devices
- `md:` - Medium devices  
- `lg:` - Large devices

---

## 🧪 Testing

### Test Responsive Design
1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test on different screen sizes

### Test Animations
1. Scroll through the page
2. Hover over buttons and cards
3. Click buttons to test interactions

### Test Performance
1. Open DevTools → Lighthouse
2. Run performance audit
3. Check loading time and performance score

---

## 🔍 Section Details

| Section | File | Key Features |
|---------|------|--------------|
| Navbar | `TFNavbar.jsx` | Sticky, glass effect, responsive menu |
| Hero | `TFHeroSection.jsx` | Dashboard preview, floating cards |
| Companies | `TFTrustedCompanies.jsx` | Logo grid with hover effects |
| Features | `TFFeatures.jsx` | 6 cards with icons and animations |
| How It Works | `TFHowItWorks.jsx` | Two flows with timeline |
| Benefits | `TFPlatformBenefits.jsx` | Comparison cards |
| Statistics | `TFStatistics.jsx` | Animated counters |
| Testimonials | `TFTestimonials.jsx` | User reviews with ratings |
| CTA | `TFCTA.jsx` | Large action section |
| Footer | `TFFooter.jsx` | Links and social media |

---

## 🐛 Troubleshooting

### Page Not Showing?
1. Check that route is added in `App.jsx`
2. Ensure all imports are correct
3. Clear browser cache and restart dev server

### Animations Not Working?
1. Verify Framer Motion is installed: `npm install framer-motion`
2. Check console for errors
3. Ensure AnimatePresence is wrapping routes

### Styling Issues?
1. Verify Tailwind CSS is configured
2. Check that `index.css` has Tailwind directives
3. Restart development server after CSS changes

### Images/Icons Not Showing?
1. For Lucide icons: ensure `lucide-react` is installed
2. For logos: replace emoji with actual image paths
3. Check file paths are correct

---

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router Docs](https://reactrouter.com/)

---

## 💡 Pro Tips

1. **Use Tailwind's responsive classes** to adjust styles per breakpoint
2. **Leverage animation variants** for consistent animations across components
3. **Keep data in `talentForgeData.js`** for easy updates without code changes
4. **Test on real devices** not just browser DevTools
5. **Monitor performance** as animations can impact on slower devices

---

## 🚀 Deployment

When deploying:
1. Test all links work correctly
2. Verify images load properly
3. Check animations on target devices
4. Optimize images for production
5. Add analytics to track engagement

---

**Happy customizing! 🎉**
