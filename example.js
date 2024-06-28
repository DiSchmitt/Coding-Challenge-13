document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');

    fetch('https://raw.githubusercontent.com/DiSchmitt/Coding-Challenge-13/main/react-store-products.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // Log to verify data received
            // Process the data here
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p>${product.description}</p>
                `;

                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });
});