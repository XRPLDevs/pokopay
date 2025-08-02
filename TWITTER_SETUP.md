# 🐦 X (Twitter) 自動投稿機能のセットアップ

## 📋 概要

mainブランチへのマージ時に自動的にX（旧Twitter）へ投稿する機能を実装しました。**AI-powered投稿機能**により、より魅力的でエンゲージメントの高い投稿を自動生成します。

## 🚀 セットアップ手順

### 1️⃣ X Developer Portal でのアプリ作成

1. **X Developer Portal** にアクセス
   - https://developer.twitter.com/
   - Xアカウントでログイン

2. **新しいアプリを作成**
   - "Create App" をクリック
   - アプリ名: `PokoPay Auto Tweet`
   - 用途: `Making automated tweets for development updates`

3. **API Keys を取得**
   - `API Key` (Consumer Key)
   - `API Secret` (Consumer Secret)
   - これらをメモしておく

### 2️⃣ Access Token の取得

1. **App permissions の設定**
   - "App permissions" タブで `Read and Write` を選択

2. **Access Token を生成**
   - "Keys and tokens" タブで
   - `Access Token and Secret` を生成
   - `Access Token` と `Access Token Secret` を取得

### 3️⃣ OpenAI API の設定

1. **OpenAI API Key を取得**
   - https://platform.openai.com/api-keys にアクセス
   - 新しいAPI Keyを作成
   - クレジットを追加（GPT-4使用のため）

2. **API Key をメモ**
   - `sk-...` で始まるAPI Keyを保存

### 4️⃣ GitHub Secrets の設定

GitHub リポジトリの設定で以下を追加：

1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** で以下を追加：

| Secret Name | Value |
|-------------|-------|
| `TWITTER_API_KEY` | X Developer Portal の API Key |
| `TWITTER_API_SECRET` | X Developer Portal の API Secret |
| `TWITTER_ACCESS_TOKEN` | 生成した Access Token |
| `TWITTER_ACCESS_SECRET` | 生成した Access Token Secret |
| `OPENAI_API_KEY` | OpenAI API Key (sk-...で始まる) |

### 5️⃣ 動作確認

1. **mainブランチにプッシュ**
   ```bash
   git add .
   git commit -m "✨ Add AI-powered X posting feature"
   git push origin main
   ```

2. **GitHub Actions の確認**
   - GitHub の Actions タブでワークフローの実行状況を確認
   - 成功するとAI生成のツイートがXに投稿される

## 🤖 AI-Powered 投稿機能

### ✨ **AI生成の特徴**

- **魅力的な表現**: 技術的な内容を一般ユーザーにも分かりやすく
- **感情的な要素**: 開発チームの努力を称える内容
- **エンゲージメント向上**: コミュニティへの感謝の気持ちを含める
- **未来への期待感**: 技術的な進歩を喜びの表現で
- **コミュニティ参加**: #BuildInPublic #ShipATon2025 #vibecoding で開発者コミュニティと繋がる
- **未来志向メッセージ**: 投稿の最後にワクワクする未来のメッセージを追加

### 📝 **投稿内容の例**

```
【#PokoPay進捗Bot】

✨ 今回のアップデートでは、決済処理の安定性を大幅に向上させました。
開発チームの皆さんの努力のおかげで、より安全で使いやすいプラットフォームに。

📝 feat: Improve payment processing stability
🔗 https://github.com/your-org/pokopay/commit/abc123

未来の決済体験を一緒に作り上げていきましょう！✨

#BuildInPublic #ShipATon2025 #vibecoding
```

### 🔧 **AI生成のカスタマイズ**

`.github/workflows/tweet-on-merge.yml` の `Generate AI-powered tweet content` ステップで以下を調整可能：

```javascript
// プロンプトのカスタマイズ
const prompt = `
PokoPayはXRPLベースの決済プラットフォームです。
以下のコミット情報を基に、魅力的でエンゲージメントの高いX（Twitter）投稿を作成してください。

要件:
1. 280文字以内
2. 日本語で親しみやすい口調
3. 絵文字を効果的に使用
4. 技術的な内容を一般ユーザーにも分かりやすく
             5. ハッシュタグ: #BuildInPublic #ShipATon2025 #vibecoding
6. コミットURLを含める
7. 開発者の努力を称える内容
8. コミュニティへの感謝の気持ちを含める

ハッシュタグの意味:
- #BuildInPublic: 開発過程を公開してコミュニティと共有
- #ShipATon2025: 2025年の目標達成に向けた継続的な開発
- #vibecoding: 楽しい開発文化とポジティブな雰囲気

未来志向メッセージの例:
- 「未来の決済体験を一緒に作り上げていきましょう！✨」
- 「次世代のFinTechを一緒に創造していきましょう！🚀」
- 「より良い未来を一緒に築いていきましょう！💫」
`;
```

## 🛠️ トラブルシューティング

### よくある問題

1. **OpenAI API認証エラー**
   - OpenAI API Keyが正しいか確認
   - アカウントにクレジットが残っているか確認
   - API制限に達していないか確認

2. **X API認証エラー**
   - X Developer Portal の API Keys が正しいか確認
   - Access Token の権限が `Read and Write` になっているか確認

3. **投稿が失敗する**
   - ツイート内容が280文字を超えていないか確認
   - 特殊文字が含まれていないか確認
   - AI生成が失敗した場合のフォールバック機能が動作するか確認

4. **ワークフローが実行されない**
   - mainブランチへのプッシュか確認
   - GitHub Actions が有効になっているか確認

### ログの確認

GitHub Actions の実行ログで以下を確認：

```bash
# AI生成の確認
console.log('🤖 AI Generated Tweet:');
console.log(tweetContent);

# 投稿結果の確認
console.log('✅ AI-powered tweet posted successfully!');
console.log('Tweet ID:', result.data.id);
```

## 📊 監視と分析

### 投稿統計の確認

1. **X Analytics** で投稿のエンゲージメントを確認
2. **GitHub Actions** の実行履歴で成功率を確認
3. **OpenAI API** の使用量とコストを監視
4. **コミットメッセージ** の品質向上で投稿内容を改善

## 💰 コスト管理

### OpenAI API のコスト

- **GPT-4**: 約$0.03/1K tokens
- **1回の投稿生成**: 約$0.01-0.02
- **月間コスト**: コミット頻度により変動

### コスト最適化

1. **トークン数の制限**: `max_tokens: 300`
2. **温度設定**: `temperature: 0.7` で創造性と一貫性のバランス
3. **フォールバック機能**: API失敗時の基本的な投稿生成

## 🔒 セキュリティ

- API Keys は GitHub Secrets で安全に管理
- 必要最小限の権限のみ付与
- 定期的なキーのローテーションを推奨
- OpenAI API Key の使用量監視

## 📞 サポート

問題が発生した場合は：

1. **GitHub Issues** で報告
2. **X Developer Portal** のドキュメントを確認
3. **OpenAI API** のドキュメントを確認
4. **GitHub Actions** のログを詳細に確認

---

**✨ これで mainブランチへのマージがAI-poweredで魅力的なX投稿として自動共有されます！** 