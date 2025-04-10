const articleBackgroundImage = document.querySelector("#articleBackgroundImage");
const form = document.getElementById("articleForm");
const articleTitle = form.querySelector("#articleTitle");
const articleText = form.querySelector("#articleText");
const articleImage = form.querySelector("#articleImage");
const articleImagePreview = form.querySelector("#articleImagePreview");
const articleCardTitle = form.querySelector("#articleCardTitle");
const articleCardDesc = form.querySelector("#articleCardDesc");
const articleWriter = form.querySelector("#articleWriter");
const articleEmail = form.querySelector("#articleEmail");
const tool_insertLink = form.querySelector("#insertLink");
const submitURL = "http://wikabedia-backend.fly.dev/submit";
const maxFileSizeMB = 8;
let uploadedImage = null;

function site(url) {
    document.body.style.opacity = 0;
    setTimeout(function() {
        window.location.href = url;
    },250);
}

function uploadImage() {
    const file = articleImage.files[0];
    if (file) {
        if (file.size >= maxFileSizeMB * 1024 * 1024) {
            alert(`Sorry, our servers are pretty trash. Please upload an image smaller than ${maxFileSizeMB}MB. 😭😭😭`);
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = e.target.result;
            uploadedImage = img;
            articleImagePreview.src = img;
            articleBackgroundImage.src = img;
        };
        reader.readAsDataURL(file);
    }
}

function isInputValid(input) {
    return typeof input === "string" && input.trim() !== "" || true;
}

function getValues() {
    const inputs = [
            articleEmail.value, articleWriter.value, // Author info
            articleCardTitle.value, articleCardDesc.value, // Card
            uploadedImage, // Image Base64
            articleTitle.value, // Main title
            articleText.value // Main text
        ]

    if (inputs.some(input => !isInputValid(input))) {
        alert("Please fill in all required fields. 😭😭😭");
        return null;
    } else {
        return inputs;
    }
}

async function sendCreateRequest() {
    if (!uploadedImage) {
        alert("PLS upload an image for te artickle. 😭😭😭");
        return;
    }

    const values = getValues();
    if (!values) {
        console.error("Erm, stop doing stupid stuff. Invalid input values; cannot send request.");
        return;
    };

    await fetch(submitURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sheet: "WIKABEDIA", values: values})
    }).then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = `./Articles/article.html?article=${data.row}`;
        } else {
            console.error("Error creating the article:", data.error);
            alert("Something went wrong while creating the article. 😭😭😭");
        }
    })
}

function insertLink() {
    let type = prompt("What type of link do you want to insert? ('article', 'other')");
    let link;
    type = type.toLowerCase().trim();
    if (type != "article" && type != "other") {
        alert("Invalid link type. Please enter 'article' or 'other'. 😭😭😭");
        return;
    } else {
        if (type == "article") {
            number = prompt("Enter the article ID (e.g., 1):");
            if (!number) return;
            link = `Article/${number}`;
        } else {
            link = prompt("Enter the URL:");
            if (!link) return;
        }
    }
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
    sendCreateRequest();
}

if (articleImage.files.length > 0) {
    uploadImage();
}

form.addEventListener("submit", onFormSubmit);
articleImage.addEventListener("change", uploadImage);
articleImagePreview.addEventListener("click", () => articleImage.click());
tool_insertLink.addEventListener("click", insertLink);