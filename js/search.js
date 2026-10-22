const notFoundElement = document.getElementById('notFound');
// nice element names they're really clear and descriptive
const searchBoxContainerElement = document.getElementById('search');
const searchDivElement = document.getElementById('searchDiv');
const searchItemsElement = document.getElementById('searchItems');
const searchQueryElement = document.getElementById('searchQuery');
const searchBoxElement = document.getElementById('searchBox');
const searchBox2Element = document.getElementById('searchBox2');
const searchIgnoredWords = ['how', 'the', 'to', 'do'];

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function load(head, text, image, url, element) {
  if (image.includes("../")) {
    image = image.replace("../", "");
  }

  if (url === null) {
    url == "#";
  }

  if (element === null) {
    element = "items";
  }

  const div = document.createElement('div');
  div.setAttribute('class','item');
  div.addEventListener('click', () => site(url));

  const img = document.createElement('img');
  img.setAttribute('src', image);
  div.appendChild(img);
  
  const heading = document.createElement('h3');
  heading.innerHTML = head;
  div.appendChild(heading);

  const p = document.createElement('p');
  p.innerHTML = text;
  div.appendChild(p);
  
  document.getElementById(element).appendChild(div);
}

function site(url) {
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = url;
  }, 250);
}

async function search(mode) {
  searchItemsElement.innerHTML = "";

  // Get the URL of the current page
  const url = new URL(window.location);

  let searchQuery = '';
  if (mode === "load") {
    searchQuery = url.searchParams.get("search");
  } else if (mode === "page") {
    searchQuery = searchBoxElement.value;
    window.location.href = "?search=" + searchQuery;
  } else if (mode === "page2") {
    searchQuery = searchBox2Element.value;
    url.searchParams.set("search", searchQuery);
    window.history.pushState({}, '', url);
  }

  searchQueryElement.innerText = `saerched 4 "${searchQuery}"`;
  searchBox2Element.value = searchQuery;

  let exactMatches = [];
  let partialMatches = [];

  // Use the search query to perform a search or any other operations
  // For example, search through a list of items
  while (!done) {
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  
  data.forEach(item => {
    const words = searchQuery.split(' ');
    let found = false;
    
    searchIgnoredWords.forEach((element) => {
      if (!found && item.title && item.desc && item.tags) {
        if (searchQuery === (element) || searchQuery === "how to") {
          found = true;
          match = words.some(word => (item.title.toLowerCase().includes(word.toLowerCase()) || item.desc.toLowerCase().includes(word.toLowerCase()) || item.tags.toLowerCase().includes(word.toLowerCase())));
        } else {
          match = words.some(word => !searchIgnoredWords.includes(word.toLowerCase()) && (item.title.toLowerCase().includes(word.toLowerCase()) || item.desc.toLowerCase().includes(word.toLowerCase()) || item.tags.toLowerCase().includes(word.toLowerCase())));
        }
      }
    });
    
    if (match) {
      if (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.toLowerCase().includes(searchQuery.toLowerCase())) {
        exactMatches.push(item);
      } else {
        partialMatches.push(item);
      }
    }
  });

  // Concatenate the arrays and load the results into the searchItemsElement
  const results = exactMatches.concat(partialMatches);
  results.forEach(item => {
    load(item.title, item.desc, item.image, item.link, "searchItems");
  });

  if (searchItemsElement.hasChildNodes() === false && results.length === 0) {
    const heading = document.createElement('h4');
    heading.innerText = `sory, no find anyting like "${searchQuery}"`;
    heading.setAttribute("id", "notFound");
    searchItemsElement.appendChild(heading);
  } else {
    if (document.getElementById('notFound')) {
      document.getElementById('notFound').remove();
    }
  }
}

function search2(key) {
  if (event.key === "Enter") {
    search("page2");
  }
}

window.addEventListener("load", () => {
  search("load");
});

let focused = false

// yo bro what idiot wrote this code- oh nvm that was me my bad

searchBoxElement.addEventListener("onfocus", function() {
  document.getElementById('searchDiv').style.width = "20vh";
  focused = true;
});

searchBoxElement.addEventListener("onfocusout", function() {
  document.getElementById('searchDiv').style.width = "20vh";
  focused = false;
});

searchBoxElement.addEventListener("mouseover", function() {
  document.getElementById('searchDiv').style.width = "20vh";
});

searchBoxElement.addEventListener("mouseout", function() {
  if (focused === true) {
    document.getElementById('searchDiv').style.width = "20vh";
  } else if (!searchBoxElement.hasFocus() && searchBoxElement.value === "") {
    document.getElementById('searchDiv').style.width = "2.5vh";
  }
});