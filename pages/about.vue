<template>
 <div class="bg-brand-cream/20">
 <!-- Hero -->
 <div class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-brand-charcoal">
 <img src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover opacity-50" />
 <div class="relative z-10 text-center space-y-6 px-6">
 <span class="text-brand-gold text-xs font-bold animate-fade-up">Our Story</span>
 <h1 class="text-5xl md:text-7xl text-white tracking-tight animate-fade-up">The Art of Baking</h1>
 </div>
 </div>

 <!-- Content -->
 <div class="max-w-4xl mx-auto py-24 px-6 space-y-24">
 <section class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
 <div class="space-y-6">
 <h2 class="text-3xl text-brand-charcoal ">Established 2018</h2>
 <p class="text-sm text-brand-muted leading-relaxed font-light italic">
 "We believe that a cake is more than just a dessert; it's a centerpiece for life's most precious moments."
 </p>
 <p class="text-sm text-slate-600 leading-relaxed">
 Dobi Cakes began in a small home kitchen in Lagos, fueled by a passion for exquisite flavors and meticulous design. Today, we are proud to be one of Nigeria's premier boutique bakeries, serving thousands of celebrations with our signature handcrafted cakes.
 </p>
 </div>
 <div class="aspect-[3/4] bg-white shadow-2xl overflow-hidden">
 <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
 </div>
 </section>

 <section class="text-center space-y-12">
 <div class="space-y-4">
 <h3 class="text-xs font-bold text-brand-gold">Our Philosophy</h3>
 <h2 class="text-4xl text-brand-charcoal">Quality Without Compromise</h2>
 </div>
 <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
 <div v-for="item in values" :key="item.title" class="space-y-4">
 <h4 class="text-xs font-bold tracking-widest text-brand-charcoal">{{ item.title }}</h4>
 <p class="text-[11px] text-gray-500 tracking-widest leading-relaxed">{{ item.desc }}</p>
 </div>
 </div>
 </section>
 </div>
 </div>
</template>

<script setup lang="ts">
const values = [
 { title: 'Finest Ingredients', desc: 'We source only the highest quality Belgian chocolate, Madagascar vanilla, and farm-fresh dairy.' },
 { title: 'Handcrafted', desc: 'Every petal, every swirl, and every layer is meticulously crafted by our master pastry chefs.' },
 { title: 'Innovation', desc: 'We constantly push the boundaries of flavor and design to create unique experiences.' }
];

definePageMeta({ layout: 'default' });
</script>
