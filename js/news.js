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

    newsDiv.innerHTML = `
      <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${news.image_url}" class="img-fluid rounded-start h-100"  alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text custom">${news.details}</p>
          <div class="d-flex justify-content-around">
           <div class="d-flex gap-2">
            <img style="width:100px;height:100px" class=" rounded-circle" src="${news.author.img}">
              <h5 class="mt-4">${news.author.name}</h5>
           </div>
           <div class="mt-4">
           <p class="d-flex gap-2"><i class="mt-1 fa-solid fa-eye"></i> ${news.total_view}</p>
       </div>
           <div class="mt-4">
           <div onclick="loadNewsDetail('${news._id}')" class="btn btn-primary" data-bs-toggle="modal"
           data-bs-target="#newsDetailModal">Show Details</div>
       </div>
    </div>
  </div>
      `;
    newsContainer.appendChild(newsDiv);
  });
};
const loadNewsDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]))
    .catch((error) => console.log(error));
};
const displayNewsDetails = (data) => {
  const modalTitle = document.getElementById("newsDetailModalLabel");
  modalTitle.innerText = data.title;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <img src="${data.image_url}"class="w-25 h-25">
  `;
  const modalFooter = document.getElementById("modal-footer");
  modalFooter.innerText = data.details.slice(0, 150);
};

loadNewsDetail();

loadNews();
newCategory();
