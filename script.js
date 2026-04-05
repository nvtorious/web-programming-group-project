/*2d. Basic Interactivity & Logic  for Data storage and arrays */
var products = [
    { id: 1,  name: "Sharp Microwave",               category: "kitchen",       price: 18500,  image: "microwave.jpg" },
    { id: 2,  name: "Oster Blender",                 category: "kitchen",       price: 7500,   image: "blender.jpg" },
    { id: 3,  name: "Philips Air Fryer",             category: "kitchen",       price: 22000,  image: "airfryer.jpg" },
    { id: 4,  name: "Samsung Refrigerator",          category: "kitchen",       price: 120000, image: "fridge.jpg" },
    { id: 5,  name: "Breville Toaster Oven",         category: "kitchen",       price: 25000,  image: "toasteroven.jpg" },
    { id: 6,  name: "Instant Pot Cooker",            category: "kitchen",       price: 19500,  image: "instantpot.jpg" },
    { id: 7,  name: "Hamilton Beach Juicer",         category: "kitchen",       price: 9500,   image: "juicer.jpg" },
    { id: 8,  name: "LG Washing Machine",            category: "laundry",       price: 95000,  image: "washer.jpg" },
    { id: 9,  name: "Samsung Dryer",                 category: "laundry",       price: 85000,  image: "dryer.jpg" },
    { id: 10, name: "Black+Decker Iron",             category: "laundry",       price: 6500,   image: "iron.jpg" },
    { id: 11, name: "Whirlpool Washer",              category: "laundry",       price: 110000, image: "whirlpool.jpg" },
    { id: 12, name: "Dyson Vacuum Cleaner",          category: "cleaning",      price: 85000,  image: "vacuum.jpg" },
    { id: 13, name: "iRobot Roomba",                 category: "cleaning",      price: 120000, image: "roomba.jpg" },
    { id: 14, name: "Karcher Pressure Washer",       category: "cleaning",      price: 55000,  image: "pressurewasher.jpg" },
    { id: 15, name: "Black+Decker Dustbuster",       category: "cleaning",      price: 9500,   image: "dustbuster.jpg" },
    { id: 16, name: "Samsung 55 Smart TV",           category: "entertainment", price: 145000, image: "tv.jpg" },
    { id: 17, name: "JBL Speaker",                   category: "entertainment", price: 35000,  image: "jbl.jpg" },
    { id: 18, name: "LG 43 Smart TV",                category: "entertainment", price: 95000,  image: "lgtv.jpg" },
    { id: 19, name: "Sony Soundbar",                 category: "entertainment", price: 42000,  image: "soundbar.jpg" },
    { id: 20, name: "Nintendo Switch Console",       category: "entertainment", price: 78000,  image: "nintendo.jpg" },
    { id: 21, name: "PlayStation 5 Console",         category: "entertainment", price: 145000, image: "ps5.jpg" },
    { id: 22, name: "Anker Projector",               category: "entertainment", price: 65000,  image: "anker.jpg" },
    { id: 23, name: "DeWalt Power Drill",            category: "tools",         price: 18000,  image: "drill.jpg" },
    { id: 24, name: "Makita Circular Saw",           category: "tools",         price: 28000,  image: "saw.jpg" },
    { id: 25, name: "Stanley Toolbox Set",           category: "tools",         price: 15000,  image: "toolbox.jpg" },
    { id: 26, name: "IMALENT High Lumen Flashlight", category: "tools",         price: 2400,   image: "flashlight.jpg" },
    { id: 27, name: "Anker Solar Generator",         category: "tools",         price: 19500,  image: "solar.jpg" },
    { id: 28, name: "Ryobi Heat Gun",                category: "tools",         price: 11000,  image: "heatgun.jpg" }
];

