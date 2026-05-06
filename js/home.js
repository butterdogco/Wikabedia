function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function load(head,text,image,url,e) {
  const web = `site('${url}')`;
  
  const div = document.createElement('div');
  div.className = "item";
  div.setAttribute('onclick', web);
  const img = document.createElement('img');
  img.setAttribute("loading", "lazy");
  const hding = document.createElement('h3');
  const p = document.createElement('p');
  
  try {
    if (image.includes("../")) {
      const mod = string.replace('../','');
      img.setAttribute('src', mod);
    } else {
      img.setAttribute('src', image);
    }
  } catch (err) {
    console.error(err);
  }
  
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

function search() {
  url = "search.html?search=" + document.getElementById('searchBox').value;
  if (url !== undefined) {
    document.body.style.opacity = 0;
    setTimeout(function() {
    window.location.href = url;
    },250);
  }
}

function search2(key) {
  if (event.key === "Enter") {
    search();
  }
}

// function sheetData(c1,c2) {
//   const spreadsheetId = '1LlL8mrSXTTV6qHOkUKd57oVb0uZATq037Wg4ltlDreg';
//   const range = 'wikabedia!' + c1 + ":" + c2; // Specify the sheet name and range

//   fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=AIzaSyBie4PasgrxYkF7LRl8zcCGUsnBnwZ8pWE`)
//     .then(response => response.json())
//     .then(data => {
//       // Process the data
//       return data;
//     });
// }
