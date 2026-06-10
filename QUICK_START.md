# 🚀 N-Medix Static Website - Quick Start Guide

## ⚡ Get Started in 2 Minutes

### Option 1: Direct Browser (Easiest)
```
1. Open my-static-folder/index.html in your browser
2. Done! Website is ready to use
```

### Option 2: Local Server (Recommended)

**Using Python (Built-in on most systems):**
```bash
# Navigate to project folder
cd my-static-folder

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

**Using Node.js (if installed):**
```bash
npx http-server my-static-folder -p 8000
# Then open: http://localhost:8000
```

**Using Visual Studio Code:**
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Click "Open with Live Server"

---

## 📋 What's Included

### ✅ Complete Pages
| Page | Purpose |
|------|---------|
| `index.html` | Home page with products & tests |
| `medicines.html` | Product catalog with filters |
| `medicine-detail.html` | Individual product info |
| `cart.html` | Shopping cart |
| `checkout.html` | Order form |
| `order-confirmation.html` | Order success |
| `lab-tests.html` | Available tests |
| `lab-test-booking.html` | Book a test |
| `account.html` | User dashboard |
| `admin-dashboard.html` | Admin panel demo |

### ✅ Static Assets
```
css/
  └── custom.css          (51KB - All styling)

js/
  ├── data.js             (Product & test data)
  └── main.js             (Interactive features)

img/                      (Images folder)
assets/                   (Additional assets)
```

### ✅ Features Ready to Use
- 🛒 Shopping cart (saved to browser)
- 🔍 Product search & filters
- ⭐ Product ratings
- 💚 Wishlist toggle
- 📱 Mobile responsive
- 🎨 Modern UI design
- ⚡ Fast loading (no framework overhead)

---

## 🎯 Quick Testing

### Test Shopping Flow
1. **Home Page** - Click any "Add to Cart" button
2. **View Cart** - Click cart icon (top right)
3. **Adjust Quantities** - Use +/- buttons
4. **Checkout** - Fill form and click "Complete Order"
5. **Confirmation** - See order success page

### Test Filters
1. Go to **Medicines** page
2. Check category filters on the right
3. Adjust price slider
4. See products update in real-time

### Test Mobile
1. Open in browser
2. Press **F12** to open DevTools
3. Click mobile icon (📱) 
4. Select "iPhone" or adjust width
5. Test responsive design

---

## 🛠️ Customization Quick Tips

### Change Products
Edit `js/data.js`:
```javascript
const medicines = [
  { id: 'm1', name: 'Product Name', price: 1000, ... },
  // Add your products here
];
```

### Change Colors
Edit `css/custom.css` (top of file):
```css
:root {
  --primary: #0B3C6D;    /* Navy Blue */
  --secondary: #1FA463;  /* Green */
  /* Change these colors */
}
```

### Add Navigation Link
Edit any HTML file's header section:
```html
<a href="your-page.html">Your Link</a>
```

### Update Company Info
Search & replace in all files:
- `N-Medix` → Your company name
- `+234 700 NMEDIX` → Your phone
- `support@nmedix.com` → Your email

---

## 📱 Browser Compatibility
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| IE 11 | Any | ❌ Not Supported |

---

## 💾 Data Storage

### Cart Persistence
Cart is automatically saved to browser's LocalStorage:
```javascript
// Cart data saved here:
localStorage.getItem('nmedix-cart')

