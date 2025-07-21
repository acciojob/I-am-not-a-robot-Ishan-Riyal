//your code here
const imageGrid = document.getElementById("image-grid");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("msg");
const para = document.getElementById("para");

let images = [
  "bird.jpg",
  "british-shorthair.jpg",
  "silver-gull.jpg",
  "buck.png",
  "fox.jpg",
];

let selectedImages = [];
let imageElements = [];

function shuffle(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function generateImages() {
  imageGrid.innerHTML = "";
  selectedImages = [];
  imageElements = [];
  resetBtn.classList.add("hidden");
  verifyBtn.classList.add("hidden");
  para.textContent = "";
  para.style.color = "";

  const randomIndex = Math.floor(Math.random() * images.length);
  const duplicateImage = images[randomIndex];
  const sixImages = [...images, duplicateImage];
  const shuffled = shuffle(sixImages);

  shuffled.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = `./assets/${src}`;
    img.alt = `Title ${index + 1}`;
    img.dataset.src = src;

    img.addEventListener("click", () => handleImageClick(img));

    imageGrid.appendChild(img);
    imageElements.push(img);
  });

  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
}

function handleImageClick(img) {
  if (selectedImages.includes(img)) {
    img.classList.remove("selected");
    selectedImages = selectedImages.filter((el) => el !== img);
  } else {
    if (selectedImages.length < 2) {
      img.classList.add("selected");
      selectedImages.push(img);
    }
  }

  resetBtn.classList.toggle("hidden", selectedImages.length === 0);
  verifyBtn.classList.toggle("hidden", selectedImages.length !== 2);

  if (selectedImages.length > 2) {
    selectedImages.forEach((el) => el.classList.remove("selected"));
    selectedImages = [];
    verifyBtn.classList.add("hidden");
  }
}

resetBtn.addEventListener("click", generateImages);

verifyBtn.addEventListener("click", () => {
  verifyBtn.classList.add("hidden");

  const [first, second] = selectedImages;
  if (first.dataset.src === second.dataset.src) {
    para.textContent = "You are a human. Congratulations!";
    para.style.color = "green";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
    para.style.color = "red";
  }
});

generateImages();
