const articleText = document.getElementById('articleText');

if (document.getElementById('pageName')) {
  const articleName = document.getElementById('pageName').innerHTML; // get the article name
  const pageName = articleName + " - wikabedia"; // create a page name
  document.title = pageName; // change the page name
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function load(head,text,image,url,e) {
  web = "site('../" + url + "')";
  if (!image.toString().includes("../")) {
    if (!image.toString().includes("https://")) {
      image = "../" + image;
    }
  }
  const div = document.createElement('div');
  const img = document.createElement('img');
  const hding = document.createElement('h3');
  const p = document.createElement('p');
  div.setAttribute('class','item');
  div.setAttribute('onclick',web);
  img.setAttribute('src',image);
  hding.innerHTML = head;
  p.innerHTML = text;
  
  if (e === null) {
    e = "items";
  }
  
  if (url === null) {
    url == "#";
  }
  
  document.getElementById(e).appendChild(div);
  div.appendChild(img);
  div.appendChild(hding);
  div.appendChild(p);
}

function site(url) {
  document.body.style.opacity = 0;
  setTimeout(function() {
    window.location.href = url;
  },250);
}

function createTopButtons() {
  const container = document.createElement('div');
  container.classList.add("topButtons");
  
  const searchDiv = document.createElement('div');
  searchDiv.classList.add("search");
  searchDiv.id = 'searchDiv';
  
  const searchImg = document.createElement('img');
  searchImg.setAttribute('src', '../img/search.png');
  searchImg.setAttribute('onclick', 'search("page2");');
  
  const searchInp = document.createElement('input');
  searchInp.setAttribute('type', 'text');
  searchInp.setAttribute('placeholder', 'search for something');
  searchInp.id = 'searchBox';
  searchInp.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      search("page2");
    }
  });
  
  searchDiv.appendChild(searchImg);
  searchDiv.appendChild(searchInp);
  container.appendChild(searchDiv);

  document.body.appendChild(container);
}

createTopButtons();

function search() {
  url = "../search.html?search=" + document.getElementById('searchBox').value;
  if (url !== undefined) {
    document.body.style.opacity = 0;
    setTimeout(function() {
      window.location.href = url;
    }, 250);
  }
}

function search2(key) {
  if (event.key === "Enter") {
    search("page2");
  }
}