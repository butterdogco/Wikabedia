const headImageElement = document.getElementById("headImage");
let currentIndex = 0; // Keep track of the current index in the imageList
let imageList = []; // Store the list of images

function removeParentTraversalSegments(input) {
  let previous;
  let sanitized = input;
  do {
    previous = sanitized;
    sanitized = sanitized.replace(/\.\.\//g, '');
  } while (sanitized !== previous);
  return sanitized;
}

function changeBackgroundImage() {
  headImageElement.style.backgroundImage = `url('${imageList[currentIndex]}')`;
  currentIndex = (currentIndex + 1) % imageList.length; // Cycle to the next image
}

async function backgroundImage() {
  try {
    while (!done) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    const shuffledData = data.slice();
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }

    const randomItems = shuffledData.slice(0, 15);
    imageList = [];

    randomItems.forEach(item => {
      if (item.desc === null) {
        item.desc = "No description";
      }
      
      const image = item.image.toString();
      let img = '';
      let isGoogleDriveUrl = false;
      
      try {
        const parsedUrl = new URL(image, window.location.origin);
        isGoogleDriveUrl = parsedUrl.protocol === "https:" && parsedUrl.hostname === "drive.google.com";
      } catch (e) {
        isGoogleDriveUrl = false;
      }
      
      if (image.includes("../") === false && isGoogleDriveUrl === false) {
        img = image;
      } else {
        img = removeParentTraversalSegments(image);
      }
      
      imageList.push(img); // Save item.image into the list
    });

    changeBackgroundImage(); // Display the first image immediately
    setInterval(changeBackgroundImage, 3000); // Set interval to cycle through the images every 3 seconds

  } catch (error) {
    console.error(error);
  }
}

setTimeout(backgroundImage, 100);