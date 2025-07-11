// db.js
const supabase = require('./supabaseClient');

// 保存処理
// async function saveArrayData(arrayData) {
//   const { error } = await supabase
//     .from('arrayData')
//     .insert([{ data: arrayData }]);

//   if (error) console.error('保存エラー:', error);
// }

async function saveArrayData(arrayData) {
  const { data, error } = await supabase
    .from('arrayData')
    .upsert(
      { id: 1, data: arrayData }, // id=1を固定キーにする
      { onConflict: 'id' }        // idで重複したら上書き
    );

  if (error) console.error('保存エラー:', error);
  else console.log('✅ 保存成功:', data);
}

// 取得処理
async function getLatestArrayData() {
  const { data, error } = await supabase
    .from('arrayData')
    .select('data')
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    console.error('取得エラー:', error);
    return null;
  }

  return data[0]?.data || null;
}

module.exports = { saveArrayData, getLatestArrayData };
