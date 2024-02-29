const { App } = require("@slack/bolt");
const store = require("./store");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const b4310 = ["あああ", "いいい", "ううう", "えええ", "おおお"];
const m1310 = ["かかか", "ききき", "くくく", "けけけ", "こここ"];

//メッセージが投稿された時に呼ばれるメソッド
app.message(async ({ message, say }) => {
  var b4;
  var m1;
  //依頼判定
  if (message.text.includes("abc")) {
    await say(message.text);
    const numbers = message.match(/\d+/g); //部屋の取得
    if (numbers) {
      const result = numbers.join(", ");
    }
    await say(room);
    if (room == 310) {
      var randomIndex = Math.floor(Math.random() * b4310.length);
      b4 = b4310[randomIndex];
      randomIndex = Math.floor(Math.random() * m1310.length);
      m1 = m1310[randomIndex];
    }
    await say(`Hey there <@${message.user}>!`);
  }
});
//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
