// Fonction pour naviguer jusqu'au mail et récupérer le corps
function getEmailContent() {
  let emailContentElement = document.getElementById(":dd");
  if (emailContentElement) {
    let emailContent = emailContentElement.innerText;
    return emailContent;
  } else {
    console.error("Impossible de récupérer le contenu du mail.");
    return "";
  }
}

function generateEmailSubjectAndInject() {
  var emailContent = getEmailContent();

  generateEmailSubject(emailContent)
    .then(function(generatedSubject) {
      injectSubjectIntoGmail(generatedSubject);
    })
    .catch(function(error) {
      console.log(error);
      console.log("Impossible de générer l'objet du mail.");
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'generateSubject') {
    generateEmailSubjectAndInject();
    return true;
  }
});

function generateEmailSubject(emailContent) {
  return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'user',
          content: "Sujet de l'e-mail : " + emailContent
        },
        {
          role: 'assistant',
          content: ""
        }
      ],
      stop: '\n',
      max_tokens: 30,
      temperature: 0.7
    }),
    mode: 'cors'
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erreur lors de la requête OpenAI' + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      var assistantMessage = data.choices[0].message;
      var emailSubject = assistantMessage.content.split(": ")[1];
      return emailSubject;
    });
}

function injectSubjectIntoGmail(generatedSubject) {
  var subjectInput = document.getElementById(":c4");
  if (subjectInput) {
    subjectInput.value = generatedSubject;
  } else {
    console.error("Impossible d'injecter l'objet du mail dans Gmail.");
  }
}

injectSubjectIntoGmail(); // Appelle la fonction pour injecter l'objet lorsque la page Gmail est chargée