/* 2b. Event Handling & Working event listener for page load */
document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
    setupMobileNav();

    /* 2a. DOM Manipulation to update HTML via displayProducts */
    if (document.querySelector('#productgrid')) { 
        displayProducts(products); 
        
        /* 2d. Basic Interactivity & Logic Control structures for Promo Alert */
        if (!localStorage.getItem('ippliance_promo_seen')) {
            alert("Special Deal: Get 10% off your subtotal when you purchase 3 or more items!");
            localStorage.setItem('ippliance_promo_seen', 'true');
        }
    }

    if (document.querySelector('#cart-container')) { displayCart(); }
    if (document.querySelector('#checkout-summary')) { displayCheckoutSummary(); }

    var categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        /* 2b. Event Handling listener for buttons */
        btn.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            
            /* 2a. DOM Manipulation updating CSS classes */
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            /* 2d. Basic Interactivity & Logic using filter logic on arrays*/
            var filtered = (category === 'all') ? products : products.filter(p => p.category === category);
            displayProducts(filtered);
        });
    });

    /* 2c. Form Validation / Input Handling*/
    var loginBtn = document.getElementById('loginbtn');
    if (loginBtn) {
        /* 2b. Event Handling for login form submission */
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var userIn = document.getElementById('login-username').value.trim();
            var passIn = document.getElementById('login-password').value.trim();
            var userErr = document.getElementById('username-error');
            var passErr = document.getElementById('password-error');
            
            /* 2c. Form Validation / Input Handling which checks for empty fields & DOM updates) */
            if (userIn === '') { userErr.innerText = 'Username required'; userErr.style.display='block'; return; }
            else { userErr.style.display='none'; }
            
            if (passIn === '') { passErr.innerText = 'Password required'; passErr.style.display='block'; return; }
            else { passErr.style.display='none'; }

            var savedUser = JSON.parse(localStorage.getItem('ippliance_user'));
            if (savedUser && savedUser.username === userIn && savedUser.password === passIn) {
                alert('Welcome back to I-ppliance!');
                window.location.href = 'index.html';
            } else {
                userErr.innerText = 'Invalid credentials'; userErr.style.display='block';
                passErr.innerText = 'Invalid credentials'; passErr.style.display='block';
            }
        });
    }

    /* 2c. Form Validation / Input Handling*/
    var regBtn = document.getElementById('registerbtn');
    if (regBtn) {
        regBtn.addEventListener('click', function(e) {
            e.preventDefault();
            /*  2a. DOM Manipulation functions */
            var fn = document.getElementById('firstname').value.trim();
            var ln = document.getElementById('lastname').value.trim();
            var em = document.getElementById('email').value.trim();
            var db = document.getElementById('dob').value.trim();
            var un = document.getElementById('username').value.trim();
            var pw = document.getElementById('reg-password').value.trim();
            var cp = document.getElementById('reg-cpassword').value.trim();

            var valid = true;
            /* IA#2 Rubric: 2c. Form Validation / Input Handling which uses JS functions to update DOM with errors*/
            function toggleErr(id, show) { var el = document.getElementById(id); if (el) el.style.display = show ? 'block' : 'none'; }

            /* 2c. Form Validation for Checking empty fields and validating email input */
            if (fn==='') { toggleErr('user-fname-error', true); valid=false; } else { toggleErr('user-fname-error', false); }
            if (ln==='') { toggleErr('user-lname-error', true); valid=false; } else { toggleErr('user-lname-error', false); }
            if (em==='' || !em.includes('@')) { toggleErr('user-email-error', true); valid=false; } else { toggleErr('user-email-error', false); }
            if (db==='') { toggleErr('user-dob-error', true); valid=false; } else { toggleErr('user-dob-error', false); }
            if (un==='') { toggleErr('username-error', true); valid=false; } else { toggleErr('username-error', false); }
            if (pw==='') { toggleErr('user-password-error', true); valid=false; } else { toggleErr('user-password-error', false); }
            if (pw!==cp || cp==='') { toggleErr('user-cpassword-error', true); valid=false; } else { toggleErr('user-cpassword-error', false); }

            if (valid) {
                localStorage.setItem('ippliance_user', JSON.stringify({firstname: fn, username: un, password: pw}));
                alert('Registration successful, ' + fn + '! Redirecting to Login.');
                window.location.href = 'login.html';
            }
        });
    }

    /*2a. DOM Manipulation*/
    var confBtn = document.getElementById('confirm-order-btn');
    if (confBtn) {
        confBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            var fn = document.getElementById('firstname') ? document.getElementById('firstname').value.trim() : '';
            var ln = document.getElementById('lastname') ? document.getElementById('lastname').value.trim() : '';
            var em = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            var ph = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            var ad = document.getElementById('address') ? document.getElementById('address').value.trim() : '';
            var pa = document.getElementById('parish') ? document.getElementById('parish').value : '';

            var valid = true;
            function toggleChkErr(id, show) { var el = document.getElementById(id); if (el) el.style.display = show ? 'block' : 'none'; }

            /* 2c. Form Validation / Input Handling for Checkout field validations */
            if (document.getElementById('firstname') && fn==='') { toggleChkErr('user-fname-error', true); valid=false; } else { toggleChkErr('user-fname-error', false); }
            if (document.getElementById('lastname') && ln==='') { toggleChkErr('user-lname-error', true); valid=false; } else { toggleChkErr('user-lname-error', false); }
            if (document.getElementById('email') && (em==='' || !em.includes('@'))) { toggleChkErr('user-email-error', true); valid=false; } else { toggleChkErr('user-email-error', false); }
            if (document.getElementById('phone') && ph==='') { toggleChkErr('user-phone-error', true); valid=false; } else { toggleChkErr('user-phone-error', false); }
            if (document.getElementById('address') && ad==='') { toggleChkErr('user-address-error', true); valid=false; } else { toggleChkErr('user-address-error', false); }
            if (document.getElementById('parish') && pa==='') { toggleChkErr('user-parish-error', true); valid=false; } else { toggleChkErr('user-parish-error', false); }

            /*2d. Basic Interactivity / Logic Control structures for checkout completion*/
            if (valid) {
                alert('Thank you for your order! It is now being processed.'); 
                localStorage.removeItem('ippliance_cart'); 
                window.location.href='index.html';
            }
        });
    }
    
    if (document.getElementById('cancel-btn')) document.getElementById('cancel-btn').onclick = function(e) { e.preventDefault(); window.location.href='cart.html'; };
    if (document.getElementById('close-btn')) document.getElementById('close-btn').onclick = function(e) { e.preventDefault(); window.location.href='index.html'; };
    if (document.getElementById('clear-btn')) document.getElementById('clear-btn').onclick = function(e) { 
        e.preventDefault(); 
        var form = document.getElementById('checkout-form');
        if (form) form.reset();
        document.querySelectorAll('.error-msg').forEach(msg => msg.style.display = 'none');
    };
});


