const form = document.getElementById("articleForm");
const articleTitle = form.querySelector("#articleTitle");
const articleText = form.querySelector("#articleText");
const articleWriter = form.querySelector("#articleWriter");
const articleEmail = form.querySelector("#articleEmail");
const tool_insertLink = form.querySelector("#insertLink");

function site(url) {
    document.body.style.opacity = 0;
    setTimeout(function() {
    window.location.href = url;
    },250);
  }

async function sendCreateRequest() {
    const formData = new FormData(document.getElementById("create-form"));
    const response = await fetch("https://wikabedia-backend.fly.dev/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sheet: "WIKABEDIA", values: Object.fromEntries(formData) })
    });

    if (response.success) {
        const data = await response.json();
        window.location.href = `./Articles/article.html?article=${data.row}`;
    } else {
        console.error("Error creating the article:", response.error);
        alert("Something went wrong while creating the article. 😭😭😭");
    }
}

function insertLink() {
    const link = prompt("What link should be inserted?");
    const text = prompt("What should the link's text say?");

    // Push the link into the article text (and at the cursor position if possible) in this format: [link text](url)
    if (link && text) {
        const cursorPosition = articleText.selectionStart;
        const currentText = articleText.value;
        const newText = currentText.slice(0, cursorPosition) + `(${text})[${link}]` + currentText.slice(cursorPosition);
        articleText.value = newText;
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    // sendCreateRequest();
}

form.addEventListener("submit", onFormSubmit);
tool_insertLink.addEventListener("click", insertLink);