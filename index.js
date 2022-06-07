// http://localhost:3000/items

const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");

let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      renderProducts(allProductsData, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });

  productsDOM.innerHTML = "";

  filteredProducts.forEach((item, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <div class="img-container">
        <img class="product-img" src=${item.image} alt="p-${index}" />
      </div>
      <div class="product-desc">
        <p class="product-price">${item.price} $</p>
        <p class="product title">${item.title}</p>`;

    productsDOM.appendChild(productDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filterBtnValue = e.target.dataset.filter;
    filters.searchItems = filterBtnValue;
    renderProducts(allProductsData, filters);
  });
});
