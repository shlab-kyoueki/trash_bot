const { App } = require('@slack/bolt');
const store = require('./store');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

const b4310=['あああ','いいい','ううう','えええ','おおお'];
const m1310=['かかか','ききき','くくく','けけけ','こここ'];


//メッセージが投稿された時に呼ばれるメソッド
app.message(async ({ message, say }) => {
  if(message.text.includes("abc")){//依頼判定
    const room=message.match(/\d+/g);//部屋の取得
    if(room==310){
      
    }
    await say(message.text);
  }
});
//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

