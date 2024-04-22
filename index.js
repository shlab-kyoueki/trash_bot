const { App } = require("@slack/bolt");
const store = require("./store");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// const b4306 = ["あああ", "いいい", "ううう", "えええ", "おおお"];
// const m1306 = ["かかか", "ききき", "くくく", "けけけ", "こここ"];
// const b4310 = ["さささ", "ししし", "すすす"];
// const m1310 = ["たたた", "ちちち", "つつつ", "ててて"];
// const b4315 = ["ななな", "ににに"];
// const m1315 = ["ははは", "ひひひ", "ふふふ", "へへへ", "ほほほ"];
const b4_def=["上池 陽汰","久野 翔也","住本 圭","関 隆斗", "中島 魁人", "大野 伶将", "豊島 光太", "前田 篤志", "森中 誠也", "山下 理子", "松山 僚太"];
const m1_def=["宇都宮 優巳","王 若泰","川上 拓真","永井 寿弥", "名執 凌磨", "定 良祐", "前河 有紀", "森田 光陽", "安田 隆一"];

//メッセージが投稿された時に呼ばれるメソッド
app.message(async ({ message, say }) => {
  const fs = require('fs');
  const filePath = 'arrayData_rev.json';
  const data = fs.readFileSync(filePath, 'utf8');
  const arrayFromFile = JSON.parse(data);
  var b4;
  var m1;
  const numberRegex = /\d+/g;
  //依頼判定
  if (message.text.includes("ゴミ出し")) {
    const numbers = message.text.match(numberRegex); //部屋の取得ではなく人数の取得M1ー＞B4
    // var b4s=[];
    // var m1s=[];
    //b4,m1選定（ランダムに取得)
    // if (numbers) {
      // const room = numbers.join(", ");
    // await say(`${numbers[1]},  ${numbers[0]}`)
    // for(let i=0;i<numbers[0]; i++){
        randomIndex = Math.floor(Math.random() * arrayFromFile.m1.length);
        m1 = arrayFromFile.m1[randomIndex];
        arrayFromFile.m1.splice(randomIndex, 1);
        if(arrayFromFile.m1.length==0){
          arrayFromFile.m1=m1_def;
        }
      // m1s.push(m1)
    // }
    // for(let i=0; i< numbers[1];i++){
      var randomIndex = Math.floor(Math.random() * arrayFromFile.b4.length);
        b4 = arrayFromFile.b4[randomIndex];
        arrayFromFile.b4.splice(randomIndex, 1);
        if(arrayFromFile.b4.length==0){
          arrayFromFile.b4=b4_def;
        }
      // b4s.push(b4)
    // }
      // if (room == 306) {
      //   var randomIndex = Math.floor(Math.random() * arrayFromFile.b4306.length);
      //   b4 = arrayFromFile.b4306[randomIndex];
      //   arrayFromFile.b4306.splice(randomIndex, 1);
      //   if(arrayFromFile.b4306.length==0){
      //     arrayFromFile.b4306=b4306;
      //   }
      //   randomIndex = Math.floor(Math.random() * arrayFromFile.m1306.length);
      //   m1 = arrayFromFile.m1306[randomIndex];
      //   arrayFromFile.m1306.splice(randomIndex, 1);
      //   if(arrayFromFile.m1306.length==0){
      //     arrayFromFile.m1306=m1306;
      //   }
      // }
      // else if (room == 310) {
      //   var randomIndex = Math.floor(Math.random() * arrayFromFile.b4310.length);
      //   b4 = arrayFromFile.b4310[randomIndex];
      //   arrayFromFile.b4310.splice(randomIndex, 1);
      //   if(arrayFromFile.b4310.length==0){
      //     arrayFromFile.b4310=b4310;
      //   }
      //   randomIndex = Math.floor(Math.random() * arrayFromFile.m1310.length);
      //   m1 = arrayFromFile.m1310[randomIndex];
      //   arrayFromFile.m1310.splice(randomIndex, 1);
      //   if(arrayFromFile.m1310.length==0){
      //     arrayFromFile.m1310=m1310;
      //   }
      // }
      // else if (room == 315) {
      //   var randomIndex = Math.floor(Math.random() * arrayFromFile.b4315.length);
      //   b4 = arrayFromFile.b4315[randomIndex];
      //   arrayFromFile.b4315.splice(randomIndex, 1);
      //   if(arrayFromFile.b4315.length==0){
      //     arrayFromFile.b4315=b4315;
      //   }
      //   randomIndex = Math.floor(Math.random() * arrayFromFile.m1315.length);
      //   m1 = arrayFromFile.m1315[randomIndex];
      //   arrayFromFile.m1315.splice(randomIndex, 1);
      //   if(arrayFromFile.m1315.length==0){
      //     arrayFromFile.m1315=m1315;
      //   }
      // }
      fs.writeFileSync(filePath, JSON.stringify(arrayFromFile));
      await say(`${m1}, ${b4}`);
    // }
  }
  // else if(message.text.includes("reset")){
  //   arrayFromFile.b4306=b4306;
  //   arrayFromFile.m1306=m1306;
  //   arrayFromFile.b4310=b4310;
  //   arrayFromFile.m1310=m1310;
  //   arrayFromFile.b4315=b4315;
  //   arrayFromFile.m1315=m1315;
  //   await say(`ok`);
  // }
  else if(message.text.includes("reset")){
    arrayFromFile.b4=b4_def;
    arrayFromFile.m1=m1_def;
    await say(`ok`);
  }
});
//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
