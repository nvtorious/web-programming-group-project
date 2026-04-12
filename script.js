/** GP 2: Create an array of product objects in JavaScript. Each product should have: name, price, description, image. */
var products = [
    { id: 1,  name: "Sharp Microwave",               category: "kitchen",       price: 18500,  image: "microwave.jpg",      description: "1000W countertop microwave with multiple cooking presets." },
    { id: 2,  name: "Oster Blender",                 category: "kitchen",       price: 7500,   image: "blender.jpg",        description: "10-speed glass jar blender, perfect for smoothies." },
    { id: 3,  name: "Philips Air Fryer",             category: "kitchen",       price: 22000,  image: "airfryer.jpg",       description: "Oil-free digital air fryer for healthy, crispy meals." },
    { id: 4,  name: "Samsung Refrigerator",          category: "kitchen",       price: 120000, image: "fridge.jpg",         description: "Double-door frost-free refrigerator." },
    { id: 5,  name: "Breville Toaster Oven",         category: "kitchen",       price: 25000,  image: "toasteroven.jpg",    description: "Smart convection toaster oven for rapid cooking." },
    { id: 6,  name: "Instant Pot Cooker",            category: "kitchen",       price: 19500,  image: "instantpot.jpg",     description: "7-in-1 multi-functional programmable cooker." },
    { id: 7,  name: "Hamilton Beach Juicer",         category: "kitchen",       price: 9500,   image: "juicer.jpg",         description: "Big-mouth centrifugal juicer for whole fruits." },
    { id: 8,  name: "LG Washing Machine",            category: "laundry",       price: 95000,  image: "washer.jpg",         description: "Front-load washing machine with TurboWash." },
    { id: 9,  name: "Samsung Dryer",                 category: "laundry",       price: 85000,  image: "dryer.jpg",          description: "Electric dryer with moisture sensor." },
    { id: 10, name: "Black+Decker Iron",             category: "laundry",       price: 6500,   image: "iron.jpg",           description: "Steam iron with non-stick soleplate." },
    { id: 11, name: "Whirlpool Washer",              category: "laundry",       price: 110000, image: "whirlpool.jpg",      description: "Heavy-duty top-load washer." },
    { id: 12, name: "Dyson Vacuum Cleaner",          category: "cleaning",      price: 85000,  image: "vacuum.jpg",         description: "Lightweight cordless stick vacuum." },
    { id: 13, name: "iRobot Roomba",                 category: "cleaning",      price: 120000, image: "roomba.jpg",         description: "Wi-Fi connected robot vacuum." },
    { id: 14, name: "Karcher Pressure Washer",       category: "cleaning",      price: 55000,  image: "pressurewasher.jpg", description: "High-power electric pressure washer." },
    { id: 15, name: "Black+Decker Dustbuster",       category: "cleaning",      price: 9500,   image: "dustbuster.jpg",     description: "Handheld cordless vacuum for quick cleanups." },
    { id: 16, name: "Samsung 55 Smart TV",           category: "entertainment", price: 145000, image: "tv.jpg",             description: "55-inch 4K UHD Smart TV." },
    { id: 17, name: "JBL Speaker",                   category: "entertainment", price: 35000,  image: "jbl.jpg",            description: "Portable waterproof Bluetooth speaker." },
    { id: 18, name: "LG 43 Smart TV",                category: "entertainment", price: 95000,  image: "lgtv.jpg",           description: "43-inch Full HD Smart TV." },
    { id: 19, name: "Sony Soundbar",                 category: "entertainment", price: 42000,  image: "soundbar.jpg",       description: "2.1 channel audio soundbar with subwoofer." },
    { id: 20, name: "Nintendo Switch Console",       category: "entertainment", price: 78000,  image: "nintendo.jpg",       description: "Hybrid home/portable gaming console." },
    { id: 21, name: "PlayStation 5 Console",         category: "entertainment", price: 145000, image: "ps5.jpg",            description: "Next-gen gaming console with ultra-high speed SSD." },
    { id: 22, name: "Anker Projector",               category: "entertainment", price: 65000,  image: "anker.jpg",          description: "Portable smart mini-projector." },
    { id: 23, name: "DeWalt Power Drill",            category: "tools",         price: 18000,  image: "drill.jpg",          description: "20V MAX cordless compact drill." },
    { id: 24, name: "Makita Circular Saw",           category: "tools",         price: 28000,  image: "saw.jpg",            description: "7-1/4 inch circular saw with electric brake." },
    { id: 25, name: "Stanley Toolbox Set",           category: "tools",         price: 15000,  image: "toolbox.jpg",        description: "100-piece mechanics tool set." },
    { id: 26, name: "IMALENT High Lumen Flashlight", category: "tools",         price: 2400,   image: "flashlight.jpg",     description: "Ultra-bright rechargeable flashlight." },
    { id: 27, name: "Anker Solar Generator",         category: "tools",         price: 19500,  image: "solar.jpg",          description: "Portable power station for camping." },
    { id: 28, name: "Ryobi Heat Gun",                category: "tools",         price: 11000,  image: "heatgun.jpg",        description: "18V cordless heat gun." }
];

