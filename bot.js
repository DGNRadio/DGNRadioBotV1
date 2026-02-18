const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');

// Load environment variables
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

if (!BOT_TOKEN) {
    console.error('BOT_TOKEN is missing! Please set it in your environment variables.');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Bot Commands
bot.command('start', (ctx) => {
    ctx.reply('Welcome to DGNRadio! Type /play to start the vibe.');
});

bot.command('play', (ctx) => {
    const webAppUrl = `${RENDER_EXTERNAL_URL}`;
    ctx.reply(
        'I can stream DGNRadio in Telegram groups. Use the controls below or type /play to start the vibe.',
        Markup.inlineKeyboard([
            Markup.button.webApp('Listen Now', webAppUrl)
        ])
    );
});

// Launch Bot
if (process.env.NODE_ENV === 'production' && process.env.RENDER_EXTERNAL_URL) {
    // Production: Use Webhooks
    const webhookPath = `/bot${BOT_TOKEN}`;
    app.use(bot.webhookCallback(webhookPath));
    bot.telegram.setWebhook(`${RENDER_EXTERNAL_URL}${webhookPath}`);
    console.log(`Bot running in production mode with webhook at ${RENDER_EXTERNAL_URL}${webhookPath}`);
} else {
    // Development: Use Polling
    bot.launch();
    console.log('Bot running in development mode (polling)');
}

// Start Express Server
app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
