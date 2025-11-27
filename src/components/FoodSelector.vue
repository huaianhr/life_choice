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
              <div class="detail-item">
                <span class="detail-label">适合季节</span>
                <span class="detail-value">{{ selectedFood.seasons.join('、') }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">五行属性</span>
                <span class="detail-value">{{ selectedFood.elements.join('、') }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">匹配度</span>
                <div class="match-bar">
                  <div class="match-fill" :style="{ width: `${selectedFood.weight || 80}%` }"></div>
                </div>
              </div>
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
          <p>正在为您精选美食...</p>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-primary" @click="regenerate">
          <span>🎲</span>
          <span>重新选择</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { foods, filterFoods, getCurrentSeason } from '../data/foods.js'
import { smartSelect, smartSelectMultiple } from '../utils/algorithm.js'

const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const selectedFood = ref(null)
const alternatives = ref([])
const season = ref(getCurrentSeason())

const selectFood = (food) => {
  selectedFood.value = food
}

const regenerate = () => {
  selectedFood.value = null
  setTimeout(() => {
    generateRecommendation()
  }, 300)
}

const generateRecommendation = () => {
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

onMounted(() => {
  // 延迟一下，增加悬念感
  setTimeout(() => {
    generateRecommendation()
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

