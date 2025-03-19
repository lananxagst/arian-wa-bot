const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("Scan QR ini di WhatsApp Web:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Bot siap!");
});

const responses = [
  {
    keywords: ["halo", "hi", "hallo", "P", "p"],
    reply: "Halo! Selamat datang di toko kami. Ada yang bisa kami bantu?",
  },
  {
    keywords: ["produk", "barang"],
    reply:
      "Kami menjual berbagai produk berkualitas! Silakan kunjungi website kami untuk melihat katalog lengkapnya.",
  },
  {
    keywords: ["harga", "biaya"],
    reply:
      "Untuk informasi harga, silakan cek website kami atau tanyakan langsung produk yang Anda inginkan.",
  },
  {
    keywords: ["pembayaran", "bayar"],
    reply:
      "Kami menerima pembayaran melalui transfer bank, e-wallet, dan kartu kredit. Detail pembayaran ada di website kami.",
  },
  {
    keywords: ["kirim", "ongkir", "kurir"],
    reply:
      "Kami mengirim ke seluruh Indonesia dengan berbagai pilihan kurir. Cek website kami untuk info lebih lanjut.",
  },
  {
    keywords: ["pengiriman"],
    reply:
      "Kami mengirim ke seluruh Indonesia dengan berbagai pilihan kurir. Cek website kami untuk info lebih lanjut.",
  },
  {
    keywords: ["diskon", "promo"],
    reply:
      "Cek promo terbaru di website kami! Kami selalu punya penawaran menarik untuk Anda.",
  },
  {
    keywords: ["kontak", "customer service"],
    reply:
      "Anda bisa menghubungi customer service kami melalui WhatsApp ini atau email resmi di website kami.",
  },
];

client.on("message", async (msg) => {
  console.log(`📩 Pesan dari ${msg.from}: ${msg.body}`);

  let lowerMessage = msg.body.toLowerCase();
  let foundResponse = responses.find((res) =>
    res.keywords.some((keyword) => lowerMessage.includes(keyword))
  );

  if (foundResponse) {
    await msg.reply(foundResponse.reply);
  }
});

const { exec } = require("child_process");

console.log("🔍 Checking Chrome path...");
exec("which google-chrome", (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Chrome not found!", err);
    return;
  }
  console.log("✅ Chrome found at:", stdout);
});

client.initialize();
