# 🎨 TalentForge AI - Component Showcase & Cheat Sheet

## 📚 Component Reference Guide

A quick reference for all components, their props, and customization options.

---

## 🧩 Component Listing

### 1️⃣ TFNavbar
**Purpose**: Sticky navigation with responsive menu

**Features**:
- Glass effect background
- Sticky positioning
- Mobile hamburger menu
- Logo with gradient text
- Responsive navigation links
- Login/Register buttons

**Key Files**:
- `TFNavbar.jsx`

**Customization**:
```jsx
// Add new nav links
const navLinks = [
  { name: "New Link", href: "#new" }
];

// Change logo text
<span>Your Company Name</span>

// Update buttons
<motion.button onClick={() => navigate("/login")}>
  Login
</motion.button>
```

---

### 2️⃣ TFHeroSection
**Purpose**: Eye-catching hero section with interactive dashboard preview

**Features**:
- Animated badge
- Gradient text in headline
- Two CTA buttons
- Interactive dashboard preview
- Floating cards with animations
- Real-time stats display
- Hover-triggered animations

**Key Files**:
- `TFHeroSection.jsx`

**Customize Dashboard Stats**:
```jsx
// Edit these cards
{[
  { label: "ATS Score", value: "92%", icon: "⚡" },
  { label: "Match Score", value: "89%", icon: "🎯" },
  // Add more stats
]}

// Edit candidate list
{[
  { name: "Alex Johnson", score: 95 },
  { name: "Sarah Chen", score: 92 },
  // Add more candidates
]}
```

---

### 3️⃣ TFTrustedCompanies
**Purpose**: Display trusted companies/partners

**Features**:
- 8 company logos in grid
- Hover animations
- Responsive layout
- Grayscale to color transition

**Key Files**:
- `TFTrustedCompanies.jsx`
- `talentForgeData.js` (data source)

**Add Companies**:
```javascript
// In talentForgeData.js
export const trustedCompanies = [
  { id: 1, name: "Company Name", logo: "🔵" },
  // Add company logos (emoji or image)
];
```

---

### 4️⃣ TFFeatures
**Purpose**: Showcase 6 key platform features

**Features**:
- 6 feature cards in responsive grid
- Icon from Lucide React
- Hover lift animations
- Glass effect backgrounds
- Corner accent on hover

**Key Files**:
- `TFFeatures.jsx`
- `talentForgeData.js` (feature data)

**Modify Features**:
```javascript
// In talentForgeData.js
export const talentForgeFeatures = [
  {
    id: 1,
    title: "Feature Name",
    description: "Feature description",
    icon: "IconName", // Lucide icon
  },
];
```

**Available Icons** (from Lucide React):
- FileText, Zap, TrendingUp, Briefcase, BarChart3, CheckCircle

---

### 5️⃣ TFHowItWorks
**Purpose**: Show process flows for two user types

**Features**:
- Tab switching (Recruiter/Job Seeker)
- 6-step timeline for each
- Animated progress lines
- Numbered steps
- Smooth transitions

**Key Files**:
- `TFHowItWorks.jsx`
- `talentForgeData.js` (steps data)

**Customize Steps**:
```javascript
// In talentForgeData.js
export const recruiterSteps = [
  {
    step: 1,
    title: "Step Title",
    description: "Step description",
  },
];

export const jobSeekerSteps = [
  {
    step: 1,
    title: "Step Title",
    description: "Step description",
  },
];
```

---

### 6️⃣ TFPlatformBenefits
**Purpose**: Compare traditional hiring vs platform

**Features**:
- Side-by-side comparison
- Check/X marks for benefits
- "Recommended" badge
- Hover scale effect
- CTA button

**Key Files**:
- `TFPlatformBenefits.jsx`
- `talentForgeData.js` (benefits data)

**Customize Benefits**:
```javascript
// In talentForgeData.js
export const platformBenefits = {
  traditional: [
    "Benefit 1",
    "Benefit 2",
  ],
  talentForge: [
    "Benefit 1",
    "Benefit 2",
  ],
};
```

