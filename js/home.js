const loadDiv = document.getElementById('loadDiv');
const logoQuoteLabel = document.getElementById('logoQuote');
const latestArticlesContainer = document.getElementById('latestArticlesContainer');
const categoryInsertAfterPoint = document.getElementById('categoryInsertAfterPoint');
const quotes = [
  '"te worlds source of infomation" - me, 2026',
  '"grolious wepsait" - Yaerma, 2024',
  '"i can\'t live wit out tis site ong fr fr" - guy, 2013',
  '"grotto\'s SUCKS" - skibidi toilet man, 2025',
  '"WHen one person has, they shall never stand down!!! ✊✊✊😤" - skibidi toilet man, 2025',
  'Society if those pesky red and green plumbers left us alone:',
  'Has har been bard?',
  'yoo mr beast where\'s my free money at??',
  '"I AM A FUCKING ARCHITECT" - Clark, 2026',
  'they are putting something in water that makes you pee',
  'i forgor',
  'Absolute Cronkema',
  'BLELHLEHLELGEGAGLLJHLAHLAALLLAAAAAAAAAAAAAAa',
  'Nick rest of eating us leave some 🥹🥹😠😤😭😭😭',
  'and that\'s on gang',
  '"I HATE BEER AND LOUIES PIZZA AND I LOVE GROTTOS AND TEA ALSO PETERBILT SUCKS AND I DRIVE A WESTERN STAR" - HyperMythicUser, 2026',
  'He 🧔‍♂️ made a statement so Japan 🌸🇯🇵 even his FOOTSTEPS turned into electricity ⚡🤖'
];
const categories = [
  {
    title: 'How To',
    desc: 'lern how 2 do sometin new',
    stringMatch: 'how to'
  }
];
const minRandomAuthors = 1;
const maxRandomAuthors = 3;
const randomAuthorMinArticles = 2;
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
const latestArticlesAmount = 15;
const insertAdjacentElement = (element, point) => point.insertAdjacentElement('afterend', element);

let lastCategoryElement;

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function createCategory(title, desc, articles) {
  if (!title || !articles) {
    console.error('Attempted to create category while missing either title or articles. Title:', title, 'Articles?:', articles === null);
    return;
  }

  const titleHeading = document.createElement('h2');
  titleHeading.classList.add('categoryTitle');
  titleHeading.innerText = title;
  insertAdjacentElement(titleHeading, lastCategoryElement || categoryInsertAfterPoint);

  let prevElement = titleHeading;
  if (desc) {
    const descLabel = document.createElement('p');
    descLabel.classList.add('categoryDesc');
    descLabel.innerText = desc;
    insertAdjacentElement(descLabel, titleHeading);

    prevElement = descLabel;
  }

  const cardScroller = document.createElement('div');
  cardScroller.classList.add('cardScroller');
  articles.forEach(article => {
    addCard(article.title, article.desc, article.image, article.link, cardScroller);
  });
  insertAdjacentElement(cardScroller, prevElement);

  lastCategoryElement = cardScroller;
}

async function createDefaults() {
  await new Promise(resolve => {
    const check = () => {
      if (done) {
        resolve();
      } else {
        setTimeout(check, 200);
      }
    };
    check();
  });

  logoQuoteLabel.innerText = quotes[Math.floor(Math.random() * quotes.length)];

  for (const { title, desc, stringMatch } of categories) {
    const matchingArticles = data.filter(article =>
      (article.title && article.title.toLowerCase().includes(stringMatch)) || (article.desc && article.desc.toLowerCase().includes(stringMatch))
    );
    if (matchingArticles.length === 0) {
      console.warn('No matching articles found for category:', title);
      return;
    } else 
      shuffle(matchingArticles);

    createCategory(title, desc, matchingArticles);
  }

  const randomAuthorsCount = Math.max(Math.ceil(Math.random() * maxRandomAuthors), minRandomAuthors);
  if (randomAuthorsCount > 0) {
    let addedAuthors = [];

    // max 100 attempts
    for (let i = 0; i < 100; i++) {
      const randomArticle = data[Math.floor(Math.random() * data.length)];
      const author = randomArticle.author;
      if (!author || author.trim() === '' || addedAuthors.includes(author)) continue;

      const randomAuthorArticles = data.filter(article => article.author === author);
      if (randomAuthorArticles.length < randomAuthorMinArticles) continue;
      
      shuffle(randomAuthorArticles);

      createCategory('Articles by ' + author, null, randomAuthorArticles);
      addedAuthors.push(author);

      if (addedAuthors.length >= randomAuthorsCount) break;
    }
  }

  const randomMonthIndex = Math.floor(Math.random() * months.length)
  const randomMonth = months[randomMonthIndex];
  const randomMonthArticles = data.filter(article => {
    if (!article.date) return false;
    try {
      const date = new Date(article.date);
      return date.getMonth() === randomMonthIndex;
    } catch (err) {
      console.warn('Invalid date in article with title:', article.title);
      return false;
    }
  });

  if (randomMonthArticles.length > 0) {
    createCategory('articles posted in ' + randomMonth, null, randomMonthArticles);
  }

  const latestArticles = data.slice(data.length - latestArticlesAmount).reverse().filter(article => article.title && article.desc && article.author);
  createCategory('top ' + latestArticlesAmount + ' lates articals', null, latestArticles);

  loadDiv.classList.add('hide');
  setTimeout(() => loadDiv.remove(), 200);
}

createDefaults();