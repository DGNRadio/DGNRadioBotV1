# DGNRadioBot

A simple Telegram bot that streams DGNRadio directly in group chats using a Telegram Web App.

![DGNRadioBot Preview](https://via.placeholder.com/800x400?text=DGNRadioBot+UI+Preview)

## Features

-   **`/play` Command**: Instantly opens the DGNRadio player.
-   **Web App Integration**: Seamless in-app streaming experience.
-   **Simple UI**: Clean, dark-themed player focused on the music.
-   **Deployment Ready**: Configured for easy deployment on Render.

## Prerequisites

-   Time to Vibe
-   Node.js (v18+)
-   Telegram Account (to create bot via @BotFather)
-   Render Account (for hosting)

## Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/dgnradiobot.git
    cd dgnradiobot
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    BOT_TOKEN=your_telegram_bot_token_here
    PORT=3000
    RENDER_EXTERNAL_URL=https://your-app-name.onrender.com
    ```

4.  **Run the Bot**:
    ```bash
    npm start
    ```

5.  **Access the Player**:
    -   Open `http://localhost:3000` to view the player UI.
    -   To test the bot locally, use `ngrok` or similar to expose port 3000 and update your Web App URL in @BotFather.

## Deployment on Render

1.  Create a new **Web Service** on Render connected to this repository.
2.  Set the **Environment Variables**:
    -   `BOT_TOKEN`: Your Telegram Bot API Token.
    -   `RENDER_EXTERNAL_URL`: The URL Render assigns to your service (e.g., `https://dgnradiobot.onrender.com`).
3.  Deploy! The bot will automatically set its webhook and start listening.

## Configuration

-   **Stream URL**: The radio stream is hardcoded to `https://streaming.live365.com/a00850`. To change this, edit `public/index.html`.

## Support

For issues, please open a ticket in the repository or contact the DGNRadio team.
