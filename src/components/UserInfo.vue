<template>
  <div class="user-info-container">
    <div class="card user-info-card">
      <h2 class="card-title">欢迎使用人生选择器</h2>
      <p class="card-subtitle">请填写您的基本信息，让命运为您指引方向</p>
      
      <form @submit.prevent="handleSubmit" class="info-form">
        <div class="form-group">
          <label for="name" class="form-label">
            <span class="label-icon">👤</span>
            姓名
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="input"
            placeholder="请输入您的姓名"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="birthDate" class="form-label">
            <span class="label-icon">🎂</span>
            出生日期
          </label>
          <input
            id="birthDate"
            v-model="formData.birthDate"
            type="date"
            class="input"
            required
            :max="maxDate"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">⚤</span>
            性别
          </label>
          <div class="gender-options">
            <label class="radio-label">
              <input
                v-model="formData.gender"
                type="radio"
                value="male"
                required
              />
              <span class="radio-custom">男</span>
            </label>
            <label class="radio-label">
              <input
                v-model="formData.gender"
                type="radio"
                value="female"
                required
              />
              <span class="radio-custom">女</span>
            </label>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary submit-btn">
          <span>开始探索</span>
          <span class="btn-icon">✨</span>
        </button>
      </form>
      
      <div class="info-tip">
        <p>💡 我们会根据您的八字和星座为您提供个性化建议</p>
        <p>🔒 您的信息仅保存在本地，绝对安全</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['submit'])

const formData = ref({
  name: '',
  birthDate: '',
  gender: 'male'
})

// 最大日期为今天
const maxDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.birthDate) {
    alert('请填写完整信息')
    return
  }
  
  emit('submit', {
    ...formData.value
  })
}
</script>

<style scoped>
.user-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.user-info-card {
  max-width: 500px;
  width: 100%;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 12px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 32px;
  font-size: 14px;
}

.info-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.label-icon {
  font-size: 20px;
}

.gender-options {
  display: flex;
  gap: 16px;
}

.radio-label {
  flex: 1;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  display: none;
}

.radio-custom {
  display: block;
  padding: 12px;
  text-align: center;
  background: var(--bg-dark);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 16px;
}

.radio-label input[type="radio"]:checked + .radio-custom {
  border-color: var(--primary-color);
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary-color);
  box-shadow: 0 0 20px var(--glow-color);
}

.radio-custom:hover {
  border-color: var(--primary-color);
}

.submit-btn {
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
  padding: 16px;
}

.btn-icon {
  font-size: 20px;
  animation: sparkle 1.5s infinite;
}

@keyframes sparkle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.info-tip {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-tip p {
  font-size: 13px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .card-title {
    font-size: 24px;
  }
  
  .submit-btn {
    font-size: 16px;
    padding: 14px;
  }
}
</style>

