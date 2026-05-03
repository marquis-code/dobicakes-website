<template>
 <div class="section-container py-32 min-h-screen space-y-20">
 <div class="text-center space-y-6 max-w-2xl mx-auto">
 <div class="flex items-center justify-center gap-4 mb-4">
 <div class="h-[1px] w-12 bg-brand-gold"></div>
 <span class="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Artisanal Consultations</span>
 <div class="h-[1px] w-12 bg-brand-gold"></div>
 </div>
 <h1 class="text-5xl text-brand-charcoal tracking-tight leading-none">Book Your Session</h1>
 <p class="text-slate-500 font-medium leading-relaxed">Secure a dedicated moment with our master creators to design your perfect celebratory centerpieces.</p>
 </div>

 <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
 <div v-for="i in 3" :key="i" class="h-[500px] bg-slate-50 rounded-[3rem] animate-pulse"></div>
 </div>

 <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
 <div v-for="product in products" :key="product._id" 
 class="group bg-white rounded-[3rem] border border-slate-100 p-12 space-y-10 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all relative overflow-hidden">
 <div class="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 select-none">
 <LucideCake :size="180" />
 </div>

 <div class="space-y-6 relative z-10">
 <div class="w-16 h-16 bg-brand-gold/5 rounded-3xl flex items-center justify-center text-brand-gold">
 <LucideSparkles :size="24" />
 </div>
 <h3 class="text-3xl text-brand-charcoal tracking-tight">{{ product.title }}</h3>
 <p class="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">{{ product.description }}</p>
 </div>

 <div class="flex items-center justify-between py-8 border-y border-slate-50 relative z-10">
 <div class="space-y-1">
 <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Duration</p>
 <p class="text-lg font-bold text-slate-900">{{ product.duration }} Minutes</p>
 </div>
 <div class="text-right space-y-1">
 <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Fee</p>
 <p class="text-lg font-bold text-brand-gold">₦{{ product.price?.toLocaleString() }}</p>
 </div>
 </div>

 <div class="space-y-8 relative z-10">
 <div class="flex flex-wrap gap-2">
 <span v-for="day in product.availability.days" :key="day" class="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-tighter rounded-lg">{{ day.slice(0,3) }}</span>
 </div>
 <NuxtLink :to="`/appointments/book/${product._id}`" class="block w-full text-center bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl shadow-slate-900/10 group/btn">
 Secure Session
 <LucideArrowRight :size="16" class="inline-block ml-2 group-hover/btn:translate-x-1 transition-transform" />
 </NuxtLink>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
import { LucideCake, LucideSparkles, LucideArrowRight } from 'lucide-vue-next';

const { fetchApi } = useApiFactory();
const products = ref<any[]>([]);
const loading = ref(true);

const loadProducts = async () => {
 try {
 products.value = await fetchApi('/appointments/products');
 } catch (e) {
 console.error('Failed to load consultation products');
 } finally {
 loading.value = false;
 }
};

onMounted(loadProducts);

definePageMeta({ layout: 'default' });
</script>
