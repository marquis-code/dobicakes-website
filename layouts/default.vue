<template>
 <div class="min-h-screen flex flex-col">
 <UiNavBar />
 <main class="flex-grow">
 <slot />
 </main>
 <UiChatWidget />
 
 <!-- Global UI Components -->
 <UiToastContainer />
 <UiAlertModal />
 <UiAuthModal />
 <footer class="bg-brand-charcoal text-white py-24">
 <div class="section-container grid grid-cols-1 md:grid-cols-4 gap-16">
 <div class="space-y-6">
 <div class="flex items-center gap-3">
 <div class="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-gold/20">
 D
 </div>
 <span class="text-2xl font-bold tracking-tight">Dobi <span class="text-brand-gold font-light">Cakes</span></span>
 </div>
 <p class="text-white/50 text-sm leading-relaxed font-medium">
 Crafting premium, handcrafted cakes for your most precious moments. Quality ingredients, exceptional designs, and unforgettable taste.
 </p>
 </div>
 <div>
 <h4 class="font-bold tracking-widest text-xs text-brand-gold mb-8">Quick Links</h4>
 <ul class="space-y-4 text-white/60 text-sm font-medium">
 <li><NuxtLink to="/shop" class="hover:text-white transition-colors">Browse All Cakes</NuxtLink></li>
 <li><NuxtLink to="/about" class="hover:text-white transition-colors">Our Story</NuxtLink></li>
 <li><NuxtLink to="/blog" class="hover:text-white transition-colors">Latest News</NuxtLink></li>
 <li><NuxtLink to="/faq" class="hover:text-white transition-colors">FAQ</NuxtLink></li>
 <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Contact Us</NuxtLink></li>
 </ul>
 </div>
 <div>
 <h4 class="font-bold tracking-widest text-xs text-brand-gold mb-8">Customer Care</h4>
 <ul class="space-y-4 text-white/60 text-sm font-medium">
 <li><NuxtLink to="/shipping" class="hover:text-white transition-colors">Shipping Policy</NuxtLink></li>
 <li><NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of Service</NuxtLink></li>
 <li><NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink></li>
 </ul>
 </div>
 <div>
 <h4 class="font-bold tracking-widest text-xs text-brand-gold mb-8">Newsletter</h4>
 <p class="text-white/60 text-sm mb-6 font-medium">Subscribe to receive updates and exclusive offers.</p>
 
 <div v-if="subscribed" class="flex items-center gap-2 text-emerald-400 text-sm font-bold animate-fade-in bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
 <span>You're officially subscribed!</span>
 </div>
 
 <form v-else @submit.prevent="handleSubscribe" class="space-y-3">
 <div class="relative group">
 <input 
 v-model="newsletterEmail" 
 type="email" 
 required
 placeholder="Email Address" 
 class="bg-white/5 border border-white/10 text-white px-6 py-4 w-full outline-none focus:border-brand-gold/50 focus:bg-white/10 transition-all text-sm rounded-xl placeholder:text-white/20" 
 />
 </div>
 <button 
 type="submit"
 :disabled="subscribing"
 class="w-full bg-brand-gold text-white px-6 py-4 hover:bg-brand-gold-dark transition-all font-bold text-xs rounded-xl disabled:opacity-50 shadow-lg shadow-brand-gold/10 active:scale-[0.98]"
 >
 <span v-if="subscribing" class="animate-pulse">Authorizing...</span>
 <span v-else>Join the movement</span>
 </button>
 </form>
 <p v-if="subscribeError" class="text-rose-400 text-xs mt-3 font-bold">{{ subscribeError }}</p>
 </div>
 </div>
 <div class="section-container !py-12 border-t border-white/5 mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 font-bold">
 <p>&copy; {{ new Date().getFullYear() }} Dobi Cakes. All Rights Reserved.</p>
 <div class="flex gap-8">
 <a href="#" class="hover:text-brand-gold transition-colors">Instagram</a>
 <a href="#" class="hover:text-white transition-colors">Facebook</a>
 <a href="#" class="hover:text-white transition-colors">WhatsApp</a>
 </div>
 </div>
 </footer>
 </div>
</template>

<script setup lang="ts">
const { fetchApi } = useApiFactory();

const newsletterEmail = ref('');
const subscribing = ref(false);
const subscribed = ref(false);
const subscribeError = ref('');

const handleSubscribe = async () => {
 if (!newsletterEmail.value) return;
 subscribing.value = true;
 subscribeError.value = '';
 try {
 await fetchApi('/marketing/subscribe', {
 method: 'POST',
 body: { email: newsletterEmail.value, source: 'footer' },
 });
 subscribed.value = true;
 newsletterEmail.value = '';
 } catch (err: any) {
 subscribeError.value = err?.data?.message || 'Something went wrong. Please try again.';
 } finally {
 subscribing.value = false;
 }
};
</script>
