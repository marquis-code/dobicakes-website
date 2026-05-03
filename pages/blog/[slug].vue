<template>
 <div v-if="post" class="min-h-screen bg-white">
 <!-- Header Image -->
 <div class="h-[50vh] relative overflow-hidden group">
 <img :src="post.image || 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=2000'" class="w-full h-full object-cover transition-transform duration-[30s] scale-105 group-hover:scale-100" :alt="post.title" />
 <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-16">
 <div class="max-w-4xl space-y-6 animate-slide-up">
 <div class="flex items-center gap-3">
 <span v-for="tag in post.tags" :key="tag" class="px-4 py-1.5 bg-brand-gold text-white text-[10px] font-bold tracking-widest rounded-md shadow-lg shadow-brand-gold/20">
 {{ tag }}
 </span>
 </div>
 <h1 class="text-3xl md:text-5xl font-bold leading-tight text-white tracking-tight drop-shadow-xl">{{ post.title }}</h1>
 <div class="flex items-center gap-6 text-white/80">
 <div class="flex items-center gap-2.5">
 <div class="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold italic text-white border border-white/20 text-xs">
 {{ post.author?.[0] }}
 </div>
 <p class="text-sm font-bold tracking-tight">{{ post.author }}</p>
 </div>
 <div class="w-1 h-1 bg-brand-gold rounded-full"></div>
 <p class="text-sm font-medium tracking-tight">{{ new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Article Shell -->
 <div class="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
 <article class="animate-fade-in relative min-w-0">
 <!-- Summary / Intro -->
 <div class="mb-12 p-8 bg-slate-50 border border-slate-100 rounded-3xl relative overflow-hidden">
 <LucideQuote class="absolute -top-4 -right-4 text-slate-100" :size="100" />
 <p class="text-xl font-medium text-slate-800 leading-relaxed italic relative z-10">
 {{ post.summary }}
 </p>
 </div>

 <!-- Body Content -->
 <div class="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed artisanal-content" v-html="post.content">
 </div>

 <!-- Footer Meta -->
 <div class="mt-20 pt-10 border-t border-slate-100 flex flex-col gap-10">
 <div class="flex items-center gap-4">
 <p class="text-xs font-bold text-slate-400 tracking-widest">Tags:</p>
 <div class="flex flex-wrap gap-2">
 <span v-for="tag in post.tags" :key="tag" class="px-4 py-1.5 bg-white text-slate-500 text-[10px] font-bold tracking-wider rounded-lg border border-slate-100 hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer">
 {{ tag }}
 </span>
 </div>
 </div>

 <div class="p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
 <div class="space-y-2">
 <h4 class="text-xl font-bold tracking-tight">Did you enjoy this piece?</h4>
 <p class="text-white/60 text-sm">Share it with your community or leave a comment below.</p>
 </div>
 <div class="flex gap-3">
 <button @click="handleLike" :class="isLiked ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white/10 border-white/10 text-white hover:bg-white hover:text-slate-900'" class="px-6 py-3 rounded-xl border text-sm font-bold transition-all flex items-center gap-2 active:scale-95">
 <LucideHeart :size="16" :class="{ 'fill-current': isLiked }" />
 {{ isLiked ? 'Liked' : 'Appreciate' }}
 </button>
 <button @click="sharePost" class="px-6 py-3 bg-brand-gold text-white rounded-xl text-sm font-medium hover:bg-brand-gold-dark transition-all active:scale-95">
 Share
 </button>
 </div>
 </div>
 </div>

 <!-- Comments Section -->
 <section id="comments" class="mt-24 space-y-12">
 <div class="flex items-center gap-4">
 <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Discussion</h2>
 <div class="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">
 {{ comments?.length || 0 }}
 </div>
 </div>

 <!-- Auth Protected Comment Form -->
 <div v-if="isAuthenticated" class="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
 <div class="flex items-center gap-4">
 <div class="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center text-white font-bold text-sm uppercase">
 {{ (user?.firstName || user?.email || 'A')[0] }}
 </div>
 <div>
 <p class="text-sm font-bold text-slate-900 capitalize">{{ user?.firstName }} {{ user?.lastName }}</p>
 <p class="text-xs text-slate-400 mt-0.5">Contributing Member</p>
 </div>
 </div>
 <textarea v-model="commentForm.content" rows="4" placeholder="Join the discussion..." class="w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-gold/20 transition-all text-sm resize-none"></textarea>
 <div class="flex justify-end">
 <button @click="submitComment" :disabled="isSubmitting || !commentForm.content" class="bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-brand-gold transition-all active:scale-95 disabled:opacity-50">
 Post Comment
 </button>
 </div>
 </div>

 <div v-else class="bg-slate-50 rounded-3xl p-10 text-center space-y-6 border border-slate-100">
 <div class="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto text-brand-gold">
 <LucideLock :size="20" />
 </div>
 <div class="space-y-2">
 <h3 class="text-lg font-bold text-slate-900">Sign in to join the conversation</h3>
 <p class="text-slate-500 text-sm">Join our community to share your thoughts and perspectives.</p>
 </div>
 <button @click="openAuthModal" class="bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-brand-gold transition-all active:scale-95">
 Sign In
 </button>
 </div>

 <!-- Comments List -->
 <div class="space-y-6">
 <div v-for="comment in comments" :key="comment._id" class="p-8 bg-white border border-slate-50 rounded-2xl transition-all shadow-sm">
 <div class="flex items-center gap-3 mb-4">
 <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 italic">{{ comment.authorName?.[0] }}</div>
 <div>
 <p class="text-sm font-bold text-slate-900">{{ comment.authorName }}</p>
 <p class="text-[10px] font-bold text-slate-400 tracking-widest">{{ new Date(comment.createdAt).toLocaleDateString() }}</p>
 </div>
 </div>
 <p class="text-sm text-slate-600 leading-relaxed">{{ comment.content }}</p>
 </div>
 </div>
 </section>
 </article>

 <!-- Sidebar -->
 <aside class="space-y-12">
 <div class="sticky top-24 space-y-12">
 <!-- Featured Note -->
 <div class="p-8 bg-brand-charcoal rounded-3xl text-white space-y-6 relative overflow-hidden group">
 <div class="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-[2s]"></div>
 <div class="space-y-2 relative z-10">
 <p class="text-brand-gold font-bold tracking-widest text-[10px] ">Journal Note</p>
 <h4 class="text-xl font-bold leading-tight">Artisanal Storytelling</h4>
 </div>
 <p class="text-white/60 text-sm leading-relaxed relative z-10">Exclusive insights into the craft of premium baking.</p>
 <NuxtLink to="/shop" class="inline-flex items-center gap-2 bg-brand-gold text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider hover:bg-white hover:text-slate-900 transition-all relative z-10 group/btn">
 Explore 
 <LucideArrowRight :size="14" class="group-hover/btn:translate-x-1 transition-transform" />
 </NuxtLink>
 </div>

 <!-- Newsletter -->
 <div class="p-8 border border-slate-100 rounded-3xl space-y-6 bg-slate-50/50 relative overflow-hidden">
 <div class="space-y-2">
 <h4 class="text-xl font-bold text-slate-900">The Weekly Crust</h4>
 <p class="text-slate-500 text-sm leading-relaxed">The finest recipes delivered to your inbox.</p>
 </div>
 <div class="space-y-3">
 <input type="email" placeholder="Email address" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-gold transition-all text-sm" />
 <button class="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-brand-gold transition-all active:scale-95">Subscribe</button>
 </div>
 </div>
 </div>
 </aside>
 </div>
 <!-- Share Modal -->
 <div v-if="isShareModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
 <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="isShareModalOpen = false"></div>
 <div class="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up border border-slate-100">
 <div class="flex justify-between items-center mb-6">
 <h3 class="text-xl font-bold text-slate-900 tracking-tight">Share Article</h3>
 <button @click="isShareModalOpen = false" class="text-slate-400 hover:text-slate-900 transition-colors">
 <LucideX :size="24" />
 </button>
 </div>
 
 <div class="grid grid-cols-2 gap-4">
 <button @click="shareToPlatform('twitter')" class="p-4 rounded-2xl border border-slate-100 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/5 flex flex-col items-center justify-center gap-3 transition-all group">
 <div class="w-12 h-12 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] group-hover:bg-[#1DA1F2] group-hover:text-white transition-all">
 <LucideTwitter :size="20" />
 </div>
 <span class="text-xs font-bold text-slate-900">Twitter</span>
 </button>
 
 <button @click="shareToPlatform('facebook')" class="p-4 rounded-2xl border border-slate-100 hover:border-[#4267B2] hover:bg-[#4267B2]/5 flex flex-col items-center justify-center gap-3 transition-all group">
 <div class="w-12 h-12 rounded-full bg-[#4267B2]/10 flex items-center justify-center text-[#4267B2] group-hover:bg-[#4267B2] group-hover:text-white transition-all">
 <LucideFacebook :size="20" />
 </div>
 <span class="text-xs font-bold text-slate-900">Facebook</span>
 </button>
 
 <button @click="shareToPlatform('linkedin')" class="p-4 rounded-2xl border border-slate-100 hover:border-[#0077b5] hover:bg-[#0077b5]/5 flex flex-col items-center justify-center gap-3 transition-all group">
 <div class="w-12 h-12 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-all">
 <LucideLinkedin :size="20" />
 </div>
 <span class="text-xs font-bold text-slate-900">LinkedIn</span>
 </button>
 
 <button @click="shareToPlatform('copy')" class="p-4 rounded-2xl border border-slate-100 hover:border-brand-gold hover:bg-brand-gold/5 flex flex-col items-center justify-center gap-3 transition-all group">
 <div class="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
 <LucideLink :size="20" />
 </div>
 <span class="text-xs font-bold text-slate-900">Copy Link</span>
 </button>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
import { 
 LucideShare2, LucideHeart, LucideChevronLeft, LucideArrowRight, 
 LucideLock, LucideMessageSquare, LucideQuote, LucideSparkles,
 LucideX, LucideTwitter, LucideFacebook, LucideLinkedin, LucideLink
} from 'lucide-vue-next';

const route = useRoute();
const { fetchApi, postApi } = useApiFactory();
const { user, isAuthenticated } = useAuth();
const { showToast } = useCustomToast();
const isAuthModalOpen = useState('auth_modal_open');

const { data: post, refresh } = await useAsyncData(`post-${route.params.slug}`, () => fetchApi(`/blog/slug/${route.params.slug}`));
const { data: comments, refresh: refreshComments } = await useAsyncData(`comments-${post.value?._id}`, () => fetchApi(`/blog/${post.value?._id}/comments`), { watch: [post] });

if (post.value) {
 useSeoMeta({
 title: `${post.value.title} | Dobi Cakes`,
 ogTitle: post.value.title,
 description: post.value.summary,
 ogDescription: post.value.summary,
 ogImage: post.value.image,
 twitterCard: 'summary_large_image',
 twitterTitle: post.value.title,
 twitterDescription: post.value.summary,
 twitterImage: post.value.image,
 });
}

const isLiked = ref(false);
const isSubmitting = ref(false);
const isShareModalOpen = ref(false);
const commentForm = ref({
 content: ''
});

const openAuthModal = () => {
 isAuthModalOpen.value = true;
};

const handleLike = async () => {
 if (!isAuthenticated.value) {
 openAuthModal();
 return;
 }
 if (isLiked.value || !post.value) return;
 try {
 await postApi(`/blog/${post.value._id}/like`, {});
 isLiked.value = true;
 await refresh();
 } catch (e) {
 console.error('Failed to like', e);
 }
};

const submitComment = async () => {
 if (!isAuthenticated.value || !commentForm.value.content || !post.value) return;
 isSubmitting.value = true;
 try {
 await postApi(`/blog/${post.value._id}/comments`, {
 authorName: user.value?.firstName ? `${user.value.firstName} ${user.value.lastName}` : (user.value?.email || 'Anonymous'),
 content: commentForm.value.content
 });
 commentForm.value.content = '';
 await refreshComments();
 } catch (e) {
 console.error('Failed to comment', e);
 } finally {
 isSubmitting.value = false;
 }
};

const sharePost = () => {
 isShareModalOpen.value = true;
};

const shareToPlatform = (platform: string) => {
 if (!process.client || !post.value) return;
 const url = encodeURIComponent(window.location.href);
 const title = encodeURIComponent(post.value.title);
 
 if (platform === 'twitter') {
 window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
 } else if (platform === 'facebook') {
 window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
 } else if (platform === 'linkedin') {
 window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
 } else if (platform === 'copy') {
 navigator.clipboard.writeText(window.location.href);
 showToast({ title: 'Link Copied', message: 'The article link has been copied to your clipboard.', toastType: 'success' });
 }
 isShareModalOpen.value = false;
};

definePageMeta({ layout: 'default' });
</script>

<script lang="ts">
export default {
 inheritAttrs: false
}
</script>

<style>
.artisanal-content {
}
.artisanal-content p:first-of-type::first-letter {
 @apply text-5xl md:text-6xl font-bold text-brand-gold float-left mr-4 leading-[0.8] mt-2;
}
.artisanal-content h1 { @apply text-3xl font-bold text-slate-900 mb-6 mt-12 tracking-tight; }
.artisanal-content h2 { @apply text-2xl font-bold text-slate-900 mb-5 mt-10 tracking-tight; }
.artisanal-content h3 { @apply text-xl font-bold text-slate-900 mb-4 mt-8 tracking-tight; }
.artisanal-content blockquote { @apply border-l-4 border-brand-gold pl-8 italic text-slate-600 text-xl my-12 bg-slate-50 py-8 rounded-r-2xl leading-relaxed; }
.artisanal-content img { @apply rounded-3xl shadow-lg my-12 border border-slate-100 w-full; }
.artisanal-content ul { @apply list-disc pl-8 my-8 space-y-4 text-base; }
.artisanal-content ol { @apply list-decimal pl-8 my-8 space-y-4 text-base; }
.artisanal-content p { @apply mb-6; }

@keyframes slide-up {
 from { opacity: 0; transform: translateY(30px); }
 to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
 animation: slide-up 1s cubic-bezier(0.2, 1, 0.3, 1) forwards;
}
</style>
