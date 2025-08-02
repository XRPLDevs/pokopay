import OpenAI from 'openai';
import fs from 'fs';

// 設定
const CONFIG = {
  maxLength: parseInt(process.env.MAX_TWEET_LENGTH) || 150,
  model: process.env.OPENAI_MODEL || 'gpt-4',
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 300,
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
  botPrefix: process.env.BOT_PREFIX || '【#PokoPay 進捗Bot】',
  requiredHashtags: process.env.REQUIRED_HASHTAGS || '#BuildInPublic #Shipaton'
};

// コミットデータを解析
const commitData = JSON.parse(process.env.COMMIT_DATA || '{}');

// OpenAI クライアント初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// プロンプト生成
function generatePrompt(commitData) {
  return `
PokoPayはXRPLベースの決済プラットフォームです。以下のコミット情報を基に、魅力的でエンゲージメントの高いX（Twitter）投稿を作成してください。

投稿の最初の行は必ず${CONFIG.botPrefix}としてください。

コミット情報:
- メッセージ: ${commitData.message}
- コミットURL: ${commitData.commitUrl}
- 新機能: ${commitData.features || 'なし'}
- 修正: ${commitData.fixes || 'なし'}
- 改善: ${commitData.improvements || 'なし'}
- 破壊的変更: ${commitData.breaking || 'なし'}

要件:
1. 投稿テンプレートの構成を厳守してください。
2. あなたはこのコミットを行った開発者です。
3. このコミット内容をもとに、開発者の視点からどのような開発を行ったのかをツイートを作成してください。
4. 日本語で親しみやすい口調
5. 適度に絵文字を使用してください。
6. 技術的な内容を一般ユーザーにも分かりやすく
6. コミットURLを含める（🔗 詳細: の後にURLを配置）
7. タイトルの下には必ず空行を入れてください。
8. メインコンテンツの下には必ず空行を入れてください。
9. URLの下には必ず空行を入れてください。
10. 改行は\\nではなく、実際の改行として出力してください

禁止事項:
- ${CONFIG.maxLength}文字以内で作成してください。
- ハッシュタグ: ${CONFIG.requiredHashtags} 以外は使用しないでください。
- 短縮URLの使用は禁止

重要: ${CONFIG.maxLength}文字制限は絶対に守ってください。必ず改行を使用して読みやすくしてください。

投稿テンプレート:
${CONFIG.botPrefix}

[メインコンテンツ]

🔗 詳細: ${commitData.commitUrl}

${CONFIG.requiredHashtags}
`;
}

// フォールバックツイート生成
function generateFallbackTweet(commitData) {
  // カテゴリ別の情報を構築
  let categoryInfo = '';
  
  // 新機能・機能追加
  if (commitData.features && commitData.features.trim()) {
    categoryInfo += `✨ 新機能: ${commitData.features}\n`;
  }
  
  // バグ修正
  if (commitData.fixes && commitData.fixes.trim()) {
    categoryInfo += `🐛 修正: ${commitData.fixes}\n`;
  }
  
  // 改善・リファクタリング
  if (commitData.improvements && commitData.improvements.trim()) {
    categoryInfo += `♻️ 改善: ${commitData.improvements}\n`;
  }
  
  // 破壊的変更
  if (commitData.breaking && commitData.breaking.trim()) {
    categoryInfo += `💥 破壊的変更: ${commitData.breaking}\n`;
  }
  
  // カテゴリ情報がない場合は基本メッセージ
  if (!categoryInfo) {
    categoryInfo = `📝 ${commitData.message}`;
  }

  // フォールバックツイート
  const fallbackTweet = `${CONFIG.botPrefix}\n\n🎉引き続き、PokoPay mainブランチに新しい変更がマージされました！🚀さらに明瞭でわかりやすいツイート生成ロジックを磨きました！😃\n\n${categoryInfo}\n\n🔗 詳細: ${commitData.commitUrl}\n\n${CONFIG.requiredHashtags}`;

  return fallbackTweet.trim();
}

// メイン処理
async function generateTweet() {
  try {
    console.log('🤖 Generating AI-powered tweet...');
    
    const completion = await openai.chat.completions.create({
      model: CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `あなたはPokoPayの開発チームの一員で、技術的な進歩を魅力的に発信する専門家です。必ず${CONFIG.maxLength}文字以内で投稿を作成してください。🔗 詳細: の後はURLのみとし、絶対にメッセージや説明を追加しないでください。`
        },
        {
          role: 'user',
          content: generatePrompt(commitData)
        }
      ],
      max_tokens: CONFIG.maxTokens,
      temperature: CONFIG.temperature
    });

    const tweetContent = completion.choices[0].message.content.trim();
    
    console.log('📝 Original AI content:', tweetContent);
    console.log('📊 Original length:', tweetContent.length);

    // 文字列を安全に処理
    const safeTweetContent = tweetContent
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n\s*\n/g, '\n\n')  // 連続改行を適切に処理
      .replace(/\n{3,}/g, '\n\n')   // 3つ以上の改行を2つに統一
      .trim();
    
    // タイトルの下に空行を確実に入れる
    const processedContent = safeTweetContent.replace(
      new RegExp(`^${CONFIG.botPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`),
      `${CONFIG.botPrefix}\n`
    );
    
    // ハッシュタグを一番下に移動し、前に空行を追加
    const finalContent = processedContent
      .replace(new RegExp(`\\s*${CONFIG.requiredHashtags.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g'), '') // 既存のハッシュタグを削除
      .replace(/\n+$/, '') // 末尾の改行を削除
      + `\n\n${CONFIG.requiredHashtags}`; // ハッシュタグを一番下に追加
    
    // \nを実際の改行に変換
    const cleanContent = finalContent.replace(/\\n/g, '\n');
    
    console.log('📝 Processed AI content:', cleanContent);
    console.log('📊 Processed length:', cleanContent.length);
    
    // 改行が含まれているかチェック
    if (!cleanContent.includes('\n')) {
      console.log('⚠️ No line breaks detected, using fallback...');
      throw new Error('No line breaks in AI tweet');
    }

    // GitHub Actionsの出力に設定
    const outputContent = `tweet_content<<EOF\n${cleanContent}\nEOF\n`;
    fs.appendFileSync(process.env.GITHUB_OUTPUT, outputContent);
    console.log('✅ Successfully wrote to GITHUB_OUTPUT');

  } catch (error) {
    console.error('❌ OpenAI API Error:', error);
    console.log('🔄 Using fallback tweet...');

    const fallbackTweet = generateFallbackTweet(commitData);
    console.log('📝 Fallback tweet:', fallbackTweet);
    console.log('📊 Fallback length:', fallbackTweet.length);

    fs.appendFileSync(process.env.GITHUB_OUTPUT, `tweet_content<<EOF\n${fallbackTweet}\nEOF\n`);
  }
}

generateTweet(); 