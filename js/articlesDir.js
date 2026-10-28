// This is the directory of every article in Wikabedia, every article has an ID (the number it is down the list + 1)

// C = name
// D = title
// E = desc
// F = image
// G = articleTitle
// H = mainText
// I = appropriate or not

let data = [
  {
    title: "wrld histry", // 1
    desc: "te worlds histry",
    image: "/img/wrld-histry.jpeg",
    link: "/Articles/wrld-histry.html",
    place: "items",
    tags: "world history histry histoy 2023 2021 2020 19 18 16 15 14 earth erth eath eart keegan",
    text: "yeer is 2023. peeple did tings!"
  },
  {
    title: "how to read engis", // 2
    desc: "tells you how to read",
    image: "/img/how-to-read.jpeg",
    link: "/Articles/how-to-read.html",
    place: "items",
    tags: "how to read english read english red read raed rad engis englis englih language anguage keegan",
    text: "1. read /n 2. finisdhed leson todya!!11"
  },
  {
    title: "how to typ letrs", // 3
    desc: "tels you how to typ",
    image: "/img/how-to-type.jpeg",
    link: "/Articles/how-to-type.html",
    place: "items",
    tags: "how to type letters keyboard keys letters leter letter keybord kebord keboard type typing keegan"
  },
  {
    title: "how fish asigments erly", // 4
    desc: "help to finsh asignment erly",
    image: "/img/how-to-fish-asigments-erly.jpeg",
    link: "/Articles/how-to-fish-asignment.html",
    place: "items",
    tags: "how to finish assignments early finish finis finihs assignment asignment work classwork homework quiz quizes tests keegan"
  },
  {
    title: "whats the date", // 5
    desc: "the date",
    image: "/img/whats-the-date.jpeg",
    link: "/Articles/whats-the-date.html",
    place: "items",
    tags: "date time daet tiem calender calendar what's ical what's the date what's the daet keegan"
  },
  {
    title: "how eat eggplant", // 6
    desc: "lern to eat superfast",
    image: "/img/how-eat-eggplant.jpeg",
    link: "/Articles/how-to-eat-eggplant.html",
    place: "items",
    tags: "how to eat an eggplant how to eat eggplant food eggplant eat egplant eggplan egplan eating edible keegan"
  },
  {
    title: "how see", // 7
    desc: "how light work",
    image: "/img/how-see.jpeg",
    link: "/Articles/how-see.html",
    place: "items",
    tags: "how to see how light works physics science see lights bulb electricity keegan"
  },
  {
    title: "creating a piep bom", // 8
    desc: "step by sep tutorial",
    image: "/img/creating-a-piep-bom.jpg",
    link: "/Articles/Pipe-bomb.html",
    place: "items",
    tags: "how to create a pipe bomb weapon pipe bomb damage tnt explosive boom keegan"
  },
  {
    title: "hiding evidence", // 9
    desc: "tep by setp",
    image: "/img/hiding-evidence.jpeg",
    link: "/Articles/hide-evidence.html",
    place: "items",
    tags: "how to hide evidence hiding forest legal trouble keegan"
  },
  {
    title: "how to ge hot", // 10
    desc: "totoial set by ep",
    image: "/img/how-to-get-hot.jpeg",
    link: "/Articles/how-to-get-hot.html",
    place: "items",
    tags: "how to get hot tempurature lava heat keegan"
  },
  {
    title: "how to b humen", // 11
    desc: "reel tutoieal",
    image: "/img/how-to-be-human.jpg",
    link: "/Articles/how-to-be-human.html",
    place: "items",
    tags: "how to be human dog animal mammal pet person humanoid keegan"
  },
  {
    title: "how to do maht", // 12
    desc: "maht",
    image: "/img/how-to-do-math.jpg",
    link: "/Articles/how-to-math-do.html",
    place: "items",
    tags: "how to do math algebra sin cos tan calculator maht meth keegan"
  },
  {
    title: "formatting", // 12
    desc: "artical",
    image: "/img/formatting.png",
    link: "/Articles/formatting.html",
    place: "items",
    tags: "how to do creator formatting articles google forms help keegan"
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
let attempt = 0;
async function getData() {
  if (!done) {
    try {
      const dat = await getSheetData();
      data.push(...formatData(dat));
      done = true;
    } catch (error) {
      console.error("Error fetching data:", error);
      if (attempt < 3) {
        attempt++;
        console.log(`Retrying... Attempt ${attempt}`);
        setTimeout(getData, 1000); // Retry after 1 second
      } else {
        // alert('Failed to fetch data after 3 attempts. Please check your internet connection or try again later. Only built-in articles will be displayed.');
        console.error("Failed to fetch data after 3 attempts.");
        done = true; // Stop retrying after 3 attempts
      }
    }
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
        image: image, // Column F
        link: `/Articles/article.html?article=${responseNumber}`,
        place: "items",
        tags: response[2] + " " + response[1], // Column B, & Column C
        approved: response[8],
        removalReason: response[9]
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