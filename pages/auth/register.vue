<template>
  <div class="section-container min-h-[80vh] flex items-center justify-center py-20">
    <div class="max-w-md w-full space-y-12">
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-serif text-brand-charcoal ">Join the Club</h1>
        <p class="text-xs text-brand-gold  tracking-[0.3em]">Create your account</p>
      </div>

      <div class="space-y-4">
        <button @click="handleGoogleSignup" :disabled="loading" class="w-full flex items-center justify-center gap-4 border border-gray-100 py-4 hover:bg-gray-50 transition-all rounded-sm">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" />
          <span class="text-[10px] font-bold  tracking-widest">Sign up with Google</span>
        </button>
      </div>

      <div class="relative flex items-center justify-center">
        <div class="absolute inset-x-0 h-[1px] bg-gray-100"></div>
        <span class="relative z-10 bg-brand-cream px-4 text-[10px] text-gray-400  tracking-widest">Or create with Email</span>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-[10px] font-bold  tracking-widest text-gray-400">First Name</label>
            <input v-model="form.firstName" type="text" required class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm bg-transparent" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-bold  tracking-widest text-gray-400">Last Name</label>
            <input v-model="form.lastName" type="text" required class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm bg-transparent" />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-bold  tracking-widest text-gray-400">Email Address</label>
          <input v-model="form.email" type="email" required class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm bg-transparent" />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-bold  tracking-widest text-gray-400">Password</label>
          <div class="relative">
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required class="w-full border-b border-gray-200 py-3 pr-12 outline-none focus:border-brand-gold transition-colors text-sm bg-transparent" />
            <button @click="showPassword = !showPassword" type="button" class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-gold transition-colors">
              <LucideEye v-if="!showPassword" :size="16" />
              <LucideEyeOff v-else :size="16" />
            </button>
          </div>
        </div>

        <button :disabled="loading" class="w-full py-5 bg-brand-charcoal text-white text-[10px] font-bold  tracking-[0.4em] transition-all duration-500 hover:bg-brand-gold active:scale-95">
          <span v-if="loading" class="animate-pulse">Creating Account...</span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <p class="text-center text-[10px]  tracking-widest text-gray-400">
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
    alert('Registration failed. Please try again.');
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
    alert('Social login failed.');
  } finally {
    loading.value = false;
  }
};

definePageMeta({ layout: 'default' });
</script>
