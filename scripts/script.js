const qrCodeBox = document.querySelector(".qr-code-box");
const qrCode = document.querySelector(".qr-code-image");
const userInput = document.querySelector(".user-input");
const generateBtn = document.querySelector(".generate-btn");
const colorPicker = document.querySelector("#color-picker");
const bgcolorPicker = document.querySelector("#bgcolor-picker");
const marginSlider = document.querySelector("#margin-slider");
const marginValue = document.querySelector("#margin-value");


let hasGenerated = false;

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}-${parseInt(result[2], 16)}-${parseInt(result[3], 16)}` : null;
};


const generateQr = async () => {
    const selectedColor = colorPicker.value;
    const rgbColor = hexToRgb(selectedColor);
    const colorParam = `&color=${rgbColor}`;

    const selectedBgColor = bgcolorPicker.value;
    const rgbBgColor = hexToRgb(selectedBgColor);
    const bgColorParam = `&bgcolor=${rgbBgColor}`;

    const margin = marginSlider.value;
    const marginParam = `&margin=${margin}`;

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${userInput.value}${colorParam}${bgColorParam}${marginParam}`;
    
    qrCodeBox.classList.add("active");
    qrCode.style.animation = "fadeIn 0.5s ease";
    setTimeout(() => {
        qrCode.style.animation = "";
    }, 500);
    
    qrCode.src = url;

  if (!hasGenerated) {
        generateBtn.textContent = "Gerar novo QR Code";
        hasGenerated = true;
    }
};

marginSlider.addEventListener('input', () => {
    marginValue.textContent = marginSlider.value;
});


generateBtn.addEventListener("click", () => {
    if (userInput.value.trim() !== "") {
        generateQr();
    }
});

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        generateBtn.click();
    }
});