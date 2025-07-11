// supabaseClient.js

// ① .envファイルから環境変数を読み込む
require('dotenv').config();

// ② Supabaseのクライアントを作成
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ③ 他のファイルでも使えるようにエクスポート
module.exports = supabase;
