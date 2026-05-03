<template>
  <div class="section-container min-h-[80vh] flex items-center justify-center py-20">
    <div class="max-w-md w-full space-y-12">
      <div class="text-center space-y-2">
        <h1 class="text-5xl font-serif text-brand-charcoal">Join the Club</h1>
        <p class="text-sm text-brand-gold tracking-[0.3em] uppercase font-bold">Create your account</p>
      </div>

      <div class="space-y-6">
        <button @click="handleGoogleSignup" :disabled="loading" class="w-full flex items-center justify-center gap-6 border-2 border-slate-100 py-5 hover:bg-slate-50 transition-all rounded-2xl shadow-sm">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-6 h-6" />
          <span class="text-xs font-bold tracking-widest uppercase">Sign up with Google</span>
        </button>
      </div>

      <div class="relative flex items-center justify-center">
        <div class="absolute inset-x-0 h-[1px] bg-slate-100"></div>
        <span class="relative z-10 bg-brand-cream px-6 text-[11px] text-brand-muted tracking-widest uppercase italic font-light">Or create with Email</span>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-8">
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-3">
            <label class="text-[11px] font-bold tracking-widest text-brand-charcoal uppercase">First Name</label>
            <input v-model="form.firstName" type="text" required placeholder="Jane" class="w-full" />
          </div>
          <div class="space-y-3">
            <label class="text-[11px] font-bold tracking-widest text-brand-charcoal uppercase">Last Name</label>
            <input v-model="form.lastName" type="text" required placeholder="Doe" class="w-full" />
          </div>
        </div>
        <div class="space-y-3">
          <label class="text-[11px] font-bold tracking-widest text-brand-charcoal uppercase">Email Address</label>
          <input v-model="form.email" type="email" required placeholder="jane@example.com" class="w-full" />
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

        <button :disabled="loading" class="btn-premium w-full !py-3 shadow-xl shadow-brand-charcoal/10">
          <span v-if="loading" class="animate-pulse">Creating Account...</span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <p class="text-center text-xs tracking-widest text-brand-muted uppercase">
        Already have an account? 
        <NuxtLink to="/auth/login" class="text-brand-gold font-bold hover:underline">Login here</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LucideEye, LucideEyeOff } from 'lucide-vue-next';
const router = useRouter();
const { error: toastError } = useToast();
const loading = ref(false);
const showPassword = ref(false);
const { $firebaseAuth } = useNuxtApp();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});

const handleRegister = async () => {
  loading.value = true;
  try {
    const { fetchApi } = useApiFactory();
    await fetchApi('/auth/register', {
      method: 'POST',
      body: form.value,
    });
    router.push('/auth/login');
  } catch (error) {
    toastError('Registration failed. Please try again.');
  } finally {
    loading.value = false;
  }
};

const handleGoogleSignup = async () => {
  loading.value = true;
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup($firebaseAuth, provider);
    const idToken = await result.user.getIdToken();
    
    const { fetchApi } = useApiFactory();
    const data = await fetchApi('/auth/firebase', {
      method: 'POST',
      body: { token: idToken },
    });
    
    if (data?.access_token) {
      const { setUser } = useUser();
      setUser(data.user, data.access_token);
      router.push('/');
    }
  } catch (error) {
    console.error('Google signup failed:', error);
    toastError('Social login failed.');
  } finally {
    loading.value = false;
  }
};

definePageMeta({ layout: 'default' });
</script>
