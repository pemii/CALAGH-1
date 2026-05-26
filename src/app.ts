import express from "express";
import { config } from "./config";
import { telegramBot } from "./telegram/telegram.bot";

const app = express();

app.use(express.json());

const telegramWebhookPath = `/telegram/webhook/${config.telegram.webhookSecret}`;
const telegramWebhookUrl = `${config.telegram.publicUrl}${telegramWebhookPath}`;

app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "Kalagh Bot API",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "telegram-api",
    time: new Date().toISOString()
  });
});

app.use(telegramWebhookPath, telegramBot.webhookCallback(telegramWebhookPath));

async function bootstrap() {
  try {
    await telegramBot.telegram.setWebhook(telegramWebhookUrl, {
      drop_pending_updates: true
    });

    console.log("Telegram webhook set successfully:");
    console.log(telegramWebhookUrl);

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Bootstrap error:", error);
    process.exit(1);
  }
}

bootstrap();
