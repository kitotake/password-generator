let savedPasswords = [];

function toggleDetailedInfo() { // Afficher / masquer uniquement les détails techniques
  const details = document.getElementById('technicalDetails');
  const toggleText = document.getElementById('toggleInfoText');
  
  if (details.style.display === 'none') {
    details.style.display = 'block';
    toggleText.textContent = 'Masquer les détails techniques';
    updateCookieSize();
  } else {
    details.style.display = 'none';
    toggleText.textContent = 'Afficher les détails techniques';
  }
}

function toggleInfoSection() { // Ouvrir / fermer le bloc complet "Gestion des cookies"
  const infoSection = document.getElementById('infoSection');
  
  if (infoSection.style.display === 'none' || infoSection.style.display === '') {
    infoSection.style.display = 'block';
  } else {
    infoSection.style.display = 'none';
  }
}


function updateCookieSize() {
  const size = getCookieSize();
  document.getElementById('cookieSize').textContent = `${size} octets`;
}

function updateCookieStatus() {
  const statusEl = document.getElementById('cookieStatus');
  const iconEl = document.getElementById('cookieStatusIcon');
  const textEl = document.getElementById('cookieStatusText');
  
  if (cookiesEnabled()) {
    statusEl.className = 'cookie-status enabled';
    iconEl.textContent = '✅';
    textEl.textContent = 'Activés';
  } else {
    statusEl.className = 'cookie-status disabled';
    iconEl.textContent = '❌';
    textEl.textContent = 'Désactivés';
    
    showNotification('⚠️ Les cookies sont désactivés. Vos mots de passe ne seront pas sauvegardés.', 'warning');
  }
}

function showNotification(message, type = 'success') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function showConfirmModal(title, message, callback) {
  const modal = document.getElementById('confirmModal');
  const titleEl = document.getElementById('modalTitle');
  const messageEl = document.getElementById('modalMessage');
  const confirmBtn = document.getElementById('confirmBtn');

  titleEl.textContent = title;
  messageEl.textContent = message;
  modal.style.display = 'block';

  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  newConfirmBtn.addEventListener('click', () => {
    callback();
    closeModal();
  });
}

function closeModal() {
  document.getElementById('confirmModal').style.display = 'none';
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('confirmModal');
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  savedPasswords = loadPasswordsFromCookies();
  displaySavedPasswords();
});

function generatePassword(base, length, options) {
  let chars = '';
  
  if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.numbers) chars += '0123456789';
  if (options.symbols) chars += '!@#$%^&*()_-+=<>?[]{}|;:,./~`';

  if (chars === '') {
    throw new Error('Au moins un type de caractère doit être sélectionné');
  }

  let password = base;
  
  while (password.length < length) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

function evaluatePasswordStrength(password) {
  let score = 0;
  let feedback = '';

  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  let uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.8) score += 1;

  if (score <= 2) {
    feedback = 'Faible';
    return { score, feedback, color: '#e74c3c', width: '25%' };
  } else if (score <= 4) {
    feedback = 'Moyen';
    return { score, feedback, color: '#f39c12', width: '50%' };
  } else if (score <= 6) {
    feedback = 'Fort';
    return { score, feedback, color: '#27ae60', width: '75%' };
  } else {
    feedback = 'Très fort';
    return { score, feedback, color: '#27ae60', width: '100%' };
  }
}

function savePassword(password) {
  savedPasswords.push({
    password: password,
    date: new Date().toLocaleString('fr-FR')
  });
  
  savedPasswords = cleanupOldPasswords(savedPasswords, 10);
  
  savePasswordsToCookies(savedPasswords);
  
  displaySavedPasswords();
}

function displaySavedPasswords() {
  const container = document.getElementById('savedPasswords');
  container.innerHTML = '';

  if (savedPasswords.length === 0) {
    container.innerHTML = '<p style="color: #7f8c8d; font-style: italic;">Aucun mot de passe enregistré</p>';
    return;
  }

  savedPasswords.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'password-item';
    div.innerHTML = `
      <div>
        <div>${item.password}</div>
        <small style="color: #7f8c8d;">${item.date}</small>
      </div>
      <button class="delete-btn" onclick="deletePassword(${index})">🗑️</button>
    `;
    container.appendChild(div);
  });
}

function deletePassword(index) {
  savedPasswords.splice(index, 1);
  savePasswordsToCookies(savedPasswords);
  displaySavedPasswords();
}

function clearAllPasswords() {
  showConfirmModal(
    'Effacer tous les mots de passe',
    'Êtes-vous sûr de vouloir effacer tous les mots de passe sauvegardés ? Cette action est irréversible.',
    () => {
      savedPasswords = [];
      clearPasswordsFromCookies();
      displaySavedPasswords();
      showNotification('Tous les mots de passe ont été effacés', 'success');
    }
  );
}

function copyPassword() {
  const passwordText = document.getElementById('passwordDisplay').textContent;
  navigator.clipboard.writeText(passwordText).then(() => {
    const btn = document.getElementById('copyBtn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Copié !';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  });
}

document.getElementById('generateBtn').addEventListener('click', () => {
  try {
    const base = document.getElementById('baseWord').value;
    const length = parseInt(document.getElementById('length').value);

    if (!base.trim()) {
      showNotification('⚠️ Veuillez entrer un mot de base !', 'warning');
      return;
    }

    if (length < 4 || length > 64) {
      showNotification('⚠️ La longueur doit être entre 4 et 64 caractères !', 'warning');
      return;
    }

    if (base.length > length) {
      showNotification('⚠️ Le mot de base est plus long que la longueur totale demandée !', 'warning');
      return;
    }

    const options = {
      lowercase: document.getElementById('lowercase').checked,
      uppercase: document.getElementById('uppercase').checked,
      numbers: document.getElementById('numbers').checked,
      symbols: document.getElementById('symbols').checked
    };

    const password = generatePassword(base, length, options);
    const strength = evaluatePasswordStrength(password);

    document.getElementById('passwordDisplay').textContent = password;
    
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    strengthFill.style.width = strength.width;
    strengthFill.style.backgroundColor = strength.color;
    strengthText.textContent = `Force : ${strength.feedback}`;
    strengthText.style.color = strength.color;

    document.getElementById('result').classList.add('show');

    savePassword(password);
    showNotification('🔐 Mot de passe généré avec succès !', 'success');

  } catch (error) {
    showNotification('⚠️ ' + error.message, 'error');
  }
});

document.getElementById('copyBtn').addEventListener('click', copyPassword);
document.getElementById('clearAllBtn').addEventListener('click', clearAllPasswords);

window.addEventListener('load', function() {
  savedPasswords = loadPasswordsFromCookies();
  displaySavedPasswords();
  updateCookieStatus();
  
  setInterval(updateCookieStatus, 10000); 
});