/** GP 2: An updated product list must be kept on localStorage, as AllProducts. */
localStorage.setItem('AllProducts', JSON.stringify(products));

/** Normalize TRN to 000-000-000 so registration and login match even if dashes differ. */
function normalizeTrn(trn) {
    var d = String(trn || '').replace(/\D/g, '');
    if (d.length !== 9) return String(trn || '').trim();
    return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6, 9);
}

function parseRegistrationData() {
    try {
        return JSON.parse(localStorage.getItem('RegistrationData') || '[]') || [];
    } catch (e) {
        return [];
    }
}

function parseCurrentUser() {
    try {
        var raw = localStorage.getItem('CurrentUser');
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function getCartTotals(cart) {
    var subtotal = 0;
    var totalQty = 0;

    cart.forEach(function(item) {
        subtotal += item.price * item.quantity;
        totalQty += item.quantity;
    });

    var discount = (totalQty >= 3) ? subtotal * 0.10 : 0;
    var taxableAmount = subtotal - discount;
    var tax = taxableAmount * 0.15;
    var grandTotal = taxableAmount + tax;

    return {
        subtotal: subtotal,
        totalQty: totalQty,
        discount: discount,
        taxableAmount: taxableAmount,
        tax: tax,
        grandTotal: grandTotal
    };
}

function generateInvoiceNumber() {
    return 'INV-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function generateInvoice(shippingInfo) {
    var currentUser = parseCurrentUser();
    if (!currentUser || !Array.isArray(currentUser.cart) || currentUser.cart.length === 0) return null;

    var cart = currentUser.cart;
    var totals = getCartTotals(cart);

    var purchasedItems = cart.map(function(item) {
        var itemSubtotal = item.price * item.quantity;
        var itemDiscount = totals.discount > 0 ? itemSubtotal * 0.10 : 0;

        return {
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            discount: itemDiscount,
            lineSubtotal: itemSubtotal
        };
    });

    var invoice = {
        companyName: 'I-ppliance',
        invoiceDate: new Date().toLocaleString(),
        shippingInformation: shippingInfo,
        invoiceNumber: generateInvoiceNumber(),
        trn: currentUser.trn,
        purchasedItems: purchasedItems,
        taxes: totals.tax,
        subtotal: totals.subtotal,
        totalDiscount: totals.discount,
        totalCost: totals.grandTotal
    };

    if (!Array.isArray(currentUser.invoices)) {
        currentUser.invoices = [];
    }

    currentUser.invoices.push(invoice);
    localStorage.setItem('CurrentUser', JSON.stringify(currentUser));

    var registrationData = parseRegistrationData();
    var index = registrationData.findIndex(function(user) {
        return normalizeTrn(user.trn) === normalizeTrn(currentUser.trn);
    });

    if (index !== -1) {
        if (!Array.isArray(registrationData[index].invoices)) {
            registrationData[index].invoices = [];
        }
        registrationData[index].invoices.push(invoice);
        registrationData[index].cart = [];
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
    }

    var allInvoices = [];
    try {
        allInvoices = JSON.parse(localStorage.getItem('AllInvoices') || '[]') || [];
    } catch (e) {
        allInvoices = [];
    }

    allInvoices.push(invoice);
    localStorage.setItem('AllInvoices', JSON.stringify(allInvoices));
    localStorage.setItem('LatestInvoice', JSON.stringify(invoice));

    return invoice;
}

function displayInvoice() {
    var container = document.getElementById('invoice-container');
    if (!container) return;

    var invoice;
    try {
        invoice = JSON.parse(localStorage.getItem('LatestInvoice') || 'null');
    } catch (e) {
        invoice = null;
    }

    if (!invoice) {
        container.innerHTML = '<div class="empty-cart"><h3>No invoice found</h3><p>Please complete checkout first.</p></div>';
        return;
    }

    var itemsHTML = invoice.purchasedItems.map(function(item) {
        return `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>J$${item.price.toLocaleString()}</td>
                <td>J$${item.discount.toLocaleString()}</td>
                <td>J$${item.lineSubtotal.toLocaleString()}</td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="cart-summary-card" style="max-width: 1000px; margin: 40px auto;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:20px; flex-wrap:wrap;">
                <div>
                    <h2 style="margin-bottom:8px;">${invoice.companyName}</h2>
                    <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
                    <p><strong>Date of Invoice:</strong> ${invoice.invoiceDate}</p>
                    <p><strong>TRN:</strong> ${invoice.trn}</p>
                </div>
                <div style="text-align:left;">
                    <h3 style="margin-bottom:8px;">Shipping Information</h3>
                    <p>${invoice.shippingInformation.firstName} ${invoice.shippingInformation.lastName}</p>
                    <p>${invoice.shippingInformation.email}</p>
                    <p>${invoice.shippingInformation.phone}</p>
                    <p>${invoice.shippingInformation.address}</p>
                    <p>${invoice.shippingInformation.parish}</p>
                </div>
            </div>

            <h3 style="margin-top:30px;">Purchased Items</h3>
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; margin-top:15px;">
                    <thead>
                        <tr style="background:#222; color:#fff;">
                            <th style="padding:12px; border:1px solid #ddd;">Name</th>
                            <th style="padding:12px; border:1px solid #ddd;">Quantity</th>
                            <th style="padding:12px; border:1px solid #ddd;">Price</th>
                            <th style="padding:12px; border:1px solid #ddd;">Discount</th>
                            <th style="padding:12px; border:1px solid #ddd;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
            </div>

            <div style="margin-top:25px; max-width:400px; margin-left:auto;">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>J$${invoice.subtotal.toLocaleString()}</span>
                </div>
                <div class="summary-row discount">
                    <span>Total Discount</span>
                    <span>- J$${invoice.totalDiscount.toLocaleString()}</span>
                </div>
                <div class="summary-row tax">
                    <span>Taxes</span>
                    <span>J$${invoice.taxes.toLocaleString()}</span>
                </div>
                <hr class="summary-divider">
                <div class="summary-row grand-total">
                    <span>Total Cost</span>
                    <span>J$${invoice.totalCost.toLocaleString()}</span>
                </div>
            </div>

            <div style="margin-top:25px; display:flex; gap:12px; flex-wrap:wrap;">
                <button type="button" class="btn" onclick="window.print()">Print Invoice</button>
                <a href="index.html" class="btn btn-outline">Continue Shopping</a>
            </div>
        </div>
    `;
}

/* 2b. Event Handling & Working event listener for page load */
document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
    setupMobileNav();

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
    if (document.getElementById('invoice-container')) { displayInvoice(); }

    var categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(function(btn) {
        /* 2b. Event Handling listener for buttons */
        btn.addEventListener('click', function() {
            var category = this.getAttribute('data-category');

            /* 2a. DOM Manipulation updating CSS classes */
            categoryBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            /* 2d. Basic Interactivity & Logic using filter logic on arrays*/
            var filtered = (category === 'all') ? products : products.filter(function(p) { return p.category === category; });
            displayProducts(filtered);
        });
    });

    /* 2c. Form Validation / Input Handling */
    var loginBtn = document.getElementById('loginbtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();

            var trnIn = document.getElementById('login-trn').value.trim();
            var passIn = document.getElementById('login-password').value.trim();
            var trnErr = document.getElementById('trn-error');
            var passErr = document.getElementById('password-error');

            function showError(el, msg) {
                if (el) {
                    el.innerText = msg;
                    el.style.display = 'block';
                }
            }

            function hideError(el) {
                if (el) el.style.display = 'none';
            }

            hideError(trnErr);
            hideError(passErr);

            if (trnIn === '') {
                showError(trnErr, 'TRN is required');
                return;
            }

            if (passIn === '') {
                showError(passErr, 'Password is required');
                return;
            }

            var registrationData = parseRegistrationData();
            var trnKey = normalizeTrn(trnIn);

            var foundUser = registrationData.find(function(user) {
                return normalizeTrn(user.trn) === trnKey && user.password === passIn;
            });

            if (foundUser) {
                localStorage.setItem('CurrentUser', JSON.stringify(foundUser));
                alert('Welcome back to I-ppliance, ' + foundUser.firstName + '!');
                window.location.href = 'index.html';
            } else {
                showError(trnErr, 'Invalid TRN or password');
                showError(passErr, 'Invalid TRN or password');
            }
        });
    }

    /* 2c. Form Validation / Input Handling */
    var regBtn = document.getElementById('registerbtn');
    if (regBtn) {
        regBtn.addEventListener('click', function(e) {
            e.preventDefault();

            var fn = document.getElementById('firstname').value.trim();
            var ln = document.getElementById('lastname').value.trim();
            var db = document.getElementById('dob').value.trim();
            var gd = document.getElementById('gender').value.trim();
            var ph = document.getElementById('phone').value.trim();
            var em = document.getElementById('email').value.trim();
            var trn = document.getElementById('trn').value.trim();
            var pw = document.getElementById('reg-password').value.trim();
            var cp = document.getElementById('reg-cpassword').value.trim();

            var valid = true;

            function toggleErr(id, show, msg) {
                var el = document.getElementById(id);
                if (el) {
                    if (msg) el.innerText = msg;
                    el.style.display = show ? 'block' : 'none';
                }
            }

            function calculateAge(dob) {
                var birthDate = new Date(dob);
                var today = new Date();
                var age = today.getFullYear() - birthDate.getFullYear();
                var monthDiff = today.getMonth() - birthDate.getMonth();

                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                return age;
            }

            var phonePattern = /^[0-9\-\+\(\)\s]{7,15}$/;

            if (fn === '') {
                toggleErr('user-fname-error', true, 'First Name is required');
                valid = false;
            } else {
                toggleErr('user-fname-error', false);
            }

            if (ln === '') {
                toggleErr('user-lname-error', true, 'Last Name is required');
                valid = false;
            } else {
                toggleErr('user-lname-error', false);
            }

            if (db === '') {
                toggleErr('user-dob-error', true, 'Date of Birth is required');
                valid = false;
            } else if (calculateAge(db) < 18) {
                toggleErr('user-dob-error', true, 'You must be at least 18 years old to register');
                valid = false;
            } else {
                toggleErr('user-dob-error', false);
            }

            if (gd === '') {
                toggleErr('user-gender-error', true, 'Gender is required');
                valid = false;
            } else {
                toggleErr('user-gender-error', false);
            }

            if (ph === '') {
                toggleErr('user-phone-error', true, 'Phone Number is required');
                valid = false;
            } else if (!phonePattern.test(ph)) {
                toggleErr('user-phone-error', true, 'Enter a valid phone number');
                valid = false;
            } else {
                toggleErr('user-phone-error', false);
            }

            if (em === '') {
                toggleErr('user-email-error', true, 'Email is required');
                valid = false;
            } else if (!em.includes('@')) {
                toggleErr('user-email-error', true, 'Enter a valid email address');
                valid = false;
            } else {
                toggleErr('user-email-error', false);
            }

            var trnDigits = trn.replace(/\D/g, '');
            if (trn === '') {
                toggleErr('user-trn-error', true, 'TRN is required');
                valid = false;
            } else if (trnDigits.length !== 9) {
                toggleErr('user-trn-error', true, 'TRN must be 9 digits (e.g. 000-000-000)');
                valid = false;
            } else {
                trn = normalizeTrn(trn);
                toggleErr('user-trn-error', false);
            }

            if (pw === '') {
                toggleErr('user-password-error', true, 'Password is required');
                valid = false;
            } else if (pw.length < 8) {
                toggleErr('user-password-error', true, 'Password must be at least 8 characters long');
                valid = false;
            } else {
                toggleErr('user-password-error', false);
            }

            if (cp === '') {
                toggleErr('user-cpassword-error', true, 'Confirm Password is required');
                valid = false;
            } else if (pw !== cp) {
                toggleErr('user-cpassword-error', true, 'Passwords must match');
                valid = false;
            } else {
                toggleErr('user-cpassword-error', false);
            }

            var registrationData = parseRegistrationData();

            var trnExists = registrationData.some(function(user) {
                return normalizeTrn(user.trn) === trn;
            });

            if (valid && trnExists) {
                toggleErr('user-trn-error', true, 'This TRN is already registered');
                valid = false;
            }

            if (valid) {
                var newUser = {
                    firstName: fn,
                    lastName: ln,
                    dateOfBirth: db,
                    gender: gd,
                    phoneNumber: ph,
                    email: em,
                    trn: trn,
                    password: pw,
                    dateOfRegistration: new Date().toLocaleString(),
                    cart: [],
                    invoices: []
                };

                registrationData.push(newUser);
                localStorage.setItem('RegistrationData', JSON.stringify(registrationData));

                alert('Registration successful, ' + fn + '! Redirecting to Login.');
                window.location.href = 'login.html';
            }
        });
    }

    /* Cancel button for registration form */
    var cancelRegBtn = document.getElementById('cancelbtn');
    if (cancelRegBtn) {
        cancelRegBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var form = document.getElementById('register-form');
            if (form) form.reset();
            document.querySelectorAll('.error-msg').forEach(function(msg) {
                msg.style.display = 'none';
            });
        });
    }

    /* Checkout confirm button with invoice generation */
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
            function toggleChkErr(id, show) {
                var el = document.getElementById(id);
                if (el) el.style.display = show ? 'block' : 'none';
            }

            if (document.getElementById('firstname') && fn === '') { toggleChkErr('user-fname-error', true); valid = false; } else { toggleChkErr('user-fname-error', false); }
            if (document.getElementById('lastname') && ln === '') { toggleChkErr('user-lname-error', true); valid = false; } else { toggleChkErr('user-lname-error', false); }
            if (document.getElementById('email') && (em === '' || !em.includes('@'))) { toggleChkErr('user-email-error', true); valid = false; } else { toggleChkErr('user-email-error', false); }
            if (document.getElementById('phone') && ph === '') { toggleChkErr('user-phone-error', true); valid = false; } else { toggleChkErr('user-phone-error', false); }
            if (document.getElementById('address') && ad === '') { toggleChkErr('user-address-error', true); valid = false; } else { toggleChkErr('user-address-error', false); }
            if (document.getElementById('parish') && pa === '') { toggleChkErr('user-parish-error', true); valid = false; } else { toggleChkErr('user-parish-error', false); }

            var currentUser = parseCurrentUser();
            if (!currentUser || !Array.isArray(currentUser.cart) || currentUser.cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }

            if (valid) {
                var shippingInfo = {
                    firstName: fn,
                    lastName: ln,
                    email: em,
                    phone: ph,
                    address: ad,
                    parish: pa
                };

                var invoice = generateInvoice(shippingInfo);

                if (invoice) {
                    currentUser = parseCurrentUser();
                    currentUser.cart = [];
                    localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
                    syncCartToDatabase(currentUser);

                    alert('Thank you for your order! Your invoice has been sent to your email.');
                    window.location.href = 'invoice.html';
                } else {
                    alert('Unable to generate invoice. Please try again.');
                }
            }
        });
    }

    if (document.getElementById('cancel-btn')) {
        document.getElementById('cancel-btn').onclick = function(e) {
            e.preventDefault();
            window.location.href = 'cart.html';
        };
    }

    if (document.getElementById('close-btn')) {
        document.getElementById('close-btn').onclick = function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        };
    }

    if (document.getElementById('clear-btn')) {
        document.getElementById('clear-btn').onclick = function(e) {
            e.preventDefault();
            var form = document.getElementById('checkout-form');
            if (form) form.reset();
            document.querySelectorAll('.error-msg').forEach(function(msg) {
                msg.style.display = 'none';
            });
        };
    }
});

