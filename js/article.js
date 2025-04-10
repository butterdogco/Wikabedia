const editURL = "https://wikabedia-backend.fly.dev/edit";
const articleText = document.getElementById('articleText');
let editorOpen = false;
let editsMade = false;

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

async function saveEdits() {
  if (!editsMade) closeEditor();

  const input = document.getElementById('editorInput');
  const row = Number.parseInt(new URLSearchParams(window.location.search).get('article'));
  if (!row || isNaN(row) || !input) return;
  const response = await fetch(editURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sheet: "WIKABEDIA",
      row: row,
      values: [input.value]
    })
  });

  if (response.ok) {
    alert("Article updated successfully!");
    articleText.innerHTML = processArticleText(input.value) || input.value;
    editsMade = false;
    closeEditor();
  } else {
    alert("Error updating the article. Please try again later.");
    console.error("Update error:", response);
  }
}

function closeEditor() {
  if (!editorOpen) return;

  // If edits were made, confirm with the user before closing
  if (editsMade == true && confirm("You have unsaved changes, are you sure you want to cancel? 🥶🥶🥶") == false) {
    return;
  }

  editorOpen = false;
  const input = document.getElementById('editorInput');
  if (input) input.remove();
  const editorButtons = document.getElementById('editorButtons');
  if (editorButtons) editorButtons.remove();
  articleText.classList.remove('editorMode');
}

function toggleEditor() {
  if (editorOpen) {
    closeEditor();
  } else {
    startEditor();
  }
}

function startEditor() {
  if (editorOpen) return;

  editorOpen = true;

  // Create the input
  const input = document.createElement('textarea');
  input.setAttribute('id', 'editorInput');
  input.classList.add('editorInput', 'articleText');
  input.value = _backupArticleText || articleText.innerText;
  input.addEventListener('input', () => editsMade = true);
  articleText.after(input);

  // Save & Cancel buttons
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('editorButtons');
  buttonsDiv.setAttribute('id', 'editorButtons');
  input.after(buttonsDiv);

  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.classList.add('cancelButton');
  cancelButton.addEventListener('click', closeEditor);
  buttonsDiv.appendChild(cancelButton);

  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save';
  saveButton.classList.add('saveButton');
  saveButton.addEventListener('click', saveEdits);
  buttonsDiv.appendChild(saveButton);

  // Final setup
  articleText.classList.add('editorMode');
  input.focus();
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
  
  // Create the edit button on the unofficial article page
  if (window.location.href.includes("article.html?article=")) {
    const editDiv = document.createElement("div");
    editDiv.classList.add("editButton");
    editDiv.id = "editButton";
    editDiv.addEventListener("click", toggleEditor);
    
    const editLabel = document.createElement("p");
    editLabel.innerText = "edit";
    editDiv.appendChild(editLabel);
    
    const editImg = document.createElement('img');
    editImg.setAttribute('src', '../img/edit.png');
    editDiv.appendChild(editImg);

    container.appendChild(editDiv);
  }

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