// Clear cart if needed:
localStorage.removeItem('nmedix-cart')
```

### How to Reset Everything
Open browser console (F12) and run:
```javascript
localStorage.clear();  // Clear all data
location.reload();     // Refresh page
```

---

## 🔗 Common Navigation

### Home Page Links
- **Medicines** → medicines.html
- **Lab Tests** → lab-tests.html
- **Flash Deals** → medicines.html?deals=true
- **Cart** → cart.html

### Product Links
- Click product → medicine-detail.html?id=m1
- Book test → lab-test-booking.html?id=l1

### User Links
- Account → account.html
- Login → account.html
- Orders → account.html#orders

---

## ⚡ Performance Tips

### For Better Speed
1. ✅ Use local server (not file://)
2. ✅ Disable browser extensions
3. ✅ Clear browser cache if needed
4. ✅ Use modern browser (Chrome/Firefox)

### Optimizations Already Done
- Single CSS file (no multiple imports)
- Minimal JavaScript (no frameworks)
- Optimized image URLs
- Efficient DOM selectors

---

## 🐛 Troubleshooting

### Issue: Styles look broken
**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear cache: DevTools → Application → Clear Storage
3. Use local server instead of file://

### Issue: Cart not persisting
**Solution:**
1. Check browser's LocalStorage is enabled
2. Open DevTools → Application → LocalStorage
3. Look for 'nmedix-cart' key
4. Try incognito mode to test

### Issue: Images not showing
**Solution:**
1. Ensure `img/` folder exists
2. Check image paths in HTML
3. Use local server (not file://)
4. Check browser console for errors (F12)

### Issue: Forms not submitting
**Solution:**
1. This is a static site - forms demo only
2. Check browser console for validation errors
3. Fill all required fields (marked with *)
4. Check form data in console: `console.log(new FormData(form))`

---

## 📚 Learning Resources

### To Learn More
1. **HTML Structure** - View page source (Ctrl+U)
2. **CSS Styling** - Open `css/custom.css`
3. **JavaScript** - Review `js/main.js` functions
4. **Data Format** - Check `js/data.js` structure

### Code Examples
```javascript
// Add event listener
document.querySelector('.button').addEventListener('click', function() {
  console.log('Clicked!');
});

// Access cart data
const cart = JSON.parse(localStorage.getItem('nmedix-cart'));
console.log(cart);

// Update element
document.querySelector('#cartCount').textContent = '5';
```

---

## 🚀 Next Steps

### To Deploy (Host Online)
1. **GitHub Pages** - Push to GitHub, enable Pages
2. **Netlify** - Drag and drop folder
3. **Vercel** - Connect GitHub repo
4. **Web Host** - Upload via FTP

### To Add Backend
1. Replace `data.js` with API calls
2. Add authentication system
3. Integrate payment gateway
4. Connect to database
5. Set up admin API

### To Convert Back to React
1. Use `create-react-app` or Vite
2. Move HTML to `.tsx` components
3. Use React Router for navigation
4. Add state management (Redux/Zustand)
5. Use React libraries (React Query, etc.)

---

## 💡 Pro Tips

1. **Use DevTools** - Open F12 to inspect elements and debug
2. **Edit HTML Live** - Right-click element → Inspect → Edit
3. **Test Forms** - Fill form, open Console → check formData
4. **Debug Cart** - Type in Console: `cart` to see current state
5. **Network Tab** - Check all resources load (Images, CSS, JS)

---

## 📞 Support

### Common Questions

**Q: Can I use this for my business?**
A: Yes! This is a fully functional e-commerce site. Customize it with your products and deploy.

**Q: Is it secure?**
A: Cart is client-side only (secure). No real payments processed. Add backend for production use.

**Q: Can I add more products?**
A: Yes! Edit `js/data.js` and add to the medicines or labTests arrays.

**Q: Does it need a server?**
A: Not for static serving, but a local server is recommended for best experience.

**Q: Can I change the design?**
A: Yes! All CSS in `custom.css`. All HTML easily editable.

---

## ✅ Checklist Before Going Live

- [ ] Test all pages load
- [ ] Test shopping flow (add to cart → checkout)
- [ ] Test filters work
- [ ] Test responsive design on mobile
- [ ] Update company info
- [ ] Add real products/prices
- [ ] Update contact information
- [ ] Test on multiple browsers
- [ ] Optimize images if needed
- [ ] Set up backend API (when ready)

---

**You're all set! Happy selling! 🎉**

For detailed documentation, see `README.md`
