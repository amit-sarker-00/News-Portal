const newCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};
const displayCategory = (categories) => {
  //   for (const category of categories) {
  //     console.log(category);
  //   }
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("col");
    categoryDiv.innerHTML = `
    <h5>${category.category_name} </h5>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};
newCategory();
