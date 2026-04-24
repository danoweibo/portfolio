# TODO — Live Chat via Telegram

## What needs to be built

I will be working on the live chat interface later by connecting it to a Telegram API so that I will be able to live chat from Telegram to the user if they are active.

---

## File to edit

**`chat.tsx`** is the only file that needs to change.
Everything else in the navbar system (modals, dropdown, mobile menu) remains untouched.

---

## Rough implementation plan

1. **Telegram Bot setup**
   - Create a bot via [@BotFather](https://t.me/BotFather) and obtain a bot token
   - The operator (you) will receive and reply to messages through the Telegram app or desktop client

2. **Backend / relay layer**
   - Set up a lightweight server (e.g. Next.js Route Handler or a small Node service) that:
     - Accepts incoming messages from the browser via WebSocket or polling
     - Forwards them to the Telegram Bot API (`sendMessage` to your chat ID)
     - Receives your replies via a Telegram webhook and pushes them back to the browser

3. **`chat.tsx`**
   - Replace the centred placeholder with a real chat UI:
     - Message thread display (visitor messages + operator replies)
     - Text input + send button
     - Connection status indicator (online / away / offline)
     - Optional: typing indicator, read receipts

4. **Presence / availability**
   - Show the widget only (or show an "operator online" badge) when you are
     actively available in Telegram, so visitors aren't left waiting

# TODO — Integrate phoneng package

- Implement `phoneng` for parsing the phone number in the **Let's Connect** dropdown option.

  **Reasons:**
  1.  If international clients want to reach me, the app can detect their region and generate the correct format.
      - `NG` clients → `081...`
      - International clients → `+234...`

  2.  Useful opportunity to test the library for potential future use cases.
