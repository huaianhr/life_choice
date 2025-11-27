/**
 * 核心算法引擎
 * 结合用户属性（八字、星座）和环境因素进行智能推荐
 */

import { getBazi, getLuckyNumbersByElement } from './bazi.js'
import { getZodiac, getZodiacLuckyNumber } from './zodiac.js'

/**
 * 生成基于用户信息的随机种子
 * @param {Object} userInfo - 用户信息
 * @param {String} type - 选择器类型
 * @returns {Number} 随机种子
 */
export function generateSeed(userInfo, type = 'general') {
  const date = new Date(userInfo.birthDate)
  const now = new Date()
  
  // 结合出生日期、当前时间和类型生成种子
  const seed = 
    date.getFullYear() * 10000 +
    date.getMonth() * 100 +
    date.getDate() +
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds() +
    type.charCodeAt(0)
  
  return seed
}

/**
 * 基于种子的伪随机数生成器
 * @param {Number} seed - 随机种子
 * @returns {Function} 随机数生成函数
 */
export function createSeededRandom(seed) {
  let state = seed
  
  return function() {
    // LCG算法
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

/**
 * 计算项目权重
 * @param {Object} item - 数据项
 * @param {Object} userInfo - 用户信息
 * @param {Object} context - 上下文信息（季节、温度等）
 * @returns {Number} 权重分数 (0-100)
 */
export function calculateWeight(item, userInfo, context = {}) {
  let weight = 50 // 基础权重
  
  const bazi = getBazi(userInfo.birthDate)
  const zodiac = getZodiac(userInfo.birthDate)
  
  // 五行匹配加分
  if (item.elements && bazi.mainElement) {
    if (item.elements.includes(bazi.mainElement)) {
      weight += 20
    }
    // 相生元素也加分
    if (item.elements.includes(bazi.yearElement)) {
      weight += 10
    }
  }
  
  // 季节匹配加分
  if (item.seasons && context.season) {
    if (item.seasons.includes(context.season)) {
      weight += 15
    }
  }
  
  // 星座匹配加分
  if (item.zodiacMatch && zodiac) {
    if (item.zodiacMatch.includes(zodiac)) {
      weight += 15
    }
  }
  
  // 温度匹配加分（穿搭）
  if (item.tempRange && context.temperature !== undefined) {
    const [min, max] = item.tempRange
    if (context.temperature >= min && context.temperature <= max) {
      weight += 25
    } else {
      // 温度不匹配严重降权
      const diff = Math.min(
        Math.abs(context.temperature - min),
        Math.abs(context.temperature - max)
      )
      weight -= diff * 2
    }
  }
  
  // 性别匹配（穿搭）
  if (item.gender && userInfo.gender) {
    if (item.gender === userInfo.gender || item.gender === 'unisex') {
      weight += 10
    } else {
      weight -= 30
    }
  }
  
  return Math.max(0, Math.min(100, weight))
}

/**
 * 智能选择算法
 * @param {Array} items - 候选项数组
 * @param {Object} userInfo - 用户信息
 * @param {Object} context - 上下文信息
 * @returns {Object} 选中的项目
 */
export function smartSelect(items, userInfo, context = {}) {
  if (!items || items.length === 0) {
    return null
  }
  
  // 计算每个项目的权重
  const weightedItems = items.map(item => ({
    ...item,
    weight: calculateWeight(item, userInfo, context)
  }))
  
  // 过滤掉权重过低的项目
  const validItems = weightedItems.filter(item => item.weight > 0)
  
  if (validItems.length === 0) {
    // 如果都被过滤了，返回权重最高的
    weightedItems.sort((a, b) => b.weight - a.weight)
    return weightedItems[0]
  }
  
  // 计算总权重
  const totalWeight = validItems.reduce((sum, item) => sum + item.weight, 0)
  
  // 生成随机种子并创建随机函数
  const seed = generateSeed(userInfo, context.type || 'general')
  const random = createSeededRandom(seed)
  
  // 轮盘赌选择
  let randomValue = random() * totalWeight
  
  for (const item of validItems) {
    randomValue -= item.weight
    if (randomValue <= 0) {
      return item
    }
  }
  
  // 保底返回第一个
  return validItems[0]
}

/**
 * 批量智能选择（不重复）
 * @param {Array} items - 候选项数组
 * @param {Object} userInfo - 用户信息
 * @param {Object} context - 上下文信息
 * @param {Number} count - 选择数量
 * @returns {Array} 选中的项目数组
 */
export function smartSelectMultiple(items, userInfo, context = {}, count = 3) {
  if (!items || items.length === 0) {
    return []
  }
  
  count = Math.min(count, items.length)
  const selected = []
  const remaining = [...items]
  
  for (let i = 0; i < count; i++) {
    // 修改种子以确保每次选择不同
    const modifiedContext = {
      ...context,
      iteration: i
    }
    const item = smartSelect(remaining, userInfo, modifiedContext)
    if (item) {
      selected.push(item)
      // 从剩余项中移除已选中的
      const index = remaining.findIndex(r => r.id === item.id)
      if (index > -1) {
        remaining.splice(index, 1)
      }
    }
  }
  
  return selected
}

/**
 * 生成彩票号码（双色球）
 * @param {Object} userInfo - 用户信息
 * @returns {Object} 彩票号码
 */
export function generateLotterySSQ(userInfo) {
  const bazi = getBazi(userInfo.birthDate)
  const zodiac = getZodiac(userInfo.birthDate)
  const zodiacLucky = getZodiacLuckyNumber(zodiac)
  const baziLucky = getLuckyNumbersByElement(bazi.mainElement)
  
  const seed = generateSeed(userInfo, 'lottery_ssq')
  const random = createSeededRandom(seed)
  
  // 生成6个红球 (1-33)
  const redBalls = new Set()
  const luckyNumbers = [zodiacLucky, ...baziLucky]
  
  // 优先加入幸运数字
  luckyNumbers.forEach(num => {
    if (num <= 33 && redBalls.size < 6) {
      redBalls.add(num)
    }
  })
  
  // 补充随机数字
  while (redBalls.size < 6) {
    const num = Math.floor(random() * 33) + 1
    redBalls.add(num)
  }
  
  // 生成1个蓝球 (1-16)
  let blueBall = Math.floor(random() * 16) + 1
  // 如果幸运数字在范围内，有50%概率使用
  if (zodiacLucky <= 16 && random() > 0.5) {
    blueBall = zodiacLucky
  }
  
  return {
    type: '双色球',
    red: Array.from(redBalls).sort((a, b) => a - b),
    blue: blueBall,
    description: `基于您的${zodiac}和${bazi.mainElement}属性生成`
  }
}

/**
 * 生成彩票号码（大乐透）
 * @param {Object} userInfo - 用户信息
 * @returns {Object} 彩票号码
 */
export function generateLotteryDLT(userInfo) {
  const bazi = getBazi(userInfo.birthDate)
  const zodiac = getZodiac(userInfo.birthDate)
  const zodiacLucky = getZodiacLuckyNumber(zodiac)
  const baziLucky = getLuckyNumbersByElement(bazi.mainElement)
  
  const seed = generateSeed(userInfo, 'lottery_dlt')
  const random = createSeededRandom(seed)
  
  // 生成5个前区号码 (1-35)
  const frontBalls = new Set()
  const luckyNumbers = [zodiacLucky, ...baziLucky]
  
  luckyNumbers.forEach(num => {
    if (num <= 35 && frontBalls.size < 5) {
      frontBalls.add(num)
    }
  })
  
  while (frontBalls.size < 5) {
    const num = Math.floor(random() * 35) + 1
    frontBalls.add(num)
  }
  
  // 生成2个后区号码 (1-12)
  const backBalls = new Set()
  while (backBalls.size < 2) {
    const num = Math.floor(random() * 12) + 1
    backBalls.add(num)
  }
  
  return {
    type: '大乐透',
    front: Array.from(frontBalls).sort((a, b) => a - b),
    back: Array.from(backBalls).sort((a, b) => a - b),
    description: `基于您的${zodiac}和${bazi.mainElement}属性生成`
  }
}

/**
 * 预测比大小
 * @param {Object} userInfo - 用户信息
 * @returns {Object} 预测结果
 */
export function predictBigSmall(userInfo) {
  const bazi = getBazi(userInfo.birthDate)
  const zodiac = getZodiac(userInfo.birthDate)
  
  const seed = generateSeed(userInfo, 'big_small')
  const random = createSeededRandom(seed)
  
  // 基于五行和星座计算倾向
  let bigTendency = 0.5 // 基础50%
  
  // 五行影响
  const elementEffect = {
    '木': 0.55,  // 向上生长，偏大
    '火': 0.6,   // 炎上，偏大
    '土': 0.5,   // 中性
    '金': 0.45,  // 收敛，偏小
    '水': 0.4    // 润下，偏小
  }
  bigTendency = elementEffect[bazi.mainElement] || 0.5
  
  const value = random()
  const result = value < bigTendency ? '大' : '小'
  const confidence = Math.abs(value - 0.5) * 200 // 转换为0-100的置信度
  
  return {
    type: '比大小',
    prediction: result,
    confidence: Math.round(confidence),
    description: `基于您的${zodiac}和${bazi.mainElement}属性，今日宜选【${result}】`,
    element: bazi.mainElement,
    zodiac: zodiac
  }
}

/**
 * 获取当前季节
 * @returns {String} 季节
 */
export function getCurrentSeason() {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return '春'
  if (month >= 6 && month <= 8) return '夏'
  if (month >= 9 && month <= 11) return '秋'
  return '冬'
}

/**
 * 格式化日期
 * @param {Date|String} date - 日期
 * @returns {String} 格式化的日期字符串
 */
export function formatDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

