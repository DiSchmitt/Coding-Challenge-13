document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const loadingDiv = document.getElementById('loading');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let products = []; // Array to hold product data
    let currentIndex = 0; // Current index of the displayed product

    // Fetch product data and populate productList
    setTimeout(() => {
        fetch('https://raw.githubusercontent.com/DiSchmitt/Coding-Challenge-13/main/react-store-products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load product data');
                }
                return response.json();
            })
            .then(data => {
                products = data; // Store products array
                displayProduct(currentIndex); // Display initial product

                // Remove loading indicator if sucessful load
                if (loadingDiv) {
                    loadingDiv.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error);
                productList.innerHTML = '<p>Failed to load product data. Please try again later.</p>';
                // Remove loading indicator if failed load
                if (loadingDiv) {
                    loadingDiv.style.display = 'none';
                }
            });
    }, 1000); // 2 second loading delay to better display loading state

    // Event listeners for navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + products.length) % products.length;
            displayProduct(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % products.length;
            displayProduct(currentIndex);
        });
    }

    // Function to display a product in html
    function displayProduct(index) {
        const product = products[index];
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p><strong>Price:</strong> $${product.price}</p>
            <p>${product.description}</p>
        `;

        // Clear previous product
        productList.innerHTML = '';
        // Append current product
        productList.appendChild(productDiv);
    }
});