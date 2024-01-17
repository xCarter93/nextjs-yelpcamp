const { places, descriptors } = require("./seedHelper");
const cities = require("./cities");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function main() {
  await prisma.campground.deleteMany({});
  let campgrounds = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    campgrounds.push({
      price: Math.floor(Math.random() * 65 + 7),
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[randomIndex].city}, ${cities[randomIndex].country}`,
      image: "",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      authorId: "user_2akC3DrIZSbxRTpkGAjTM1ijzI2",
      geometry: {
        type: "Point",
        coordinates: [cities[randomIndex].lng, cities[randomIndex].lat],
      },
    });
  }
  await prisma.campground.createMany({ data: campgrounds });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding Database", e);
    await prisma.$disconnect();
    process.exit(1);
  });
