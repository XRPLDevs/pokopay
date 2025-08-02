import fs from 'fs';

const tweetContent = process.env.TWEET_CONTENT || '';
const requiredElements = (process.env.REQUIRED_ELEMENTS || '').split(' ').filter(Boolean);

console.log('📝 Tweet content to validate:', tweetContent);
console.log('📊 Character count:', tweetContent.length);
console.log('🔍 Required elements:', requiredElements);
console.log('📋 Required elements count:', requiredElements.length);

// 必須要素のチェック
const missingElements = requiredElements.filter(element => 
  !tweetContent.includes(element)
);

console.log('❌ Missing elements:', missingElements);
console.log('✅ Found elements:', requiredElements.filter(element => 
  tweetContent.includes(element)
));

if (missingElements.length > 0) {
  console.error('❌ Missing required elements:', missingElements);
  console.error('Tweet content:', tweetContent);
  console.error('Tweet content length:', tweetContent.length);
  process.exit(1);
}

console.log('✅ Tweet validation passed');
console.log('📝 Final tweet content:', tweetContent);
console.log('📊 Final character count:', tweetContent.length);

// 検証済みのツイート内容を出力
fs.appendFileSync(process.env.GITHUB_OUTPUT, `validated_tweet_content<<EOF\n${tweetContent}\nEOF\n`); 