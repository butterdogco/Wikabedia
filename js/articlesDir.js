// This is the directory of every article in Wikabedia, every article has an ID (the number it is down the list + 1)

// C = name
// D = title
// E = desc
// F = image
// G = articleTitle
// H = mainText
// I = appropriate or not

// for these articles, author is used as a tags section of sorts
let data = [
  {
    title: "wrld histry", // 1
    desc: "te worlds histry",
    image: "/img/wrld-histry.jpeg",
    link: "/Articles/wrld-histry.html",
    place: "items",
    author: "keegan",
    text: "yeer is 2023. peeple did tings!"
  },
  {
    title: "how to read engis", // 2
    desc: "tells you how to read",
    image: "/img/how-to-read.jpeg",
    link: "/Articles/how-to-read.html",
    place: "items",
    author: "keegan",
    text: "1. read /n 2. finisdhed leson todya!!11"
  },
  {
    title: "how to typ letrs", // 3
    desc: "tels you how to typ",
    image: "/img/how-to-type.jpeg",
    link: "/Articles/how-to-type.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "how fish asigments erly", // 4
    desc: "help to finsh asignment erly",
    image: "/img/how-to-fish-asigments-erly.jpeg",
    link: "/Articles/how-to-fish-asignment.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "whats the date", // 5
    desc: "the date",
    image: "/img/whats-the-date.jpeg",
    link: "/Articles/whats-the-date.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "how eat eggplant", // 6
    desc: "lern to eat superfast",
    image: "/img/how-eat-eggplant.jpeg",
    link: "/Articles/how-to-eat-eggplant.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "how see", // 7
    desc: "how light work",
    image: "/img/how-see.jpeg",
    link: "/Articles/how-see.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "creating a piep bom", // 8
    desc: "step by sep tutorial",
    image: "/img/creating-a-piep-bom.jpg",
    link: "/Articles/Pipe-bomb.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "hiding evidence", // 9
    desc: "tep by setp",
    image: "/img/hiding-evidence.jpeg",
    link: "/Articles/hide-evidence.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "how to ge hot", // 10
    desc: "totoial set by ep",
    image: "/img/how-to-get-hot.jpeg",
    link: "/Articles/how-to-get-hot.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "how to b humen", // 11
    desc: "reel tutoieal",
    image: "/img/how-to-be-human.jpg",
    link: "/Articles/how-to-be-human.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "how to do maht", // 12
    desc: "maht",
    image: "/img/how-to-do-math.jpg",
    link: "/Articles/how-to-math-do.html",
    place: "items",
    author: "keegan",
  },
  {
    title: "formatting", // 12
    desc: "artical",
    image: "/img/formatting.png",
    link: "/Articles/formatting.html",
    place: "items",
    author: "keegan",
  }
];

let sheetDataCache = null;

// Send a POST request to the server to get the data from the Google Sheet, and return the data
async function getSheetData() {
  if (sheetDataCache !== null) {
    return sheetDataCache;
  }

  const url = "https://wikabedia-backend.fly.dev/get";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sheet: "WIKABEDIA",
    })
  };

  const response = await fetch(url, options);
  const sheetData = await response.json();
  const data = sheetData.data;

  sheetDataCache = data;

  return data;
}

let done = false;
async function getData() {
  if (!done) {
    const dat = await getSheetData();
    data.push(...formatData(dat));
    done = true;
  }
  return data;
}

function formatData(dat) {
  const formattedData = [];
  let articleCount = 0;

  for (let i = 1; i < dat.length; i++) {
    const response = dat[i];
    const responseNumber = i + 1; // add 1 to ignore header
    let imageURL = "img/wikabedia%20icon.png";

    if (response) {
      let image = response[5] || imageURL;
      if (image.includes("https://")) {
        // is a web url
        if (image.includes("drive.google.com")) {
          // is google drive
          const imageId = response[5].toString().replace('https://drive.google.com/open?id=', '');
          const newImageUrl = `https://drive.google.com/thumbnail?id=${imageId}`;
          image = newImageUrl;
        } else {
          // is a regular web url
          image = image;
        }
      } else {
        // is a local url so replace ../ with /
        image = image.replace(/\.\.\//i, "/");
      }

      // increase the article count
      if (responseNumber > articleCount) {
        articleCount = responseNumber;
      }

      const item = {
        title: response[3], // Column D
        desc: response[4], // Column E
        author: response[2], // Column C
        image: image, // Column F
        link: `/Articles/article.html?article=${responseNumber}`,
        place: "items",
        approved: response[8],
        removalReason: response[9],
        date: response[0]
      };

      if (item.approved != 'no') {
        formattedData.push(item);
      }
    }
  }

  return formattedData;
}

getData();

// A = date made
// B = email
// C = name
// D = title
// E = desc
// F = image
// G = articleTitle
// H = mainText
// I = appropriate or not
// J = removal reason