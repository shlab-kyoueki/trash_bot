const { App } = require("@slack/bolt");
const store = require("./store");
// const AWS = require('aws-sdk');
// const lambda = new AWS.Lambda({ region: 'ap-northeast-1' });
const slackToken = process.env.SLACK_TOKEN

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// supabase
const { getLatestArrayData, saveArrayData } = require('./db');

//元データ　jsonファイルに人がいなくなったら更新する用
//実際に指名するのはjsonファイルから選ぶ
const b4_def=["岩瀬 真太郎","宇和田 康太","清林 義生","濱田 幸汰", "早川 奏雅", "飯田 廉澄", "池中 俊介", "清住 尚平", "橋爪 淳", "松永 匡史"];
const m1_def=["石井 祐助","久野 翔也","住本 圭","関 隆斗", "中島 魁人", "大野 伶将", "豊島 光太", "前田 篤志", "森中 誠也", "山下 理子"];

//メッセージが投稿された時に呼ばれるメソッド
app.message(async ({ message, say }) => {
  const fs = require('fs');
  // const filePath = 'arrayData_rev.json';
  // const data = fs.readFileSync(filePath, 'utf8');
  // const arrayFromFile = JSON.parse(data);
  // 2025.07.11 update
  let arrayFromSupabase = await getLatestArrayData()
  var b4;
  var m1;
  var date = new Date().getTime()/1000.0;
  var fd = fs.openSync("log.txt", "a");
  console.log(`received message @ ${date} (message.ts = ${message.ts})`);
  fs.writeSync(fd, `received message @ ${date} (message.ts = ${message.ts})\n`);
  //依頼判定
  // if (message.text.includes("ゴミ出しお願いします") && message.ts != arrayFromFile.ts) {
  if (message.text.includes("ゴミ出しお願いします") && message.ts != arrayFromSupabase.ts) {   
      // arrayFromFile.ts = message.ts;  //処理が遅いとslackからメッセージが再送され、1メッセージに対して複数回処理が行われるため、その予防策
      arrayFromSupabase.ts = message.ts;
      // fs.writeFileSync(filePath, JSON.stringify(arrayFromFile));
      date = new Date().getTime()/1000.0;
      console.log(`processing @ ${date} (message.ts = ${message.ts})`);
      fs.writeSync(fd, `processing @ ${date} (message.ts = ${message.ts})\n`);
      // //m1指名
      // randomIndex = Math.floor(Math.random() * arrayFromFile.m1.length);
      // m1 = arrayFromFile.m1[randomIndex];  //指名する人を求める
      // arrayFromFile.m1.splice(randomIndex, 1);  //指名した分削る
      // if(arrayFromFile.m1.length==0){  //いなくなったら補充
      //  arrayFromFile.m1=m1_def;
      // }
      // // 2025.07.11 update
      if (arrayFromSupabase.m1.length === 0) {
        arrayFromSupabase.m1 = [...m1_def];
      }
      var randomIndex = Math.floor(Math.random() * arrayFromSupabase.m1.length);
      m1 = arrayFromSupabase.m1[randomIndex];  //指名する人を求める
      arrayFromSupabase.m1.splice(randomIndex, 1);
      // //b4指名
      // var randomIndex = Math.floor(Math.random() * arrayFromFile.b4.length);
      // b4 = arrayFromFile.b4[randomIndex];  //指名する人を求める
      // arrayFromFile.b4.splice(randomIndex, 1);  //指名した分削る
      // if(arrayFromFile.b4.length==0){  //いなくなったら補充
      //   arrayFromFile.b4=b4_def;
      // }
      // 2025.07.11 update
      if (arrayFromSupabase.b4.length === 0) {
        arrayFromSupabase.b4 = [...b4_def];
      }
      var randomIndex = Math.floor(Math.random() * arrayFromSupabase.b4.length);
      b4 = arrayFromSupabase.b4[randomIndex];  //指名する人を求める
      arrayFromSupabase.b4.splice(randomIndex, 1);
      // fs.writeFileSync(filePath, JSON.stringify(arrayFromFile));
      await saveArrayData(arrayFromSupabase);
      await say(`<!channel>\n ${m1}さん, ${b4}さん　お願いします`);
  }
  var date = new Date().getTime()/1000.0;
  console.log(`finished @ ${date} (message.ts = ${message.ts})`);
  fs.writeSync(fd, `finished @ ${date} (message.ts = ${message.ts})\n\n`);
  fs.closeSync(fd);
  // else if(message.text.includes("reset")){
  //   arrayFromFile.b4=b4_def;
  //   arrayFromFile.m1=m1_def;
  //   await say(`ok`);
  // }
});

//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
