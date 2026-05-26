import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }

  return value;
}

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),

  telegram: {
    botToken: required("TELEGRAM_BOT_TOKEN"),
    publicUrl: required("PUBLIC_URL"),
    webhookSecret: required("TELEGRAM_WEBHOOK_SECRET")
  }
};
