# Free News API Integration Plan

## Overview
Based on the free-news-api comparison, we'll integrate the following APIs that offer free tiers suitable for our Bulgarian news aggregation platform:

## Selected APIs for Integration

### 1. **NewsAPI.org** ✅ (Already Integrated)
- **Status**: Already using via NewsData.io
- **Free Tier**: 100 requests/day
- **Coverage**: 50,000+ sources, 50 countries
- **Languages**: 14 languages including English
- **Best For**: Real-time breaking news

### 2. **Webz.io News API Lite** 🆕 (Priority 1)
- **Free Tier**: 1,000 calls/month, 10 articles per call
- **Coverage**: Global, 170+ languages
- **Historical Data**: 30 days
- **Features**: Boolean queries, sentiment analysis, powerful filtering
- **Best For**: Non-commercial projects, research
- **Account Required**: Yes (email + API key)
- **Action**: User needs to create account at https://webz.io/products/news-api#lite

### 3. **NewsAPI.ai** 🆕 (Priority 2)
- **Free Tier**: Available (need to check limits)
- **Coverage**: 150,000+ publishers worldwide
- **Features**: Advanced NLP/AI, semantic annotations, event detection, sentiment analysis
- **Best For**: Advanced analysis, entity extraction
- **Account Required**: Yes
- **Action**: User needs to create account at https://newsapi.ai/

### 4. **WorldNewsAPI.com** 🆕 (Priority 3)
- **Free Tier**: Available
- **Coverage**: 150+ countries, 50+ languages
- **Features**: Semantic tagging, location/organization/person extraction
- **Sentiment**: English and German only
- **Best For**: Global news with semantic search
- **Account Required**: Yes
- **Action**: User needs to create account at https://worldnewsapi.com/

## Implementation Steps

### Phase 1: Webz.io Integration
1. Create `WebzioAggregator` service class
2. Add to sources table with toggle
3. Integrate into pipeline.ts
4. Add quota tracking (1,000/month limit)

### Phase 2: NewsAPI.ai Integration
1. Create `NewsApiAiAggregator` service class
2. Add to sources table with toggle
3. Integrate into pipeline.ts
4. Implement NLP features (entity extraction, sentiment)

### Phase 3: WorldNewsAPI Integration
1. Create `WorldNewsApiAggregator` service class
2. Add to sources table with toggle
3. Integrate into pipeline.ts
4. Implement semantic search features

## Environment Variables Needed
```
# Webz.io
WEBZIO_API_KEY=your_key_here

# NewsAPI.ai
NEWSAPI_AI_KEY=your_key_here

# WorldNewsAPI
WORLDNEWS_API_KEY=your_key_here
```

## Next Actions
1. **User**: Create accounts at the selected platforms and obtain API keys
2. **Dev**: Implement aggregator services for each API
3. **Dev**: Add quota tracking to prevent exceeding free tier limits
4. **Dev**: Update pipeline to use all sources based on isActive flag
