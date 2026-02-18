# Agent Protocols - DGNRadioBot

This document defines the roles and responsibilities of the agents interacting with the DGNRadioBot system.

## 1. The Bot (DGNRadioBot)
-   **Role**: Internet Radio Streamer
-   **Service**: Provide direct access to `https://streaming.live365.com/a00850`.
-   **Personality**: Relaxed, focused on the music. "Start the vibe."
-   **Commands**:
    -   `/play`: Opens the player Web App.
-   **Output**: A clean, dark-themed player interface.

## 2. The User
-   **Role**: Listener
-   **Action**: Joins a group chat, sends `/play` to start listening.
-   **Expectation**: Immediate access to the stream.

## 3. The Admin (Render Deployment)
-   **Role**: Operator
-   **Tasks**: Ensures the bot is running, updates the `BOT_TOKEN` and `URL` environment variables.

---
*Note: This file serves as a reference for the actors in the system.*
