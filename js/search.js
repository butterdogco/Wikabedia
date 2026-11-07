const loadDiv = document.getElementById('loadDiv');
const notFoundElement = document.getElementById('notFound');
// nice element names they're really clear and descriptive
const searchBoxContainerElement = document.getElementById('search');
const searchDivElement = document.getElementById('searchDiv');
const searchItemsElement = document.getElementById('searchItems');
const searchFormElements = document.querySelectorAll('.searchForm');
const searchInputElements = document.querySelectorAll('.searchInput');
const searchIgnoredWords = ['how', 'the', 'to', 'do', 'a'];

const searchKeyPressSubmitTimeout = 300;

function addSearchItem(item) {
  addCard(item.title, item.desc, item.image, item.link, searchItemsElement);
}

function search(query) {
  searchItemsElement.innerHTML = '';

  const url = new URL(window.location);
  url.searchParams.set('query', query);
  window.history.pushState({}, '', url);

  // Ensure inputs are consistent
  for (const searchInput of searchInputElements) {
    searchInput.value = query;
  }

  const exactMatches = new Set();
  const partialMatches = new Set();

  query = query.trim().toLowerCase();
  let queryWords = query.split(' ');
  queryWords = queryWords.filter(word => !searchIgnoredWords.includes(word));

  data.forEach(item => {
    if (!item.title || !item.desc || !item.tags) return;

    const title = item.title.toLowerCase();
    const desc = item.desc.toLowerCase();
    const tags = item.tags.toLowerCase();

    if (title === query || desc === query) {
      exactMatches.add(item);
      return;
    }

    for (const word of queryWords) {
      if (title.includes(word) || desc.includes(word) || tags.includes(word)) {
        partialMatches.add(item);
        break;
      }
    }
  });

  exactMatches.forEach(addSearchItem);
  partialMatches.forEach(addSearchItem);
}

async function init() {
  searchFormElements.forEach(element => element.addEventListener('submit', (event) => {
    event.preventDefault();
    search(event.target.elements[0].value);
  }));

  searchInputElements.forEach(element => {
    let inputTimeout;

    element.addEventListener('keypress', () => {
      if (inputTimeout) {
        clearTimeout(inputTimeout);
        inputTimeout = null;
      }

      inputTimeout = setTimeout(() => search(element.value), searchKeyPressSubmitTimeout);
    });
  });

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

  const url = new URL(window.location);
  const searchQueryParam = url.searchParams.get('query');
  if (searchQueryParam && searchQueryParam.trim() !== '') {
    search(searchQueryParam);
  }

  loadDiv.classList.add('hide');
  setTimeout(() => loadDiv.remove(), 200);
}

init();