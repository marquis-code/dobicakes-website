<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-brand-charcoal/80 backdrop-blur-md">
      <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up relative">
        <!-- Close Button -->
        <button @click="close" class="absolute top-6 right-6 text-slate-400 hover:text-brand-gold transition-colors z-10 p-2 hover:bg-slate-50 rounded-full">
          <LucideX :size="20" />
        </button>

        <div class="p-8 space-y-6">
          <div class="text-center space-y-3">
            <div class="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto">
              <LucideLock class="text-brand-gold" :size="28" />
            </div>
            <div class="space-y-1">
              <h3 class="text-2xl font-bold text-brand-charcoal tracking-tight">
                {{ mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Join the journal' : 'Reset password' }}
              </h3>
              <p class="text-sm text-slate-500 font-medium px-4">
                {{ 
                  mode === 'login' ? 'Sign in to share your thoughts and like articles.' : 
                  mode === 'register' ? 'Create an account to join our artisanal community.' : 
                  'Enter your email to receive a password reset link.' 
                }}
              </p>
            </div>
          </div>

          <!-- Social Authentication -->
          <div v-if="mode !== 'forgot'" class="space-y-4">
            <button @click="handleSocialLogin" :disabled="socialLoading" class="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all active:scale-95 group shadow-sm disabled:opacity-50">
              <span v-if="socialLoading" class="animate-pulse text-xs font-bold text-slate-400  tracking-widest">Authorizing...</span>
              <template v-else>
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="text-xs font-bold text-slate-700 tracking-wider ">Continue with Google</span>
              </template>
            </button>

            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
              <div class="relative flex justify-center"><span class="bg-white px-4 text-[10px] font-bold text-slate-400 tracking-widest ">Or use email</span></div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div v-if="mode === 'register'" class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-400 tracking-widest  pl-2">Full Name</label>
              <input v-model="form.name" type="text" required placeholder="Olivia Harper" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm outline-none focus:border-brand-gold transition-all" />
            </div>
            
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-400 tracking-widest  pl-2">Email address</label>
              <input v-model="form.email" type="email" required placeholder="olivia@example.com" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm outline-none focus:border-brand-gold transition-all" />
            </div>

            <div v-if="mode !== 'forgot'" class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-400 tracking-widest  pl-2 flex justify-between items-center">
                Password
                <button v-if="mode === 'login'" @click="mode = 'forgot'" type="button" class="text-brand-gold hover:underline normal-case tracking-normal font-medium text-[11px]">Forgot password?</button>
              </label>
              <input v-model="form.password" type="password" :required="mode !== 'forgot'" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm outline-none focus:border-brand-gold transition-all" />
            </div>

            <button :disabled="loading" class="w-full bg-slate-900 text-white py-3.5 rounded-xl text-sm font-medium tracking-tight hover:bg-brand-gold transition-all shadow-lg shadow-brand-charcoal/10 active:scale-95 disabled:opacity-50 mt-4">
              <span v-if="loading" class="animate-pulse">Processing...</span>
              <span v-else>
                {{ 
                  mode === 'login' ? 'Sign in' : 
                  mode === 'register' ? 'Create Account' : 
                  'Send Reset Link' 
                }}
              </span>
            </button>
          </form>

          <div class="text-center pt-2">
            <button v-if="mode === 'forgot'" @click="mode = 'login'" class="text-xs font-bold text-slate-400 hover:text-brand-gold transition-colors tracking-wider ">
              Back to sign in
            </button>
            <button v-else @click="toggleMode" class="text-xs font-bold text-slate-400 hover:text-brand-gold transition-colors tracking-wider ">
              {{ mode === 'login' ? "New here? Join the movement" : "Member? Sign back in" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { LucideX, LucideLock } from 'lucide-vue-next';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const { $firebaseAuth } = useNuxtApp();
const isOpen = useState('auth_modal_open', () => false);
const mode = ref<'login' | 'register' | 'forgot'>('login');
const loading = ref(false);
const socialLoading = ref(false);
const { login, register, forgotPassword, firebaseLogin } = useAuth();
const { success: toastSuccess, error: toastError } = useToast();

const form = ref({
  name: '',
  email: '',
  password: ''
});

const close = () => {
  isOpen.value = false;
  setTimeout(() => { mode.value = 'login'; }, 500);
};

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
};

const handleSocialLogin = async () => {
  if (!$firebaseAuth) {
    toastError('Social authentication is currently unavailable');
    return;
  }
  
  socialLoading.value = true;
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup($firebaseAuth, provider);
    const idToken = await result.user.getIdToken();
    
    await firebaseLogin(idToken);
    toastSuccess('Welcome back to the Journal');
    close();
  } catch (err: any) {
    console.error('Google login failed:', err);
    toastError('Google authentication failed. Please try again.');
  } finally {
    socialLoading.value = false;
  }
};

const handleSubmit = async () => {
  if (!form.value.email) return;
  
  loading.value = true;
  try {
    if (mode.value === 'login') {
      await login({ email: form.value.email, password: form.value.password });
      toastSuccess('Welcome back to the Journal');
      close();
    } else if (mode.value === 'register') {
      await register({ name: form.value.name, email: form.value.email, password: form.value.password });
      toastSuccess('Welcome to the artisanal community');
      close();
    } else {
      await forgotPassword(form.value.email);
      toastSuccess('Reset link sent! Please check your inbox.');
      mode.value = 'login';
    }
  } catch (err: any) {
    toastError(err?.data?.message || 'Action failed. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
