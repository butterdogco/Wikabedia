const loadDiv = document.getElementById('loadDiv');
const allArticlesContainer = document.getElementById('allArticlesContainer');

async function createDefaults() {
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

  for (const item of data) {
    if (item.title && item.desc && item.image && item.link && item.place) {
      const cardElement = newCard(item.title, item.desc, item.image, item.link, item.place);
      allArticlesContainer.prepend(cardElement);
    }
  }

  loadDiv.classList.add('hide');
  setTimeout(() => loadDiv.remove(), 200);
}

createDefaults();