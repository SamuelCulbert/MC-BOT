// ✅ Aternos AFK Bot for Render.com
const express = require("express");
const mineflayer = require("mineflayer");

const app = express();
app.get("/", (req, res) => res.send("✅ AFK Bot is running and keeping your Aternos server alive!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌍 Express web server listening on ${PORT}`));

// ==== CONFIGURATION ====
const SERVER_HOST = "Onebrock-WtYB.aternos.me"; // ⚠️ change this!
const SERVER_PORT = 50269;
const BOT_USERNAME = "AFK_Bot"; // can be anything you want
// =======================

function startBot() {
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_USERNAME,
    version: false, // auto-detect version
  });

  bot.on("login", () => {
    console.log("✅ Bot logged in!");
    bot.chat("Hey! AFK_Bot joined to keep this server alive 💪");
  });

  bot.on("spawn", () => {
    console.log("🕹️ Bot spawned!");
    // Move or jump periodically to prevent AFK kick
    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }, 30000);
  });

  bot.on("end", () => {
    console.log("⚠️ Bot disconnected. Reconnecting in 15 seconds...");
    setTimeout(startBot, 15000);
  });

  bot.on("error", (err) => {
    console.error("❌ Bot error:", err.message);
  });
}

startBot();
