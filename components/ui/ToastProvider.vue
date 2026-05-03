<template>
  <div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-sm bg-white shadow-2xl border border-slate-100 p-4"
        :class="{
          'border-l-4 border-l-brand-gold': toast.type === 'success' || toast.type === 'info' || toast.type === 'warning',
          'border-l-4 border-l-red-500': toast.type === 'error',
        }"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <LucideCheckCircle v-if="toast.type === 'success'" class="h-5 w-5 text-brand-gold" />
            <LucideXCircle v-else-if="toast.type === 'error'" class="h-5 w-5 text-red-500" />
            <LucideInfo v-else class="h-5 w-5 text-brand-gold" />
          </div>
          <div class="flex-1 pt-0.5">
            <p class="text-[11px] font-bold tracking-widest text-brand-charcoal ">
              {{ toast.type }}
            </p>
            <p class="mt-1 text-sm text-brand-muted font-light leading-relaxed">
              {{ toast.message }}
            </p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button
              @click="remove(toast.id)"
              class="inline-flex rounded-md bg-white text-gray-300 hover:text-gray-500 transition-colors"
            >
              <LucideX class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { LucideCheckCircle, LucideXCircle, LucideInfo, LucideX } from 'lucide-vue-next';
const { toasts, remove } = useToast();
</script>
