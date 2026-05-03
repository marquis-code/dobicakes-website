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

      <div class="prose prose-slate prose-lg max-w-none text-brand-charcoal/80 leading-relaxed artisanal-content" v-html="post.content">
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

<style>
.artisanal-content {
  @apply font-sans;
}
.artisanal-content p:first-of-type::first-letter {
  @apply text-6xl font-serif text-brand-gold float-left mr-4 leading-[0.8] mt-2;
}
.artisanal-content h1 { @apply text-3xl font-serif text-brand-charcoal mb-8 mt-12; }
.artisanal-content h2 { @apply text-2xl font-serif text-brand-charcoal mb-6 mt-10; }
.artisanal-content blockquote { @apply border-l-2 border-brand-gold pl-8 italic text-brand-muted text-xl my-12 bg-brand-cream/20 py-4 rounded-r-2xl; }
.artisanal-content img { @apply rounded-2xl shadow-2xl my-16 border border-gray-100; }
.artisanal-content ul { @apply list-disc pl-8 my-8 space-y-4; }
.artisanal-content ol { @apply list-decimal pl-8 my-8 space-y-4; }
</style>
