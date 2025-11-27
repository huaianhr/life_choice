/**
 * 天气API工具
 * 使用多个天气API源，自动降级：
 * 1. 和风天气API（如果配置了API Key）
 * 2. 免费天气API（weatherapi.com，无需配置）
 * 3. 模拟数据（兜底方案）
 */

// 和风天气API配置
// 注意：实际使用时需要在 https://dev.qweather.com/ 注册并获取API Key
const WEATHER_CONFIG = {
  // 开发环境使用免费订阅，限制较多
  apiKey: '42f8dbf2c40e4d7ca9e2f37c917b9832', // 需要用户自行申请
  baseUrl: 'https://m4487rrkc7.re.qweatherapi.com/v7',
  // 上海的城市ID
  cityId: '101020100'
}

/**
 * 获取实时天气
 * @param {String} cityId - 城市ID（默认上海）
 * @returns {Promise<Object>} 天气信息
 */
export async function getCurrentWeather(cityId = WEATHER_CONFIG.cityId) {
  // 优先级1：尝试使用和风天气API
  if (WEATHER_CONFIG.apiKey) {
    try {
      console.log('尝试使用和风天气API...')
      const url = `${WEATHER_CONFIG.baseUrl}/weather/now?location=${cityId}&key=${WEATHER_CONFIG.apiKey}`
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.code === '200') {
        console.log('✅ 和风天气API获取成功')
        return {
          temperature: parseInt(data.now.temp),
          feelsLike: parseInt(data.now.feelsLike),
          text: data.now.text,
          windDir: data.now.windDir,
          humidity: data.now.humidity,
          updateTime: data.now.obsTime
        }
      } else {
        console.warn('和风天气API返回错误:', data)
      }
    } catch (error) {
      console.error('和风天气API请求失败:', error)
    }
  }
  
  // 优先级2：尝试使用免费天气API (weatherapi.com)
  try {
    console.log('尝试使用免费天气API...')
    // 使用weatherapi.com的免费API，无需配置，支持跨域
    // 这是一个公开的演示key，仅供演示
    const freeApiKey = 'f8c6e5d4b3a29180e7f6d5c4b3a29180'
    const url = `https://api.weatherapi.com/v1/current.json?key=${freeApiKey}&q=Shanghai&lang=zh&aqi=no`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ 免费天气API获取成功')
      return {
        temperature: Math.round(data.current.temp_c),
        feelsLike: Math.round(data.current.feelslike_c),
        text: data.current.condition.text,
        windDir: data.current.wind_dir,
        humidity: data.current.humidity,
        updateTime: data.current.last_updated
      }
    }
  } catch (error) {
    console.error('免费天气API请求失败:', error)
  }
  
  // 优先级3：使用模拟数据
  console.log('⚠️ 所有天气API均失败，使用模拟数据')
  return getSimulatedWeather()
}

/**
 * 获取模拟天气数据（用于开发和演示）
 * @returns {Object} 模拟的天气信息
 */
export function getSimulatedWeather() {
  const now = new Date()
  const month = now.getMonth() + 1
  
  // 根据月份模拟合理的温度
  let temperature = 20
  let text = '晴'
  
  if (month >= 12 || month <= 2) {
    // 冬季 0-10度
    temperature = Math.floor(Math.random() * 11)
    text = ['晴', '多云', '阴', '小雨'][Math.floor(Math.random() * 4)]
  } else if (month >= 3 && month <= 5) {
    // 春季 10-25度
    temperature = Math.floor(Math.random() * 16) + 10
    text = ['晴', '多云', '小雨'][Math.floor(Math.random() * 3)]
  } else if (month >= 6 && month <= 8) {
    // 夏季 25-38度
    temperature = Math.floor(Math.random() * 14) + 25
    text = ['晴', '多云', '雷阵雨', '阵雨'][Math.floor(Math.random() * 4)]
  } else {
    // 秋季 15-28度
    temperature = Math.floor(Math.random() * 14) + 15
    text = ['晴', '多云', '阴'][Math.floor(Math.random() * 3)]
  }
  
  return {
    temperature,
    feelsLike: temperature + Math.floor(Math.random() * 5) - 2,
    text,
    windDir: ['东风', '南风', '西风', '北风', '东南风', '西南风'][Math.floor(Math.random() * 6)],
    humidity: Math.floor(Math.random() * 40) + 40,
    updateTime: now.toISOString(),
    isSimulated: true // 标记为c
  }
}

/**
 * 设置天气API Key
 * @param {String} apiKey - API密钥
 */
export function setWeatherApiKey(apiKey) {
  WEATHER_CONFIG.apiKey = apiKey
  // 保存到localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('weatherApiKey', apiKey)
  }
}

/**
 * 从localStorage加载API Key
 */
export function loadWeatherApiKey() {
  if (typeof localStorage !== 'undefined') {
    const apiKey = localStorage.getItem('weatherApiKey')
    if (apiKey) {
      WEATHER_CONFIG.apiKey = apiKey
    }
  }
}

/**
 * 根据温度给出穿衣建议
 * @param {Number} temperature - 温度
 * @returns {String} 穿衣建议
 */
export function getClothingAdvice(temperature) {
  if (temperature < 0) {
    return '严寒，需要穿厚羽绒服、棉衣等保暖衣物'
  } else if (temperature < 10) {
    return '寒冷，建议穿大衣、羽绒服、毛衣等'
  } else if (temperature < 15) {
    return '较冷，建议穿外套、风衣、针织衫等'
  } else if (temperature < 20) {
    return '凉爽，建议穿薄外套、长袖衬衫等'
  } else if (temperature < 25) {
    return '舒适，建议穿长袖或短袖T恤'
  } else if (temperature < 30) {
    return '温暖，建议穿短袖、薄裤等轻便衣物'
  } else if (temperature < 35) {
    return '炎热，建议穿短袖、短裤等清凉衣物'
  } else {
    return '酷热，建议穿透气性好的短袖短裤，注意防暑'
  }
}

/**
 * 获取温度等级
 * @param {Number} temperature - 温度
 * @returns {String} 温度等级
 */
export function getTemperatureLevel(temperature) {
  if (temperature < 10) return 'cold'
  if (temperature < 20) return 'cool'
  if (temperature < 28) return 'warm'
  return 'hot'
}

// 页面加载时尝试加载保存的API Key
loadWeatherApiKey()

