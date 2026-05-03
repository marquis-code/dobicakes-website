<template>
 <div class="section-container py-20 min-h-screen space-y-16">
 <div class="text-center space-y-4">
 <h1 class="text-3xl text-brand-charcoal tracking-tight">The Cake Journal</h1>
 <p class="text-xs text-brand-gold ">Stories, Recipes & Sweet Inspiration</p>
 <div class="w-24 h-[1px] bg-brand-gold mx-auto mt-8"></div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
 <div v-for="post in posts" :key="post._id" class="group cursor-pointer space-y-8 animate-fade-in">
 <NuxtLink :to="`/blog/${post.slug}`" class="block aspect-[4/5] bg-slate-50 overflow-hidden relative rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-brand-gold/10">
 <img :src="post.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'" class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
 <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
 <div class="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
 <span class="px-4 py-1.5 bg-brand-gold text-white text-[10px] font-bold tracking-widest rounded-full uppercase">Read post</span>
 </div>
 </NuxtLink>
 <div class="space-y-4 px-2">
 <div class="flex items-center gap-4 text-[10px] font-bold text-brand-gold uppercase">
 <span>{{ new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</span>
 <div class="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
 <span>{{ post.readingTime }} min read</span>
 </div>
 <h3 class="text-2xl text-brand-charcoal hover:text-brand-gold transition-colors leading-tight tracking-tight">
 <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
 </h3>
 <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
 {{ post.summary }}
 </p>
 <div class="pt-2">
 <NuxtLink :to="`/blog/${post.slug}`" class="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-brand-charcoal hover:text-brand-gold transition-colors group/link">
 Continue reading
 <LucideArrowRight :size="16" class="group-hover/link:translate-x-1 transition-transform" />
 </NuxtLink>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
import { LucideArrowRight } from 'lucide-vue-next';
const { fetchApi } = useApiFactory();
const { data: posts } = await useAsyncData('posts', () => fetchApi('/blog'));

definePageMeta({ layout: 'default' });
</script>
