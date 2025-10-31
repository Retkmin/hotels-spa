// Importar las dependencias necesarias
const fs = require('fs');
const { faker } = require('@faker-js/faker');

const NUM_HOTELS = 100;

const HOTEL_IMAGES = [
  'https://cf.bstatic.com/xdata/images/hotel/max300/209890188.jpg?k=882e748be3114714efa7f001b6ffa97425b1a52a458d3166dea3c1af7c66ac09&o=',
  'https://cf.bstatic.com/xdata/images/hotel/max300/269165422.jpg?k=9799d6571d808b1479c08fa2ae11b67e1813866b85e459ae2caf3d94da127dad&o=',
  'https://cf.bstatic.com/xdata/images/hotel/max300/227994240.jpg?k=a200b5df0a199fbf7a6b27841bb213c23fa2d231f65c5fc7bd0a381d6b3de983&o='
];

const generateHotels = () => {
  const hotels = [];
  for (let id = 0; id < NUM_HOTELS; id++) {
    const randomImage = HOTEL_IMAGES[Math.floor(Math.random() * HOTEL_IMAGES.length)];
    hotels.push({
      id: faker.string.uuid(),
      name: `Hotel ${faker.word.words(2)}`,
      image: randomImage,
      address: faker.location.streetAddress(),
      stars: faker.number.int({min: 1, max: 5}),
      rate: parseFloat(faker.number.float({min: 0, max: 5, fractionDigits: 1})),
      price: faker.number.float({min: 50, max: 1000, fractionDigits: 2}),
    });
  }
  return hotels;
};

const generateDb = () => {
  const data = {
    hotels: generateHotels()
  };

  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

generateDb();