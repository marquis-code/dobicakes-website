<template>
  <div class="section-container py-20 min-h-screen space-y-16">
    <div class="text-center space-y-4">
      <h1 class="text-5xl font-serif text-brand-charcoal  tracking-tight">The Cake Journal</h1>
      <p class="text-xs text-brand-gold  tracking-[0.4em]">Stories, Recipes & Sweet Inspiration</p>
      <div class="w-24 h-[1px] bg-brand-gold mx-auto mt-8"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      <div v-for="post in posts" :key="post._id" class="group cursor-pointer space-y-6">
        <div class="aspect-[4/3] bg-gray-50 overflow-hidden relative">
          <img :src="post.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center gap-4 text-[9px] font-bold  tracking-[0.2em] text-brand-gold">
            <span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
            <div class="w-1 h-1 bg-gray-200 rounded-full"></div>
            <span>{{ post.author }}</span>
          </div>
          <h3 class="text-xl font-serif text-brand-charcoal hover:text-brand-gold transition-colors leading-snug">
            <NuxtLink :to="`/blog/${post._id}`">{{ post.title }}</NuxtLink>
          </h3>
          <p class="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light italic">
            Thinking of hosting the perfect garden tea party? Our latest guide covers everything from tiered stands to the perfect lemon drizzle...
          </p>
          <NuxtLink :to="`/blog/${post._id}`" class="inline-block pt-4 text-[10px] font-bold  tracking-widest text-brand-charcoal border-b border-brand-charcoal pb-1 group-hover:text-brand-gold group-hover:border-brand-gold transition-all">
            Read Article
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchApi } = useApiFactory();
const { data: posts } = await useAsyncData('posts', () => fetchApi('/blog'));

definePageMeta({ layout: 'default' });
</script>
