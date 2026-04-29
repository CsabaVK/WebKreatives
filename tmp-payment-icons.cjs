const fs = require('fs');
const path = require('path');

const dir = path.join('D:', '.openclaw', 'workspace', 'projects', '04-WebKreatives', 'assets', 'payment');
fs.mkdirSync(dir, { recursive: true });

const icons = {

'visa.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="#1A1F71"/>
<text x="30" y="27" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="900" font-style="italic" fill="white" text-anchor="middle" letter-spacing="2">VISA</text>
</svg>`,

'mastercard.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="#252525"/>
<circle cx="22" cy="19" r="11" fill="#EB001B"/>
<circle cx="38" cy="19" r="11" fill="#F79E1B"/>
<path d="M30 9.9a11 11 0 0 1 0 18.2A11 11 0 0 1 30 9.9z" fill="#FF5F00"/>
</svg>`,

'ideal.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="white" stroke="#E0E0E0" stroke-width="1"/>
<rect x="6" y="8" width="6" height="22" rx="3" fill="#CC0066"/>
<rect x="8" y="6" width="8" height="4" rx="2" fill="#CC0066"/>
<text x="39" y="25" font-family="Arial,sans-serif" font-size="14" font-weight="900" fill="#000020" text-anchor="middle">DEAL</text>
<rect x="20" y="8" width="1.5" height="22" rx="1" fill="#E0E0E0"/>
</svg>`,

'applepay.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="#000"/>
<g transform="translate(7,3) scale(0.63)" fill="white">
<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.029 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
</g>
<text x="45" y="25" font-family="-apple-system,Arial,sans-serif" font-size="13" fill="white" font-weight="400" text-anchor="middle">Pay</text>
</svg>`,

'googlepay.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="white" stroke="#E0E0E0" stroke-width="1"/>
<text x="8" y="27" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#4285F4">G</text>
<text x="30" y="26" font-family="Arial,sans-serif" font-size="14" font-weight="500" fill="#5F6368">Pay</text>
</svg>`,

'klarna.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="#FFB3C7"/>
<text x="30" y="26" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#17120E" text-anchor="middle" letter-spacing=".3">Klarna</text>
</svg>`,

'paypal.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="white" stroke="#E0E0E0" stroke-width="1"/>
<text x="8" y="27" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#003087">P</text>
<text x="17" y="27" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#009CDE">P</text>
<text x="34" y="21" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#003087">Pay</text>
<text x="34" y="31" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#009CDE">Pal</text>
</svg>`,

'stripe.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="#635BFF"/>
<text x="30" y="26" font-family="Arial,sans-serif" font-size="17" font-weight="600" fill="white" text-anchor="middle" letter-spacing=".5">stripe</text>
</svg>`,

'amazonpay.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 38">
<rect width="60" height="38" rx="5" fill="white" stroke="#E0E0E0" stroke-width="1"/>
<text x="30" y="17" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#232F3E" text-anchor="middle">amazon</text>
<path d="M13 23 Q30 32 47 23" fill="none" stroke="#FF9900" stroke-width="2.5" stroke-linecap="round"/>
<text x="30" y="35" font-family="Arial,sans-serif" font-size="9" font-weight="500" fill="#232F3E" text-anchor="middle">pay</text>
</svg>`,

};

Object.entries(icons).forEach(([name, content]) => {
  fs.writeFileSync(path.join(dir, name), content, 'utf8');
  console.log('Created:', name);
});
console.log('\nAll payment icons created in assets/payment/');
