Pour créer une extension Chrome qui lit l'URL de la page actuelle et effectue un appel API chaque fois que la page change, vous devez suivre les étapes suivantes :

1. **Créer la structure de l'extension** :
   - `manifest.json` : Le fichier de configuration de l'extension.
   - `background.js` : Le script de fond qui gère les événements.
   - `content.js` (facultatif) : Si vous avez besoin d'interagir avec le contenu de la page.

2. **Écrire le contenu des fichiers** :
   
   - **manifest.json** :
     ```json
     {
       "manifest_version": 3,
       "name": "URL Watcher",
       "version": "1.0",
       "permissions": [
         "tabs",
         "webNavigation"
       ],
       "background": {
         "service_worker": "background.js"
       },
       "host_permissions": [
         "<all_urls>"
       ]
     }
     ```
   
   - **background.js** :
     ```javascript
     // Fonction pour envoyer l'URL à l'API
     async function sendUrlToApi(url) {
       try {
         const response = await fetch('https://monapi.com/api', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ url: url })
         });
         const data = await response.json();
         console.log('API Response:', data);
       } catch (error) {
         console.log('Error sending URL to API:', error);
       }
     }

     // Écouter les changements de page
     chrome.webNavigation.onCompleted.addListener((details) => {
       chrome.tabs.get(details.tabId, (tab) => {
         if (tab.url) {
           sendUrlToApi(tab.url);
         }
       });
     });
     ```

3. **Installer l'extension** :
   - Allez dans `chrome://extensions/` dans votre navigateur Chrome.
   - Activez le mode développeur.
   - Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier où se trouvent vos fichiers `manifest.json` et `background.js`.

4. **Tester l'extension** :
   - Ouvrez une nouvelle page ou changez d'onglet dans Chrome.
   - Vérifiez la console du navigateur (F12 -> Console) pour voir les logs de l'API et vérifier que les appels sont bien effectués.

Voici un résumé de ce que chaque partie fait :
- `manifest.json` configure l'extension, spécifie les permissions et déclare le script de fond.
- `background.js` écoute les événements de navigation et envoie l'URL de la page actuelle à votre API chaque fois qu'une page est complètement chargée.

Avec cette structure, votre extension sera capable de surveiller les changements d'URL et de les envoyer à votre backend.