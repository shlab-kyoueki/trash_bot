const { App } = require("@slack/bolt");
const store = require("./store");
// const AWS = require('aws-sdk');
// const lambda = new AWS.Lambda({ region: 'ap-northeast-1' });
const slackToken = process.env.SLACK_TOKEN

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

//実際に指名するのはjsonファイルから選ぶ
const b4_def=["上池 陽汰","久野 翔也","住本 圭","関 隆斗", "中島 魁人", "大野 伶将", "豊島 光太", "前田 篤志", "森中 誠也", "山下 理子"];
const m1_def=["宇都宮 優巳","王 若泰","川上 拓真","永井 寿弥", "名執 凌磨", "定 良祐", "前河 有紀", "森田 光陽", "安田 隆一", "松山 僚太", "Cai Biesinger", "Wang Yuhao"];

//メッセージが投稿された時に呼ばれるメソッド
app.message(async ({ message, say }) => {
  const fs = require('fs');
  const filePath = 'arrayData_rev.json';
  const data = fs.readFileSync(filePath, 'utf8');
  const arrayFromFile = JSON.parse(data);
  var b4;
  var m1;
  var date = new Date().getTime()/1000.0;
  // await say(`${date},${message.ts}`)
  // const numberRegex = /\d+/g;
  var fd = fs.openSync("log.txt", "a");
  console.log(`received message @ ${date} (message.ts = ${message.ts})`)
  fs.writeSync(fd, `received message @ ${date} (message.ts = ${message.ts})\n`);
  //依頼判定
  if (message.text.includes("ゴミ出しお願いします") && message.ts != arrayFromFile.ts) {　//&& (message.ts　> date) && message.headers['X-Slack-Retry-Num']==0
      arrayFromFile.ts = message.ts;
      fs.writeFile(filePath, JSON.stringify(arrayFromFile));
      var date = new Date().getTime()/1000.0;
      console.log(`processing @ ${date} (message.ts = ${message.ts})`);
      fs.writeSync(fd, `processing @ ${date} (message.ts = ${message.ts})\n`);
      randomIndex = Math.floor(Math.random() * arrayFromFile.m1.length);
      m1 = arrayFromFile.m1[randomIndex];  //指名する人を求める
      arrayFromFile.m1.splice(randomIndex, 1);  //指名した分削る
      if(arrayFromFile.m1.length==0){  //いなくなったら補充
        arrayFromFile.m1=m1_def;
      }
      var randomIndex = Math.floor(Math.random() * arrayFromFile.b4.length);
      b4 = arrayFromFile.b4[randomIndex];  //指名する人を求める
      arrayFromFile.b4.splice(randomIndex, 1);  //指名した分削る
      if(arrayFromFile.b4.length==0){  //いなくなったら補充
        arrayFromFile.b4=b4_def;
      }
      fs.writeFileSync(filePath, JSON.stringify(arrayFromFile));
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

//eventAPIを使用

// exports.index = async (event, context) => {
//   const body = JSON.parse(event.body);
//   await context.postMessage(`OK`);
//   if (!(body.token === slackToken)) return {"statusCode": 401, "body": "Missing Token"}
//   // 再送かをチェック
//   if (event.headers['X-Slack-Retry-Num']) {
//     return { statusCode: 200, body: JSON.stringify({ message: "No need to resend" }) };
//   }

//   // メインの処理
//   const fs = require('fs');
//   const filePath = 'arrayData_rev.json';
//   const data = fs.readFileSync(filePath, 'utf8');
//   const arrayFromFile = JSON.parse(data);
//   var b4;
//   var m1;
//   // var date = new Date().getTime()/1000.0 -1.0;
//   // await say(`${date},${message.ts}`)
//   // const numberRegex = /\d+/g;
//   //依頼判定
//   await context.postMessage(`OK`);
//   if (event.text.includes("ゴミ出しお願いします")) {　//&& (message.ts　> date)
//       randomIndex = Math.floor(Math.random() * arrayFromFile.m1.length);
//       m1 = arrayFromFile.m1[randomIndex];  //指名する人を求める
//       arrayFromFile.m1.splice(randomIndex, 1);  //指名した分削る
//       if(arrayFromFile.m1.length==0){  //いなくなったら補充
//         arrayFromFile.m1=m1_def;
//       }
//       var randomIndex = Math.floor(Math.random() * arrayFromFile.b4.length);
//       b4 = arrayFromFile.b4[randomIndex];  //指名する人を求める
//       arrayFromFile.b4.splice(randomIndex, 1);  //指名した分削る
//       if(arrayFromFile.b4.length==0){  //いなくなったら補充
//         arrayFromFile.b4=b4_def;
//       }
//       fs.writeFileSync(filePath, JSON.stringify(arrayFromFile));
//       await context.postMessage(`<!channel>\n ${m1}さん, ${b4}さん　お願いします`);
//   }
  // else if(message.text.includes("reset")){
  //   arrayFromFile.b4=b4_def;
  //   arrayFromFile.m1=m1_def;
  //   await say(`ok`);
  // }
// }