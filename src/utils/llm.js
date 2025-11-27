/**
 * LLM集成模块
 * 支持多种大语言模型API
 */

import { getBazi } from './bazi.js'
import { getZodiac } from './zodiac.js'
import { getCurrentSeason } from './algorithm.js'

// LLM配置
const LLM_CONFIG = {

  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    enabled: true
  }
}

/**
 * 获取LLM配置
 * @returns {Object} LLM配置
 */
export function getLLMConfig() {
  const saved = localStorage.getItem('llmConfig')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('解析LLM配置失败', e)
    }
  }
  return {
    provider: 'deepseek',
    apiKey: '',
    enabled: false
  }
}

/**
 * 保存LLM配置
 * @param {Object} config - 配置对象
 */
export function saveLLMConfig(config) {
  localStorage.setItem('llmConfig', JSON.stringify(config))
}

/**
 * 检查LLM是否可用
 * @returns {Boolean} 是否配置了API Key
 */
export function isLLMAvailable() {
  const config = getLLMConfig()
  return config.enabled && config.apiKey && config.apiKey.length > 0
}

/**
 * 生成午餐推荐的Prompt
 * @param {Object} userInfo - 用户信息
 * @param {Object} context - 上下文信息
 * @returns {String} Prompt内容
 */
export function generateFoodPrompt(userInfo, context) {
  const bazi = getBazi(userInfo.birthDate)
  const zodiac = getZodiac(userInfo.birthDate)
  const season = getCurrentSeason()
  
  return `你是一个专业的中国饮食文化专家和命理顾问。

用户档案：
- 姓名：${userInfo.name}
- 八字：主五行${bazi.mainElement}（${bazi.description}）
- 星座：${zodiac}
- 性别：${userInfo.gender === 'male' ? '男' : '女'}

当前环境：
- 季节：${season}季
- 地点：上海

任务：推荐1道最适合TA今日午餐的菜品

输出要求（必须严格遵守JSON格式，不要有其他文字）：
{
  "name": "菜品名称",
  "category": "分类（如：本帮菜、面食、盖浇饭等）",
  "description": "50字内的诱人描述",
  "reason": "为什么适合（结合五行、星座、季节分析，80字内）",
  "nutrition": "营养价值简述",
  "temperature": "hot或warm或cold",
  "tags": ["标签1", "标签2", "标签3"],
  "price": "价格区间（如：15-25元）",
  "restaurant": "上海哪里可以吃到",
  "alternatives": [
    {"name": "备选1", "reason": "推荐理由"},
    {"name": "备选2", "reason": "推荐理由"},
    {"name": "备选3", "reason": "推荐理由"}
  ]
}

要求：
1. 必须是上海地区常见的午餐
2. 深度分析五行${bazi.mainElement}与食材的关系
3. 结合${zodiac}的性格特点和饮食偏好
4. 符合${season}季节的养生原则
5. 描述要生动有趣，突出特色
6. 只返回JSON，不要有其他解释文字`
}

/**
 * 生成穿搭推荐的Prompt
 * @param {Object} userInfo - 用户信息
 * @param {Object} weather - 天气信息
 * @returns {String} Prompt内容
 */
export function generateClothingPrompt(userInfo, weather) {
  const bazi = getBazi(userInfo.birthDate)
  const zodiac = getZodiac(userInfo.birthDate)
  const season = getCurrentSeason()
  
  return `你是一个专业的时尚穿搭顾问和命理专家。

用户档案：
- 姓名：${userInfo.name}
- 性别：${userInfo.gender === 'male' ? '男' : '女'}
- 八字：主五行${bazi.mainElement}
- 星座：${zodiac}

当前环境：
- 季节：${season}季
- 今日气温：${weather.temperature}°C
- 天气：${weather.text}
- 地点：上海

任务：为TA推荐1套最适合今日约会的穿搭方案

输出要求（必须严格遵守JSON格式，不要有其他文字）：
{
  "style": "穿搭风格名称",
  "items": ["单品1", "单品2", "单品3", "单品4"],
  "description": "60字内的穿搭描述",
  "reason": "为什么适合（结合星座性格、五行幸运色、气温、场合，80字内）",
  "color": "主色调",
  "occasion": ["适合场合1", "适合场合2"],
  "tips": "穿搭小贴士",
  "accessories": ["配饰建议1", "配饰建议2"],
  "alternatives": [
    {"style": "备选风格1", "items": ["单品1", "单品2", "单品3"]},
    {"style": "备选风格2", "items": ["单品1", "单品2", "单品3"]}
  ]
}

要求：
1. 必须适合${weather.temperature}°C的气温
2. 考虑${zodiac}的性格特质（如狮子座自信、处女座精致等）
3. 融入五行${bazi.mainElement}对应的幸运色元素
4. 符合上海的时尚审美
5. 适合约会场景，既得体又有魅力
6. 只返回JSON，不要有其他解释文字`
}

/**
 * 调用OpenAI API
 * @param {String} prompt - 提示词
 * @param {Object} config - 配置
 * @returns {Promise<Object>} API响应
 */
