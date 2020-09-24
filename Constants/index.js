module.exports = {
  limit: {
    product: 1000,
  },
  defaultItemLimit: 15,
  geo: {
    US: {
      country: "United States of America",
      host: "www.amazon.com",
      product_information: {
        id: [
          "#detailBullets_feature_div > ul",
          "#productDetails_detailBullets_sections1",
          "#productDetails_techSpec_section_1",
          "#productDetails_techSpec_section_2",
          "#detailBulletsWrapper_feature_div > ul:nth-child(5)",
        ],
      },
    },
  },
};
