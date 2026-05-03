<template>
 <div class="group relative flex flex-col bg-white overflow-hidden transition-all duration-1000 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-gray-50/50">
 <!-- Image Wrapper -->
 <div class="aspect-[4/5] overflow-hidden relative bg-brand-cream/10">
 <img 
 :src="product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'" 
 :alt="product.name" 
 class="w-full h-full object-cover transition-transform duration-[2s] ease-out-expo group-hover:scale-110" 
 />
 
 <!-- Tags Overlay -->
 <div class="absolute top-5 left-5 flex flex-col gap-2 z-10">
 <span v-if="product.availabilityType === 'PREORDER'" class="bg-brand-charcoal/90 backdrop-blur-md text-white text-sm font-bold px-4 py-1.5 shadow-sm">
 Pre-order
 </span>
 <span v-for="tag in product.tags" :key="tag" class="bg-brand-gold/90 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 shadow-sm">
 {{ tag }}
 </span>
 </div>

 <!-- Hover Action Overlay -->
 <div class="absolute inset-0 bg-brand-charcoal/30 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center z-20 backdrop-blur-[2px]">
 <NuxtLink 
 :to="`/shop/${product._id}`" 
 class="relative bg-white text-brand-charcoal text-[9px] font-bold tracking-[0.3em] px-10 py-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 hover:bg-brand-gold hover:text-white"
 >
 View Masterpiece
 </NuxtLink>
 </div>
 </div>
 
 <!-- Info -->
 <div class="p-8 space-y-4 text-center">
 <div class="space-y-2">
 <p class="text-sm text-brand-gold font-bold ">{{ product.category }}</p>
 <h3 class="text-[11px] font-bold text-brand-charcoal leading-relaxed group-hover:text-brand-gold transition-colors duration-500 min-h-[2.5rem] flex items-center justify-center">
 <NuxtLink :to="`/shop/${product._id}`">{{ product.name }}</NuxtLink>
 </h3>
 </div>
 
 <div class="pt-4 border-t border-gray-50 flex flex-col items-center">
 <p class="text-brand-charcoal text-2xl tracking-tight">₦{{ product.price.toLocaleString() }}</p>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
defineProps({
 product: {
 type: Object,
 required: true
 }
});
</script>