/* 2a. DOM Manipulation to dynamically update HTML using JS innerHTML */
function displayCart() {
    var container = document.querySelector('#cart-container');
    var cart = JSON.parse(localStorage.getItem('ippliance_cart')) || [];
    if (!container) return;
    
    if (cart.length === 0) { 
        container.innerHTML = '<div style="text-align: center; padding: 40px;"><h3>Your cart is empty.</h3><br><a href="index.html" class="btn" style="width:auto; display:inline-block; padding:10px 20px;">Browse Products</a></div>'; 
        return; 
    }

    let subtotal = 0, totalQty = 0;
    let html = '<h2 style="margin-bottom: 20px;">Shopping Cart</h2>';

    cart.forEach(item => {
        let itemSub = item.price * item.quantity;
        subtotal += itemSub; totalQty += item.quantity;
        
        html += `<div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
                    <img src="../Assets/${item.image}" class="cart-img" style="width: 80px; border-radius: 8px;">
                    <div style="flex: 1; margin-left: 20px; text-align: left;">
                        <h4 style="margin-bottom: 5px;">${item.name}</h4>
                        <p>J$${item.price.toLocaleString()} x ${item.quantity}</p>
                    </div>
                    <div style="text-align: right; margin-right: 20px;">
                        <p><strong>J$${itemSub.toLocaleString()}</strong></p>
                    </div>
                    <button class="btn remove-btn" style="width:auto; padding:8px 15px; margin-top:0;" onclick="removeFromCart(${item.id})">Remove</button>
                 </div>`;
    });

    /* 2d. Basic Interactivity / Logic  calculations for discount and tax */
    let discount = (totalQty >= 3) ? (subtotal * 0.10) : 0;
    let taxableAmount = subtotal - discount;
    let tax = taxableAmount * 0.15;
    let grand = taxableAmount + tax;

    html += `<div class="summary" style="background:#f9f9f9; padding:25px; margin-top:20px; border-radius:12px; text-align: right;">
                <p style="margin-bottom: 8px;">Sub-total: J$${subtotal.toLocaleString()}</p>
                <p style="color:var(--error-red); margin-bottom: 8px;">Discount (10% for 3+): -J$${discount.toLocaleString()}</p>
                <p style="margin-bottom: 15px;">GCT (15%): J$${tax.toLocaleString()}</p>
                <hr style="border:none; border-top:1px solid #ddd; margin-bottom: 15px;">
                <h3 style="margin-bottom: 20px; font-size: 1.5rem;">Grand Total: J$${grand.toLocaleString()}</h3>
                <button id="clear-cart-btn" class="btn" style="width:auto; display:inline-block; background: var(--error-red); padding:10px 20px; margin-right:10px;" onclick="clearCart()">Clear Cart</button>
                <a href="checkout.html" class="btn checkout-link-btn" style="width:auto; display:inline-block; padding:10px 20px;">Proceed to Checkout</a>
             </div>`;
             
    container.innerHTML = html;
}

