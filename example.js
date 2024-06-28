document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
//Task 1: Implement functionality to fetch product data from the API endpoint
    fetch('https://raw.githubusercontent.com/DiSchmitt/Coding-Challenge-13/main/react-store-products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load product data');
            }
            return response.json();
        })
        .then(data => {
            // Process the data
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
// and display each product's name, image, price, and description on your webpage.
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p>${product.description}</p>
                `;

                productList.appendChild(productDiv);
            });
        })
        //Task 2: Implement error handling to manage and inform the user if the product data fails to load with a user-friendly error message.
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            productList.innerHTML = '<p>Failed to load product data. Please try again later.</p>';
        });
});