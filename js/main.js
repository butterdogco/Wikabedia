const isSearchPage = window.location.pathname.startsWith('/search');

if (!isSearchPage) {
  window.search = (query) => {
  query = query.trim();
    
    const pageUrl = new URL(window.location.href);
    pageUrl.pathname = 'search';
    pageUrl.searchParams.set('query', query);
    window.location.replace(pageUrl.href);
  }

  const searchBoxElement = document.getElementById('searchBox');
  if (searchBoxElement) searchBoxElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      window.search(searchBoxElement.value);
    }
  });
}

function newCard(title, description, image, url) {
  const cardElement = document.createElement('a');
  cardElement.classList.add('cardButton');
  cardElement.href = url;
  
  const imageElement = document.createElement('img');
  imageElement.setAttribute('loading', 'lazy');
  imageElement.setAttribute('decoding', 'async');
  imageElement.setAttribute('src', image.replace('../', '/'));
  if (image.startsWith('https://')) {
    imageElement.setAttribute('referrerpolicy', 'no-referrer');
  }
  cardElement.append(imageElement);

  const titleElement = document.createElement('h3');
  titleElement.innerText = title;
  cardElement.append(titleElement);

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = description.slice(0, 64);
    cardElement.append(descriptionElement);
  } else console.warn('Attempted to create card without description. Title:', title);

  return cardElement;
}

function addCard(title, description, image, url, parent) {
  if (!parent) {
    console.error('Attempted to create card without parent');
    return;
  }

  parent.append(newCard(title, description, image, url));
}