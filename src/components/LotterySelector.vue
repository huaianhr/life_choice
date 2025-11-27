<template>
  <div class="selector-modal">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-content card">
      <button class="close-btn" @click="$emit('close')">✕</button>
      
      <div class="modal-header">
        <h2 class="modal-title">
          <span class="title-icon">🎲</span>
          彩票选号器
        </h2>
        <p class="modal-subtitle">基于您的幸运数字生成中奖号码</p>
      </div>
      
      <div class="modal-body">
        <!-- 彩票类型选择 -->
        <div class="lottery-types">
          <button
            v-for="type in lotteryTypes"
            :key="type.id"
            class="type-btn"
            :class="{ active: selectedType === type.id }"
            @click="selectType(type.id)"
          >
            <span class="type-icon">{{ type.icon }}</span>
            <span class="type-name">{{ type.name }}</span>
          </button>
        </div>
        
        <!-- 结果展示 -->
        <div v-if="lotteryResult" class="result-container">
          <!-- 双色球 -->
          <div v-if="lotteryResult.type === '双色球'" class="result-card">
            <h3 class="result-title">{{ lotteryResult.type }}</h3>
            <div class="ssq-balls">
              <div class="ball-group">
                <span class="ball-label">红球</span>
                <div class="balls-container">
                  <div
                    v-for="num in lotteryResult.red"
                    :key="`red-${num}`"
                    class="ball red-ball"
                  >
                    {{ String(num).padStart(2, '0') }}
                  </div>
                </div>
              </div>
              <div class="ball-group">
                <span class="ball-label">蓝球</span>
                <div class="balls-container">
                  <div class="ball blue-ball">
                    {{ String(lotteryResult.blue).padStart(2, '0') }}
                  </div>
                </div>
              </div>
            </div>
            <p class="result-description">{{ lotteryResult.description }}</p>
          </div>
          
          <!-- 大乐透 -->
          <div v-else-if="lotteryResult.type === '大乐透'" class="result-card">
            <h3 class="result-title">{{ lotteryResult.type }}</h3>
            <div class="dlt-balls">
              <div class="ball-group">
                <span class="ball-label">前区</span>
                <div class="balls-container">
                  <div
                    v-for="num in lotteryResult.front"
                    :key="`front-${num}`"
                    class="ball red-ball"
                  >
                    {{ String(num).padStart(2, '0') }}
                  </div>
                </div>
              </div>
              <div class="ball-group">
                <span class="ball-label">后区</span>
                <div class="balls-container">
                  <div
                    v-for="num in lotteryResult.back"
                    :key="`back-${num}`"
                    class="ball blue-ball"
                  >
                    {{ String(num).padStart(2, '0') }}
                  </div>
                </div>
              </div>
            </div>
            <p class="result-description">{{ lotteryResult.description }}</p>
          </div>
          
          <!-- 比大小 -->
          <div v-else-if="lotteryResult.type === '比大小'" class="result-card">
            <h3 class="result-title">{{ lotteryResult.type }}</h3>
            <div class="bigsmall-result">
              <div class="prediction-icon">
                {{ lotteryResult.prediction === '大' ? '📈' : '📉' }}
              </div>
              <div class="prediction-text">{{ lotteryResult.prediction }}</div>
              <div class="confidence-bar">
                <span class="confidence-label">置信度</span>
                <div class="confidence-fill-container">
                  <div
                    class="confidence-fill"
                    :style="{ width: `${lotteryResult.confidence}%` }"
                  ></div>
                </div>
                <span class="confidence-value">{{ lotteryResult.confidence }}%</span>
              </div>
            </div>
            <p class="result-description">{{ lotteryResult.description }}</p>
            <div class="element-info">
              <span>五行：{{ lotteryResult.element }}</span>
              <span>星座：{{ lotteryResult.zodiac }}</span>
            </div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-else class="loading-container">
          <div class="loading-spinner"></div>
          <p>正在生成幸运号码...</p>
        </div>
        
        <!-- 提示信息 -->
        <div class="lottery-tips">
          <h4 class="tips-title">💡 温馨提示</h4>
          <ul class="tips-list">
            <li>号码基于您的八字五行和星座生成</li>
            <li>请理性购彩，量力而行</li>
            <li>仅供娱乐参考，不保证中奖</li>
          </ul>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-primary" @click="regenerate">
          <span>🔄</span>
          <span>重新生成</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  generateLotterySSQ,
  generateLotteryDLT,
  predictBigSmall
} from '../utils/algorithm.js'