---

### 7️⃣ TFStatistics
**Purpose**: Display animated statistics with count-up effect

**Features**:
- 4 stat counters
- Count-up animations
- Responsive grid
- Intersection observer for triggers
- Smooth animations

**Key Files**:
- `TFStatistics.jsx`
- `talentForgeData.js` (stats data)

**Update Statistics**:
```javascript
// In talentForgeData.js
export const statistics = [
  { id: 1, number: "500+", label: "Companies", suffix: "" },
  { id: 2, number: "10,000+", label: "Candidates", suffix: "" },
  // Update numbers and labels
];
```

---

### 8️⃣ TFTestimonials
**Purpose**: Display 3 user testimonials

**Features**:
- 3 testimonial cards
- 5-star ratings (animated)
- User avatar/image
- Hover animations
- Quote marks
- Responsive grid

**Key Files**:
- `TFTestimonials.jsx`
- `talentForgeData.js` (testimonials data)

**Add Testimonials**:
```javascript
// In talentForgeData.js
export const testimonials = [
  {
    id: 1,
    name: "User Name",
    role: "Their Role",
    company: "Their Company",
    review: "Their testimonial...",
    rating: 5,
    image: "👤", // Emoji or URL
  },
];
```

---

### 9️⃣ TFCTA
**Purpose**: Large call-to-action section

**Features**:
- Gradient background
- Compelling headline
- Two action buttons
- Trust indicators
- Animated elements

**Key Files**:
- `TFCTA.jsx`

**Customize**:
```jsx
// Change button actions
<motion.button onClick={() => navigate("/recruit")}>
  Start Recruiting
</motion.button>

// Update trust indicators
<div className="flex items-center gap-2">
  <div>✓</div>
  <span>Your indicator text</span>
</div>
```

---

### 🔟 TFFooter
**Purpose**: Footer with links and social icons

**Features**:
- Brand section
- 4 link sections
- Social media icons
- Responsive layout
- Hover animations

**Key Files**:
- `TFFooter.jsx`

**Customize Links**:
```javascript
// Add/modify footer sections
const footerSections = [
  {
    title: "Section Name",
    links: ["Link 1", "Link 2", "Link 3"],
  },
];
```

**Social Links**:
```javascript
// Update social media links
const socialLinks = [
  { icon: Linkedin, href: "your-linkedin-url", label: "LinkedIn" },
  { icon: Github, href: "your-github-url", label: "GitHub" },
  { icon: Twitter, href: "your-twitter-url", label: "Twitter" },
];
```

---

### 1️⃣1️⃣ TalentForgeLandingPage
**Purpose**: Main landing page component combining all sections

**Features**:
- Imports all sub-components
- Page fade-in animation
- Scrollable layout
- No margins/padding interference

**Key Files**:
- `TalentForgeLandingPage.jsx`

---

## 🎨 Styling & Animation Utilities

### Animation Variants (in `animations.js`)

```javascript
// Container for staggered animations
containerVariants → Stagger children with delay

// Individual item animations
itemVariants → Fade in from bottom
fadeInUpVariants → Fade in up
fadeInDownVariants → Fade in down
scaleInVariants → Scale in from center
slideInLeftVariants → Slide in from left
slideInRightVariants → Slide in from right

// Hover effects
hoverScale → Scale up on hover, down on tap
hoverLift → Move up on hover

// Floating animation
floatingVariants → Continuous floating motion
```

### Using Animations

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### Color Palette

```javascript
colors = {
  primary: "#4F46E5",        // Indigo
  secondary: "#8B5CF6",      // Purple
  accent: "#3B82F6",         // Blue
  background: "#F8FAFC",     // Light
  card: "#FFFFFF",           // White
  text: "#0F172A",           // Dark
  textLight: "#475569",      // Light text
  border: "#E2E8F0",         // Light border
  success: "#10B981",        // Green
  error: "#EF4444",          // Red
}
```

