const loadDiv = document.getElementById('loadDiv');
const notFoundElement = document.getElementById('notFound');
// nice element names they're really clear and descriptive
const searchBoxContainerElement = document.getElementById('search');
const searchDivElement = document.getElementById('searchDiv');

const noSearchQueryNotice = document.getElementById('noSearchQueryNotice');
const noExactResultsNotice = document.getElementById('noExactResultsNotice');
const searchItemsElement = document.getElementById('searchItems');

const partialMatchContainer = document.getElementById('partialMatchContainer');
const searchPartialMatchItemsElement = document.getElementById('searchPartialMatchItems');

const searchFormElements = document.querySelectorAll('.searchForm');
const searchInputElements = document.querySelectorAll('.searchInput');

const exactMatchMinScore = 5;
const searchIgnoredWords = ['how', 'the', 'to', 'do', 'a'];
const searchIgnoredCharactersRegex = /[^\p{L}\d\s]/gu;
const multipleSpacesRegex = /\s\s+/g;
const searchWordMinCharacters = 3;
const searchKeyPressSubmitTimeout = 300;

function processString(string) {
  return string.trim().toLowerCase().replace(searchIgnoredCharactersRegex, '').replace(multipleSpacesRegex, ' ');
}

function search(query) {
  if (typeof(query) === 'string') query = processString(query);

  const isEmptyQuery = query === '' || query === null;

  searchItemsElement.innerHTML = '';
  searchPartialMatchItemsElement.innerHTML = '';

  const url = new URL(window.location);
  if (isEmptyQuery) {
    url.searchParams.delete('query');
  } else {
    url.searchParams.set('query', query);
  }
  window.history.pushState({}, '', url);

  // Ensure inputs are consistent
  for (const searchInput of searchInputElements) {
    searchInput.value = query || '';
  }

  if (isEmptyQuery) {
    noSearchQueryNotice.classList.remove('hidden');
    partialMatchContainer.classList.add('hidden');
    return;
  } else {
    noSearchQueryNotice.classList.add('hidden');
  }

  let matches = [];
  let areExactMatches = false;
  let arePartialMatches = false;

  let queryWords = query.split(' ').filter(word => !searchIgnoredWords.includes(word));

  data.forEach((item, index) => {
    if (!item.title || !item.desc || !item.tags) return;

    const title = processString(item.title);
    const desc = processString(item.desc);
    const tags = processString(item.tags);

    let score = 0;

    // Exact matches, large score increase
    if (title === query) score += 10;
    if (desc === query) score += 8;

    // Individual word matches, decent score increase
    title.split(' ').forEach(word => {
      if (queryWords.includes(word)) score += 4;
    });

    desc.split(' ').forEach(word => {
      if (queryWords.includes(word)) score += 2;
    });

    tags.split(' ').forEach(word => {
      if (queryWords.includes(word)) score += 1;
    });

    // Partial matches, only if nothing else has been found
    if (score === 0)
      queryWords.forEach(word => {
        if (word.length < searchWordMinCharacters) return;
        
        if (title.includes(word))
          score += 0.5
        else if (desc.includes(word))
          score += 0.35
        else if (tags.includes(word))
          score + 0.2
      });

    if (score > 0) matches.push([score, index]);
  });

  matches.sort((a, b) => b[0] - a[0]);
  matches.forEach(([score, itemIndex]) => {
    const item = data[itemIndex];
    if (!item) {
      console.warn('Invalid item index received during matches for each:', itemIndex);
      return;
    }
    
    const isPartialMatch = score < exactMatchMinScore || score % 1 !== 0; // Partial matches are not integers
    addCard(item.title, item.desc, item.image, item.link, isPartialMatch ? searchPartialMatchItemsElement : searchItemsElement);

    if (!areExactMatches && !isPartialMatch)
      areExactMatches = true;
    else if (!arePartialMatches && isPartialMatch)
      arePartialMatches = true;
  });

  noExactResultsNotice.classList.toggle('hidden', areExactMatches);
  partialMatchContainer.classList.toggle('hidden', !arePartialMatches);
}

async function init() {
  searchFormElements.forEach(element => element.addEventListener('submit', (event) => {
    event.preventDefault();
    search(event.target.elements[0].value);
  }));

  searchInputElements.forEach(element => {
    let inputTimeout;

    element.addEventListener('keydown', () => {
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
  search(searchQueryParam);

  loadDiv.classList.add('hide');
  setTimeout(() => loadDiv.remove(), 200);
}

init();