/**
 * 星座计算工具
 * 根据出生日期计算星座
 */

// 星座日期范围配置
const zodiacConfig = [
  { name: '摩羯座', start: [12, 22], end: [1, 19] },
  { name: '水瓶座', start: [1, 20], end: [2, 18] },
  { name: '双鱼座', start: [2, 19], end: [3, 20] },
  { name: '白羊座', start: [3, 21], end: [4, 19] },
  { name: '金牛座', start: [4, 20], end: [5, 20] },
  { name: '双子座', start: [5, 21], end: [6, 21] },
  { name: '巨蟹座', start: [6, 22], end: [7, 22] },
  { name: '狮子座', start: [7, 23], end: [8, 22] },
  { name: '处女座', start: [8, 23], end: [9, 22] },
  { name: '天秤座', start: [9, 23], end: [10, 23] },
  { name: '天蝎座', start: [10, 24], end: [11, 22] },
  { name: '射手座', start: [11, 23], end: [12, 21] }
]

// 星座性格特征
const zodiacTraits = {
  '白羊座': {
    element: '火',
    character: ['热情', '冲动', '勇敢', '自信'],
    lucky: { color: '红色', number: 9, day: '星期二' }
  },
  '金牛座': {
    element: '土',
    character: ['稳重', '务实', '固执', '温和'],
    lucky: { color: '粉色', number: 6, day: '星期五' }
  },
  '双子座': {
    element: '风',
    character: ['机智', '善变', '好奇', '灵活'],
    lucky: { color: '黄色', number: 5, day: '星期三' }
  },
  '巨蟹座': {
    element: '水',
    character: ['温柔', '敏感', '体贴', '念旧'],
    lucky: { color: '白色', number: 2, day: '星期一' }
  },
  '狮子座': {
    element: '火',
    character: ['自信', '大方', '霸气', '热情'],
    lucky: { color: '金色', number: 1, day: '星期日' }
  },
  '处女座': {
    element: '土',
    character: ['细致', '完美主义', '理性', '谨慎'],
    lucky: { color: '灰色', number: 5, day: '星期三' }
  },
  '天秤座': {
    element: '风',
    character: ['优雅', '和谐', '犹豫', '公正'],
    lucky: { color: '淡蓝', number: 6, day: '星期五' }
  },
  '天蝎座': {
    element: '水',
    character: ['神秘', '专注', '执着', '深沉'],
    lucky: { color: '深红', number: 9, day: '星期二' }
  },
  '射手座': {
    element: '火',
    character: ['乐观', '自由', '直率', '冒险'],
    lucky: { color: '紫色', number: 3, day: '星期四' }
  },
  '摩羯座': {
    element: '土',
    character: ['踏实', '有责任感', '稳重', '务实'],
    lucky: { color: '棕色', number: 8, day: '星期六' }
  },
  '水瓶座': {
    element: '风',
    character: ['独立', '创新', '友善', '理想主义'],
    lucky: { color: '蓝色', number: 4, day: '星期六' }
  },
  '双鱼座': {
    element: '水',
    character: ['浪漫', '善良', '感性', '梦幻'],
    lucky: { color: '海蓝', number: 7, day: '星期四' }
  }
}

/**
 * 根据出生日期计算星座
 * @param {String|Date} birthDate - 出生日期
 * @returns {String} 星座名称
 */
export function getZodiac(birthDate) {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  for (const zodiac of zodiacConfig) {
    const [startMonth, startDay] = zodiac.start
    const [endMonth, endDay] = zodiac.end
    
    // 处理跨年的情况（摩羯座）
    if (startMonth > endMonth) {
      if ((month === startMonth && day >= startDay) || 
          (month === endMonth && day <= endDay)) {
        return zodiac.name
      }
    } else {
      // 正常情况
      if ((month === startMonth && day >= startDay) || 
          (month === endMonth && day <= endDay) ||
          (month > startMonth && month < endMonth)) {
        return zodiac.name
      }
    }
  }
  
  return '未知'
}

/**
 * 获取星座特征
 * @param {String} zodiacName - 星座名称
 * @returns {Object} 星座特征
 */
export function getZodiacTraits(zodiacName) {
  return zodiacTraits[zodiacName] || null
}

/**
 * 获取星座元素
 * @param {String} zodiacName - 星座名称
 * @returns {String} 元素（火/土/风/水）
 */
export function getZodiacElement(zodiacName) {
  const traits = zodiacTraits[zodiacName]
  return traits ? traits.element : '未知'
}

/**
 * 获取星座幸运数字
 * @param {String} zodiacName - 星座名称
 * @returns {Number} 幸运数字
 */
export function getZodiacLuckyNumber(zodiacName) {
  const traits = zodiacTraits[zodiacName]
  return traits ? traits.lucky.number : 7
}

/**
 * 获取星座幸运色
 * @param {String} zodiacName - 星座名称
 * @returns {String} 幸运色
 */
export function getZodiacLuckyColor(zodiacName) {
  const traits = zodiacTraits[zodiacName]
  return traits ? traits.lucky.color : '白色'
}

/**
 * 判断两个星座是否配对
 * @param {String} zodiac1 - 星座1
 * @param {String} zodiac2 - 星座2
 * @returns {Object} 配对信息
 */
export function getZodiacCompatibility(zodiac1, zodiac2) {
  const element1 = getZodiacElement(zodiac1)
  const element2 = getZodiacElement(zodiac2)
  
  // 相同元素配对度高
  if (element1 === element2) {
    return { score: 85, description: '元素相同，理解深刻' }
  }
  
  // 火和风、土和水配对度较高
  if ((element1 === '火' && element2 === '风') || 
      (element1 === '风' && element2 === '火')) {
    return { score: 80, description: '风助火势，相互成就' }
  }
  
  if ((element1 === '土' && element2 === '水') || 
      (element1 === '水' && element2 === '土')) {
    return { score: 75, description: '水土交融，稳定踏实' }
  }
  
  // 火和水、土和风相克
  if ((element1 === '火' && element2 === '水') || 
      (element1 === '水' && element2 === '火')) {
    return { score: 50, description: '水火不容，需要磨合' }
  }
  
  return { score: 65, description: '需要相互理解和包容' }
}

