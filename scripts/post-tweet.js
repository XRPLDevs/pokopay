import { TwitterApi } from 'twitter-api-v2';

const tweetContent = process.env.TWEET_CONTENT || '';

console.log('🐦 Posting validated tweet to X...');
console.log('📝 Tweet content:', tweetContent);
console.log('📊 Character count:', tweetContent.length);
console.log('🔍 Line breaks detected:', (tweetContent.match(/\n/g) || []).length);
console.log('📋 Raw content with escaped newlines:', JSON.stringify(tweetContent));

// X API クライアントの初期化
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// ツイート投稿
client.v2.tweet(tweetContent)
  .then((result) => {
    console.log('✅ AI-powered tweet posted successfully!');
    console.log('Tweet ID:', result.data.id);
    console.log('Tweet URL: https://twitter.com/user/status/' + result.data.id);
  })
  .catch((error) => {
    console.error('❌ Failed to post tweet:', error);
    console.error('Error details:', error.data || error.message);
    process.exit(1);
  }); 