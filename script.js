// 🌐 Translations

const translations = {
  en: {
    title:        'Advanced QR Code Generator',
    placeholder:  'https://example.com or any text...',
    generateBtn:  'Generate QR Code',
    downloadBtn:  'Download QR Code',
    alert:        'Please enter some text or URL!',
    historyTitle: 'QR Code History',
    noHistory:    'No QR codes generated yet',
    clearHistory: 'Clear History',
    generating:   'Generating...',
    success:      'QR Code Generated!',
    downloaded:   'Dowloaded!',
    copied:       'Copied to clipboard!',
    error:        'Something went wrong. Please try again.',
    wifiFormat:   'WIFI:T:WPA;S:NetworkName;P:Password;;',
    emailFormat:  'mailto:example@email.com?subject=Hello&body=Message',
    phoneFormat:  'tel:+1234567890',
  },
  hi:{
    title:        'एडवांस्ड QR कोड जनरेटर',
    placeholder:  'टेक्स्ट या URL दर्ज करे',
    generateBtn:  'QR कोड बनाएं',
    downloadBtn:  'QR कोड डाउनलोड करे',
    alert:        'कृपया कुछ टेक्स्ट या URL दर्ज करे',
    historyTitle: 'QR कोड इतिहास',
    noHistory:    'अभी तक कोई इतिहास, अपना पहला QR कोड बनाएं!',
    clearHistory: 'इतिहास साफ करे',
    generating:   'बना रहे है...',
    success:      'QR कोड तैयार!',
    downloaded:   'डाउनलोड हो गया',
    copied:       'कॉपी हो गया',
    error:        'कुछ गलत हुआ, कृपया फिर से कोशिश करे!',
    wifiFormat:   'WIFI:T:WPA;S:नेटवर्क_नाम;P:पासवर्ड;;',
    emailFormat:  'mailto:example@email.com?subject=नमस्ते&body=संदेश',
    phoneFormat:  'tel:+91xxxxxxxxxx',
  },
  es:{
    title:        'Generador Avanzado de Codigos QR',
    placeholder:  'https://ejemplo.com o cualquier texto...',
    generateBtn:  'Generar Codigo QR',
    downloadBtn:  'Descarger Codigo QR',
    alert:        'Por favor ingrese texto o URL!',
    historyTitle: 'Historial de Codigos QR',
    noHistory:    'Aun no se han generado codigos QR',
    clearHistory: 'Limpiar Historial',
    generating:   'Generando...',
    success:      'Codigo QR Generado!',
    downloaded:   'Descargado!',
    copied:       'Copiado al portapapeles!',
    error:        'Algo salio mal. Por favor intente de nuevo.',
    wifiFormat:   'WIFI:T:WPA;S:NombreRed;P:Contrasena;;',
    emailFormat:  'mailto:ejemplo@email.com?subject=Hola&body=Mensaje',
    phoneFormat:  'tel:+34xxxxxxxxxx',
  }
};

// 🌙 Theme Manager

class ThemeManager{
  constructor(){
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');
    this.currentTheme = localStorage.getItem('theme') || 'light';

    this.init();
  }

  init(){
    this.applyTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme(){
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme(theme){
    const body = document.body;
    const icon = this.themeIcon;

    if(theme === 'dark'){
      body.classList.add('dark-theme');
      icon.className = 'bi bi-sun-fill';
    } else{
      body.classList.remove('dark-theme');
      icon.className = 'bi bi-moon-fill';
    }
  }
}

// Language Manager 

class LanguageManager{
  constructor(){
    this.langSelect = document.getElementById('langSelect');
    this.currentLang = localStorage.getItem('language') || 'en';

    this.init();
  }

  init(){
    this.langSelect.value = this.currentLang;
    this.applyLanguage(this.currentLang);
    this.langSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
  }

  applyLanguage(lang){
    const t = translations[lang];
    document.getElementById('titleText').innerText = t.title;
    document.getElementById('qrText').placeholder = t.placeholder;
    document.getElementById('generateBtnText').innerText = t.generateBtn;
    document.getElementById('downloadBtn').innerHTML = `<i class="bi bi-download me-2"></i>${t.downloadBtn}`;
    
    this.updatePlaceholder();
  }

  changeLanguage(lang){
    this.currentLang = lang;
    this.applyLanguage(lang);
    localStorage.setItem('language', lang)
  }

  updatePlaceholder(){
    const qrType = document.getElementById('qrType').value;
    const qrText = document.getElementById('qrText');
    const t = translations[this.currentLang];

    switch(qrType){
      case 'wifi':
        qrText.placeholder = t.wifiFormat;
        break;
      case 'email':
        qrText.placeholder = t.emailFormat;
        break;
      case 'phone':
        qrText.placeholder = t.phoneFormat;
        break;
      default:
        qrText.placeholder = t.placeholder
    }
  }

  getText(key){
    return translations[this.currentLang][key] || translations.en[key];
  }
}

class SettingsManager{
  constructor(){
    this.settings = {
      size: 200,
      darkColor: '#000000',
      lightColor: '#ffffff',
      errorLevel: 'M',
      autoSave: true
    };

    this.loadSettings();
    this.initEventListeners();
  }

  initEventListeners(){
    document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());

    ['sizeSelect', 'darkColor', 'lightColor', 'errorLevel', 'autoSave'].forEach(id => {
      const element = document.getElementById(id);
      if(element){
        element.addEventListener('change', () => this.saveSettings());
      }
    });
  }

  loadSettings(){
    const saved = localStorage.getItem('qrSettings');
    if(saved){
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }

    document.getElementById('sizeSelect').value = this.settings.size;
    document.getElementById('darkColor').value = this.settings.darkColor;
    document.getElementById('lightColor').value = this.settings.lightColor;
    document.getElementById('errorLevel').value = this.settings.errorLevel;
    document.getElementById('autoSave').checked = this.settings.autoSave;
  }

  saveSettings(){
    this.settings = {
      size: parseInt(document.getElementById('sizeSelect').value),
      darkColor: document.getElementById('darkColor').value,
      lightColor: document.getElementById('lightColor').value,
      errorLevel: document.getElementById('errorLevel').value,
      autoSave: document.getElementById('autoSave').checked
    };

    localStorage.setItem('qrSettings', JSON.stringify(this.settings));
    this.showToast('Settings saved successfully!', 'success');
  }

  getSettings(){
    return this.settings;
  }

  showToast(message, type = 'info'){
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    toast.style.zIndex = '9999';
    toast.innerHTML = `
      <i class="bi bi-check-circle me-2"></i>${message}
      <button type="button" class="btn-close ms-2" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      if(toast.parentNode){
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }
}

class StatsManager{
  constructor(){
    this.stats = {
      totalGenerated: 0,
      totalDownloads: 0,
      historyCount: 0
    };

    this.loadStats();
    this.updateDisplay();
  }

  loadStats(){
    const saved = localStorage.getItem('qrStats');
    if(saved){
      this.stats = { ...this.stats, ...JSON.parse(saved) };
    }
  }

  saveStats(){
    localStorage.setItem('qrStats', JSON.stringify(this.stats));
  }

  incrementGenerated(){
    this.stats.totalGenerated++;
    this.saveStats();
    this.updateDisplay();    
  }

  incrementDownloads(){
    this.stats.totalDownloads++;
    this.saveStats();
    this.updateDisplay();
  }

  updateHistoryCount(count){
    this.stats.historyCount = count;
    this.saveStats();
    this.updateDisplay();
  }

  updateDisplay(){
    document.getElementById('totalGenerated').textContent = this.stats.totalGenerated;
    document.getElementById('totalDownloads').textContent = this.stats.totalDownloads;
    document.getElementById('historyCount').textContent = this.stats.historyCount;
  }

  reset(){
    this.stats = { totalGenerated: 0, totalDownloads: 0, historyCount: 0 };
    this.saveStats();
    this.updateDisplay();
  }
}

class HistoryManager{
  constructor(statsManager, langManager){
    this.maxHistory = 20;
    this.statsManager = statsManager;
    this.langManager = langManager;

    this.initEventListeners();
  }

  initEventListeners(){
    document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());

    document.getElementById('historyModal').addEventListener('show.bs.modal', () => {
      this.displayHistory();
    });
  }

  addToHistory(text, imageData, format = 'png'){
    const history = this.getHistory();
    const newItem = {
      id: Date.now(),
      text: text,
      imageData: imageData,
      format: format,
      timestamp: new Date().toISOString(),
      size: document.getElementById('sizeSelect').value
    };

    const existingIndex = history.findIndex(item => item.text === text);
    if(existingIndex !== -1){
      history.splice(existingIndex, 1);
    }

    history.unshift(newItem);

    if(history.length > this.maxHistory){
      history.splice(this.maxHistory);
    }

    localStorage.setItem('qrHistory', JSON.stringify(history));
    this.statsManager.updateHistoryCount(history.length);
  }

  getHistory(){
    const saved = localStorage.getItem('qrHistory');
    return saved ? JSON.parse(saved) : [];
  }

  displayHistory(){
    const history = this.getHistory();
    const historyList = document.getElementById('historyList');
    const emptyHistory = document.getElementById('emptyHistory');

    if(history.length === 0){
      historyList.style.display = 'none';
      emptyHistory.style.display = 'block';
      return;
    }

    historyList.style.display = 'block';
    emptyHistory.style.display = 'none';
    historyList.innerHTML = '';

    history.forEach((item, index) => {
      const date = new Date(item.timestamp);
      const timeString = date.toLocaleString();

      const historyItem = document.createElement('div');
      historyItem.className = 'col-12 col-md-6';
      historyItem.innerHTML = `
        <div class="history-item" data-text="${item.text.replace(/"/g, '&quot;')}">
          <div class="d-flex align-items-center gap-3">
            <div class="flex-shrink-0">
              <img src="${item.imageData}" alt="QR Code" class="rounded" style="width: 60px; height: 60px; object-fit: contain;">
            </div>
            <div class="flex-grow-1 text-start">
              <p class="mb-1 fw-semibold text-truncate" style="max-width: 200px;" title="${item.text}">
                ${this.truncateText(item.text, 30)}
              </p>
              <small class="text-muted">
                <i class="bi bi-clock me-1"></i>${timeString}
                <span class="ms-2">
                  <i class="bi bi-aspect-ratio me-1"></i>${item.size}px
                </span>
              </small>
            </div>
            <div class="flex-shrink-0">
              <button class="btn btn-sm btn-outline-primary" onclick="qrApp.useFromHistory('${item.text.replace(/'/g, "\\'")}')">
                <i class="bi bi-arrow-repeat"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      historyList.appendChild(historyItem);
    });
  }

  clearHistory(){
    if(confirm('Are you sure you want to clear all history?')){
      localStorage.removeItem('qrHistory');
      this.statsManager.updateHistoryCount(0);
      this.displayHistory();
    }
  }

  truncateText(text, maxLength){
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}

// OOP based QR Code Generator 

class QRGenerator{
  constructor(){
    // DOM references 
    this.qrText = document.getElementById('qrText');
    this.qrCode = document.getElementById('qrCode');
    this.generateBtn = document.getElementById('generateBtn');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.shareBtn = document.getElementById('shareBtn');
    this.qrForm = document.getElementById('qrForm');
    this.alertBox = document.getElementById('alertBox');
    this.downloadSection = document.getElementById('downloadSection');

    this.currentQRData = null;

    this.themeManager = new ThemeManager();
    this.langManager = new LanguageManager();
    this.settingsManager = new SettingsManager();
    this.statsManager = new StatsManager();
    this.historyManager = new HistoryManager(this.statsManager, this.langManager); 

    // Event Listeners 
    this.initEventListeners();
    this.updateTypeBasedPlaceholder();
  }

  initEventListeners(){
    this.qrForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleGenarate();
    });

    this.downloadBtn.addEventListener('click', () => this.downloadQR());
    this.shareBtn.addEventListener('click', () => this.shareQR());

    document.getElementById('qrType').addEventListener('change', () => {
      this.updateTypeBasedPlaceholder();
      this.qrText.value = '';
    });

    document.getElementById('formatSelect').addEventListener('change', () => {
      if(this.currentQRData){
        this.regenerateWithNewFormat();
      }
    });

    this.qrText.addEventListener('input', () => this.validateInput());
  }

  updateTypeBasedPlaceholder(){
    this.langManager.updatePlaceholder();

    const qrType = document.getElementById('qrType').value;
    const qrText = this.qrText;

    const helperTexts = {
      wifi: 'Format: WIFI:T:WPA;S:NetworkName;P:Password;;',
      email: 'Format: mailto:email@example.com?subject=Subject&body=Message',
      phone: 'Format: tel:+1234567890'
    }
  }

  validateInput(){
    const text = this.qrText.value.trim();
    const qrType = document.getElementById('qrType').value;

    let isValid = true;
    let errorMessage = '';

    if(text.length === 0){
      isValid = false;
      errorMessage = this.langManager.getText('alert');
    } else if(qrType === 'email' && text.length > 0 && !text.includes('@') && !text.startsWith('mailto:')){
      isValid = false;
      errorMessage = 'Please enter a valid email format';
    } else if(qrType === 'phone' && text.length > 0 && !text.match(/[\d\+\-\(\)\s]/)){
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }

    if(!isValid && text.length > 0){
      this.qrText.classList.add('is-invalid');
    } else{
      this.qrText.classList.remove('is-invalid');
    }

    return isValid;
  }

  handleGenarate(){
    const text = this.qrText.value.trim();
    
    if(!this.validateInput() || text.length === 0){
      this.showAlert(this.langManager.getText('alert'));
      return;
    }

    this.generateQRCode(text);
      
  }

  generateQRCode(text){
    this.setLoadingState(true);

    this.qrCode.innerHTML = '';
    this.downloadSection.classList.add('d-none');

    setTimeout(() => {
      try {
        const settings = this.settingsManager.getSettings();
        const format = document.getElementById('formatSelect').value;

        const qr = new QRCode(this.qrCode, {
          text: text,
          width: settings.size,
          height: settings.size,
          colorDark: settings.darkColor,
          colorLight: settings.lightColor,
          correctLevel: QRCode.CorrectLevel[settings.errorLevel]
        });

        setTimeout(() => {
          const canvas = this.qrCode.querySelector('canvas');
          if(canvas){
            this.qrCode.parentElement.classList.add('has-qr');
            this.downloadSection.classList.remove('d-none');

            this.currentQRData = {
              text: text,
              canvas: canvas,
              format: format
            };

            if(settings.autoSave){
              const imageData = canvas.toDataURL(`image/${format}`);
              this.historyManager.addToHistory(text, imageData, format);
            }

            this.statsManager.incrementGenerated();

            this.showSuccess();
          }

          this.setLoadingState(false);
        }, 100)
      } catch (error) {
        console.error('QR Generation Error:', error);
        this.showAlert(this.langManager.getText('error'));
        this.setLoadingState(false);
      }
    }, 300);
  }

  regenerateWithNewFormat(){
    if(this.currentQRData){
      this.generateQRCode(this.currentQRData.text);
    }
  }

  downloadQR(){
    if(!this.currentQRData) return;

    const canvas = this.currentQRData.canvas;
    const format = this.currentQRData.format;
    const mimeType = `image/${format}`;

    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `qr-Code-${timestamp}.${format}`;
    link.href = canvas.toDataURL(mimeType);
    link.click();

    this.statsManager.incrementDownloads();
    this.showDownloadSuccess();
  }

  shareQR(){
    if(!this.currentQRData) return;
    const canvas = this.currentQRData.canvas;

    if(navigator.share && navigator.canShare){
      canvas.toBlob(async (blob) => {
        const file = new File([blob], '/images/QRCode.jpg', { type: 'image/png' });

        if(navigator.canShare({ files: [file] })){
          try {
            await navigator.share({
              title: 'QR Code',
              text: `QR Code for: ${this.currentQRData.text}`,
              files: [file]
            });
          } catch (error) {
            this.copyToClipboard();
          }
        } else{
          this.copyToClipboard();
        }
      });
    } else{
      this.copyToClipboard();
    }
  }

  copyToClipboard(){
    if(!this.currentQRData) return;

    const canvas = this.currentQRData.canvas;

    canvas.toBlob(async (blob) => {
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        this.showCopySuccess();
      } catch (error) {
        try {
          await navigator.clipboard.writeText(this.currentQRData.text);
          this.showCopySuccess();
        } catch (textError) {
          console.error('Copy failed:', textError);
        }
      }
    });
  }

  useFromHistory(text){
    this.qrText.value = text;

    const historyModal = bootstrap.Modal.getInstance(document.getElementById('historyModal'));
    if(historyModal){
      historyModal.hide();
    }

    this.generateQRCode(text);
  }

  setLoadingState(loading){
    const btnText = document.getElementById('generateBtnText');

    if(loading){
      this.generateBtn.disabled = true;
      btnText.innerHTML = '<span class="spinner me-2"></span>' + this.langManager.getText('generating');
    } else{
      this.generateBtn.disabled = false;
      btnText.textContent = this.langManager.getText('generateBtn');
    }
  }

  showAlert(message){
    const alertText = document.getElementById('alertText');
    alertText.textContent = message;
    this.alertBox.style.display = 'block';
    this.alertBox.classList.add('show');

    setTimeout(() => {
      this.alertBox.classList.remove('show');
      setTimeout(() => {
        this.alertBox.style.display = 'none';
      }, 150);
    }, 5000);
  }

  showSuccess(){
    this.settingsManager.showToast(this.langManager.getText('success'), 'success');
    this.qrCode.classList.add('success-pulse');
    setTimeout(() => this.qrCode.classList.remove('success-pulse'), 600);
  }

  showDownloadSuccess(){
    const originalText = this.downloadBtn.innerHTML;
    this.downloadBtn.innerHTML = `<i class="bi bi-check-circle me-2"></i>${this.langManager.getText('downloaded')}`;
    this.downloadBtn.classList.add('success-pulse');

    setTimeout(() => {
      this.downloadBtn.innerHTML = originalText;
      this.downloadBtn.classList.remove('success-pulse');
    }, 2000);
  }

  showCopySuccess(){
    this.settingsManager.showToast(this.langManager.getText('copied'), 'info');
  }
}