function displayCheckoutSummary() {
    var container = document.querySelector('#checkout-summary');
    var amtInput = document.getElementById('amount');
    var cart = JSON.parse(localStorage.getItem('ippliance_cart')) || [];
    if (!container) return;

    let subtotal = 0, totalQty = 0;
    let html = '<h3>Order Summary</h3><ul style="list-style:none; padding:0; margin-top:10px;">';
    
    cart.forEach(item => { 
        subtotal += (item.price * item.quantity); 
        totalQty += item.quantity; 
        html += `<li style="border-bottom: 1px solid #ddd; padding: 8px 0;"><strong>${item.name}</strong> (x${item.quantity}) <span style="float:right;">J$${(item.price * item.quantity).toLocaleString()}</span></li>`;
    });

    let discount = (totalQty >= 3) ? (subtotal * 0.10) : 0;
    let taxableAmount = subtotal - discount;
    let tax = taxableAmount * 0.15;
    let grand = taxableAmount + tax;

    html += `</ul>
            <div style="margin-top: 15px;">
                <p>Sub-total: <span style="float:right;">J$${subtotal.toLocaleString()}</span></p>
                <p style="color:#d9534f;">Discount (10%): <span style="float:right;">- J$${discount.toLocaleString()}</span></p>
                <p>GCT (15%): <span style="float:right;">J$${tax.toLocaleString()}</span></p>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
                <h4>Amount Due: <span style="float:right;">J$${grand.toLocaleString()}</span></h4>
            </div>`;
            
    container.innerHTML = html;
    
    if (amtInput) {
        amtInput.value = "J$" + grand.toLocaleString();
    }
}

function displayProducts(list) {
    /* 2a. DOM Manipulation querySelector*/
    var grid = document.querySelector('#productgrid');
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach(item => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="../Assets/${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="price">J$${item.price.toLocaleString()}</p>
                <button class="btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>`;
    });
}

function addToCart(id) {
    var cart = JSON.parse(localStorage.getItem('ippliance_cart')) || [];
    var product = products.find(p => p.id === id);
    var existing = cart.find(item => item.id === id);

    /*2d. Basic Interactivity / Logic Control structures for cart count */
    if (existing) { existing.quantity += 1; }
    else { cart.push({...product, quantity: 1}); }

    localStorage.setItem('ippliance_cart', JSON.stringify(cart));
    updateCartIcon();
    alert(product.name + ' added to cart!');
}

function removeFromCart(id) {
    var cart = JSON.parse(localStorage.getItem('ippliance_cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('ippliance_cart', JSON.stringify(cart));
    displayCart();
    updateCartIcon();
}

function clearCart() {
    localStorage.removeItem('ippliance_cart');
    displayCart();
    updateCartIcon();
}

function updateCartIcon() {
    var cart = JSON.parse(localStorage.getItem('ippliance_cart')) || [];
    var count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    /*2a. DOM Manipulation to dynamically update HTML with nav items */
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'cart.html' || link.textContent.toLowerCase().includes('cart')) {
            if (count > 0) { link.innerText = 'Cart (' + count + ')'; } 
            else { link.innerText = 'Cart'; }
        }
    });
}

function setupMobileNav() {
    var menuBtn = document.querySelector('.mobile-nav-button');
    var nav = document.querySelector('nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
}