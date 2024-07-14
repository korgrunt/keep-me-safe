// Gathers up in the information that you need from webpage

async function sendURLToAPI(url) {
    try {
        hostname = new URL(url).hostname;


        const response = await fetch('http://localhost:3000/api/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ host: hostname })
        });
        const data = await response.json();
        return data;
        console.log("ALERT")

    } catch (error) {
        console.log("ALERT")
        console.log('Error sending URL to API:', error);
    }

}


function displayAlertHTML() {
    // Création de l'élément div pour l'overlay fullscreen
    var fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.style.position = 'fixed';
    fullscreenOverlay.style.top = '0';
    fullscreenOverlay.style.left = '0';
    fullscreenOverlay.style.width = '100vw';
    fullscreenOverlay.style.height = '100vh';
    fullscreenOverlay.style.backgroundColor = '#ee6b6e';
    fullscreenOverlay.style.textAlign = 'center';
    fullscreenOverlay.style.overflow = 'auto';
    fullscreenOverlay.style.opacity = '0.95';
    fullscreenOverlay.style.zIndex = '9999';

    // Création de la boîte de texte centrée verticalement
    var verticalCenteredTextBox = document.createElement('div');
    verticalCenteredTextBox.style.position = 'relative';
    verticalCenteredTextBox.style.top = '50%';
    verticalCenteredTextBox.style.transform = 'translateY(-50%)';
    verticalCenteredTextBox.style.maxWidth = '80%';
    verticalCenteredTextBox.style.margin = '0 auto';

    // Création du titre h1
    var h1 = document.createElement('h1');
    h1.style.fontSize = '5vmax';
    h1.style.color = 'white';
    h1.textContent = "Vous êtes sur un site malveillant!";
    verticalCenteredTextBox.appendChild(h1);

    // Création des paragraphes de texte
    var paragraphs = [
        {
            text: "Votre extension Chrome KeepMeSafe a détecté",
            fontSize: '3vmax',
            margin: '3px',
            fontWeight: '200',
        },
        {
            text: "que ce site est un site d'arnaque ou de phishing.",
            fontSize: '3vmax',
            margin: '3px',
            fontWeight: '200',
        },
        {
            text: "Fermez la page immédiatement pour éviter de vous faire voler des informations sensibles.",
            fontSize: '2vmax',
            fontWeight: '100',
        }
    ];

    paragraphs.forEach(function (paragraphObj) {
        var p = document.createElement('p');
        p.style.fontSize = paragraphObj.fontSize;
        p.style.lineHeight = paragraphObj.lineHeight;
        p.style.fontWeight = paragraphObj.fontWeight;
        p.style.margin = paragraphObj.margin;
        p.style.color = 'white';

        p.textContent = paragraphObj.text;
        verticalCenteredTextBox.appendChild(p);
    });




    /*
    * ---------------- CLOSE BUTTON ----------------
    */
    // Création du bouton pour fermer la page
    var closeButton = document.createElement('button');
    closeButton.textContent = "Fermer la page";
    closeButton.style.backgroundColor = '#3A86FF';
    closeButton.style.color = '#fff';
    closeButton.style.padding = '18px 32px';
    closeButton.style.fontWeight = '600';
    closeButton.style.fontSize = '18px';
    closeButton.style.borderRadius = '30px';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginTop = '20px';

    // Ajout d'un événement de clic pour fermer la page
    closeButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({ closeThis: true });

    });

    // Ajout du bouton "Fermer la page" à la boîte de texte centrée
    verticalCenteredTextBox.appendChild(closeButton);

    /*
        * ---------------- BR ----------------
        */
    var brElm = document.createElement('br');
    verticalCenteredTextBox.appendChild(brElm);

    /*
    * ---------------- CONTINUE BUTTON ----------------
    */
    // Création du bouton pour continuer
    var continueButton = document.createElement('button');
    continueButton.textContent = "Je suis conscient des risques et je souhaite continuer";
    continueButton.style.backgroundColor = '#fff';
    continueButton.style.color = '#2E2E2E';
    continueButton.style.padding = '14px 24px'; // Réduction du padding
    continueButton.style.fontWeight = '500';
    continueButton.style.fontSize = '12px'; // Réduction de la taille de police
    continueButton.style.lineHeight = '13px'; // Ajustement de la hauteur de ligne
    continueButton.style.borderRadius = '16px'; // Réduction du rayon de bordure
    continueButton.style.border = '1px solid #fff';
    continueButton.style.cursor = 'pointer';
    continueButton.style.marginTop = '20px';

    // Ajout d'un événement de clic pour fermer l'overlay
    continueButton.addEventListener('click', function () {
        document.body.removeChild(fullscreenOverlay);
    });

    // Ajout du bouton "Continuer" à la boîte de texte centrée
    verticalCenteredTextBox.appendChild(continueButton);


    // Ajout de la boîte de texte centrée à l'overlay fullscreen
    fullscreenOverlay.appendChild(verticalCenteredTextBox);

    // Ajout de l'overlay fullscreen au body du document
    document.body.appendChild(fullscreenOverlay);
}

