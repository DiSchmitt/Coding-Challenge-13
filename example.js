document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const loadingDiv = document.getElementById("loading");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let products = []; // Array to hold product data
  let currentIndex = 0; // Current index of the displayed product

  //Task 1: Implement functionality to fetch product data from the API endpoint
  setTimeout(() => {
    fetch(
      "https://raw.githubusercontent.com/DiSchmitt/Coding-Challenge-13/main/react-store-products.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load product data");
        }
        return response.json();
      })
      .then((data) => {
        products = data; // Store products array
        displayProduct(currentIndex); // display each product's name, image, price, and description on your webpage.

        //Task 3: Remove loading indicator on successful load
        if (loadingDiv) {
          loadingDiv.style.display = "none";
        }
      })
      //Task 2: Implement error handling to manage and inform the user if the product data fails to load.
      //Use a user-friendly error message.
      .catch((error) => {
        console.error("Error fetching or parsing data:", error);
        productList.innerHTML =
          "<p>Failed to load product data. Please try again later.</p>";
        //Task 3: Remove loading indicator on failed load
        if (loadingDiv) {
          loadingDiv.style.display = "none";
        }
      });
  }, 1000); // (1 second loading delay to showcase loading state)

  //Task 4: Event listeners for navigation buttons to change product index
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + products.length) % products.length;
      displayProduct(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % products.length;
      displayProduct(currentIndex);
    });
  }

  //Task 1: Function to display a product based on index
  function displayProduct(index) {
    const product = products[index];
    const productDiv = document.createElement("div");
    productDiv.classList.add("product", "animated"); //Task 6: Add 'animated' class for animation
    productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p><strong>Price:</strong> $${product.price}</p>
            <p>${product.description}</p>
        `;

    // Clear previous product
    productList.innerHTML = "";
    // Append current product
    productList.appendChild(productDiv);

    //Task 6: Remove 'animated' class after animation completes
    setTimeout(() => {
      productDiv.classList.remove("animated");
    }, 500); // Adjust timeout to match animation duration (0.5s in this case)
  }
});