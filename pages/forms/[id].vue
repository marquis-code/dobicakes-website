<template>
  <div class="min-h-screen bg-[#FCFBFA] flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
    <!-- Artistic Background Elements -->
    <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] -z-10"></div>
    
    <!-- Floating Brand Emblem -->
    <div class="mb-12 animate-fade-in">
      <NuxtLink to="/" class="group flex flex-col items-center gap-4">
        <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-brand-gold/10 group-hover:rotate-12 transition-transform duration-500">
          <span class="text-2xl font-black text-brand-gold tracking-tighter">D</span>
        </div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] group-hover:text-brand-gold transition-colors">Dobi Cakes Journal</p>
      </NuxtLink>
    </div>

    <!-- Main Dynamic Form Hub -->
    <div v-if="loading" class="w-full max-w-xl animate-pulse space-y-8">
      <div class="h-12 bg-white rounded-3xl border border-slate-100"></div>
      <div class="space-y-4">
        <div v-for="i in 3" :key="i" class="h-24 bg-white rounded-3xl border border-slate-100"></div>
      </div>
    </div>

    <div v-else-if="submitted" class="w-full max-w-lg bg-white rounded-[3rem] p-16 text-center border border-brand-gold/10 animate-slide-up relative">
      <!-- Decorative Confetti Icon -->
      <div class="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 ring-8 ring-emerald-50/50">
        <LucideSparkles :size="40" />
      </div>
      <h2 class="text-3xl font-black text-slate-900 mb-4 tracking-tight">Elegance Captured</h2>
      <p class="text-slate-500 font-medium leading-relaxed mb-10 px-4">Your request has been woven into our artisanal schedule. We will reach out to refine the details shortly.</p>
      <NuxtLink to="/" class="group flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-gold transition-all">
        Continue the Journey
        <LucideArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
      </NuxtLink>
    </div>

    <div v-else-if="form" class="w-full max-w-2xl animate-slide-up">
      <div class="bg-white rounded-[3rem] p-12 lg:p-16 border border-brand-gold/10 relative overflow-hidden">
        <!-- Subtle Pattern Overlay -->
        <div class="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
          <LucideCake :size="200" />
        </div>

        <div class="relative z-10">
          <header class="mb-16">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-0.5 w-12 bg-brand-gold"></div>
              <span class="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Bespoke Enquiry</span>
            </div>
            <h1 class="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-none">{{ form.title }}</h1>
            <p class="text-slate-500 font-medium leading-relaxed max-w-md">{{ form.description }}</p>
          </header>

          <form @submit.prevent="handleSubmit" class="space-y-10">
            <div v-for="(field, i) in form.fields" :key="field.label" class="space-y-4 group">
              <div class="flex justify-between items-end px-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest group-focus-within:text-brand-gold transition-colors">
                  {{ field.label }}
                  <span v-if="field.required" class="text-brand-gold ml-1 text-base leading-none">*</span>
                </label>
                <span class="text-[10px] font-black text-slate-200">0{{ i + 1 }}</span>
              </div>
              
              <div class="relative">
                <template v-if="field.type === 'textarea'">
                  <textarea 
                    v-model="submission[field.label]" 
                    :required="field.required"
                    rows="4"
                    class="w-full bg-slate-50/50 border-2 border-slate-50 rounded-3xl p-6 text-sm font-medium text-slate-700 outline-none focus:border-brand-gold/30 focus:bg-white transition-all resize-none placeholder:text-slate-300"
                    :placeholder="`Share your ${field.label.toLowerCase()} details...`"
                  ></textarea>
                </template>
                
                <template v-else-if="field.type === 'select'">
                  <select 
                    v-model="submission[field.label]" 
                    :required="field.required"
                    class="w-full bg-slate-50/50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-medium text-slate-700 outline-none focus:border-brand-gold/30 focus:bg-white transition-all appearance-none"
                  >
                    <option value="" disabled>Choose an option...</option>
                    <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                  <LucideChevronDown class="absolute right-6 top-1/2 -translate-y-1/2 text-brand-gold pointer-events-none" :size="18" />
                </template>

                <template v-else-if="field.type === 'checkbox'">
                  <label class="flex items-center gap-4 p-6 bg-slate-50/50 rounded-3xl border-2 border-slate-50 cursor-pointer hover:bg-white hover:border-brand-gold/20 transition-all">
                    <input 
                      type="checkbox" 
                      v-model="submission[field.label]" 
                      class="w-6 h-6 text-brand-gold border-slate-200 rounded-xl focus:ring-brand-gold/20"
                    />
                    <span class="text-sm font-bold text-slate-600">I acknowledge the artisanal nature of this request</span>
                  </label>
                </template>

                <template v-else>
                  <input 
                    v-model="submission[field.label]" 
                    :type="field.type" 
                    :required="field.required"
                    class="w-full bg-slate-50/50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-medium text-slate-700 outline-none focus:border-brand-gold/30 focus:bg-white transition-all placeholder:text-slate-300"
                    :placeholder="`Your ${field.label.toLowerCase()}...`"
                  />
                </template>
              </div>
            </div>

            <div class="pt-8">
              <button :disabled="submitting" class="w-full group flex items-center justify-center gap-4 bg-slate-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-brand-gold transition-all active:scale-95 disabled:opacity-50">
                <span v-if="submitting" class="animate-pulse">Capturing Brilliance...</span>
                <template v-else>
                  Submit Enquiry
                  <LucideZap :size="18" class="group-hover:animate-bounce" />
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Footer Branding -->
      <footer class="mt-12 text-center space-y-2 opacity-40">
        <p class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Handcrafted Experiences</p>
        <p class="text-[10px] font-medium text-slate-400 italic">© 2026 Dobi Cakes Artisanal Studio</p>
      </footer>
    </div>

    <div v-else class="max-w-xl mx-auto text-center py-20 animate-fade-in">
      <LucideGhost :size="64" class="mx-auto text-slate-100 mb-8" />
      <h2 class="text-2xl font-black text-slate-900 mb-3 tracking-tight">The Hub is Quiet</h2>
      <p class="text-slate-500 font-medium mb-10 leading-relaxed">This form has either been retired or is awaiting its creative spark. Please return to our main gallery.</p>
      <NuxtLink to="/" class="text-brand-gold font-black uppercase tracking-widest text-xs hover:underline">Explore the Gallery</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideSparkles, LucideArrowRight, LucideCake, 
  LucideChevronDown, LucideZap, LucideGhost 
} from 'lucide-vue-next';

const route = useRoute();
const { fetchApi } = useApiFactory();
const { success: toastSuccess, error: toastError } = useToast();

const form = ref<any>(null);
const loading = ref(true);
const submitting = ref(false);
const submitted = ref(false);
const submission = ref<any>({});

const loadForm = async () => {
  try {
    const res: any = await fetchApi(`/forms/${route.params.id}`);
    if (res.isActive) {
      form.value = res;
      // Initialize submission object
      res.fields.forEach((f: any) => {
        submission.value[f.label] = f.type === 'checkbox' ? false : '';
      });
    }
  } catch (e) {
    console.error('Failed to load form:', e);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  submitting.value = true;
  try {
    await fetchApi(`/forms/${route.params.id}/submit`, {
      method: 'POST',
      body: submission.value
    });
    submitted.value = true;
    toastSuccess('Submission successful');
  } catch (e) {
    toastError('Failed to capture enquiry. Please try again.');
  } finally {
    submitting.value = false;
  }
};

onMounted(loadForm);

definePageMeta({ layout: 'empty' });
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
.animate-slide-up {
  animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom transitions for form elements */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
