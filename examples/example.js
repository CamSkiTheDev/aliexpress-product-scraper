import scrape from "./../index.js";

scrape("2255800123371957", {
  reviewsCount: 0,
})
  .then((productData) => {
    console.log(JSON.stringify(productData, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });
