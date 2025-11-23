// 🌐 Translations

const translations = {
  en: {
    title:        'Advanced QR Code Generator',
    placeholder:  'Enter text or URL',
    generateBtn:  'Generate QR Code',
    downloadBtn:  'Download QR Code',
    alert:        '⚠️ Please enter some text or URL!',
    historyTitle: 'QR Code History',
    noHistory:    'No history yet. Generate your first QR Code!',
    clearHistory: 'Clear History'
  },
  hi:{
    title:        'एडवांस्ड QR कोड जनरेटर',
    placeholder:  'टेक्स्ट या URL दर्ज करे',
    generateBtn:  'QR कोड बनाएं',
    downloadBtn:  'QR कोड डाउनलोड करे',
    alert:        '⚠️ कृपया कुछ टेक्स्ट या URL दर्ज करे',
    historyTitle: 'QR कोड इतिहास',
    noHistory:    'अभी तक कोई इतिहास, अपना पहला QR कोड बनाएं!',
    clearHistory: 'इतिहास साफ करे'
  },
  es:{
    title:        'Generador Avanzado de Codigos QR',
    placeholder:  'Ingrese texto o URL',
    generateBtn:  'Generar Codigo QR',
    downloadBtn:  'Descarger Codigo QR',
    alert:        'Por favor ingrese texto o URL!',
    historyTitle: 'Historial de Codigos QR',
    noHistory:    'Sin historial aun. Genera tu primer codigo QR!',
    clearHistory: 'Limpiar Historial',
  }
};

// 🌙 Theme Manager

class ThemeManager{
  constructor(selectId){
    this.themeSelect = document.getElementById(selectId);
    this.loadTheme();
    this.themeSelect.addEventListener('change', () => this.changeTheme());
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if(this.themeSelect.value === 'system'){
        this.applyTheme('system');
      }
    })
  }

  loadTheme(){
    const savedTheme = localStorage.getItem('theme') || 'system';
    this.themeSelect.value = savedTheme;
    this.applyTheme(savedTheme);
  }

  applyTheme(theme){
    const html = document.documentElement;
    const body = document.body;

    html.classList.remove('dark');
    body.classList.remove('from-blue-500', 'to-indigo-900', 'from-gray-800', 'to-gray-900', 'light-mode', 'dark-mode');

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if(isDark){
      html.classList.add('dark');
      body.classList.add('dark-mode');

      body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    } else{
      body.classList.add('light-mode');
      body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    localStorage.setItem('theme', theme);
  }

  changeTheme(){
    this.applyTheme(this.themeSelect.value);
  }
}

// Language Manager 

class LanguageManager{
  constructor(selectId){
    this.langSelect = document.getElementById(selectId);
    this.loadLanguage();
    this.langSelect.addEventListener('change', () => this.changeLanguage());
  }

  loadLanguage(){
    const savedLang = localStorage.getItem('lang') || 'en';
    this.langSelect.value = savedLang;
    this.applyLanguage(savedLang);
  }

  applyLanguage(lang){
    const t = translations[lang];
    document.getElementById('titleText').innerText = t.title;
    document.getElementById('qrText').placeholder = t.placeholder;
    document.getElementById('generateBtn').innerText = t.generateBtn;
    document.getElementById('downloadBtn').innerText = t.downloadBtn;
    document.getElementById('alertText').innerText = t.alert;
    localStorage.setItem('lang', lang);
  }

  changeLanguage(){
    this.applyLanguage(this.langSelect.value);
  }

  getCurrentLang(){
    return this.langSelect.value;
  }
}

class QRCustomizer{
  constructor(){
    this.sizeSelect = document.getElementById('sizeSelect');
    this.darkColorInput = document.getElementById('darkColor');
    this.lightColorInput = document.getElementById('lightColor');
    this.errorLevelSelect = document.getElementById('errorLevel');

    this.loadSettings();
    this.addListeners();
  }

