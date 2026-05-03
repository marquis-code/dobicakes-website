<template>
 <div class="min-h-screen bg-brand-cream/20 flex flex-col items-center justify-center p-6">
 <div class="w-full max-w-md bg-white p-12 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-50 space-y-10 animate-fade-in">
 <div class="text-center space-y-4">
 <NuxtLink to="/" class="inline-flex items-center gap-2 mb-8 group">
 <div class="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110">D</div>
 <span class="text-xl font-bold tracking-tight text-brand-charcoal">Dobi <span class="text-brand-gold font-light">Cakes</span></span>
 </NuxtLink>
 <h1 class="text-3xl text-brand-charcoal tracking-tight">Reset Password</h1>
 <p class="text-sm text-brand-muted tracking-[0.3em] font-light">Choose a new secure password for your account</p>
 </div>

 <form @submit.prevent="handleSubmit" class="space-y-8">
 <div class="space-y-6">
 <div class="space-y-1">
 <label class="text-[9px] tracking-[0.3em] font-bold text-brand-charcoal">New Password</label>
 <div class="relative">
 <input 
 v-model="password" 
 :type="showPassword ? 'text' : 'password'" 
 required
 placeholder="••••••••"
 class="w-full bg-transparent border-b border-gray-100 py-4 pr-12 outline-none focus:border-brand-gold transition-colors text-sm font-light placeholder:text-gray-200"
 />
 <button @click="showPassword = !showPassword" type="button" class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-gold transition-colors">
 <LucideEye v-if="!showPassword" :size="16" />
 <LucideEyeOff v-else :size="16" />
 </button>
 </div>
 </div>
 <div class="space-y-1">
 <label class="text-[9px] tracking-[0.3em] font-bold text-brand-charcoal">Confirm Password</label>
 <div class="relative">
 <input 
 v-model="confirmPassword" 
 :type="showConfirmPassword ? 'text' : 'password'" 
 required
 placeholder="••••••••"
 class="w-full bg-transparent border-b border-gray-100 py-4 pr-12 outline-none focus:border-brand-gold transition-colors text-sm font-light placeholder:text-gray-200"
 />
 <button @click="showConfirmPassword = !showConfirmPassword" type="button" class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-gold transition-colors">
 <LucideEye v-if="!showConfirmPassword" :size="16" />
 <LucideEyeOff v-else :size="16" />
 </button>
 </div>
 </div>
 </div>

 <button 
 :disabled="loading || !isValid"
 class="group relative w-full bg-brand-charcoal text-white py-3 px-8 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] disabled:opacity-50"
 >
 <div class="absolute inset-0 bg-brand-gold translate-y-full transition-transform duration-700 group-hover:translate-y-0"></div>
 <span class="relative z-10 text-sm font-bold ">{{ loading ? 'Resetting...' : 'Update Password' }}</span>
 </button>
 </form>
 </div>
 </div>
</template>

<script setup lang="ts">
import { LucideEye, LucideEyeOff } from 'lucide-vue-next';
const { resetPassword, loading } = useResetPassword();
const route = useRoute();
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const isValid = computed(() => {
 return password.value.length >= 8 && password.value === confirmPassword.value;
});

const handleSubmit = async () => {
 if (!isValid.value) return;
 
 await resetPassword({
 token: route.query.token,
 password: password.value
 });
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
