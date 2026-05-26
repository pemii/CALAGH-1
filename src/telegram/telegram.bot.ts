import { Telegraf, Markup } from "telegraf";
import { config } from "../config";

export const telegramBot = new Telegraf(config.telegram.botToken);

telegramBot.start(async (ctx) => {
  const firstName = ctx.from?.first_name || "کاربر عزیز";

  await ctx.reply(
    `سلام ${firstName} 👋

به ربات چت ناشناس کلاغ خوش آمدی.

فعلاً نسخه تست تلگرام فعال شده است.

برای ادامه یکی از گزینه‌ها را انتخاب کن:`,
    Markup.keyboard([
      ["چت با ناشناس"],
      ["پروفایل من", "موجودی من"],
      ["راهنما"]
    ])
      .resize()
      .oneTime(false)
  );
});

telegramBot.hears("راهنما", async (ctx) => {
  await ctx.reply(
    `راهنمای نسخه تست:

/start شروع ربات

فعلاً فقط اتصال تلگرام به سرور Render تست می‌شود.
در مرحله بعد ثبت‌نام و دیتابیس اضافه می‌شود.`
  );
});

telegramBot.hears("چت با ناشناس", async (ctx) => {
  await ctx.reply("بخش چت ناشناس هنوز در حال توسعه است.");
});

telegramBot.hears("پروفایل من", async (ctx) => {
  const user = ctx.from;

  await ctx.reply(
    `پروفایل تستی شما:

آیدی تلگرام: ${user?.id}
نام: ${user?.first_name || "-"}
یوزرنیم: ${user?.username ? "@" + user.username : "-"}`
  );
});

telegramBot.hears("موجودی من", async (ctx) => {
  await ctx.reply(
    `موجودی تستی شما:

سکه: 0
الماس: 0
توکن: 0
امتیاز: 0`
  );
});

telegramBot.on("text", async (ctx) => {
  await ctx.reply("پیام شما دریافت شد ✅");
});

telegramBot.catch((err, ctx) => {
  console.error("Telegram bot error:", err);
  console.error("Update:", ctx.update);
});
