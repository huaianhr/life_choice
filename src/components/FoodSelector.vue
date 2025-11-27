<template>
  <div class="selector-modal">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-content card">
      <button class="close-btn" @click="$emit('close')">✕</button>
      
      <div class="modal-header">
        <h2 class="modal-title">
          <span class="title-icon">🍜</span>
          中午吃什么
        </h2>
        <p class="modal-subtitle">基于您的五行属性和当前季节为您推荐</p>
        
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
        <!-- 结果展示 -->
        <div v-if="selectedFood" class="result-container">
          <div class="result-card">
            <div class="result-icon">🎉</div>
            <h3 class="result-title">{{ selectedFood.name }}</h3>
            <div class="result-tags">
              <span class="tag">{{ selectedFood.category }}</span>
              <span class="tag">{{ selectedFood.temperature === 'hot' ? '热食' : selectedFood.temperature === 'warm' ? '温食' : '凉食' }}</span>
              <span v-for="tag in selectedFood.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <p class="result-description">{{ selectedFood.description }}</p>
            
            <div class="result-details">
              <!-- 快速模式显示 -->
              <template v-if="mode === 'fast'">
                <div class="detail-item">
                  <span class="detail-label">适合季节</span>
                  <span class="detail-value">{{ selectedFood.seasons?.join('、') }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">五行属性</span>
                  <span class="detail-value">{{ selectedFood.elements?.join('、') }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">匹配度</span>
                  <div class="match-bar">
                    <div class="match-fill" :style="{ width: `${selectedFood.weight || 80}%` }"></div>
                  </div>
                </div>
              </template>
              
              <!-- 智能模式显示 -->
              <template v-else-if="mode === 'smart'">
                <div v-if="selectedFood.reason" class="ai-reason">
                  <h4>🎯 推荐理由</h4>
                  <p>{{ selectedFood.reason }}</p>
                </div>
                <div v-if="selectedFood.nutrition" class="detail-item">
                  <span class="detail-label">营养价值</span>
                  <span class="detail-value">{{ selectedFood.nutrition }}</span>
                </div>
                <div v-if="selectedFood.price" class="detail-item">
                  <span class="detail-label">价格区间</span>
                  <span class="detail-value">{{ selectedFood.price }}</span>
                </div>
                <div v-if="selectedFood.restaurant" class="detail-item">
                  <span class="detail-label">推荐地点</span>
                  <span class="detail-value">{{ selectedFood.restaurant }}</span>
                </div>
              </template>
            </div>
          </div>
          
          <!-- 其他推荐 -->
          <div v-if="alternatives.length > 0" class="alternatives">
            <h4 class="alternatives-title">其他推荐</h4>
            <div class="alternatives-list">
              <div
                v-for="food in alternatives"
                :key="food.id"
                class="alternative-item"
                @click="selectFood(food)"
              >
                <span class="alternative-name">{{ food.name }}</span>
                <span class="alternative-category">{{ food.category }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-else class="loading-container">
          <div class="loading-spinner"></div>
          <p v-if="mode === 'smart'">AI正在为您生成个性化推荐...</p>
          <p v-else>正在为您精选美食...</p>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-primary" @click="regenerate" :disabled="loading">
          <span>🎲</span>
          <span v-if="loading">生成中...</span>
          <span v-else>重新选择</span>
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
import { foods, filterFoods, getCurrentSeason } from '../data/foods.js'
import { smartSelect, smartSelectMultiple } from '../utils/algorithm.js'
import {
  isLLMAvailable,
  callLLM,
  generateFoodPrompt,
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

const mode = ref('fast') // fast 或 smart
const selectedFood = ref(null)
const alternatives = ref([])
const season = ref(getCurrentSeason())
const loading = ref(false)
const showSettings = ref(false)
const llmAvailable = ref(false)

const selectFood = (food) => {
  selectedFood.value = food
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
  selectedFood.value = null
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

const generateFastRecommendation = () => {
  // 获取当前季节
  const currentSeason = getCurrentSeason()
  
  // 筛选符合季节的食物
  const seasonalFoods = filterFoods({ season: currentSeason })
  
  // 如果季节筛选结果太少，使用全部食物
  const candidateFoods = seasonalFoods.length > 10 ? seasonalFoods : foods
  
  // 使用智能算法选择主推荐
  const context = {
    season: currentSeason,
    type: 'food'
  }
  
  const selected = smartSelect(candidateFoods, props.userInfo, context)
  selectedFood.value = selected
  
  // 选择其他推荐（排除已选中的）
  const remaining = candidateFoods.filter(f => f.id !== selected.id)
  alternatives.value = smartSelectMultiple(remaining, props.userInfo, context, 3)
}

const generateSmartRecommendation = async () => {
  const userId = props.userInfo.birthDate // 使用生日作为用户ID
  
  // 检查缓存
  const cached = getCachedRecommendation('food', userId)
  if (cached) {
    selectedFood.value = cached
    if (cached.alternatives) {
      alternatives.value = cached.alternatives
    }
    return
  }
  
  // 生成prompt
  const currentSeason = getCurrentSeason()
  const context = {
    season: currentSeason,
    temperature: null
  }
  
  const prompt = generateFoodPrompt(props.userInfo, context)
  
  // 调用LLM
  const result = await callLLM(prompt)
  
  // 处理返回结果
  selectedFood.value = {
    name: result.name,
    category: result.category,
    description: result.description,
    reason: result.reason,
    nutrition: result.nutrition,
    temperature: result.temperature,
    tags: result.tags || [],
    price: result.price,
    restaurant: result.restaurant
  }
  
  // 处理备选方案
  if (result.alternatives && Array.isArray(result.alternatives)) {
    alternatives.value = result.alternatives.map((alt, index) => ({
      id: `alt-${index}`,
      name: alt.name,
      category: result.category,
      description: alt.reason || ''
    }))
  }
  
  // 缓存结果
  cacheRecommendation('food', userId, {
    ...selectedFood.value,
    alternatives: alternatives.value
  })
}

const handleSettingsSaved = () => {
  // 重新检查LLM可用性
  llmAvailable.value = isLLMAvailable()
}

onMounted(() => {
  // 检查LLM可用性
  llmAvailable.value = isLLMAvailable()
  
  // 延迟一下，增加悬念感
  setTimeout(() => {
    if (mode.value === 'smart' && llmAvailable.value) {
      generateSmartRecommendation().catch(error => {
        console.error('智能推荐失败:', error)
        mode.value = 'fast'
        generateFastRecommendation()
      })
    } else {
      generateFastRecommendation()
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

/* 模式选择器 */
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

.result-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

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

.alternative-category {
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
}
</style>

