//your code here

const imageGrid = document.getElementById("image-grid");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("msg");
const resultPara = document.getElementById("para");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

let selectedImages = [];
let imageElements = [];

function shuffleAndRenderImages() {
  // Step 1: Reset everything
  selectedImages = [];
  imageElements = [];
  imageGrid.innerHTML = "";
  resultPara.textContent = "";
  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot";
  verifyBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");

  // Step 2: Duplicate a random image
  const duplicatedIndex = Math.floor(Math.random() * imageUrls.length);
  const imagesWithDuplicate = [...imageUrls, imageUrls[duplicatedIndex]];

  // Step 3: Shuffle
  for (let i = imagesWithDuplicate.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imagesWithDuplicate[i], imagesWithDuplicate[j]] = [
      imagesWithDuplicate[j],
      imagesWithDuplicate[i]
    ];
  }

  // Step 4: Render
  imagesWithDuplicate.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img, url));
    imageGrid.appendChild(img);
    imageElements.push(img);
  });
}

function handleImageClick(imgElement, imgUrl) {
  // Prevent more than 2 selections
  if (
    selectedImages.length >= 2 ||
    imgElement.classList.contains("selected")
  ) {
    return;
  }

  imgElement.classList.add("selected");
  selectedImages.push({ element: imgElement, url: imgUrl });

  if (selectedImages.length === 1) {
    resetBtn.classList.remove("hidden");
  } else if (selectedImages.length === 2) {
    verifyBtn.classList.remove("hidden");
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach(({ element }) => {
    element.classList.remove("selected");
  });
  selectedImages = [];
  verifyBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  resultPara.textContent = "";
  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot";
});

verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedImages;

  if (img1.url === img2.url) {
    resultPara.textContent = "You are a human. Congratulations!";
  } else {
    resultPara.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.classList.add("hidden");
});

// Initialize on page load
shuffleAndRenderImages();