/** GP 2: Display the product list dynamically on the website. */
function displayProducts(list) {
    var grid = document.querySelector('#productgrid');
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach(function(item) {
        grid.innerHTML += `
            <div class="product-card">
                <img src="../Assets/${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p style="font-size: 0.8rem; color: #777; margin: 10px 0;">${item.description}</p>
                <p class="price">J$${item.price.toLocaleString()}</p>
                <button class="btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>`;
    });
}

/** GP 2: When a user clicks the "Add to Cart" button, add the selected product to the user's shopping cart. */
function addToCart(id) {
    var currentUser = parseCurrentUser();

    if (!currentUser) {
        alert("Please log in to add items to your cart.");
        window.location.href = 'login.html';
        return;
    }

    if (!Array.isArray(currentUser.cart)) currentUser.cart = [];

    var product = products.find(function(p) { return p.id === id; });
    if (!product) return;

    var existing = currentUser.cart.find(function(item) { return item.id === id; });

    if (existing) {
        existing.quantity += 1;
    } else {
        currentUser.cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
    syncCartToDatabase(currentUser);
    updateCartIcon();
    alert(product.name + ' added to your cart!');
}

/** GP 2: Shopping cart must include product details along with the taxes, discounts, subtotal and current total cost. */
function displayCart() {
    var container = document.querySelector('#cart-container');
    if (!container) return;

    var currentUser = parseCurrentUser();
    var cart = (currentUser && Array.isArray(currentUser.cart)) ? currentUser.cart : [];

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything yet.</p>
                <p style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:8px;">
                    <a href="index.html" class="btn">Browse Products</a>
                    <button type="button" class="btn btn-outline" onclick="closeCartView()">Close</button>
                </p>
            </div>`;
        return;
    }

    var totals = getCartTotals(cart);

    var rowsHTML = cart.map(function(item) {
        var itemSub = item.price * item.quantity;
        return `
            <div class="cart-row">
                <img src="../Assets/${item.image}" alt="${item.name}">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">J$${item.price.toLocaleString()} each</div>
                </div>
                <div class="cart-col-center">
                    <div class="qty-controls">
                        <button type="button" class="qty-btn" onclick="changeQty(${item.id}, -1)">&#8722;</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button type="button" class="qty-btn" onclick="changeQty(${item.id}, 1)">&#43;</button>
                    </div>
                </div>
                <div class="cart-col-center item-subtotal">J$${itemSub.toLocaleString()}</div>
                <div class="cart-col-center">
                    <span style="font-size:0.8rem;">${totals.discount > 0 ? '<span style="color:#2e9e5b;font-weight:600;">−10%</span>' : '—'}</span>
                </div>
                <div>
                    <button type="button" class="remove-item-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>`;
    }).join('');

    var itemsLeft = Math.max(0, 3 - totals.totalQty);
    var barPercent = Math.min(100, Math.round((totals.totalQty / 3) * 100));
    var promoHTML = totals.discount > 0
        ? '<span class="promo-badge">✔ 10% discount applied!</span>'
        : `<div class="promo-progress">
               <div class="promo-progress-label">Add ${itemsLeft} more item${itemsLeft !== 1 ? 's' : ''} to unlock a 10% discount!</div>
               <div class="promo-bar-bg"><div class="promo-bar-fill" style="width:${barPercent}%"></div></div>
           </div>`;

    container.innerHTML = `
        <div class="cart-items-box">
            <div class="cart-items-header">
                <span>Item</span>
                <span></span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Discount</span>
                <span>Remove</span>
            </div>
            ${rowsHTML}
        </div>

        <div class="cart-actions">
            <div class="cart-actions-left">
                <a href="index.html" class="btn btn-outline">&#8592; Continue Shopping</a>
                <button type="button" class="btn btn-danger" id="clear-cart-btn" onclick="clearCart()">Clear All</button>
                <button type="button" class="btn btn-outline" onclick="closeCartView()">Close</button>
            </div>
            <div class="cart-actions-right">
                <a href="checkout.html" class="btn">Check Out</a>
            </div>
        </div>

        <div class="cart-summary-card">
            <h3>Order Summary</h3>
            ${promoHTML}
            <div class="summary-row">
                <span>Subtotal (${totals.totalQty} item${totals.totalQty !== 1 ? 's' : ''})</span>
                <span>J$${totals.subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-row discount">
                <span>Discount (10% for 3+ items)</span>
                <span>− J$${totals.discount.toLocaleString()}</span>
            </div>
            <div class="summary-row tax">
                <span>GCT (15%)</span>
                <span>J$${totals.tax.toLocaleString()}</span>
            </div>
            <hr class="summary-divider">
            <div class="summary-row grand-total">
                <span>Grand Total</span>
                <span>J$${totals.grandTotal.toLocaleString()}</span>
            </div>
            <a href="checkout.html" class="btn summary-checkout-btn">Check Out</a>
            <a href="index.html" class="summary-continue-link">← Continue Shopping</a>
        </div>`;
}

