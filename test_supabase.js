// testSupabase.js
const supabase = require('./supabaseClient');

(async () => {
  const { data, error } = await supabase
    .from('arrayData')
    .select('*')  // ← '*' にしてすべて確認
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    console.error('❌ 取得エラー:', error.message);
  } else if (data.length === 0) {
    console.log('⚠️ データは空です');
  } else {
    console.log('✅ 最新データ:', data[0]); // .data はつけない
  }
})();
