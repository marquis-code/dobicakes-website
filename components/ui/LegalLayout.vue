<template>
 <div class="py-24 bg-brand-cream min-h-screen">
 <div class="max-w-4xl mx-auto px-6 space-y-16">
 <div class="text-center space-y-6">
 <h1 class="text-5xl md:text-7xl text-brand-charcoal tracking-tighter">{{ title }}</h1>
 <div class="w-24 h-1 bg-brand-gold mx-auto"></div>
 <p class="text-xs font-bold tracking-[0.3em] text-brand-gold">Last Updated: March 2026</p>
 </div>

 <div class="glass p-12 space-y-10 leading-relaxed text-brand-charcoal/80">
 <slot />
 </div>

 <div class="text-center pt-8">
 <NuxtLink to="/contact" class="btn-premium">Have Questions? Contact Us</NuxtLink>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
defineProps({
 title: String
})
</script>