const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const lotteryTypes = [
  { id: 'ssq', name: '双色球', icon: '🔴' },
  { id: 'dlt', name: '大乐透', icon: '🔵' },
  { id: 'bigsmall', name: '比大小', icon: '⚖️' }
]

const selectedType = ref('ssq')
const lotteryResult = ref(null)

const selectType = (type) => {
  selectedType.value = type
  lotteryResult.value = null
  setTimeout(() => {
    generateResult()
  }, 300)
}

const regenerate = () => {
  lotteryResult.value = null
  setTimeout(() => {
    generateResult()
  }, 300)
}

const generateResult = () => {
  switch (selectedType.value) {
    case 'ssq':
      lotteryResult.value = generateLotterySSQ(props.userInfo)
      break
    case 'dlt':
      lotteryResult.value = generateLotteryDLT(props.userInfo)
      break
    case 'bigsmall':
      lotteryResult.value = predictBigSmall(props.userInfo)
      break
  }
}

onMounted(() => {
  setTimeout(() => {
    generateResult()
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
  max-width: 700px;
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

.modal-body {
  min-height: 300px;
}

.lottery-types {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.type-btn {
  padding: 16px;
  background: var(--bg-hover);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.type-btn:hover {
  border-color: var(--primary-color);
  background: var(--bg-card);
}

.type-btn.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(102, 126, 234, 0.1));
  box-shadow: 0 0 20px var(--glow-color);
}

.type-icon {
  font-size: 32px;
}

.type-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
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
  padding: 32px 24px;
  background: linear-gradient(135deg, var(--bg-hover), var(--bg-card));
  border-radius: 12px;
  margin-bottom: 24px;
}

.result-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 24px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ssq-balls,
.dlt-balls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.ball-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ball-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.balls-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ballDrop 0.6s ease backwards;
}

@keyframes ballDrop {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.ball:nth-child(1) { animation-delay: 0.1s; }
.ball:nth-child(2) { animation-delay: 0.2s; }
.ball:nth-child(3) { animation-delay: 0.3s; }
.ball:nth-child(4) { animation-delay: 0.4s; }
.ball:nth-child(5) { animation-delay: 0.5s; }
.ball:nth-child(6) { animation-delay: 0.6s; }

.red-ball {
  background: linear-gradient(135deg, #ff4757, #ff6348);
  color: white;
}

.blue-ball {
  background: linear-gradient(135deg, #1e90ff, #00bfff);
  color: white;
}

.bigsmall-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.prediction-icon {
  font-size: 80px;
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.prediction-text {
  font-size: 64px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.confidence-bar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
}

.confidence-label {
  font-size: 14px;
  color: var(--text-secondary);
  min-width: 60px;
}

.confidence-fill-container {
  flex: 1;
  height: 12px;
  background: var(--bg-dark);
  border-radius: 6px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  transition: width 1s ease;
  border-radius: 6px;
}

.confidence-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  min-width: 50px;
  text-align: right;
}

.result-description {
  text-align: center;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.element-info {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 14px;
}

.lottery-tips {
  padding: 20px;
  background: var(--bg-hover);
  border-radius: 12px;
  border-left: 4px solid var(--primary-color);
}

.tips-title {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.tips-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tips-list li {
  font-size: 13px;
  color: var(--text-secondary);
  padding-left: 20px;
  position: relative;
}

.tips-list li::before {
  content: '•';
  position: absolute;
  left: 8px;
  color: var(--primary-color);
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
  
  .lottery-types {
    grid-template-columns: 1fr;
  }
  
  .ball {
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
  
  .prediction-text {
    font-size: 48px;
  }
}
</style>

