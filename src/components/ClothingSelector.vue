<template>
  <div class="selector-modal">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-content card">
      <button class="close-btn" @click="$emit('close')">✕</button>
      
      <div class="modal-header">
        <h2 class="modal-title">
          <span class="title-icon">👔</span>
          约会穿什么
        </h2>
        <p class="modal-subtitle">根据今日天气和您的风格为您推荐</p>
        
        <!-- 模式选择和设置 -->
        <div class="mode-selector">
          <div class="mode-tabs">
            <button
              class="mode-tab"
              :class="{ active: mode === 'fast' }"
              @click="switchMode('fast')"
            >
              <span class="mode-icon">⚡</span>
              <span class="mode-name">快速模式</span>
            </button>
            <button
              class="mode-tab"
              :class="{ active: mode === 'smart', disabled: !llmAvailable }"
              @click="switchMode('smart')"
              :disabled="!llmAvailable"
            >
              <span class="mode-icon">🤖</span>
              <span class="mode-name">智能模式</span>
              <span v-if="!llmAvailable" class="mode-badge">需配置</span>
            </button>
          </div>
          <button class="settings-btn" @click="showSettings = true" title="设置">
            ⚙️
          </button>
        </div>
      </div>
      
      <div class="modal-body">
        <!-- 天气信息 -->
        <div v-if="weather" class="weather-info">
          <div class="weather-icon">{{ getWeatherIcon(weather.text) }}</div>
          <div class="weather-details">
            <span class="weather-temp">{{ weather.temperature }}°C</span>
            <span class="weather-text">{{ weather.text }}</span>
            <span v-if="weather.isSimulated" class="weather-note">（模拟数据）</span>
          </div>
        </div>
        
        <!-- 结果展示 -->
        <div v-if="selectedClothing" class="result-container">
          <div class="result-card">
            <div class="result-icon">✨</div>
            <h3 class="result-title">{{ selectedClothing.style }}</h3>
            <div class="result-tags">
              <span class="tag">{{ selectedClothing.season }}季</span>
              <span class="tag">{{ selectedClothing.gender === 'male' ? '男士' : selectedClothing.gender === 'female' ? '女士' : '通用' }}</span>
              <span class="tag">{{ selectedClothing.tempRange[0] }}-{{ selectedClothing.tempRange[1] }}°C</span>
            </div>
            <p class="result-description">{{ selectedClothing.description }}</p>
            
            <div class="clothing-items">
              <h4 class="items-title">穿搭清单</h4>
              <div class="items-list">
                <div
                  v-for="(item, index) in selectedClothing.items"
                  :key="index"
                  class="clothing-item"
                >
                  <span class="item-number">{{ index + 1 }}</span>
                  <span class="item-name">{{ item }}</span>
                </div>
              </div>
            </div>
            
            <div class="result-details">
              <!-- 快速模式显示 -->
              <template v-if="mode === 'fast'">
                <div class="detail-item">
                  <span class="detail-label">适合场合</span>
                  <span class="detail-value">{{ selectedClothing.occasion?.join('、') }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">星座匹配</span>
                  <span class="detail-value">{{ selectedClothing.zodiacMatch?.join('、') }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">匹配度</span>
                  <div class="match-bar">
                    <div class="match-fill" :style="{ width: `${selectedClothing.weight || 85}%` }"></div>
                  </div>
                </div>
              </template>
              
              <!-- 智能模式显示 -->
              <template v-else-if="mode === 'smart'">
                <div v-if="selectedClothing.reason" class="ai-reason">
                  <h4>🎯 推荐理由</h4>
                  <p>{{ selectedClothing.reason }}</p>
                </div>
                <div v-if="selectedClothing.occasion" class="detail-item">
                  <span class="detail-label">适合场合</span>
                  <span class="detail-value">{{ Array.isArray(selectedClothing.occasion) ? selectedClothing.occasion.join('、') : selectedClothing.occasion }}</span>
                </div>
                <div v-if="selectedClothing.zodiacMatch" class="detail-item">
                  <span class="detail-label">星座匹配</span>
                  <span class="detail-value">{{ Array.isArray(selectedClothing.zodiacMatch) ? selectedClothing.zodiacMatch.join('、') : selectedClothing.zodiacMatch }}</span>
                </div>
              </template>
            </div>
          </div>
          
          <!-- 其他推荐 -->
          <div v-if="alternatives.length > 0" class="alternatives">
            <h4 class="alternatives-title">其他推荐</h4>
            <div class="alternatives-list">
              <div
                v-for="clothing in alternatives"
                :key="clothing.id"
                class="alternative-item"
                @click="selectClothing(clothing)"
              >
                <span class="alternative-name">{{ clothing.style }}</span>
                <span class="alternative-temp">{{ clothing.tempRange[0] }}-{{ clothing.tempRange[1] }}°C</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-else class="loading-container">
          <div class="loading-spinner"></div>
          <p v-if="mode === 'smart'">AI正在为您生成个性化搭配...</p>
          <p v-else>正在为您搭配服装...</p>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-primary" @click="regenerate">
          <span>🎲</span>
          <span>重新选择</span>
        </button>
      </div>
    </div>
    
    <!-- 设置弹窗 -->
    <Settings
      v-if="showSettings"
      @close="showSettings = false"
      @saved="handleSettingsSaved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { clothing, filterClothing, getSeasonByMonth } from '../data/clothing.js'
import { smartSelect, smartSelectMultiple, getCurrentSeason } from '../utils/algorithm.js'
import { getCurrentWeather } from '../utils/weather.js'
import {
  isLLMAvailable,
  callLLM,
  generateClothingPrompt,
  getCachedRecommendation,
  cacheRecommendation
} from '../utils/llm.js'
import Settings from './Settings.vue'

const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const mode = ref('fast')
const selectedClothing = ref(null)
const alternatives = ref([])
const weather = ref(null)
const loading = ref(false)
const showSettings = ref(false)
const llmAvailable = ref(false)

const selectClothing = (item) => {
  selectedClothing.value = item
}

const switchMode = async (newMode) => {
  if (newMode === 'smart' && !llmAvailable.value) {
    showSettings.value = true
    return
  }
  
  mode.value = newMode
  await regenerate()
}

const regenerate = async () => {
  selectedClothing.value = null
  alternatives.value = []
  loading.value = true
  
  setTimeout(async () => {
    try {
      if (mode.value === 'smart') {
        await generateSmartRecommendation()
      } else {
        generateFastRecommendation()
      }
    } catch (error) {
      console.error('生成推荐失败:', error)
      alert(`生成失败: ${error.message}\n\n将切换到快速模式`)
      mode.value = 'fast'
      generateFastRecommendation()
    } finally {
      loading.value = false
    }
  }, 300)
}

const getWeatherIcon = (text) => {
  const iconMap = {
    '晴': '☀️',
    '多云': '⛅',
    '阴': '☁️',
    '小雨': '🌧️',
    '中雨': '🌧️',
    '大雨': '⛈️',
    '雷阵雨': '⛈️',
    '阵雨': '🌦️',
    '雪': '❄️'
  }
  return iconMap[text] || '🌤️'
}

const generateFastRecommendation = () => {
  // 获取当前季节
  const currentSeason = getCurrentSeason()
  const month = new Date().getMonth() + 1
  const season = getSeasonByMonth(month)
  
  // 筛选符合条件的服装
  let candidateClothing = clothing
  
  // 如果有天气数据，根据温度筛选
  if (weather.value) {
    candidateClothing = filterClothing({
      gender: props.userInfo.gender,
      temperature: weather.value.temperature
    })
  } else {
    // 否则根据季节筛选
    candidateClothing = filterClothing({
      gender: props.userInfo.gender,
      season: season
    })
  }
  
  // 如果筛选结果太少,放宽条件
  if (candidateClothing.length < 5) {
    candidateClothing = clothing.filter(c => 
      c.gender === props.userInfo.gender || c.gender === 'unisex'
    )
  }
  
  // 使用智能算法选择
  const context = {
    season: currentSeason,
    temperature: weather.value?.temperature,
    type: 'clothing'
  }
  
  const selected = smartSelect(candidateClothing, props.userInfo, context)
  selectedClothing.value = selected
  
  // 选择其他推荐
  const remaining = candidateClothing.filter(c => c.id !== selected.id)
  alternatives.value = smartSelectMultiple(remaining, props.userInfo, context, 3)
}

const generateSmartRecommendation = async () => {
  const userId = props.userInfo.birthDate // 使用生日作为用户ID
  
  // 检查缓存
  const cached = getCachedRecommendation('clothing', userId)
  if (cached) {
    selectedClothing.value = cached
    if (cached.alternatives) {
      alternatives.value = cached.alternatives
    }
    return
  }
  
  // 生成prompt
  const currentSeason = getCurrentSeason()
  const context = {
    season: currentSeason,
    temperature: weather.value?.temperature
  }
  
  const prompt = generateClothingPrompt(props.userInfo, context)
  
  // 调用LLM
  const result = await callLLM(prompt)
  
  // 处理返回结果
  selectedClothing.value = {
    style: result.style,
    description: result.description,
    reason: result.reason,
    items: result.items || [],
    occasion: result.occasion || [],
    zodiacMatch: result.zodiacMatch || [],
    season: result.season,
    gender: props.userInfo.gender,
    tempRange: result.tempRange || [15, 25],
    weight: result.weight || 85
  }
  
  // 处理备选方案
  if (result.alternatives && Array.isArray(result.alternatives)) {
    alternatives.value = result.alternatives.map((alt, index) => ({
      id: `alt-${index}`,
      style: alt.style,
      description: alt.reason || '',
      tempRange: alt.tempRange || [15, 25]
    }))
  }
  
  // 缓存结果
  cacheRecommendation('clothing', userId, {
    ...selectedClothing.value,
    alternatives: alternatives.value
  })
}

const handleSettingsSaved = () => {
  // 设置保存后，更新LLM可用状态
  llmAvailable.value = isLLMAvailable()
}

onMounted(async () => {
  // 检查LLM是否可用
  llmAvailable.value = isLLMAvailable()
  
  // 获取天气信息
  try {
    weather.value = await getCurrentWeather()
  } catch (error) {
    console.error('获取天气失败:', error)
  }
  
  // 延迟一下，增加悬念感
  setTimeout(async () => {
    loading.value = true
    try {
      if (mode.value === 'smart' && llmAvailable.value) {
        await generateSmartRecommendation()
      } else {
        generateFastRecommendation()
      }
    } catch (error) {
      console.error('生成推荐失败:', error)
      mode.value = 'fast'
      generateFastRecommendation()
    } finally {
      loading.value = false
    }
  }, 500)
})
</script>

<style scoped>
.selector-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: relative;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.4s ease;
  z-index: 1;
}

/* 禁用滚动容器上的发光边框效果 */
.modal-content.card::before {
  display: none;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  background: var(--bg-hover);
  color: var(--text-secondary);
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.close-btn:hover {
  background: var(--primary-color);
  color: var(--text-primary);
  transform: rotate(90deg);
}

.modal-header {
  text-align: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.title-icon {
  font-size: 32px;
}

.modal-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
}

/* 模式选择器样式 */
.mode-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 12px;
  background: var(--bg-hover);
  border-radius: 12px;
}

.mode-tabs {
  display: flex;
  gap: 8px;
  flex: 1;
}

.mode-tab {
  flex: 1;
  padding: 10px 16px;
  background: var(--bg-dark);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
}

.mode-tab:hover:not(:disabled) {
  border-color: var(--primary-color);
}

.mode-tab.active {
  border-color: var(--primary-color);
  background: rgba(0, 212, 255, 0.1);
  box-shadow: 0 0 15px var(--glow-color);
}

.mode-tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mode-icon {
  font-size: 18px;
}

.mode-name {
  font-size: 14px;
  font-weight: 500;
}

.mode-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 2px 6px;
  background: var(--accent-color);
  border-radius: 10px;
  font-size: 10px;
  color: white;
}

