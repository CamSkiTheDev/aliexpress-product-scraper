import scrape from "./../index.js";

scrape("3256806058582491", {
  reviewsCount: 0,
})
  .then((productData) => {
    console.log(JSON.stringify(productData, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });
