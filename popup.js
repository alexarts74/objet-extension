// Fonction pour afficher le bouton dans la fenetre de l'extension

document.getElementById('generateSubject').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'generateSubject' });
  })
});