async function callOpenAI(prompt, config) {
  const providerConfig = LLM_CONFIG[config.provider]
  
  const response = await fetch(`${providerConfig.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: providerConfig.model,
      messages: [
        {
          role: 'system',
          content: '你是一个专业的生活顾问，精通中国传统文化和现代生活方式。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000
    })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || '调用API失败')
  }
  
  const data = await response.json()
  return data.choices[0].message.content
}

/**
 * 调用Claude API
 * @param {String} prompt - 提示词
 * @param {Object} config - 配置
 * @returns {Promise<Object>} API响应
 */
async function callClaude(prompt, config) {
  const providerConfig = LLM_CONFIG[config.provider]
  
  const response = await fetch(`${providerConfig.baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: providerConfig.model,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || '调用API失败')
  }
  
  const data = await response.json()
  return data.content[0].text
}

/**
 * 调用通义千问API
 * @param {String} prompt - 提示词
 * @param {Object} config - 配置
 * @returns {Promise<Object>} API响应
 */
async function callQwen(prompt, config) {
  const providerConfig = LLM_CONFIG[config.provider]
  
  const response = await fetch(`${providerConfig.baseUrl}/services/aigc/text-generation/generation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: providerConfig.model,
      input: {
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      parameters: {
        result_format: 'message'
      }
    })
  })
  
  if (!response.ok) {
    throw new Error('调用通义千问API失败')
  }
  
  const data = await response.json()
  return data.output.choices[0].message.content
}

/**
 * 通用LLM调用接口
 * @param {String} prompt - 提示词
 * @returns {Promise<Object>} 解析后的响应
 */
export async function callLLM(prompt) {
  const config = getLLMConfig()
  
  if (!config.apiKey) {
    throw new Error('请先配置API Key')
  }
  
  console.log('=== LLM调用开始 ===')
  console.log('提供商:', config.provider)
  console.log('输入Prompt:', prompt)
  console.log('==================')
  
  let responseText
  
  try {
    // 创建超时Promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        console.error('❌ LLM调用超时 (60秒)')
        reject(new Error('LLM调用超时，请检查网络连接或API配置'))
      }, 60000)
    })
    
    // 创建API调用Promise
    const apiPromise = (async () => {
      // 根据不同的provider调用对应的API
      switch (config.provider) {
        case 'openai':
        case 'moonshot':
        case 'deepseek':
          return await callOpenAI(prompt, config)
        case 'claude':
          return await callClaude(prompt, config)
        case 'qwen':
          return await callQwen(prompt, config)
        default:
          // 默认使用OpenAI兼容接口
          return await callOpenAI(prompt, config)
      }
    })()
    
    // 竞速执行，任一完成就返回
    responseText = await Promise.race([apiPromise, timeoutPromise])
    
    console.log('=== LLM响应成功 ===')
    console.log('原始响应:', responseText)
    console.log('==================')
    
    // 解析JSON响应
    // 尝试提取JSON（可能包裹在```json```中）
    let jsonText = responseText.trim()
    
    // 移除可能的markdown代码块标记
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.substring(7)
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.substring(3)
    }
    
    if (jsonText.endsWith('```')) {
      jsonText = jsonText.substring(0, jsonText.length - 3)
    }
    
    jsonText = jsonText.trim()
    
    // 解析JSON
    const result = JSON.parse(jsonText)
    
    console.log('=== 解析结果 ===')
    console.log('解析后的JSON:', result)
    console.log('===============')
    
    return result
    
  } catch (error) {
    console.error('❌ LLM调用失败:', error)
    console.error('错误详情:', error.message)
    console.error('错误堆栈:', error.stack)
    throw new Error(`AI推荐失败: ${error.message}`)
  }
}

/**
 * 获取缓存的推荐
 * @param {String} type - 类型（food/clothing）
 * @param {String} userId - 用户ID
 * @returns {Object|null} 缓存的推荐或null
 */
export function getCachedRecommendation(type, userId) {
  const cacheKey = `llm_cache_${type}_${userId}`
  const cached = localStorage.getItem(cacheKey)
  
  if (!cached) return null
  
  try {
    const data = JSON.parse(cached)
    const today = new Date().toDateString()
    
    // 检查是否是今天的缓存
    if (data.date === today) {
      return data.result
    }
  } catch (e) {
    console.error('解析缓存失败', e)
  }
  
  return null
}

/**
 * 保存推荐到缓存
 * @param {String} type - 类型（food/clothing）
 * @param {String} userId - 用户ID
 * @param {Object} result - 推荐结果
 */
export function cacheRecommendation(type, userId, result) {
  const cacheKey = `llm_cache_${type}_${userId}`
  const data = {
    date: new Date().toDateString(),
    result: result
  }
  localStorage.setItem(cacheKey, JSON.stringify(data))
}

/**
 * 获取支持的LLM列表
 * @returns {Array} LLM列表
 */
export function getSupportedLLMs() {
  return Object.entries(LLM_CONFIG)
    .filter(([_, config]) => config.enabled)
    .map(([key, config]) => ({
      id: key,
      name: config.name,
      model: config.model
    }))
}

/**
 * 验证API Key
 * @param {String} provider - 提供商
 * @param {String} apiKey - API Key
 * @returns {Promise<Boolean>} 是否有效
 */
export async function validateAPIKey(provider, apiKey) {
  try {
    const providerConfig = LLM_CONFIG[provider]
    
    // 简单测试调用
    const response = await fetch(`${providerConfig.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: providerConfig.model,
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 5
      })
    })
    
    return response.ok
  } catch (error) {
    console.error('验证API Key失败:', error)
    return false
  }
}