function closeCartView() {
    window.location.href = 'index.html';
}

function changeQty(id, delta) {
    var currentUser = parseCurrentUser();
    if (!currentUser || !Array.isArray(currentUser.cart)) return;
    var item = currentUser.cart.find(function(i) { return i.id === id; });
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        currentUser.cart = currentUser.cart.filter(function(i) { return i.id !== id; });
    }
    localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
    syncCartToDatabase(currentUser);
    displayCart();
    updateCartIcon();
}

function displayCheckoutSummary() {
    var container = document.querySelector('#checkout-summary');
    var amtInput = document.getElementById('amount');
    var currentUser = parseCurrentUser();
    var cart = (currentUser && Array.isArray(currentUser.cart)) ? currentUser.cart : [];
    if (!container) return;

    var totals = getCartTotals(cart);

    var html = '<h3>Order Summary</h3><ul style="list-style:none; padding:0; margin-top:10px;">';

    cart.forEach(function(item) {
        html += `<li style="border-bottom: 1px solid #ddd; padding: 8px 0;"><strong>${item.name}</strong> (x${item.quantity}) <span style="float:right;">J$${(item.price * item.quantity).toLocaleString()}</span></li>`;
    });

    html += `</ul>
        <div style="margin-top: 15px;">
            <p>Sub-total: <span style="float:right;">J$${totals.subtotal.toLocaleString()}</span></p>
            <p style="color:#d9534f;">Discount (10%): <span style="float:right;">- J$${totals.discount.toLocaleString()}</span></p>
            <p>GCT (15%): <span style="float:right;">J$${totals.tax.toLocaleString()}</span></p>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
            <h4>Amount Due: <span style="float:right;">J$${totals.grandTotal.toLocaleString()}</span></h4>
        </div>`;

    container.innerHTML = html;

    if (amtInput) {
        amtInput.value = 'J$' + totals.grandTotal.toLocaleString();
    }
}

