// Book Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const bookCards = document.querySelectorAll('.book-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get the category to filter
        const category = button.dataset.category;

        // Filter books
        bookCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                const cardCategories = card.dataset.category.split(' ');
                if (cardCategories.includes(category)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            }
        });

        // Scroll to books section
        const booksSection = document.querySelector('.books-section');
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = booksSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Shopping Cart Functionality (Basic - to be replaced with Shopify or similar)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const bookCard = e.target.closest('.book-card');
        const bookTitle = bookCard.querySelector('h3').textContent;
        const bookPrice = bookCard.querySelector('.book-price').textContent;
        const bookAuthor = bookCard.querySelector('.book-author').textContent;

        const item = {
            id: Date.now(),
            title: bookTitle,
            author: bookAuthor,
            price: bookPrice,
            quantity: 1
        };

        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Visual feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4a7c59';

        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 2000);

        // Show cart count (if you add a cart icon in navigation)
        updateCartCount();

        // Optional: Show a toast notification
        showToast(`${bookTitle} added to cart!`);
    });
});

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Update cart icon badge if it exists
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add animations for toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);

// Initialize cart count on page load
updateCartCount();

// TODO: Replace this basic cart with actual e-commerce integration
// Options:
// 1. Shopify Buy Button or Shopify Lite
// 2. Stripe Checkout
// 3. Square Online
// 4. Snipcart
// 5. Custom backend with payment processing

// For now, you can create a simple cart.html page to show cart items
// and allow users to proceed to checkout via email or phone