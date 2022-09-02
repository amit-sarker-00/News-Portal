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
    // console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("col");
    categoryDiv.innerHTML = `
    <h5 onclick="loadNews('${category.category_id}')">${category.category_name} </h5>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};
const loadNews = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews(data.data));
};
const showNews = (newsAll) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  newsAll.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col-12");
    newsDiv.innerHTML = `
      <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
      `;
    newsContainer.appendChild(newsDiv);
  });
};
loadNews();
newCategory();
