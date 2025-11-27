/**
 * 八字五行计算工具
 * 简化版本的八字计算，主要用于五行属性判断
 */

// 天干配置
const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const tianGanElement = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
}

// 地支配置
const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const diZhiElement = {
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '申': '金', '酉': '金',
  '亥': '水', '子': '水',
  '辰': '土', '戌': '土', '丑': '土', '未': '土'
}

// 五行相生相克
const elementRelations = {
  '木': { generate: '火', restrict: '土', restrictedBy: '金' },
  '火': { generate: '土', restrict: '金', restrictedBy: '水' },
  '土': { generate: '金', restrict: '水', restrictedBy: '木' },
  '金': { generate: '水', restrict: '木', restrictedBy: '火' },
  '水': { generate: '木', restrict: '火', restrictedBy: '土' }
}

/**
 * 根据出生日期计算年柱天干
 * @param {Number} year - 年份
 * @returns {String} 天干
 */
function getYearTianGan(year) {
  // 1984年为甲子年，天干从甲开始
  const baseYear = 1984
  const offset = (year - baseYear) % 10
  return tianGan[offset >= 0 ? offset : offset + 10]
}

/**
 * 根据出生日期计算年柱地支
 * @param {Number} year - 年份
 * @returns {String} 地支
 */
function getYearDiZhi(year) {
  // 1984年为甲子年，地支从子开始
  const baseYear = 1984
  const offset = (year - baseYear) % 12
  return diZhi[offset >= 0 ? offset : offset + 12]
}

/**
 * 根据月份获取月柱地支
 * @param {Number} month - 月份 (1-12)
 * @returns {String} 地支
 */
function getMonthDiZhi(month) {
  // 简化版：正月对应寅月
  const monthDiZhi = ['丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子']
  return monthDiZhi[month - 1]
}

/**
 * 根据日期计算简化八字
 * @param {String|Date} birthDate - 出生日期
 * @returns {Object} 八字信息
 */
export function getBazi(birthDate) {
  const date = new Date(birthDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 计算年柱
  const yearTG = getYearTianGan(year)
  const yearDZ = getYearDiZhi(year)
  
  // 计算月柱（简化版）
  const monthDZ = getMonthDiZhi(month)
  
  // 计算日柱（简化版，使用日期模运算）
  const dayTG = tianGan[(year + month + day) % 10]
  const dayDZ = diZhi[(year + month + day) % 12]
  
  // 收集所有五行
  const elements = [
    tianGanElement[yearTG],
    diZhiElement[yearDZ],
    diZhiElement[monthDZ],
    tianGanElement[dayTG],
    diZhiElement[dayDZ]
  ]
  
  // 统计五行数量
  const elementCount = {
    '金': 0,
    '木': 0,
    '水': 0,
    '火': 0,
    '土': 0
  }
  
  elements.forEach(element => {
    if (element) elementCount[element]++
  })
  
  // 找出主要元素（出现最多的）
  let mainElement = '土'
  let maxCount = 0
  for (const [element, count] of Object.entries(elementCount)) {
    if (count > maxCount) {
      maxCount = count
      mainElement = element
    }
  }
  
  // 找出缺失的元素
  const lackElements = Object.entries(elementCount)
    .filter(([_, count]) => count === 0)
    .map(([element]) => element)
  
  return {
    yearGanZhi: yearTG + yearDZ,
    monthGanZhi: monthDZ,
    dayGanZhi: dayTG + dayDZ,
    mainElement,
    lackElements,
    elementCount,
    yearElement: tianGanElement[yearTG],
    description: `主五行：${mainElement}，${lackElements.length > 0 ? '缺：' + lackElements.join('、') : '五行齐全'}`
  }
}

/**
 * 获取五行相生元素
 * @param {String} element - 五行元素
 * @returns {String} 相生元素
 */
export function getGenerateElement(element) {
  return elementRelations[element]?.generate || '土'
}

/**
 * 获取五行相克元素
 * @param {String} element - 五行元素
 * @returns {String} 相克元素
 */
export function getRestrictElement(element) {
  return elementRelations[element]?.restrict || '土'
}

/**
 * 获取五行被克元素
 * @param {String} element - 五行元素
 * @returns {String} 被克元素
 */
export function getRestrictedByElement(element) {
  return elementRelations[element]?.restrictedBy || '金'
}

/**
 * 判断五行是否相生
 * @param {String} element1 - 五行1
 * @param {String} element2 - 五行2
 * @returns {Boolean} 是否相生
 */
export function isElementGenerate(element1, element2) {
  return elementRelations[element1]?.generate === element2
}

/**
 * 判断五行是否相克
 * @param {String} element1 - 五行1
 * @param {String} element2 - 五行2
 * @returns {Boolean} 是否相克
 */
export function isElementRestrict(element1, element2) {
  return elementRelations[element1]?.restrict === element2
}

/**
 * 获取五行建议
 * @param {Object} baziInfo - 八字信息
 * @returns {Object} 五行建议
 */
export function getElementAdvice(baziInfo) {
  const { mainElement, lackElements } = baziInfo
  
  const advice = {
    luckyColors: [],
    luckyDirections: [],
    luckyElements: [],
    suggestions: []
  }
  
  // 根据主元素给出建议
  switch (mainElement) {
    case '木':
      advice.luckyColors = ['绿色', '青色']
      advice.luckyDirections = ['东方']
      advice.suggestions.push('适合户外活动', '多接触自然')
      break
    case '火':
      advice.luckyColors = ['红色', '紫色']
      advice.luckyDirections = ['南方']
      advice.suggestions.push('适合热情奔放的活动', '注意心脏健康')
      break
    case '土':
      advice.luckyColors = ['黄色', '棕色']
      advice.luckyDirections = ['中央']
      advice.suggestions.push('适合稳重踏实的工作', '注意脾胃健康')
      break
    case '金':
      advice.luckyColors = ['白色', '金色']
      advice.luckyDirections = ['西方']
      advice.suggestions.push('适合精密细致的工作', '注意呼吸系统')
      break
    case '水':
      advice.luckyColors = ['黑色', '蓝色']
      advice.luckyDirections = ['北方']
      advice.suggestions.push('适合灵活多变的工作', '注意肾脏健康')
      break
  }
  
  // 补充缺失元素的建议
  if (lackElements.length > 0) {
    advice.luckyElements = lackElements
    advice.suggestions.push(`可多接触${lackElements.join('、')}属性的事物`)
  }
  
  return advice
}

/**
 * 根据五行计算幸运数字
 * @param {String} element - 五行元素
 * @returns {Array<Number>} 幸运数字数组
 */
export function getLuckyNumbersByElement(element) {
  const numberMap = {
    '木': [3, 8],
    '火': [2, 7],
    '土': [5, 10],
    '金': [4, 9],
    '水': [1, 6]
  }
  return numberMap[element] || [5, 10]
}