  addListeners(){
    this.sizeSelect.addEventListener('change', () => this.saveSettings());
    this.darkColorInput.addEventListener('change', () => this.saveSettings());
    this.lightColorInput.addEventListener('change', () => this.saveSettings());
    this.errorLevelSelect.addEventListener('change', () => this.saveSettings());
  }

  loadSettings(){
    const settings = this.getSettings();
    this.sizeSelect.value = settings.size;
    this.darkColorInput.value = settings.darkColor;
    this.lightColorInput.value = settings.lightColor;
    this.errorLevelSelect.value = settings.errorLevel;
  }

  saveSettings(){
    const settings = {
      size: this.sizeSelect.value,
      darkColor: this.darkColorInput.value,
      lightColor: this.lightColorInput.value,
      errorLevel: this.errorLevelSelect.value
    };
    localStorage.setItem('qrSettings', JSON.stringify(settings));
  }

  getSettings(){
    const defaultSettings = {
      size: '200',
      darkColor: '#000000',
      lightColor: '#ffffff',
      errorLevel: 'M'
    };

    const saved = localStorage.getItem('qrSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  }
}

class DownloadManager{
  constructor(buttonId){
    this.downloadBtn = document.getElementById(buttonId);
    this.currentQRData = null;
  }

  setQRData(text, canvas){
    this.currentQRData = {text, canvas};
    this.downloadBtn.classList.remove('hidden');
  }

  downloadQR(){
    if(!this.currentQRData) return;

    const canvas = this.currentQRData.canvas;
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `qr-code-${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    this.showSuccessMessage();
  }

  showSuccessMessage(){
    const btn = this.downloadBtn;
    const originalText = btn.innerText;
    btn.innerText = 'Downloaded';
    btn.classList.add('success-message');

    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('success-message');
    }, 2000);
  }

  hide(){
    this.downloadBtn.classList.add('hidden');
  }
}

class HistoryManager{
  constructor(dialogId, listId, buttonId){
    this.dialog = document.getElementById(dialogId);
    this.listContainer = document.getElementById(listId);
    this.historyBtn = document.getElementById(buttonId);
    this.maxHistory = 10;

    console.log('HistoryManager initialised');
    // console.log('Dialog:', this.dialog);
    // console.log('List container:', this.listContainer);
    console.log('History button:', this.historyBtn);

    if(this.historyBtn){
      this.historyBtn.addEventListener('click', () => {
        console.log('History button clicked!');
        this.showHistory();
      });
      console.log('History button click listener added');
    } else{
      console.error('History button not found!');
    }

    const closeBtn = document.getElementById('closeHistory');
    if(closeBtn){
      closeBtn.addEventListener('click', () => this.dialog.close());
    }
  }

  addToHistory(text, imageData){
    const history = this.getHistory();
    const newItem = {
      text: text,
      imageData: imageData,
      timestamp: new Date().toISOString()
    };

    history.unshift(newItem);
    if(history.length > this.maxHistory){
      history.pop();
    }

    localStorage.setItem('qrHistory', JSON.stringify(history));
    console.log('Added to history:', text);
  }

  getHistory(){
    const saved = localStorage.getItem('qrHistory');
    return saved ? JSON.parse(saved) : [];
  }

  showHistory(){
    const history = this.getHistory();
    this.listContainer.innerHTML = '';

    if(history.length === 0){
      const lang = localStorage.getItem('lang') || 'en';
      this.listContainer.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-8">${translations[lang].noHistory}</p>
      `;
    } else{
      history.forEach((item, index) => {
        const date = new Date(item.timestamp);
        const timeString = date.toLocaleString();
        const historyItem = document.createElement('div');

        historyItem.className = 'history-item';
        historyItem.innerHTML = `
          <div class="flex items-center gap-3">
            <img src="${item.imageData}" alt="QR Code" class="w-16 h-16 rounded-lg">
            <div class="flex-1 text-left">
              <p class="font-semibold text-gray-800 dark:text-white truncate">${this.truncateText(item.text, 30)}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">${timeString}</p>
            </div>
          </div>
        `;

        historyItem.addEventListener('click', () => {
          document.getElementById('qrText').value = item.text;
          this.dialog.close();
        });

        this.listContainer.appendChild(historyItem);
      });

      const lang = localStorage.getItem('lang') || 'en';
      const clearBtn = document.createElement('button');
      clearBtn.className = 'w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-105';
      clearBtn.innerText = translations[lang].clearHistory;
      clearBtn.addEventListener('click', () => this.clearHistory());
      this.listContainer.appendChild(clearBtn);
    }

    this.dialog.showModal();
  }

  clearHistory(){
    localStorage.removeItem('qrHistory');
    this.showHistory();
  }

  truncateText(text, maxLength){
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}

// OOP based QR Code Generator 

class QRGenerator{
  constructor(inputId, outputId, buttonId, dialogId, closeDialogId){
    // DOM references 
    this.qrInput = document.getElementById(inputId);
    this.qrOutput = document.getElementById(outputId);
    this.generateBtn = document.getElementById(buttonId);
    this.dialog = document.getElementById(dialogId);
    this.closeDialog = document.getElementById(closeDialogId);

    this.customizer = new QRCustomizer();
    this.downloadManager = new DownloadManager('downloadBtn');
    this.historyManager = new HistoryManager('historyDialog', 'historyList', 'historyBtn');

    // Event Listeners 
    this.addListeners();
  }

  addListeners(){
    this.generateBtn.addEventListener('click', ()=> this.handleGenarate());
    this.closeDialog.addEventListener('click', ()=> this.closeDialogBox());
    this.downloadManager.downloadBtn.addEventListener('click', () => this.downloadManager.downloadQR());

    this.qrInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter'){
        this.handleGenarate();
      }
    });
  }

  handleGenarate(){
    const text = this.qrInput.value.trim();
    this.qrOutput.innerHTML = '';
    this.downloadManager.hide();

    if(text.length === 0){
      this.dialog.showModal();
      return;
    }

    this.generateBtn.disabled = true;
    this.generateBtn.innerHTML = '<div class="spinner"></div>';

    setTimeout(() => {
      this.generateQRCode(text);
      this.generateBtn.disabled = false;
      const lang = localStorage.getItem('lang') || 'en';
      this.generateBtn.innerText = translations[lang].generateBtn;
    }, 500);
  }

  generateQRCode(text){
    const settings = this.customizer.getSettings();
    const size = parseInt(settings.size);

    const qr = new QRCode(this.qrOutput, {
      text: text,
      width: 160,
      height: 160,
      colorDark: settings.darkColor,
      colorLight: settings.lightColor,
      correctLevel: QRCode.CorrectLevel[settings.errorLevel]
    });

    setTimeout(() => {
      const canvas = this.qrOutput.querySelector('canvas');
      if(canvas){
        const imageData = canvas.toDataURL('image/png');
        this.downloadManager.setQRData(text, canvas);
        this.historyManager.addToHistory(text, imageData);
      }
    }, 600)
  }

  closeDialogBox(){
    this.dialog.close();
  }
}

// initial app 
document.addEventListener('DOMContentLoaded', ()=>{
  const qrApp = new QRGenerator('qrText', 'qrCode', 'generateBtn', 'alertDialog', 'closeDialog');
  const themeManager = new ThemeManager('themeSelect');
  const langManager = new LanguageManager('langSelect');

  const settingsDialog = document.getElementById('settingsDialog');
  document.getElementById('settingsBtn').addEventListener('click', ()=> settingsDialog.showModal());
  document.getElementById('closeSettings').addEventListener('click', ()=> settingsDialog.close());

  const generateBtn = document.getElementById('generateBtn');
  generateBtn.classList.add('pulse-animation');

  generateBtn.addEventListener('click', () =>{
    generateBtn.classList.remove('pulse-animation');
  }, {once: true});
});