<template>
  <div class="settings-modal">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-content card">
      <button class="close-btn" @click="$emit('close')">✕</button>
      
      <div class="modal-header">
        <h2 class="modal-title">
          <span class="title-icon">⚙️</span>
          智能模式设置
        </h2>
        <p class="modal-subtitle">配置大语言模型API，开启AI智能推荐</p>
      </div>
      
      <div class="modal-body">
        <!-- 模式开关 -->
        <div class="setting-section">
          <div class="setting-header">
            <h3>启用智能模式</h3>
            <label class="switch">
              <input
                v-model="config.enabled"
                type="checkbox"
                @change="handleToggle"
              />
              <span class="slider"></span>
            </label>
          </div>
          <p class="setting-desc">
            开启后将使用AI大模型生成个性化推荐，需要配置API Key
          </p>
        </div>
        
        <!-- LLM提供商选择 - 仅DeepSeek -->
        <div v-if="config.enabled" class="setting-section">
          <h3>AI服务商</h3>
          <div class="provider-info-display">
            <div class="provider-badge">
              <span class="provider-name">🤖 DeepSeek</span>
              <span class="provider-model">deepseek-chat</span>
            </div>
            <p class="provider-desc">高性价比的国产大模型，支持中文，响应速度快</p>
          </div>
        </div>
        
        <!-- API Key配置 -->
        <div v-if="config.enabled" class="setting-section">
          <h3>API Key</h3>
          <div class="api-key-input">
            <input
              v-model="config.apiKey"
              :type="showApiKey ? 'text' : 'password'"
              class="input"
              placeholder="请输入您的API Key"
            />
            <button
              class="toggle-visibility"
              @click="showApiKey = !showApiKey"
            >
              {{ showApiKey ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <p class="setting-desc">
            💡 如何获取API Key？
            <a href="https://platform.deepseek.com/api_keys" target="_blank" class="link">前往 DeepSeek 官网获取</a>
          </p>
        </div>
        
        <!-- 功能说明 -->
        <div class="feature-info">
          <h4>✨ 智能模式特点</h4>
          <ul class="feature-list">
            <li>🎯 <strong>深度分析</strong>：结合八字、星座进行命理分析</li>
            <li>🍽️ <strong>实时推荐</strong>：每次生成全新的个性化内容</li>
            <li>📝 <strong>详细说明</strong>：提供推荐理由、营养价值等</li>
            <li>🏪 <strong>实用信息</strong>：告诉你哪里可以吃到/买到</li>
          </ul>
          
          <h4>⚡ 快速模式特点</h4>
          <ul class="feature-list">
            <li>🚀 <strong>秒速响应</strong>：无需等待，瞬间出结果</li>
            <li>💰 <strong>完全免费</strong>：无任何费用</li>
            <li>🔒 <strong>隐私安全</strong>：数据不发送任何服务器</li>
            <li>📚 <strong>经典数据</strong>：55+精选菜品和穿搭</li>
          </ul>
        </div>
        
        <!-- 隐私说明 -->
        <div class="privacy-notice">
          <h4>🔒 隐私与安全</h4>
          <ul class="notice-list">
            <li>API Key仅保存在您的浏览器本地</li>
            <li>不会上传到我们的服务器</li>
            <li>仅在调用AI时发送到对应的LLM服务商</li>
            <li>您可以随时删除或更换API Key</li>
          </ul>
        </div>
        
        <!-- 成本说明 -->
        <div v-if="config.enabled" class="cost-info">
          <h4>💰 预估费用</h4>
          <p>以OpenAI GPT-3.5-turbo为例：</p>
          <ul class="cost-list">
            <li>每次推荐：约 ¥0.01-0.02</li>
            <li>每天使用3次：约 ¥0.03-0.06</li>
            <li>每月使用：约 ¥1-2</li>
          </ul>
          <p class="cost-note">其他服务商费用可能不同，请查看官方定价</p>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="handleCancel">
          取消
        </button>
        <button class="btn btn-primary" @click="handleSave">
          <span v-if="saving">保存中...</span>
          <span v-else>保存设置</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLLMConfig, saveLLMConfig } from '../utils/llm.js'

const emit = defineEmits(['close', 'saved'])

const config = ref({
  enabled: false,
  provider: 'openai',
  apiKey: ''
})

const showApiKey = ref(false)
const saving = ref(false)

const handleToggle = () => {
  if (!config.value.enabled) {
    config.value.apiKey = ''
  }
}

const handleCancel = () => {
  emit('close')
}

const handleSave = async () => {
  // 验证
  if (config.value.enabled && !config.value.apiKey) {
    alert('请输入API Key')
    return
  }
  
  saving.value = true
  
  try {
    // 保存配置
    saveLLMConfig(config.value)
    
    // 模拟保存延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    emit('saved', config.value)
    emit('close')
  } catch (error) {
    alert('保存失败: ' + error.message)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  // 加载配置
  const saved = getLLMConfig()
  config.value = { ...saved }
  // 确保provider为deepseek
  config.value.provider = 'deepseek'
})
</script>

<style scoped>
.settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
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
  margin-bottom: 32px;
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
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.setting-section {
  padding: 20px;
  background: var(--bg-hover);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.setting-section h3 {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.setting-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: 0.4s;
  border-radius: 26px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: var(--gradient-accent);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* 提供商信息展示 */
.provider-info-display {
  padding: 16px;
  background: var(--bg-dark);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
}

.provider-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.provider-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.provider-name {
  font-weight: 600;
  font-size: 16px;
}

.provider-model {
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--bg-card);
  padding: 4px 8px;
  border-radius: 4px;
}

/* API Key输入 */
.api-key-input {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.api-key-input .input {
  flex: 1;
}

.toggle-visibility {
  padding: 0 16px;
  background: var(--bg-dark);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 20px;
}

.toggle-visibility:hover {
  border-color: var(--primary-color);
}

.link {
  color: var(--primary-color);
  text-decoration: none;
  transition: all 0.3s ease;
}

.link:hover {
  text-decoration: underline;
}

/* 功能说明 */
.feature-info,
.privacy-notice,
.cost-info {
  padding: 16px;
  background: var(--bg-card);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.feature-info h4,
.privacy-notice h4,
.cost-info h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.feature-list,
.notice-list,
.cost-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-list li,
.notice-list li,
.cost-list li {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.cost-info p {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 8px 0;
}

.cost-note {
  font-size: 12px;
  font-style: italic;
  color: var(--text-secondary);
  margin-top: 12px;
}

/* 页脚 */
.modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-secondary {
  padding: 12px 24px;
  background: var(--bg-hover);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.btn-secondary:hover {
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
  }
}
</style>

