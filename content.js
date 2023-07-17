chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'generateSubject') {
    var emailContent = getEmailContent();
    sendResponse({ content: emailContent });
  }
});

function getEmailContent() {
  let emailContentElement = document.getElementById(":8r");
  if (emailContentElement) {
    let emailContent = emailContentElement.innerText;
    return emailContent;
  } else {
    console.error("Élément 'div[aria-label=\"Message Body\"]' introuvable dans la page.");
    return "";
  }
};
