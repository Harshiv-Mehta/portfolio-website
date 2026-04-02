# Harshiv Mehta - Professional Portfolio Website

A modern, fully responsive portfolio website for Harshiv Mehta - B.Tech CSE Student & Full Stack Developer.

## 🎨 Features

### Design & Animations
- **Modern Dark Theme** - Professional cyan & pink color scheme
- **Smooth Animations** - Page load, scroll, hover, and interaction animations
- **Floating Cards** - Animated technology cards in hero section
- **Timeline Design** - Beautiful timeline for experience and education
- **Responsive Layout** - Fully optimized for desktop, tablet, and mobile devices

### Sections Included
1. **Navigation Bar** - Sticky navigation with smooth scrolling
2. **Hero Section** - Eye-catching introduction with CTAs
3. **About Section** - Personal introduction with stats
4. **Skills Section** - Categorized technical skills
5. **Projects Section** - Showcase of 4 major projects
6. **Experience & Education** - Timeline view of career and education
7. **Languages Section** - Multi-language proficiency display
8. **Contact Section** - Contact form and information
9. **Footer** - Social media links and copyright

### Interactive Features
- ✨ Smooth scroll animations
- 🎯 Active navigation link highlighting
- 📱 Mobile hamburger menu
- 📝 Contact form with validation
- 🎨 Hover effects on all interactive elements
- 🔝 Scroll-to-top button
- 💬 Success/error notifications
- 🎬 Ripple effects on buttons

## 📁 File Structure

```
vrunda portfolio/
├── index.html      (Main HTML file)
├── styles.css      (All styling and animations)
├── script.js       (Interactive features)
└── README.md       (This file)
```

## 🚀 How to Use

1. **Open the Portfolio**
   - Simply double-click `index.html` to open in your default browser
   - Or right-click → Open with Browser

2. **View on Different Devices**
   - Desktop: Full experience with all animations
   - Mobile: Responsive design with hamburger menu
   - Tablet: Adjusted layout for touch devices

3. **Customize the Content**
   - Edit `index.html` to update text, links, and information
   - Modify `styles.css` to change colors, fonts, or animations
   - Update `script.js` for additional interactivity

## 🎨 Customization Guide

### Change Colors
Open `styles.css` and modify the color variables at the top:
```css
:root {
    --primary-color: #00d4ff;      /* Cyan - main color */
    --secondary-color: #0099cc;    /* Dark cyan */
    --accent-color: #FF6B9D;       /* Pink - accents */
    --dark-bg: #0a0e27;            /* Dark background */
    --card-bg: #1a1f3a;            /* Card background */
    --text-primary: #ffffff;       /* Text color */
    --text-secondary: #b0b8d4;     /* Secondary text */
}
```

### Update Personal Information

#### Header/Footer Social Links
Find these sections in `index.html` and update URLs:
```html
<a href="https://www.linkedin.com/in/harshiv-mehta" target="_blank">
```

#### Contact Information
Update phone, email, and location in the contact section.

#### Project Links
Replace GitHub repository links in the projects section.

#### Profile Image
Replace the profile placeholder with your actual image:
```html
<div class="profile-placeholder">
    <img src="your-image.jpg" alt="Profile">
</div>
```

### Add More Projects
Duplicate a project card and update the information:
```html
<div class="project-card">
    <div class="project-header">
        <div class="project-icon">
            <i class="fas fa-icon-name"></i>
        </div>
        <h3>Project Name</h3>
    </div>
    <!-- Update other content -->
</div>
```

## 🎯 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile Browsers

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Hamburger menu for navigation on mobile
- Touch-friendly buttons and links
- Optimized image sizes
- Proper spacing for small screens
- Single-column layouts on mobile

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (Vanilla)** - No frameworks, lightweight
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

## ⚡ Performance Tips

1. **Fast Loading** - No external dependencies required (except Font Awesome)
2. **Optimized Animations** - Uses CSS animations for smooth performance
3. **Lazy Loading Support** - Ready for image optimization
4. **Mobile First** - Responsive design that scales gracefully

## 📞 Contact Form

The contact form includes:
- ✅ Email validation
- ✅ Required field validation
- ✅ Success/error notifications
- Note: Currently logs to console. To make it functional, integrate with a backend service (like Formspree, EmailJS, or your own server)

### Make Contact Form Functional
To send emails, integrate with services like Formspree:
```javascript
// In script.js, replace the fetch call with:
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Accept': 'application/json' }
})
```

## 🎁 Additional Features

### Icon Library
Uses Font Awesome 6.4.0 icons. Available icons:
- Programming: Code, database, nodes
- Social: LinkedIn, GitHub, WhatsApp, Email
- General: Star, trophy, briefcase, etc.

### Animation Classes
Pre-built animations include:
- `slideUp` - Slide up with fade
- `fadeInLeft` / `fadeInRight` - Directional fade
- `float1`, `float2`, `float3` - Floating effect
- `pulse` - Pulsing effect

## 📊 SEO Optimization

To improve SEO:
1. Update `<title>` in HTML
2. Add meta description tag
3. Add proper heading hierarchy (H1, H2, H3)
4. Include alt text on images
5. Add structured data (JSON-LD)

### Example meta tag to add:
```html
<meta name="description" content="Harshiv Mehta - Full Stack Developer & B.Tech CSE Student. Portfolio showcasing projects, skills, and experience.">
```

## 🚀 Deployment

### Host on Free Platforms
1. **GitHub Pages** - Free hosting
   - Push files to GitHub repository
   - Enable GitHub Pages in settings
   - Access via: `username.github.io/portfolio`

2. **Vercel/Netlify** - Drag and drop deployment

3. **Web Server** - Upload files to any web hosting

## 📝 Notes

- All content is customizable
- No installation required
- Works offline (except contact form without backend)
- Fully self-contained (no external dependencies except icons)
- Optimized file sizes

## 💡 Tips for Best Results

1. Use a high-quality profile picture
2. Keep project descriptions concise but impactful
3. Update resume/CV link regularly
4. Use actual project GitHub links
5. Add real contact information
6. Test on multiple devices before sharing
7. Keep animations subtle for professional appearance

## 🎓 Learning Resources

- CSS Animations: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- JavaScript: [JavaScript.info](https://javascript.info)
- Responsive Design: [Google Web Dev](https://web.dev)
- Font Awesome Icons: [Font Awesome Docs](https://fontawesome.com)

## 📄 License

This portfolio template is free to use and modify for personal use.

---

**Made with ❤️ for aspiring developers**

Happy sharing! 🚀
