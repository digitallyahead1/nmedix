// Global State
let cart = {
    medicines: [],
    labTests: [],
    promoCode: '',
    discount: 0
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeDropdowns();
    initializeCartFunctionality();
    initializeFilters();
    initializeCountdown();
    initializeTabs();
    initializeModals();
    initializeFormValidation();
    loadCartFromStorage();
    updateCartBadge();
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('active');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
}

// Dropdown Menu
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('[data-dropdown-trigger]');
        const menu = dropdown.querySelector('[data-dropdown-menu]');

        if (trigger && menu) {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                menu.classList.toggle('hidden');
            });
        }
    });

    document.addEventListener('click', function() {
        document.querySelectorAll('[data-dropdown-menu]').forEach(menu => {
            menu.classList.add('hidden');
        });
    });
}

// Cart Functionality
function initializeCartFunctionality() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.addToCart;
            const product = medicines.find(m => m.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });

    // Wishlist buttons
    const wishlistButtons = document.querySelectorAll('[data-wishlist]');
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '❤️';
            } else {
                this.innerHTML = '🤍';
            }
        });
    });
}

function addToCart(product) {
    const existingItem = cart.medicines.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.medicines.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartBadge();
    showNotification(`${product.name} added to cart!`);
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-count');
    const total = cart.medicines.reduce((sum, item) => sum + item.quantity, 0);

    if (badge) {
        badge.textContent = total;
        if (total > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function saveCartToStorage() {
    localStorage.setItem('nmedix-cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('nmedix-cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch (e) {
            cart = { medicines: [], labTests: [], promoCode: '', discount: 0 };
        }
    }
}

// Notification Toast
function showNotification(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: var(--secondary);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Filters
function initializeFilters() {
    const filterCheckboxes = document.querySelectorAll('[data-filter]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    const priceRange = document.querySelector('[data-price-range]');
    if (priceRange) {
        priceRange.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('[data-filter-category]:checked')).map(el => el.value);
    const selectedBrands = Array.from(document.querySelectorAll('[data-filter-brand]:checked')).map(el => el.value);
    const maxPrice = document.querySelector('[data-price-range]') ? .value || 50000;
    const inStockOnly = document.querySelector('[data-filter-stock]') ? .checked || false;

    const products = document.querySelectorAll('[data-product-card]');

    products.forEach(card => {
        const category = card.dataset.category;
        const brand = card.dataset.brand;
        const price = parseInt(card.dataset.price);
        const stock = parseInt(card.dataset.stock);

        let show = true;

        if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            show = false;
        }

        if (selectedBrands.length > 0 && !selectedBrands.includes(brand)) {
            show = false;
        }

        if (price > maxPrice) {
            show = false;
        }

        if (inStockOnly && stock === 0) {
            show = false;
        }

        card.style.display = show ? 'block' : 'none';
    });
}

// Countdown Timer
function initializeCountdown() {
    const countdownElements = document.querySelectorAll('[data-countdown]');

    countdownElements.forEach(element => {
        const targetTime = parseInt(element.dataset.countdown);

        function updateCountdown() {
            const now = Date.now();
            const timeLeft = Math.max(0, targetTime - now);

            if (timeLeft === 0) {
                element.textContent = 'Ended';
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            element.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}

function pad(num) {
    return String(num).padStart(2, '0');
}

// Tabs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('[data-tab-button]');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tabButton;

            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Hide all tab contents
            const tabContents = document.querySelectorAll('[data-tab-content]');
            tabContents.forEach(content => content.classList.add('hidden'));

            // Show selected tab content
            const selectedContent = document.querySelector(`[data-tab-content="${tabName}"]`);
            if (selectedContent) {
                selectedContent.classList.remove('hidden');
            }
        });
    });
}

// Modals
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.dataset.modalTrigger;
            const modal = document.querySelector(`[data-modal-id="${modalId}"]`);
            if (modal) {
                modal.classList.remove('hidden');
            }
        });
    });

    const modalCloses = document.querySelectorAll('[data-modal-close]');

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('[data-modal-id]');
            if (modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('[data-modal-id]');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('[data-validate-form]');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                handleFormSubmit(form);
            }
        });
    });
}

