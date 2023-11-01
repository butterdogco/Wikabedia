function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function load(head,text,image,url,e) {
  web = "site('" + url + "')"
  const div = document.createElement('div');
  const img = document.createElement('img');
  const hding = document.createElement('h3');
  const p = document.createElement('p');
  div.setAttribute('class','item');
  div.setAttribute('onclick',web)
  img.setAttribute('src',image)
  hding.innerHTML = head;
  p.innerHTML = text;
  
  if (e === null) {
    e = "items";
  }
  
  if (url === null) {
    url == "#";
  }
  
  document.getElementById(e).appendChild(div)
  div.appendChild(img);
  div.appendChild(hding);
  div.appendChild(p);
}

function site(url) {
  document.body.style.opacity = 0;
  setTimeout(function() {
  window.location.href = url
  },250)
}

function search() {
  url = "search.html?search=" + document.getElementById('searchBox').value;
  if (url !== undefined) {
    document.body.style.opacity = 0;
    setTimeout(function() {
    window.location.href = url
    },250)
  }
}

function search2(key) {
  if (event.key === "Enter") {
    search();
  }
}