// OOP based QR Code Generator 

class QRGenerator{
  constructor(inputId, outputId, buttonId, dialogId, closeDialogId){
    // DOM references 
    this.qrInput = document.getElementById(inputId);
    this.qrOutput = document.getElementById(outputId);
    this.generateBtn = document.getElementById(buttonId);
    this.dialog = document.getElementById(dialogId);
    this.closeDialog = document.getElementById(closeDialogId);

    // Event Listeners 
    this.addListeners();
  }

  addListeners(){
    this.generateBtn.addEventListener('click', ()=> this.handleGenarate());
    this.closeDialog.addEventListener('click', ()=> this.closeDialogBox());
  }

  handleGenarate(){
    const text = this.qrInput.value.trim();
    this.qrOutput.innerHTML = '';

    if(text.length === 0){
      this.dialog.showModal();
      return;
    }

    this.generateQRCode(text);
  }

  generateQRCode(text){
    new QRCode(this.qrOutput, {
      text: text,
      width: 160,
      height: 160,
      colorDark: '#000000',
      colorLight: '#ffffff'
    });
  }

  closeDialogBox(){
    this.dialog.close();
  }
}

// initial app 
document.addEventListener('DOMContentLoaded', ()=>{
  const qrApp = new QRGenerator('qrText', 'qrCode', 'generateBtn', 'alertDialog', 'closeDialog');
});