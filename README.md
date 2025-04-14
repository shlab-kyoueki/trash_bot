# Slack Bolt - Hello World

Read the tutorial at:
[https://api.slack.com/tutorials/hello-world-bolt](https://api.slack.com/tutorials/hello-world-bolt)

---

This is a simple example App built with [Slack's Bolt Framework](https://slack.dev/bolt-js/tutorial/getting-started) for Node.js.

Our App shows a welcome message when a user opens the "app home".

### Slack API & features used in the app

- The [`app_home_opened`](https://api.slack.com/events/app_home_opened) event gets triggered when a user opens the bot's "app home" for the first time
- The app uses the Bolt's `say` method to send a welcome message to the user

### Requirements

- A Bot User must be added to your App
- Your App must be subscribed to [Events API](https://api.slack.com/events-api)
- Your app needs to be subscribed to the events mentioned in the _Events_ section

### Scopes

- [`chat:write`](https://api.slack.com/scopes/chat:write)

### Events

#### Workspace events

- [`app_home_opened`](https://api.slack.com/events/app_home_opened)

---

---

### 簡易説明

- index.js

  メインプログラム

  「ゴミ出しお願いします」のメッセージに反応してランダムに B4・M1 から各 1 名選出する

- arrayData_rev.json

  データ保存ファイル

- log.txt

  デバッグ用ログ

### 引継ぎ

index.js の b4_def, m1_def を更新

arrayData_rev.json の初期化も必要かもしれない
