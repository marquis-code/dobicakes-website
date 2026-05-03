<template>
  <div class="section-container min-h-[80vh] flex items-center justify-center py-20">
    <div class="max-w-md w-full space-y-12">
      <div class="text-center space-y-2">
        <h1 class="text-5xl font-serif text-brand-charcoal">Welcome Back</h1>
        <p class="text-sm text-brand-gold tracking-[0.3em] uppercase font-bold">Sign in to your account</p>
      </div>

      <div class="space-y-6">
        <!-- Firebase Login Buttons -->
        <button @click="handleGoogleLogin" class="w-full flex items-center justify-center gap-6 border-2 border-slate-100 py-5 hover:bg-slate-50 transition-all rounded-2xl shadow-sm">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-6 h-6" />
          <span class="text-xs font-bold tracking-widest uppercase">Sign in with Google</span>
        </button>
      </div>

      <div class="relative flex items-center justify-center">
        <div class="absolute inset-x-0 h-[1px] bg-slate-100"></div>
        <span class="relative z-10 bg-brand-cream px-6 text-[11px] text-brand-muted tracking-widest uppercase italic font-light">Or login with Email</span>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-8">
        <div class="space-y-3">
          <label class="text-[11px] font-bold tracking-widest text-brand-charcoal uppercase">Email Address</label>
          <input v-model="form.email" type="email" required placeholder="john@example.com" class="w-full" />
        </div>
        <div class="space-y-3">
          <label class="text-[11px] font-bold tracking-widest text-brand-charcoal uppercase">Password</label>
          <div class="relative">
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••" class="w-full pr-14" />
            <button @click="showPassword = !showPassword" type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-gold transition-colors">
              <LucideEye v-if="!showPassword" :size="20" />
              <LucideEyeOff v-else :size="20" />
            </button>
          </div>
        </div>
        
        <div class="flex justify-end">
          <NuxtLink to="/auth/forgot-password" class="text-[11px] text-brand-gold tracking-widest hover:text-brand-charcoal transition-colors uppercase font-bold">Forgot Password?</NuxtLink>
        </div>

        <button :disabled="loading" class="btn-premium w-full !py-3 shadow-xl shadow-brand-charcoal/10">
          <span v-if="loading" class="animate-pulse">Signing in...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <p class="text-center text-xs tracking-widest text-brand-muted uppercase">
        Don't have an account? 
        <NuxtLink to="/auth/register" class="text-brand-gold font-bold hover:underline">Register here</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LucideEye, LucideEyeOff } from 'lucide-vue-next';
const { login, socialLogin } = useLogin();
const { showToast } = useCustomToast();
const router = useRouter();
const loading = ref(false);
const showPassword = ref(false);
const { $firebaseAuth } = useNuxtApp();

const form = ref({
  email: '',
  password: ''
});

const handleLogin = async () => {
  loading.value = true;
  try {
    await login(form.value);
    router.push('/');
  } catch (error: any) {
    showToast({
      title: 'Login Failed',
      message: error.response?.data?.message || 'Please check your credentials and try again.',
      toastType: 'error'
    });
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = async () => {
  loading.value = true;
  try {
    const provider = new GoogleAuthProvider();
    if (!$firebaseAuth) {
      showToast({
        title: 'Authentication Error',
        message: 'Social authentication is currently unavailable.',
        toastType: 'warning'
      });
      return;
    }
    const result = await signInWithPopup($firebaseAuth, provider);
    const token = await result.user.getIdToken();
    await socialLogin(token);
    router.push('/');
  } catch (error) {
    console.error('Google login failed:', error);
    showToast({
      title: 'Login Failed',
      message: 'Social login was unsuccessful. Please try email login.',
      toastType: 'error'
    });
  } finally {
    loading.value = false;
  }
};

definePageMeta({ layout: 'default' });
</script>
