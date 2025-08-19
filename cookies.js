function setCookie(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresString = expires.toUTCString();

    const encodedValue = encodeURIComponent(JSON.stringify(value));
    
    document.cookie = `${name}=${encodedValue}; expires=${expiresString}; path=/; SameSite=Strict`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            try {
                const value = c.substring(nameEQ.length, c.length);
                return JSON.parse(decodeURIComponent(value));
            } catch (e) {
                console.error('Erreur lors du parsing du cookie:', e);
                return null;
            }
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function cookiesEnabled() {
    try {
        document.cookie = "testcookie=1; SameSite=Strict";
        const cookiesSupported = document.cookie.indexOf("testcookie=") !== -1;
        
        document.cookie = "testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return cookiesSupported;
    } catch (e) {
        return false;
    }
}

function savePasswordsToCookies(passwords) {
    if (!cookiesEnabled()) {
        console.warn('Les cookies ne sont pas activés dans ce navigateur');
        return false;
    }
    
    try {
        setCookie('savedPasswords', passwords, 30); 
        return true;
    } catch (e) {
        console.error('Erreur lors de la sauvegarde des mots de passe:', e);
        return false;
    }
}

function loadPasswordsFromCookies() {
    if (!cookiesEnabled()) {
        console.warn('Les cookies ne sont pas activés dans ce navigateur');
        return [];
    }
    
    try {
        const passwords = getCookie('savedPasswords');
        return Array.isArray(passwords) ? passwords : [];
    } catch (e) {
        console.error('Erreur lors du chargement des mots de passe:', e);
        return [];
    }
}

function clearPasswordsFromCookies() {
    try {
        deleteCookie('savedPasswords');
        return true;
    } catch (e) {
        console.error('Erreur lors de la suppression des mots de passe:', e);
        return false;
    }
}

function getCookieSize() {
    return document.cookie.length;
}

function isNearCookieLimit() {
    const currentSize = getCookieSize();
    const maxSize = 4096; 
    return currentSize > (maxSize * 0.8);
}

function cleanupOldPasswords(passwords, maxCount = 10) {
    if (passwords.length <= maxCount) {
        return passwords;
    }
    
    return passwords
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, maxCount);
}

function exportPasswordData() {
    const passwords = loadPasswordsFromCookies();
    if (passwords.length === 0) {
        alert('Aucun mot de passe à exporter');
        return;
    }
    
    const dataStr = JSON.stringify(passwords, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `mots_de_passe_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importPasswordData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (Array.isArray(importedData)) {
                const currentPasswords = loadPasswordsFromCookies();
                const mergedPasswords = [...currentPasswords, ...importedData];
                const cleanedPasswords = cleanupOldPasswords(mergedPasswords, 10);
                
                savePasswordsToCookies(cleanedPasswords);
            
                if (typeof displaySavedPasswords === 'function') {
                    savedPasswords = cleanedPasswords;
                    displaySavedPasswords();
                }
                
                alert(`${importedData.length} mots de passe importés avec succès !`);
            } else {
                alert('Format de fichier invalide');
            }
        } catch (error) {
            console.error('Erreur lors de l\'import:', error);
            alert('Erreur lors de l\'import du fichier');
        }
    };
    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', function() {
    if (!cookiesEnabled()) {
        console.warn('⚠️ Les cookies ne sont pas activés. Les mots de passe ne seront pas sauvegardés entre les sessions.');
        
        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            background: #fff3cd;
            color: #856404;
            padding: 10px;
            margin: 10px;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            font-size: 14px;
        `;
        warningDiv.innerHTML = '⚠️ Les cookies ne sont pas activés. Vos mots de passe ne seront pas sauvegardés.';
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(warningDiv, container.firstChild);
        }
    }
});