function removeFromCart(id) {
    var currentUser = parseCurrentUser();
    if (!currentUser) return;
    if (!Array.isArray(currentUser.cart)) currentUser.cart = [];

    currentUser.cart = currentUser.cart.filter(function(item) { return item.id !== id; });
    localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
    syncCartToDatabase(currentUser);
    displayCart();
    updateCartIcon();
}

function clearCart() {
    var currentUser = parseCurrentUser();
    if (!currentUser) return;

    currentUser.cart = [];
    localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
    syncCartToDatabase(currentUser);
    displayCart();
    updateCartIcon();
}

function updateCartIcon() {
    var currentUser = parseCurrentUser();
    var cart = (currentUser && Array.isArray(currentUser.cart)) ? currentUser.cart : [];
    var count = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);

    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === 'cart.html' || link.textContent.toLowerCase().includes('cart')) {
            if (count > 0) {
                link.innerText = 'Cart (' + count + ')';
            } else {
                link.innerText = 'Cart';
            }
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

function syncCartToDatabase(userObj) {
    var registrationData = parseRegistrationData();
    var index = registrationData.findIndex(function(u) {
        return normalizeTrn(u.trn) === normalizeTrn(userObj.trn);
    });

    if (index !== -1) {
        registrationData[index].cart = userObj.cart;
        if (Array.isArray(userObj.invoices)) {
            registrationData[index].invoices = userObj.invoices;
        }
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
    }
}