---

## 📱 Responsive Classes Used

```css
/* Tailwind breakpoints */
sm:   640px   → Small
md:   768px   → Medium
lg:  1024px   → Large
xl:  1280px   → Extra Large

/* Examples */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
→ 1 column on mobile, 2 on tablet, 3 on desktop

flex-col md:flex-row
→ Column on mobile, row on tablet+

text-3xl lg:text-5xl
→ Smaller text on mobile, larger on desktop
```

---

## 🎬 Animation Timing

Most animations use:
- **Duration**: 0.6s to 0.8s
- **Ease**: "easeOut" for enter, "easeInOut" for continuous
- **Delay**: Staggered 0.1s between items
- **Spring**: stiffness: 300, damping: 20 for physics

---

## 🔍 Icon Reference

All icons from **Lucide React**:

```jsx
import { 
  Sparkles, Menu, X, ArrowRight, PlayCircle,
  Building2, User, CheckCircle2, Star,
  FileText, Zap, TrendingUp, Briefcase,
  BarChart3, CheckCircle, Linkedin, Github, Twitter
} from "lucide-react";
```

---

## 📊 Data Structure

All data is in `talentForgeData.js`:

```javascript
talentForgeFeatures      // Array of 6 features
trustedCompanies         // Array of 8 companies
recruiterSteps           // Array of 6 recruiter steps
jobSeekerSteps           // Array of 6 seeker steps
testimonials             // Array of 3 testimonials
statistics               // Array of 4 stats
platformBenefits         // Object with 2 arrays
```

---

## 🛠️ Common Customizations

### Change All Primary Colors
```javascript
// In animations.js
primary: "#YOUR_COLOR"
// Search and replace all instances of primary color throughout components
```

### Add New Feature Card
```javascript
// In talentForgeData.js
export const talentForgeFeatures = [
  // ... existing features
  {
    id: 7,
    title: "New Feature",
    description: "New description",
    icon: "IconName", // From Lucide
  },
];
```

### Update Company Logo
```javascript
// In talentForgeData.js
export const trustedCompanies = [
  { id: 1, name: "Company", logo: "🔵" }, // Change emoji or use image
];
```

### Modify Animation Speed
```javascript
// In animations.js
transition: { duration: 0.8 } // Change 0.8 to slower/faster value
```

### Add New Section
1. Create `TFNewSection.jsx` in `landing/` folder
2. Import in `TalentForgeLandingPage.jsx`
3. Add `<TFNewSection />` in render
4. Add data to `talentForgeData.js` if needed

---

## 🚀 Performance Tips

1. **Images**: Optimize before using
2. **Animations**: Reduce complexity on mobile
3. **Data**: Keep in single source (talentForgeData.js)
4. **Components**: Reuse sections whenever possible
5. **Testing**: Check performance on slower devices

---

## 🐛 Quick Debugging

| Issue | Solution |
|-------|----------|
| Animations not showing | Check Framer Motion import |
| Styling wrong | Clear cache, restart dev server |
| Icons missing | Verify lucide-react is installed |
| Layout broken | Check Tailwind configuration |
| Page not loading | Verify route in App.jsx |

---

## 📚 Quick Links

- **Main Page**: `TalentForgeLandingPage.jsx`
- **Data**: `talentForgeData.js`
- **Animations**: `animations.js`
- **Colors**: `animations.js` → colors export
- **Icons**: Lucide React documentation

---

## ✅ Checklist Before Deployment

- [ ] All links are configured
- [ ] Colors match brand guidelines
- [ ] Images/logos are optimized
- [ ] Testimonials are real and credited
- [ ] Statistics are accurate
- [ ] Mobile responsiveness tested
- [ ] Animations smooth on target devices
- [ ] Form buttons have proper actions
- [ ] Analytics code added
- [ ] SEO metadata configured

---

**Keep this guide handy for quick reference during customization! 📌**
