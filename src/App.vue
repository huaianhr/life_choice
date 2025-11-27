<template>
  <div class="app-container">
    <!-- 背景粒子效果 -->
    <div class="particles"></div>
    
    <!-- 头部 -->
    <header class="app-header">
      <h1 class="app-title">
        <span class="title-icon">🎯</span>
        人生选择器
      </h1>
      <p class="app-subtitle">让命运为你做选择</p>
    </header>

    <!-- 主内容 -->
    <main class="app-main">
      <!-- 用户信息模块 -->
      <UserInfo 
        v-if="!userInfo" 
        @submit="handleUserInfoSubmit"
      />

      <!-- 选择器模块 -->
      <div v-else class="selector-container">
        <div class="user-welcome">
          <h2>欢迎回来，{{ userInfo.name }}</h2>
          <p>{{ zodiacInfo }} | {{ baziInfo }}</p>
          <button class="btn-reset" @click="resetUserInfo">重新设置</button>
        </div>

        <!-- 选择器选项 -->
        <div class="selector-grid">
          <SelectorCard
            title="中午吃什么"
            icon="🍜"
            description="结合季节和五行，为你推荐最适合的午餐"
            @click="showSelector('food')"
          />
          <SelectorCard
            title="约会穿什么"
            icon="👔"
            description="根据今日气温和你的风格，推荐完美穿搭"
            @click="showSelector('clothing')"
          />
          <SelectorCard
            title="彩票选号器"
            icon="🎲"
            description="基于你的幸运数字，生成中奖号码"
            @click="showSelector('lottery')"
          />
        </div>

        <!-- 选择器结果展示 -->
        <transition name="fade">
          <FoodSelector 
            v-if="currentSelector === 'food'"
            :userInfo="userInfo"
            @close="currentSelector = null"
          />
          <ClothingSelector 
            v-else-if="currentSelector === 'clothing'"
            :userInfo="userInfo"
            @close="currentSelector = null"
          />
          <LotterySelector 
            v-else-if="currentSelector === 'lottery'"
            :userInfo="userInfo"
            @close="currentSelector = null"
          />
        </transition>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <p>© 2025 人生选择器 | 让科技遇见命运</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import UserInfo from './components/UserInfo.vue'
import SelectorCard from './components/SelectorCard.vue'
import FoodSelector from './components/FoodSelector.vue'
import ClothingSelector from './components/ClothingSelector.vue'
import LotterySelector from './components/LotterySelector.vue'
import { getZodiac } from './utils/zodiac.js'
import { getBazi } from './utils/bazi.js'

// 状态管理
const userInfo = ref(null)
const currentSelector = ref(null)

// 计算属性
const zodiacInfo = computed(() => {
  if (!userInfo.value) return ''
  return `星座：${getZodiac(userInfo.value.birthDate)}`
})

const baziInfo = computed(() => {
  if (!userInfo.value) return ''
  const bazi = getBazi(userInfo.value.birthDate)
  return `五行：${bazi.mainElement}`
})

// 方法
const handleUserInfoSubmit = (info) => {
  userInfo.value = info
  // 保存到本地存储
  localStorage.setItem('userInfo', JSON.stringify(info))
}

const resetUserInfo = () => {
  if (confirm('确定要重新设置个人信息吗？')) {
    userInfo.value = null
    localStorage.removeItem('userInfo')
  }
}

const showSelector = (type) => {
  currentSelector.value = type
}

// 生命周期
onMounted(() => {
  // 从本地存储恢复用户信息
  const saved = localStorage.getItem('userInfo')
  if (saved) {
    try {
      userInfo.value = JSON.parse(saved)
    } catch (e) {
      console.error('恢复用户信息失败', e)
    }
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

/* 粒子背景效果 */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

/* 头部样式 */
.app-header {
  text-align: center;
  padding: 60px 20px 40px;
  position: relative;
  z-index: 1;
}

.app-title {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.title-icon {
  font-size: 56px;
  filter: drop-shadow(0 0 20px var(--glow-color));
}

.app-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  letter-spacing: 4px;
}

/* 主内容 */
.app-main {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 用户欢迎区 */
.user-welcome {
  text-align: center;
  margin-bottom: 40px;
  padding: 24px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.user-welcome h2 {
  font-size: 28px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, var(--primary-color), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-welcome p {
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.btn-reset {
  padding: 8px 20px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-reset:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* 选择器网格 */
.selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

/* 页脚 */
.app-footer {
  text-align: center;
  padding: 32px 20px;
  color: var(--text-secondary);
  font-size: 14px;
  position: relative;
  z-index: 1;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-title {
    font-size: 36px;
  }
  
  .title-icon {
    font-size: 42px;
  }
  
  .app-subtitle {
    font-size: 14px;
    letter-spacing: 2px;
  }
  
  .selector-grid {
    grid-template-columns: 1fr;
  }
}
</style>

