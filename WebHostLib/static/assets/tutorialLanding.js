const showError = () => {
  const tutorial = document.getElementById('tutorial-landing');
  document.getElementById('page-title').innerText = 'This page is out of logic!';
  tutorial.removeChild(document.getElementById('loading'));
  const userMessage = document.createElement('h3');
  const homepageLink = document.createElement('a');
  homepageLink.innerText = 'Click here';
  homepageLink.setAttribute('href', '/');
  userMessage.append(homepageLink);
  userMessage.append(' to go back to safety!');
  tutorial.append(userMessage);
};

window.addEventListener('load', () => {
  const ajax = new XMLHttpRequest();
  ajax.onreadystatechange = () => {
    if (ajax.readyState !== 4) { return; }
    const tutorialDiv = document.getElementById('tutorial-landing');
    if (ajax.status !== 200) { return showError(); }

    try {
      const games = JSON.parse(ajax.responseText);
      games.forEach((game) => {
        const gameTitle = document.createElement('h2');
        gameTitle.innerText = game.gameTitle;
        tutorialDiv.appendChild(gameTitle);

        game.tutorials.forEach((tutorial) => {
          const tutorialName = document.createElement('h3');
          tutorialName.innerText = tutorial.name;
          tutorialDiv.appendChild(tutorialName);

          const tutorialDescription = document.createElement('p');
          tutorialDescription.innerText = tutorial.description;
          tutorialDiv.appendChild(tutorialDescription);

          const intro = document.createElement('p');
          intro.innerText = 'This guide is available in the following languages:';
          tutorialDiv.appendChild(intro);

          const fileList = document.createElement('ul');
          tutorial.files.forEach((file) => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.innerText = file.language;
            anchor.setAttribute('href', `${window.location.origin}/tutorial/${file.link}`);
            listItem.appendChild(anchor);

            listItem.append(' by ');
            for (let author of file.authors) {
              listItem.append(author);
              if (file.authors.indexOf(author) !== (file.authors.length -1)) {
                listItem.append(', ');
              }
            }

            fileList.appendChild(listItem);
          });
          tutorialDiv.appendChild(fileList);
        });
      });

      tutorialDiv.removeChild(document.getElementById('loading'));
    } catch (error) {
      showError();
      console.error(error);
    }
  };
  ajax.open('GET', `${window.location.origin}/static/assets/tutorial/tutorials.json`, true);
  ajax.send();
});
