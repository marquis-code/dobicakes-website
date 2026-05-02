<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-charcoal/60 backdrop-blur-sm">
      <div class="bg-white w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
        <div class="p-8 text-center space-y-6">
          <div class="flex justify-center">
            <div class="w-16 h-16 rounded-full flex items-center justify-center border-2"
                 :class="{
                   'border-brand-gold text-brand-gold': alertConfig.type === 'success' || alertConfig.type === 'info',
                   'border-red-500 text-red-500': alertConfig.type === 'error',
                   'border-yellow-500 text-yellow-500': alertConfig.type === 'warning'
                 }">
              <svg v-if="alertConfig.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <svg v-else-if="alertConfig.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-lg font-serif tracking-tight text-brand-charcoal ">{{ alertConfig.title }}</h3>
            <p class="text-sm text-brand-muted leading-relaxed font-light">{{ alertConfig.message }}</p>
          </div>

          <div class="pt-4 flex flex-col gap-3">
            <button 
              @click="onConfirm" 
              class="w-full py-4 bg-brand-charcoal text-white text-[10px] font-bold  tracking-[0.3em] hover:bg-brand-gold transition-all duration-500 shadow-lg"
            >
              {{ alertConfig.confirmText || 'Understand' }}
            </button>
            <button 
              v-if="alertConfig.showCancel"
              @click="onCancel" 
              class="w-full py-4 border border-gray-100 text-brand-muted text-[10px] font-bold  tracking-[0.3em] hover:bg-gray-50 transition-all duration-500"
            >
              {{ alertConfig.cancelText || 'Cancel' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const isOpen = useState('custom_alert_open', () => false);
const alertConfig = useState<any>('custom_alert_config', () => ({}));

const onConfirm = () => {
  if (alertConfig.value.confirmCallback) alertConfig.value.confirmCallback();
  isOpen.value = false;
};

const onCancel = () => {
  if (alertConfig.value.cancelCallback) alertConfig.value.cancelCallback();
  isOpen.value = false;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
