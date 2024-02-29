const { App } = require("@slack/bolt");
const store = require("./store");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const b4306 = ["あああ", "いいい", "ううう", "えええ", "おおお"];
const m1306 = ["かかか", "ききき", "くくく", "けけけ", "こここ"];
const b4310 = ["さささ", "ししし", "すすす"];
const m1310 = ["たたた", "ちちち", "つつつ", "ててて"];
const b4315 = ["ななな", "ににに"];
const m1315 = ["ははは", "ひひひ", "ふふふ", "へへへ", "ほほほ"];

//メッセージが投稿された時に呼ばれるメソッド
app.message(async ({ message, say }) => {
  var b4;
  var m1;
  const numberRegex = /\d+/g;
  //依頼判定
  if (message.text.includes("abc")) {
    const numbers = message.text.match(numberRegex); //部屋の取得
    if (numbers) {
      const room = numbers.join(", ");
      if (room == 306) {
        var randomIndex = Math.floor(Math.random() * b4306.length);
        b4 = b4306[randomIndex];
        randomIndex = Math.floor(Math.random() * m1306.length);
        m1 = m1306[randomIndex];
      }
      else if (room == 310) {
        var randomIndex = Math.floor(Math.random() * b4310.length);
        b4 = b4310[randomIndex];
        randomIndex = Math.floor(Math.random() * m1310.length);
        m1 = m1310[randomIndex];
      }
      else if (room == 315) {
        var randomIndex = Math.floor(Math.random() * b4315.length);
        b4 = b4315[randomIndex];
        randomIndex = Math.floor(Math.random() * m1315.length);
        m1 = m1315[randomIndex];
      }
      await say(`${b4}, ${m1}`);
    }
  }
});
//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
