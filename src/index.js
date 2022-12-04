const makeImage = (currentImage) => {
  const image = document.createElement("img");
  image.src = currentImage;
  const menu = document.getElementById("ramen-menu");
  menu.appendChild(image);

  return image;
};
const imageDetails = (details) => {
  let name = document.getElementById("name");
  name.innerHTML = details.name;
  const clickedImage = document.getElementById("detail-image");
  clickedImage.src = details.image;
  let restName = document.getElementById("restaurant");
  restName.innerHTML = details.restaurant;
  let rating = document.getElementById("rating-display");
  rating.innerHTML = details.rating;
  let comments = document.getElementById("comment-display");
  comments.innerHTML = details.comment;
};

fetch("http://localhost:3000/ramens")
  .then((resp) => resp.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      // click images to see details
      const image = makeImage(data[i].image);
      image.addEventListener("click", function () {
        imageDetails(data[i]);
      });
    }
  });

//prevent default, fetch using post
const form = document.getElementById("new-ramen");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const { name, image, restaurant, rating, comment } = event.target.elements;

  fetch("http://localhost:3000/ramens", {
    method: "post",
    body: JSON.stringify({
      name: name.value,
      image: image.value,
      rating: rating.value,
      restaurant: restaurant.value,
      comment: comment.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      const image = makeImage(data.image);
      imageDetails(data);
      image.addEventListener("click", function () {
        imageDetails(data);
      });
    });
});
