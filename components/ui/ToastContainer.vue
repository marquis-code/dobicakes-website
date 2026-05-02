<template>
  <div class="fixed top-6 right-6 z-[100] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
    <TransitionGroup 
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-4 p-4 bg-white shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-l-4 overflow-hidden"
        :class="{
          'border-brand-gold': toast.toastType === 'success' || toast.toastType === 'info',
          'border-red-500': toast.toastType === 'error',
          'border-yellow-500': toast.toastType === 'warning'
        }"
      >
        <div class="flex-1 space-y-1">
          <h4 class="text-[10px] font-bold  tracking-widest text-brand-charcoal">{{ toast.title }}</h4>
          <p class="text-[11px] text-brand-muted font-light">{{ toast.message }}</p>
        </div>
        <button @click="removeToast(toast.id)" class="text-brand-muted hover:text-brand-charcoal transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const toasts = useState<any[]>('global_toasts', () => []);

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter(t => t.id !== id);
};
</script>