function displayWarningHTML() {
    // Création de l'élément div pour l'overlay fullscreen
    var fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.style.position = 'fixed';
    fullscreenOverlay.style.top = '0';
    fullscreenOverlay.style.left = '0';
    fullscreenOverlay.style.width = '100vw';
    fullscreenOverlay.style.height = '100vh';
    fullscreenOverlay.style.backgroundColor = '#FFA500'; // Fond orange
    fullscreenOverlay.style.textAlign = 'center';
    fullscreenOverlay.style.overflow = 'auto';
    fullscreenOverlay.style.opacity = '0.95';
    fullscreenOverlay.style.zIndex = '9999';

    // Création de la boîte de texte centrée verticalement
    var verticalCenteredTextBox = document.createElement('div');
    verticalCenteredTextBox.style.position = 'relative';
    verticalCenteredTextBox.style.top = '50%';
    verticalCenteredTextBox.style.transform = 'translateY(-50%)';
    verticalCenteredTextBox.style.maxWidth = '80%';
    verticalCenteredTextBox.style.margin = '0 auto';

    // Création du titre h1
    var h1 = document.createElement('h1');
    h1.style.fontSize = '5vmax';
    h1.style.color = 'white';
    h1.textContent = "Attention!";
    verticalCenteredTextBox.appendChild(h1);

    // Création du paragraphe de texte
    var p = document.createElement('p');
    p.style.fontSize = '3vmax';
    p.style.fontWeight = '200';
    p.style.margin = '10px 0';
    p.style.color = 'white';
    p.textContent = "Nous n'avons pas réussi à vérifier si ce site est malveillant ou non.";
    verticalCenteredTextBox.appendChild(p);

    // Création du paragraphe de texte pour les instructions
    var instructions = document.createElement('p');
    instructions.style.fontSize = '2vmax';
    instructions.style.fontWeight = '100';
    instructions.style.color = 'white';
    instructions.textContent = "Pour plus de sécurité, fermez la page.";
    verticalCenteredTextBox.appendChild(instructions);

    /*
     * ---------------- CLOSE BUTTON ----------------
     */
    // Création du bouton pour fermer la page
    var closeButton = document.createElement('button');
    closeButton.textContent = "Fermer la page";
    closeButton.style.backgroundColor = '#3A86FF';
    closeButton.style.color = '#fff';
    closeButton.style.padding = '18px 32px';
    closeButton.style.fontWeight = '600';
    closeButton.style.fontSize = '18px';
    closeButton.style.borderRadius = '30px';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginTop = '20px';

    // Ajout d'un événement de clic pour fermer la page
    closeButton.addEventListener('click', function () {
        document.body.removeChild(fullscreenOverlay);
    });

    // Ajout du bouton "Fermer la page" à la boîte de texte centrée
    verticalCenteredTextBox.appendChild(closeButton);

    var brElm = document.createElement('br');
    verticalCenteredTextBox.appendChild(brElm);

    /*
    * ---------------- CONTINUE BUTTON ----------------
    */
    // Création du bouton pour continuer
    var continueButton = document.createElement('button');
    continueButton.textContent = "Je suis conscient des risques et je souhaite continuer";
    continueButton.style.backgroundColor = '#fff';
    continueButton.style.color = '#2E2E2E';
    continueButton.style.padding = '14px 24px'; // Réduction du padding
    continueButton.style.fontWeight = '500';
    continueButton.style.fontSize = '12px'; // Réduction de la taille de police
    continueButton.style.lineHeight = '13px'; // Ajustement de la hauteur de ligne
    continueButton.style.borderRadius = '16px'; // Réduction du rayon de bordure
    continueButton.style.border = '1px solid #fff';
    continueButton.style.cursor = 'pointer';
    continueButton.style.marginTop = '20px';

    // Ajout d'un événement de clic pour fermer l'overlay
    continueButton.addEventListener('click', function () {
        document.body.removeChild(fullscreenOverlay);
    });

    // Ajout du bouton "Continuer" à la boîte de texte centrée
    verticalCenteredTextBox.appendChild(continueButton);


    // Ajout de la boîte de texte centrée à l'overlay fullscreen
    fullscreenOverlay.appendChild(verticalCenteredTextBox);

    // Ajout de l'overlay fullscreen au body du document
    document.body.appendChild(fullscreenOverlay);
}

