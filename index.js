require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

const rules = [
  {
    keywords: [
      "kenapa di banned",
      "kenapa dibanned",
      "why banned",
      "why i got banned",
    ],
    reply:
      "Kalau kamu merasa kena ban, coba cek dulu alasan di DM / log moderator.\n\n" +
      "Kalau belum jelas, kirim:\n" +
      "• Username\n" +
      "• Waktu kejadian\n" +
      "• Context (link / screenshot)",
  },
  {
    keywords: ["cara unban", "unban gimana", "minta unban"],
    reply:
      "Untuk unban, silakan ajukan banding dengan format:\n\n" +
      "Username:\n" +
      "Alasan banding:\n" +
      "Bukti (jika ada)",
  },
];

// ✅ event yang benar di v15
client.once("clientReady", () => {
  console.log(`✅ Bot online sebagai: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const text = (message.content || "").toLowerCase();
  if (!text) return;

  for (const r of rules) {
    if (r.keywords.some((k) => text.includes(k))) {
      setTimeout(() => {
        message.reply(r.reply).catch(console.error);
      }, 3000);
      return;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);