.settings-btn {
  width: 40px;
  height: 40px;
  background: var(--bg-dark);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.settings-btn:hover {
  border-color: var(--primary-color);
  background: rgba(0, 212, 255, 0.1);
}

.modal-body {
  min-height: 300px;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-hover);
  border-radius: 12px;
  margin-bottom: 24px;
}

.weather-icon {
  font-size: 48px;
}

.weather-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.weather-temp {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.weather-text {
  color: var(--text-secondary);
  font-size: 14px;
}

.weather-note {
  color: var(--text-secondary);
  font-size: 12px;
  font-style: italic;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 20px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.result-container {
  animation: fadeIn 0.5s ease;
}

.result-card {
  text-align: center;
  padding: 32px 24px;
  background: linear-gradient(135deg, var(--bg-hover), var(--bg-card));
  border-radius: 12px;
  margin-bottom: 24px;
}

.result-icon {
  font-size: 64px;
  margin-bottom: 16px;
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.result-title {
  font-size: 32px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 12px;
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-size: 12px;
  color: var(--text-secondary);
}

.result-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.clothing-items {
  margin-bottom: 24px;
}

.items-title {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--text-primary);
  text-align: left;
}

.items-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.clothing-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-dark);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.clothing-item:hover {
  border-color: var(--primary-color);
  transform: translateX(4px);
}

.item-number {
  width: 24px;
  height: 24px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.item-name {
  font-size: 14px;
}

/* AI推荐理由样式 */
.ai-reason {
  padding: 16px;
  background: var(--bg-dark);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  margin-bottom: 12px;
}

.ai-reason h4 {
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--primary-color);
}

.ai-reason p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.detail-label {
  color: var(--text-secondary);
  font-size: 14px;
}

.detail-value {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 14px;
  text-align: right;
}

.match-bar {
  width: 120px;
  height: 8px;
  background: var(--bg-dark);
  border-radius: 4px;
  overflow: hidden;
}

.match-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  transition: width 1s ease;
  border-radius: 4px;
}

.alternatives {
  margin-top: 24px;
}

.alternatives-title {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--text-secondary);
}

.alternatives-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.alternative-item {
  padding: 12px 16px;
  background: var(--bg-hover);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.alternative-item:hover {
  background: var(--bg-card);
  border-left: 3px solid var(--primary-color);
  padding-left: 13px;
}

.alternative-name {
  font-weight: 500;
}

.alternative-temp {
  color: var(--text-secondary);
  font-size: 12px;
}

.modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.modal-footer .btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
  }
  
  .result-title {
    font-size: 24px;
  }
  
  .result-icon {
    font-size: 48px;
  }
  
  .items-list {
    grid-template-columns: 1fr;
  }
}
</style>

