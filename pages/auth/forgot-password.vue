<template>
  <div class="min-h-screen bg-brand-cream/20 flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-md bg-white p-12 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-50 space-y-10 animate-fade-in">
      <div class="text-center space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-8 group">
          <div class="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-lg transition-transform group-hover:scale-110">D</div>
          <span class="text-xl font-bold tracking-tight  text-brand-charcoal">Dobi <span class="text-brand-gold font-light">Cakes</span></span>
        </NuxtLink>
        <h1 class="text-3xl font-serif text-brand-charcoal  tracking-tight">Forgotten Password</h1>
        <p class="text-[10px] text-brand-muted  tracking-[0.3em] font-light">Enter your email to receive a secure reset link</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div class="space-y-1">
          <label class="text-[9px]  tracking-[0.3em] font-bold text-brand-charcoal">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            required
            placeholder="e.g. grace@luxury.com"
            class="w-full bg-transparent border-b border-gray-100 py-4 outline-none focus:border-brand-gold transition-colors text-sm font-light placeholder:text-gray-200"
          />
        </div>

        <button 
          :disabled="loading"
          class="group relative w-full bg-brand-charcoal text-white py-5 px-8 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] disabled:opacity-50"
        >
          <div class="absolute inset-0 bg-brand-gold translate-y-full transition-transform duration-700 group-hover:translate-y-0"></div>
          <span class="relative z-10 text-[10px] font-bold  tracking-[0.4em]">{{ loading ? 'Sending link...' : 'Send Reset Link' }}</span>
        </button>
      </form>

      <div class="text-center">
        <NuxtLink to="/auth/login" class="text-[9px]  tracking-[0.3em] text-brand-muted hover:text-brand-gold transition-colors font-bold">
          Return to Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { forgotPassword, loading } = useForgotPassword();
const email = ref('');

const handleSubmit = async () => {
  await forgotPassword(email.value);
};

definePageMeta({ layout: 'empty' });
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
