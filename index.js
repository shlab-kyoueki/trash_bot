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
  const fs = require('fs');
  const filePath = 'arrayData.json';
  const data = fs.readFileSync(filePath, 'utf8');
  const arrayFromFile = JSON.parse(data);
  var b4;
  var m1;
  const numberRegex = /\d+/g;
  //依頼判定
  if (message.text.includes("abc")) {
    const numbers = message.text.match(numberRegex); //部屋の取得
    if (numbers) {
      const room = numbers.join(", ");
      //b4,m1選定（ランダムに取得)
      if (room == 306) {
        var randomIndex = Math.floor(Math.random() * arrayFromFile.b4306.length);
        b4 = arrayFromFile.b4306[randomIndex];
        arrayFromFile.b4306.splice(randomIndex, 1);
        if(arrayFromFile.b4306.length==0){
          arrayFromFile.b4306=b4306;
        }
        randomIndex = Math.floor(Math.random() * arrayFromFile.m1306.length);
        m1 = arrayFromFile.m1306[randomIndex];
        arrayFromFile.m1306.splice(randomIndex, 1);
        if(arrayFromFile.m1306.length==0){
          arrayFromFile.m1306=m1306;
        }
      }
      else if (room == 310) {
        var randomIndex = Math.floor(Math.random() * arrayFromFile.b4310.length);
        b4 = arrayFromFile.b4310[randomIndex];
        arrayFromFile.b4310.splice(randomIndex, 1);
        if(arrayFromFile.b4310.length==0){
          arrayFromFile.b4310=b4310;
        }
        randomIndex = Math.floor(Math.random() * arrayFromFile.m1310.length);
        m1 = arrayFromFile.m1310[randomIndex];
        arrayFromFile.m1310.splice(randomIndex, 1);
        if(arrayFromFile.m1310.length==0){
          arrayFromFile.m1310=m1310;
        }
      }
      else if (room == 315) {
        var randomIndex = Math.floor(Math.random() * arrayFromFile.b4315.length);
        b4 = arrayFromFile.b4315[randomIndex];
        arrayFromFile.b4315.splice(randomIndex, 1);
        if(arrayFromFile.b4315.length==0){
          arrayFromFile.b4315=b4315;
        }
        randomIndex = Math.floor(Math.random() * arrayFromFile.m1315.length);
        m1 = arrayFromFile.m1315[randomIndex];
        arrayFromFile.m1315.splice(randomIndex, 1);
        if(arrayFromFile.m1315.length==0){
          arrayFromFile.m1315=m1315;
        }
      }
      fs.writeFileSync(filePath, JSON.stringify(arrayFromFile));
      await say(`${b4}, ${m1}`);
    }
  }
});
//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
