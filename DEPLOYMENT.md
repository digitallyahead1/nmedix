# 🌐 N-Medix - Deployment & Integration Guide

Complete guide for deploying your N-Medix static website to production.

## 🚀 Deployment Platforms

### 1. **Netlify** (Easiest - Recommended)

#### Method A: Drag & Drop (Fastest)
```
1. Go to https://netlify.com
2. Sign up (free account)
3. Drag and drop "my-static-folder" to deploy area
4. Your site is live! (auto-generated URL)
```

#### Method B: GitHub Integration
```
1. Push my-static-folder to GitHub
2. Go to Netlify.com → New site from Git
3. Connect GitHub → select repository
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: my-static-folder
5. Click Deploy
6. Your site is live with auto-updates!
```

**Advantages:**
- ✅ Free SSL/HTTPS
- ✅ Auto-deploys on Git push
- ✅ Custom domain support
- ✅ CDN included
- ✅ Serverless functions available

**Cost:** Free (with upgrade options)

---

### 2. **Vercel** (Fast & Optimized)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# - Link to GitHub account
# - Select repository
# - Deploy!
```

**Advantages:**
- ✅ Instant cache invalidation
- ✅ Automatic image optimization
- ✅ Global edge network
- ✅ Analytics dashboard

**Cost:** Free (with upgrade options)

---

### 3. **GitHub Pages** (Free Hosting)

```bash
# 1. Create GitHub repository
# 2. Clone: git clone <your-repo-url>
# 3. Copy my-static-folder contents to repo root
# 4. Push to GitHub
git add .
git commit -m "Deploy N-Medix static site"
git push origin main

# 5. Go to Settings → Pages
# 6. Set source to main branch → Save
# 7. Your site is live at https://<username>.github.io/<repo-name>
```

**Advantages:**
- ✅ Free
- ✅ Unlimited bandwidth
- ✅ Custom domain support
- ✅ GitHub integration

**Limitations:**
- Public repository
- Basic features only

**Cost:** Free

---

### 4. **AWS S3 + CloudFront**

```bash
# 1. Create S3 bucket
aws s3 mb s3://nmedix-static

# 2. Upload files
aws s3 sync my-static-folder s3://nmedix-static

# 3. Enable static website hosting
aws s3api put-bucket-website \
  --bucket nmedix-static \
  --website-configuration IndexDocument={Suffix=index.html}

# 4. Create CloudFront distribution
# (Use AWS Console for this)

# 5. Your site is live!
```

**Advantages:**
- ✅ Highly scalable
- ✅ Global CDN
- ✅ Very cheap
- ✅ Enterprise-grade

**Cost:** ~$1-5/month depending on traffic

---

### 5. **Traditional Web Host (Bluehost, GoDaddy, etc.)**

```bash
# 1. Sign up for hosting plan
# 2. Upload via FTP/File Manager:
#    - FTP to ftp://yoursite.com
#    - Upload all files from my-static-folder
#    - Set index.html as default
# 3. Your site is live at https://yoursite.com
```

**Advantages:**
- ✅ Email hosting
- ✅ Domain registration
- ✅ Support included
- ✅ WordPress compatible

**Cost:** $2-10/month

---

## 🔐 Pre-Deployment Checklist

### Security
- [ ] No sensitive API keys in files
- [ ] No password/auth tokens visible
- [ ] Form submission not processing real data
- [ ] Links don't point to staging/test servers

### Performance
- [ ] Images optimized (< 100KB each)
- [ ] CSS/JS minified (if needed)
- [ ] Remove unused code
- [ ] Test page load speed

### Functionality
- [ ] All links work
- [ ] Cart functionality works
- [ ] Forms validate correctly
- [ ] Responsive design tested
- [ ] Mobile menu works
- [ ] All pages accessible

### SEO & Meta
- [ ] Meta titles set for each page
- [ ] Meta descriptions present
- [ ] Open Graph tags configured
- [ ] Sitemap created
- [ ] robots.txt configured

---

## 📝 Configuration Files to Add

### 1. Create `my-static-folder/.htaccess` (For Apache servers)
```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Rewrite URLs (for single page app style navigation)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 2. Create `my-static-folder/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

### 3. Create `my-static-folder/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2024-10-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/medicines.html</loc>
    <lastmod>2024-10-23</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yoursite.com/lab-tests.html</loc>
    <lastmod>2024-10-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add all other pages -->
</urlset>
```

### 4. Create `my-static-folder/404.html`
```html
<!DOCTYPE html>
<html>
<head>
  <title>Page Not Found - N-Medix</title>
  <link rel="stylesheet" href="css/custom.css">
