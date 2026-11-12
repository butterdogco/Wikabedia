const URL_REGEX = /\((.*?)\)\[(.*?)\]/g;
const ARTICLE_REGEX = /Article\/\d+$/;
const DRIVE_URL_REGEX = /^https:\/\/drive\.google\.com\/open\?id=.*/;

const loadingOverlay = document.getElementById('loadingOverlay');

/**
 * Map of data columns and their configurations (element?, elementType?, handler?)
 */
const dataColumnConfig = {
  'G': {
    element: 'articleTitle',
    handler: (content) => document.title = content + ' - wikabedia'
  },
  'H': {
    element: 'articleText',
    elementHandler: (content) => {
      return processBodyText(sanitize(content));
    }
  },
  'F': {
    element: 'articleImg',
    elementType: 'img'
  },
  'C': {
    element: 'articleWriter',
    elementHandler: (content) => {
      return `<a href="/search.html?query=${encodeURIComponent(sanitize(content))}">${sanitize(content)}</a>`;
    }
  },
  'A': {
    element: 'articleDate',
    elementHandler: (content) => {
      try {
        const date = new Date(content);
        return date.toLocaleString();
      } catch (err) {
        return sanitize(content);
      }
    }
  }
};

// Used for column indexes
const columns = [
  "A", // date
  "B", // email
  "C", // name
  "D", // title
  "E", // desc
  "F", // image
  "G", // articleTitle
  "H", // mainText
  "I", // appropriate or not
  "J", // reason for removal
];

function sanitize(text) {
  return text.replaceAll('<', '&lt').replaceAll('>', '&gt');
}

function processBodyText(text) {
  return text.replace(URL_REGEX, (match, linkText, url) => {
    if (url.startsWith('javascript') || url.length >= 128) {
      url = url.slice(0, 128);

      console.warn('Security risk encountered while processing body text. Found:', url);

      const warningElement = document.createElement('span');
      warningElement.classList.add('warning');
      warningElement.innerText = linkText + ' ⚠️';
      warningElement.setAttribute('title', 'Security risk encountered while processing body text. Found: ' + url);

      return warningElement.outerHTML;
    }

    url = url.trim();
    if (url.match(ARTICLE_REGEX)) {
      const index = url.split("/")[1];
      url = `../Articles/article.html?article=${index}`;
    }

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('title', url);
    a.innerText = linkText;

    return a.outerHTML;
  });
}

function processImageUrl(url) {
  if (url.startsWith('javascript') || !(url.startsWith('../') || url.startsWith('https://drive.google.com/'))) {
    console.warn('Security risk encountered while processing image url. Found:', url);
    return null;
  }

  try {
    if (DRIVE_URL_REGEX.test(url)) {
      const imageId = url.replace('https://drive.google.com/open?id=', '');
      return `https://drive.google.com/thumbnail?id=${imageId}`;
    } else {
      return url;
    }
  } catch (err) {
    console.error('Failed to process image URL', url, 'with error:', err);
    return null;
  }
}

function error(reason) {
  alert(`Sorry, something went wrong while loading this article. Please try again later or report the following error along with this article name: ${reason || 'No error reason provided'}`);
}

async function loadArticle() {
  const url = new URL(window.location);
  const articleIndex = url.searchParams.get('article');
  if (!articleIndex) {
    console.error('No article index provided in URL');
    error('No article index provided')
    return;
  }

  const sheetData = await getSheetData();
  if (!sheetData) {
    console.error('No sheet data recieved. articleIndex:', articleIndex, 'sheetData:', sheetData);
    error('No sheet data');
    return;
  }

  const articleData = sheetData[articleIndex - 1];
  if (!articleData) {
    console.error('No article data found for:', articleIndex, 'articleData:', articleData);
    error('No article data');
    return;
  }

  // Check for removal
  const allowedValue = articleData[columns.indexOf('I')];
  if (allowedValue === 'no') {
    const removalReason = articleData[columns.indexOf('J')] || 'No reason provided';
    alert('Sorry, this article is unavailable for the following reason: ' + removalReason);
    window.location.href = '../';
    throw new Error('Break');
  }

  for (const [column, config] of Object.entries(dataColumnConfig)) {
    const columnIndex = columns.indexOf(column);
    if (columnIndex === -1) {
      console.warn('Invalid column:', column);
      continue;
    }

    const columnValue = articleData[columnIndex];
    if (columnValue === null) {
      console.warn('No value for column:', column);
      continue;
    }

    const element = config.element ? document.getElementById(config.element) : null;
    if (element) {
      switch (config.elementType) {
        case 'img':
          const src = processImageUrl(columnValue);
          if (src) element.src = src;
          break;
        default:
          const output = config.elementHandler ? config.elementHandler(columnValue) : sanitize(columnValue);
          element.innerHTML = output;
          break;
      }
    }

    const handler = config.handler;
    if (handler) handler(columnValue);
  }

  console.log('Loaded article with index:', articleIndex);

  loadingOverlay.classList.add('hide');
  setTimeout(() => {
    loadingOverlay.remove();
  }, 200);
}

function onDocumentClick(event) {
  const cardButton = event.target.closest('a.cardButton');
  if (!cardButton) return;

  const href = cardButton.getAttribute('href');
  if (!href) return;

  const url = new URL(href, location.href);
  if (!url.pathname.startsWith('/Articles/')) return;

  const articleId = url.searchParams.get('article');
  if (!articleId) return;

  event.preventDefault();
  
  const pageUrl = new URL(location.href);
  pageUrl.searchParams.set('article', articleId);
  window.history.pushState({}, '', pageUrl);

  loadArticle();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

loadArticle();

document.addEventListener('click', onDocumentClick);