const loadDiv = document.getElementById('loadDiv');
const latestArticlesContainer = document.getElementById('latestArticlesContainer');
const topArticlesContainer = document.getElementById('topArticlesContainer');
const topArticles = [3, 13, 9];

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

  try {
    for (const item of data) {
      if (item.title && item.desc && item.image && item.link && item.place) {
        const cardElement = newCard(item.title, item.desc, item.image, item.link, item.place);
        latestArticlesContainer.prepend(cardElement);
      }
    }

    for (const index of topArticles) {
      const articleData = data[index];
      if (!articleData) continue;
      addCard(articleData.title, articleData.desc, articleData.image, articleData.link, topArticlesContainer);
    }

    loadDiv.classList.add('hide');
    setTimeout(() => loadDiv.remove(), 200);
  } catch (err) {
    console.error(err);
  }
}

createDefaults();