</head>
<body>
  <div class="container-custom" style="text-align: center; padding: 4rem 0;">
    <h1 style="font-size: 3rem;">404</h1>
    <p style="font-size: 1.25rem; margin: 1rem 0;">Page Not Found</p>
    <a href="index.html" class="btn-primary">Back to Home</a>
  </div>
</body>
</html>
```

---

## 🔗 Custom Domain Setup

### For Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records (Netlify provides instructions)
4. SSL auto-generates (free)

### For Vercel
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records at your registrar
4. SSL auto-generates (free)

### For GitHub Pages
1. Go to Settings → Pages
2. Add custom domain
3. Update DNS A records:
   ```
   A    185.199.108.153
   A    185.199.109.153
   A    185.199.110.153
   A    185.199.111.153
   ```

---

## 🔧 Backend Integration

### When Ready to Add Backend

**1. Update Product Data**
```javascript
// Replace in js/main.js
async function loadProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data;
}
```

**2. Handle Cart Persistence**
```javascript
// Save to backend instead of localStorage
async function saveCart(cartData) {
  await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartData)
  });
}
```

**3. Process Orders**
```javascript
// Send to backend instead of localStorage
async function submitOrder(orderData) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return response.json();
}
```

---

## 📊 Analytics Setup

### Add Google Analytics
Add to every HTML page in `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual ID from Google Analytics.

### Add Facebook Pixel
Add to every HTML page in `<head>`:
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  // ... (complete code from Facebook)
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

---

## 🎯 Performance Optimization

### Image Optimization
```bash
# Using ImageOptim (Mac) or similar tools
# Or use online tools like:
# - tinypng.com
# - imagecompressor.com
# - squoosh.app

# For images, aim for:
# - JPEG: < 100KB
# - PNG: < 80KB
# - WebP: < 60KB
```

### CSS/JS Minification
```bash
# Using online tools:
# - cssminifier.com
# - minifier.org
# - toptal.com/developers/cssminifier
```

### Lazy Load Images
```html
<!-- Add to img tags -->
<img src="image.jpg" loading="lazy" alt="Product">
```

---

## 🧪 Testing Before Deploy

### Lighthouse Test
1. Open website in Chrome
2. Press F12 (DevTools)
3. Click Lighthouse tab
4. Click "Analyze page load"
5. Fix issues reported

### Check Links
```javascript
// In browser console:
const links = document.querySelectorAll('a');
links.forEach(link => {
  if (!link.href.includes('#') && !link.href.startsWith('http')) {
    console.log('Broken:', link.href);
  }
});
```

### Mobile Test
- Test on iPhone and Android
- Test on various screen sizes
- Test touch interactions
- Test form inputs

---

## 🚨 Troubleshooting Deployment

### Issue: CSS/Images not loading
**Solutions:**
1. Check file paths are relative
2. Ensure case sensitivity matches (Linux servers)
3. Clear browser cache
4. Check server logs

### Issue: Forms not working
**Solution:**
- This is a static site - forms don't submit by default
- To add backend: Update form action to API endpoint

### Issue: CORS errors
**Solution:**
- Add CORS headers to backend API
- Use proxy if needed (Netlify/Vercel provide this)

### Issue: Slow loading
**Solutions:**
1. Minify CSS/JS
2. Compress images
3. Use CDN
4. Enable GZIP
5. Remove unused files

---

## 📈 Post-Launch

### Monitor Performance
- [ ] Check analytics daily first week
- [ ] Monitor uptime (Uptime Robot - free)
- [ ] Check error rates
- [ ] Monitor SEO rankings

### Keep Updated
- [ ] Update product prices
- [ ] Add new products
- [ ] Update contact info
- [ ] Fix reported issues
- [ ] Improve based on user feedback

### Scale When Ready
- [ ] Add user authentication
- [ ] Integrate payment processing
- [ ] Add backend database
- [ ] Implement admin panel
- [ ] Add email notifications

---

## 📞 Deployment Support

### Netlify Support
- Docs: docs.netlify.com
- Support: support@netlify.com
- Community: discuss.netlify.com

### Vercel Support
- Docs: vercel.com/docs
- Support: vercel.com/support
- Community: github.com/vercel/next.js/discussions

### GitHub Pages
- Docs: pages.github.com
- Help: github.community

---

**Deploy with confidence! Your N-Medix site is ready for the world! 🚀**

For more help, see QUICK_START.md and README.md
