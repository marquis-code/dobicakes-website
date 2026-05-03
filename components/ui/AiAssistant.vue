<template>
  <div class="fixed bottom-28 right-8 z-[100] flex flex-col items-end gap-4">
    <!-- Chat Window -->
    <div v-if="isOpen" class="w-[350px] h-[500px] bg-brand-charcoal rounded-lg shadow-2xl border border-white/10 flex flex-col overflow-visible animate-slide-up origin-bottom-right text-white">
      <!-- Header -->
      <div class="bg-brand-gold p-6 text-white flex justify-between items-center shrink-0 rounded-t-lg">
        <div class="flex items-center gap-3">
          <LucideSparkles :size="20" />
          <div>
            <h4 class="text-xs font-bold  tracking-widest">Cake Assistant</h4>
            <p class="text-[8px] text-brand-charcoal font-bold  tracking-widest">Powered by AI</p>
          </div>
        </div>
        <button @click="isOpen = false" class="text-white/50 hover:text-white transition-colors">
          <LucideX :size="18" />
        </button>
      </div>

      <!-- Messages -->
      <div class="flex-grow overflow-y-auto p-6 space-y-4 bg-white/5">
        <div v-for="(msg, i) in messages" :key="i" 
             :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
             class="flex">
          <div :class="msg.role === 'user' ? 'bg-brand-gold/20 border border-brand-gold/30' : 'bg-white/10'"
               class="max-w-[80%] p-3 rounded-sm text-[11px] leading-relaxed">
            {{ msg.content }}
          </div>
        </div>
        <div v-if="loading" class="flex justify-start">
          <div class="bg-white/10 p-3 rounded-sm">
            <div class="flex gap-1">
              <div class="w-1 h-1 bg-white/50 rounded-full animate-bounce"></div>
              <div class="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div class="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-white/10 flex gap-2 shrink-0 items-center rounded-b-lg bg-brand-charcoal">
        <input v-model="userInput" @keyup.enter="handleSend" type="text" placeholder="Ask about flavors, recipes..." class="flex-1 min-w-0 bg-white/5 border-none px-4 py-3 rounded-sm outline-none text-xs focus:bg-white/10 transition-all text-white" />
        <button @click="handleSend" class="shrink-0 bg-brand-gold text-brand-charcoal p-3 rounded-sm hover:scale-105 transition-transform flex items-center justify-center">
          <LucideSend :size="16" />
        </button>
      </div>
    </div>

    <!-- Toggle Button -->
    <button @click="isOpen = !isOpen" class="w-14 h-14 bg-brand-charcoal text-brand-gold rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-brand-gold hover:text-white transition-all duration-500 border border-brand-gold/30">
      <LucideSparkles v-if="!isOpen" :size="24" />
      <LucideX v-else :size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { LucideSparkles, LucideX, LucideSend } from 'lucide-vue-next';
const { messages, loading, sendMessage } = useAiChat();

const isOpen = ref(false);
const userInput = ref('');

const handleSend = async () => {
  if (!userInput.value.trim() || loading.value) return;
  const prompt = userInput.value;
  userInput.value = '';
  await sendMessage(prompt);
};
</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>
