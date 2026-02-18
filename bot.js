const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');

// Load environment variables
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;

if (!BOT_TOKEN) {
    console.error('BOT_TOKEN is missing! Please set it in your environment variables.');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Debug middleware — logs every incoming update
bot.use((ctx, next) => {
    console.log('Received update:', JSON.stringify(ctx.update, null, 2));
    return next();
});

// Bot Commands
bot.command('start', (ctx) => {
    ctx.reply('Welcome to DGNRadio! Type /play to start the vibe.');
});

bot.command('play', (ctx) => {
    const webAppUrl = RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    console.log(`Sending WebApp URL: ${webAppUrl}`);
    ctx.reply(
        'I can stream DGNRadio in Telegram groups. Use the controls below or type /play to start the vibe.',
        Markup.inlineKeyboard([
            Markup.button.webApp('Listen Now', webAppUrl)
        ])
    );
});

// Launch Bot
if (RENDER_EXTERNAL_URL) {
    // Production: Use Webhooks
    const webhookPath = `/bot${BOT_TOKEN}`;
    const webhookUrl = `${RENDER_EXTERNAL_URL}${webhookPath}`;

    // Mount webhook BEFORE static files
    app.use(bot.webhookCallback(webhookPath));
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    bot.telegram.setWebhook(webhookUrl, {
        allowed_updates: ['message', 'callback_query', 'inline_query']
    }).then(() => {
        console.log(`Webhook set to: ${webhookUrl}`);
    });

    bot.telegram.getMe().then((me) => {
        console.log(`Bot running in production mode as @${me.username}`);
    });
} else {
    // Development: Use Polling
    app.use(express.static(path.join(__dirname, 'public')));
    bot.launch({
        allowedUpdates: ['message', 'callback_query', 'inline_query']
    });
    console.log('Bot running in development mode (polling)');
}

// Start Express Server
app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
