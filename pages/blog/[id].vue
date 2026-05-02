<template>
  <div v-if="post" class="min-h-screen">
    <!-- Header Image -->
    <div class="h-[60vh] relative overflow-hidden">
      <img :src="post.image || 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=2000'" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40 flex items-center justify-center p-8">
        <div class="max-w-4xl text-center text-white space-y-6">
          <p class="text-[10px]  tracking-[0.5em] font-light">{{ new Date(post.createdAt).toLocaleDateString() }} • Editorial</p>
          <h1 class="text-4xl md:text-6xl font-serif leading-tight  tracking-tight">{{ post.title }}</h1>
        </div>
      </div>
    </div>

    <!-- Content -->
    <article class="section-container !max-w-3xl py-20 animate-fade-in">
      <div class="flex items-center gap-6 mb-12 border-b border-gray-100 pb-12">
        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold  italic text-brand-charcoal">
          {{ post.author?.[0] }}
        </div>
        <div>
          <p class="text-[10px] text-gray-400  tracking-widest font-bold">Written By</p>
          <p class="text-sm font-serif text-brand-charcoal italic">{{ post.author }}</p>
        </div>
        <div class="ml-auto w-px h-8 bg-gray-100"></div>
        <div class="flex gap-4">
          <button class="text-gray-400 hover:text-brand-gold"><LucideShare2 :size="16" /></button>
          <button class="text-gray-400 hover:text-brand-gold"><LucideHeart :size="16" /></button>
        </div>
      </div>

      <div class="prose prose-slate prose-lg max-w-none text-brand-charcoal/80 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-brand-gold first-letter:mr-3 first-letter:float-left">
        {{ post.content }}
      </div>
      
      <div class="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center text-[10px]  tracking-widest text-gray-400 font-bold">
        <NuxtLink to="/blog" class="hover:text-brand-gold flex items-center gap-2">
          <LucideChevronLeft :size="14" /> All Posts
        </NuxtLink>
        <div class="flex gap-8">
          <a href="#" class="hover:text-brand-gold">Instagram</a>
          <a href="#" class="hover:text-brand-gold">Pinterest</a>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { LucideShare2, LucideHeart, LucideChevronLeft } from 'lucide-vue-next';
const route = useRoute();
const { fetchApi } = useApiFactory();

const { data: post } = await useAsyncData(`post-${route.params.id}`, () => fetchApi(`/blog/${route.params.id}`));

definePageMeta({ layout: 'default' });
</script>