function handleFormSubmit(form) {
    const formType = form.dataset.validateForm;

    if (formType === 'checkout') {
        localStorage.setItem('checkout-data', JSON.stringify(new FormData(form)));
        window.location.href = 'order-confirmation.html';
    } else if (formType === 'login') {
        localStorage.setItem('user-data', JSON.stringify(new FormData(form)));
        window.location.href = 'account.html';
    } else {
        showNotification('Form submitted successfully!');
    }
}

// Quantity Controls in Cart
function initializeQuantityControls() {
    const decrementButtons = document.querySelectorAll('[data-quantity-decrease]');
    const incrementButtons = document.querySelectorAll('[data-quantity-increase]');

    decrementButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateCartTotal();
            }
        });
    });

    incrementButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
            updateCartTotal();
        });
    });
}

function updateCartTotal() {
    const itemsContainer = document.querySelector('[data-cart-items]');
    if (itemsContainer) {
        const items = itemsContainer.querySelectorAll('[data-cart-item]');
        let subtotal = 0;

        items.forEach(item => {
            const price = parseInt(item.dataset.price);
            const quantity = parseInt(item.querySelector('[data-quantity-input]').value);
            subtotal += price * quantity;
        });

        const subtotalEl = document.querySelector('[data-subtotal]');
        if (subtotalEl) {
            subtotalEl.textContent = formatNaira(subtotal);
        }

        const totalEl = document.querySelector('[data-total]');
        if (totalEl) {
            const tax = Math.round(subtotal * 0.075);
            const shipping = 500;
            const total = subtotal + tax + shipping;
            totalEl.textContent = formatNaira(total);
        }
    }
}

// Search functionality
function initializeSearch() {
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input[name="q"]').value;
            const category = this.querySelector('select[name="category"]').value;

            // Redirect to products with search params
            window.location.href = `medicines.html?search=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`;
        });
    }
}

// View Mode Toggle (Grid/List)
function initializeViewMode() {
    const gridBtn = document.querySelector('[data-view-grid]');
    const listBtn = document.querySelector('[data-view-list]');
    const productsContainer = document.querySelector('[data-products-container]');

    if (gridBtn) {
        gridBtn.addEventListener('click', function() {
            productsContainer ? .classList.remove('view-list');
            productsContainer ? .classList.add('view-grid');
            gridBtn.classList.add('active');
            listBtn ? .classList.remove('active');
        });
    }

    if (listBtn) {
        listBtn.addEventListener('click', function() {
            productsContainer ? .classList.remove('view-grid');
            productsContainer ? .classList.add('view-list');
            listBtn.classList.add('active');
            gridBtn ? .classList.remove('active');
        });
    }
}

// Slider/Carousel
function initializeSliders() {
    const sliders = document.querySelectorAll('[data-slider]');

    sliders.forEach(slider => {
        const items = slider.querySelectorAll('[data-slide]');
        const prevBtn = slider.querySelector('[data-slide-prev]');
        const nextBtn = slider.querySelector('[data-slide-next]');
        let currentIndex = 0;

        function showSlide(index) {
            items.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                showSlide(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % items.length;
                showSlide(currentIndex);
            });
        }

        showSlide(0);

        // Auto-rotate slides
        setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        }, 5000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Call initialization functions
initializeSearch();
initializeViewMode();
initializeQuantityControls();
initializeSliders();

// CSS Animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  input.error {
    border-color: #EF4444 !important;
    background-color: #FEE2E2;
  }

  .view-list .product-card {
    flex-direction: row;
  }

  .view-list .product-image {
    width: 150px;
    height: 150px;
    padding-bottom: 0;
  }

  [data-dropdown-menu].hidden {
    display: none;
  }
`;
document.head.appendChild(style);