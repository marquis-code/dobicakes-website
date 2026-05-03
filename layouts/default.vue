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
    <footer class="bg-brand-charcoal text-white py-16">
      <div class="section-container grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
              D
            </div>
            <span class="text-xl font-bold tracking-tight ">Dobi <span class="text-brand-gold font-light">Cakes</span></span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Crafting premium, handcrafted cakes for your most precious moments. Quality ingredients, exceptional designs, and unforgettable taste.
          </p>
        </div>
        <div>
          <h4 class="font-bold  tracking-widest text-sm mb-6">Quick Links</h4>
          <ul class="space-y-3 text-gray-400 text-sm">
            <li><NuxtLink to="/shop" class="hover:text-brand-gold transition-colors">Browse All Cakes</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-brand-gold transition-colors">Our Story</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-brand-gold transition-colors">Latest News</NuxtLink></li>
            <li><NuxtLink to="/faq" class="hover:text-brand-gold transition-colors">FAQ</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-brand-gold transition-colors">Contact Us</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold  tracking-widest text-sm mb-6">Customer Care</h4>
          <ul class="space-y-3 text-gray-400 text-sm">
            <li><NuxtLink to="/shipping" class="hover:text-brand-gold transition-colors">Shipping Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="hover:text-brand-gold transition-colors">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-brand-gold transition-colors">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold  tracking-widest text-sm mb-6">Newsletter</h4>
          <p class="text-gray-400 text-sm mb-4">Subscribe to receive updates and exclusive offers.</p>
          
          <div v-if="subscribed" class="flex items-center gap-2 text-emerald-400 text-sm font-medium animate-fade-in">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>You're subscribed!</span>
          </div>
          
          <form v-else @submit.prevent="handleSubscribe" class="flex gap-2">
            <input 
              v-model="newsletterEmail" 
              type="email" 
              required
              placeholder="Email Address" 
              class="bg-white/10 border border-white/10 text-white px-4 py-2 w-full outline-none focus:border-brand-gold transition-colors text-sm rounded-lg" 
            />
            <button 
              type="submit"
              :disabled="subscribing"
              class="bg-brand-gold text-white px-4 py-2 hover:bg-brand-gold-dark transition-colors font-medium text-xs tracking-widest rounded-lg disabled:opacity-50 shrink-0"
            >
              <span v-if="subscribing" class="animate-pulse">...</span>
              <span v-else>Join</span>
            </button>
          </form>
          <p v-if="subscribeError" class="text-rose-400 text-xs mt-2">{{ subscribeError }}</p>
        </div>
      </div>
      <div class="section-container !py-8 border-t border-white/10 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500  tracking-widest">
        <p>&copy; {{ new Date().getFullYear() }} Dobi Cakes. All Rights Reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-white transition-colors">Instagram</a>
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