// initial app 
document.addEventListener('DOMContentLoaded', () => {
  window.qrApp = new QRGenerator();
  
  document.querySelector('.main-card').style.opacity = '0';
  document.querySelector('.main-card').style.transform = 'translateY(30px)';

  setTimeout(() => {
    document.querySelector('.main-card').style.opacity = '1';
    document.querySelector('.main-card').style.transform = 'translateY(0)';
  }, 100);

  document.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter'){
      e.preventDefault();
      qrApp.handleGenarate();
    }

    if((e.ctrlKey || e.metaKey) && e.key === 'd' && qrApp.currentQRData){
      e.preventDefault();
      qrApp.downloadQR();
    }

    if(e.key === 'Escape'){
      const modals = document.querySelector('.modal.show');
      modals.forEach(modal => {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if(bsModal) bsModal.hide();
      });
    }
  });

  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  console.log('Advanced QR Code Generator initialized successfully!');
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();

  const installBtn = document.createElement('button');
  installBtn.className = 'btn btn-outline-primary btn-sm position-fixed bottom-0 end-0 m-3';
  installBtn.innerHTML = '<i class="bi bi-download me-2"></i>Install App';
  installBtn.style.zIndex = '9999';

  installBtn.addEventListener('click', () => {
    e.prompt();
    e.userChoice.then((choiceResult) => {
      if(choiceResult.outcome === 'accepted'){
        installBtn.remove();
      }
    });
  });

  document.body.appendChild(installBtn);

  setTimeout(() => {
    if(installBtn.parentNode){
      installBtn.remove();
    }
  }, 10000);
});