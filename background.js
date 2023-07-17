chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'generateSubject') {
    var emailContent = request.content;
    console.log(emailContent)

    generateEmailSubject(emailContent)
      .then(function(generatedSubject) {
        sendResponse({ subject: generatedSubject });
        console.log(generateSubject);
      })
      .catch(function(error) {
        sendResponse({ error: error.message });
        console.log(error);
      });

    return true;
  }
});


function generateEmailSubject(emailContent) {
  return fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      prompt: "Sujet de l'e-mail : " + emailContent,
      max_tokens: 30,
      temperature: 0.7,
      n: 1,
      stop: ['\n']
    })
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erreur lors de la requête à l\'API OpenAI');
      }
      console.log(response)
      return response.json();
    })
    .then(function(data) {
      var generatedSubject = data.choices[0].text.trim();
      console.log(generatedSubject);
      return generatedSubject;
    });
}
