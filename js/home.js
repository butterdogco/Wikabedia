function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function site(url) {
  document.body.style.opacity = 0;
  setTimeout(function () {
    window.location.href = url;
  }, 250);
}

function createDefaults() {
  if (done === false) {
    setTimeout(createDefaults, 100);
  } else {
    try {
      for (var item of data) {
        if (item.title && item.desc && item.image && item.link && item.place) {
          addCard(item.title, item.desc, item.image, item.link, item.place);
        }
      }

      const parent = document.getElementById("items");
      const arr = Array.from(parent.childNodes);
      arr.reverse();
      parent.append(...arr);

      const e = data[3];
      const f = data[13];
      const g = data[9];
      addCard(e.title, e.desc, e.image, e.link, "top");
      addCard(f.title, f.desc, f.image, f.link, "top");
      addCard(g.title, g.desc, g.image, g.link, "top");
    }
    catch (err) {
      console.error(err);
    }
  }
}

function checkLoad() {
  if (done === true) {
    document.getElementById('loadDiv').style.opacity = 0;
    document.getElementById('loadDiv').remove();

  } else {
    setTimeout(checkLoad, 150);
  }
}

setTimeout(createDefaults, 100);
setTimeout(checkLoad, 150);