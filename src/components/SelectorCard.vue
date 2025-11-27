<template>
  <div class="selector-card card" @click="$emit('click')">
    <div class="card-icon">{{ icon }}</div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    <div class="card-arrow">→</div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.selector-card {
  cursor: pointer;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 32px 24px;
}

.selector-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.selector-card:hover::after {
  opacity: 0.1;
}

.selector-card:active {
  transform: scale(0.98);
}

.card-icon {
  font-size: 64px;
  margin-bottom: 16px;
  display: inline-block;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.selector-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.card-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.card-arrow {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 24px;
  color: var(--primary-color);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.selector-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .selector-card {
    padding: 24px 16px;
  }
  
  .card-icon {
    font-size: 48px;
  }
  
  .card-title {
    font-size: 20px;
  }
  
  .card-description {
    font-size: 13px;
  }
}
</style>

