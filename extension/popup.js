document.addEventListener('DOMContentLoaded', async function() {
    const resultDiv = document.getElementById('result');
  
    // Récupérer l'URL courante
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let url = new URL(tab.url).host;
  
    // Envoyer l'URL à l'API
    try {
      const response = await fetch('https://hash24security.com/v1/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ host: url }),
        timeout: 30000
      });
      const data = await response.json();
  
      // Afficher le résultat
      if (data.score > 0) {
        resultDiv.textContent = 'unsafe';
      } else {
        resultDiv.textContent = 'safe';
      }
    } catch (error) {
      resultDiv.textContent = 'Error';
      console.log('Error sending URL to API:', error);
    }
  });
  