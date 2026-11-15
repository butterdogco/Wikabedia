const recommendedArticlesContainer = document.getElementById('recommendedArticlesContainer');

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
    // Shuffle the data
    const shuffledData = data.slice();
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }

    let randomItems = [];
    for (const item of shuffledData) {
      if (randomItems.length >= 5) break;
      if (item.approved === 'no' || !item.title || !item.image || !item.link) continue;
      randomItems.push(item);
    }

    randomItems.forEach(item => {
      if (item.desc === null) {
        item.desc = "no descwiption";
      }
      
      addCard(item.title, item.desc, item.image, item.link, recommendedArticlesContainer);
    });
  } catch (error) {
    console.error(error);
  }
}

setTimeout(createDefaults, 100);