function displaySafeSiteBadgeHTML() {
    // Contenu du SVG
    const svgContent = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="green"
    stroke="white"
        stroke-width="1"
    >
      <path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
    </svg>
    `;

    // Convertit le contenu SVG en data URI
    var svgDataURL = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));

    // Création de l'élément img
    var verifiedImage = document.createElement('img');

    // Attribution des attributs à l'élément img
    verifiedImage.src = svgDataURL;
    verifiedImage.alt = 'Verified Icon'; // Texte alternatif pour l'accessibilité

    // Création du texte
    var text = document.createElement('span');
    text.textContent = 'KeepMeSafe';
    text.style.color = 'green';
    text.style.fontWeight = 'bold';

    // Ajout de contour au texte
    text.style.textShadow = `
        -1px -1px 0 #fff,  
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff`; // Quatre ombres pour créer un contour

    // Création de la div contenant l'image et le texte
    var badgeContainer = document.createElement('div');
    badgeContainer.appendChild(verifiedImage);
    badgeContainer.appendChild(text);

    // Style de la div
    badgeContainer.style.position = 'fixed';
    badgeContainer.style.bottom = '20px'; // Ajustement de la position en haut
    badgeContainer.style.left = '20px'; // Ajustement de la position à droite
    badgeContainer.style.display = 'flex';
    badgeContainer.style.flexDirection = 'column';
    badgeContainer.style.alignItems = 'center';
    badgeContainer.style.cursor = 'pointer';
    badgeContainer.style.zIndex = '9999';
    badgeContainer.style.transition = 'opacity 3s'; // Transition pour l'effet de fade-out

    // Ajout d'un événement de clic pour masquer la div
    badgeContainer.addEventListener('click', function () {
        badgeContainer.style.display = 'none'; // Masquer la div lors du clic
    });

    // Ajout de la div à la fin du corps du document
    document.body.appendChild(badgeContainer);

    // Déclenchement du fade-out après 10 secondes
    setTimeout(function () {
        badgeContainer.style.opacity = '0'; // Applique l'effet de fade-out

        // Supprime la div après la fin de la transition
        setTimeout(function () {
            badgeContainer.style.display = 'none';
        }, 3000); // 3000ms correspond à la durée de la transition
    }, 10000); // 10000ms correspond à 10 secondes
}



function handleDOMContentLoaded() {
    console.log('La fonction est exécutée une seule fois lors du chargement de la page.');
    var pageInfo = {
        "url": window.location.href
    };

    sendURLToAPI(pageInfo.url).then((result) => {
        console.log("-_______result")
        console.log(result)
        // ================= ATTENTION SITE DANGEREUX
        if (result.score > 0) {
            displayAlertHTML()
        } else if (result.score == 0) {

            // ================== SITE SAFE
            displaySafeSiteBadgeHTML()
            console.log("safe")
        } else {
            // =================== SITE INCONNU
            displayWarningHTML()
        }

        //        alert("quiter la page ?")
    }).catch((error) => {
        console.log('Error sending URL to API:', error);
    })
    // Votre code à exécuter une fois
}

//document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, { once: true });

handleDOMContentLoaded()