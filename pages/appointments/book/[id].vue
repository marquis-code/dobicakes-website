<template>
 <div class="min-h-screen bg-[#FCFBFA] py-32 px-6">
 <div v-if="loading" class="max-w-4xl mx-auto animate-pulse space-y-12">
 <div class="h-20 bg-white rounded-3xl"></div>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
 <div class="h-[500px] bg-white rounded-[3rem]"></div>
 <div class="h-[500px] bg-white rounded-[3rem]"></div>
 </div>
 </div>

 <div v-else-if="product" class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 animate-slide-up">
 <!-- Left: Product Context -->
 <div class="lg:col-span-5 space-y-12">
 <NuxtLink to="/appointments" class="inline-flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors group">
 <LucideArrowLeft :size="18" class="group-hover:-translate-x-1 transition-transform" />
 <span class="text-xs font-black uppercase tracking-widest">Back to Services</span>
 </NuxtLink>

 <div class="space-y-6">
 <div class="flex items-center gap-4">
 <div class="h-0.5 w-10 bg-brand-gold"></div>
 <span class="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Bespoke Consultation</span>
 </div>
 <h1 class="text-5xl text-brand-charcoal tracking-tight leading-none">{{ product.title }}</h1>
 <p class="text-slate-500 font-medium leading-relaxed">{{ product.description }}</p>
 </div>

 <div class="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-brand-gold/5 space-y-8">
 <div class="flex justify-between items-center border-b border-slate-50 pb-6">
 <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Duration</span>
 <span class="text-lg font-bold text-slate-900">{{ product.duration }} Minutes</span>
 </div>
 <div class="flex justify-between items-center">
 <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Investment</span>
 <span class="text-2xl font-bold text-brand-gold">₦{{ product.price?.toLocaleString() }}</span>
 </div>
 </div>

 <div class="p-8 bg-brand-gold/5 rounded-[2.5rem] border border-brand-gold/10">
 <p class="text-xs font-medium text-brand-gold leading-relaxed">
 <LucideInfo :size="16" class="inline-block mr-2 mb-1" />
 Your session includes a digital workspace and a dedicated Google Meet link, generated instantly upon successful confirmation.
 </p>
 </div>
 </div>

 <!-- Right: Booking Form -->
 <div class="lg:col-span-7 bg-white rounded-[3.5rem] p-12 lg:p-16 shadow-2xl shadow-slate-200/20 border border-slate-50 relative overflow-hidden">
 <form @submit.prevent="initiateBooking" class="space-y-10 relative z-10">
 <!-- Step 1: Temporal Node Selection -->
 <div class="space-y-6">
 <div class="flex items-center justify-between">
 <h3 class="text-xl font-black text-slate-900 tracking-tight">Temporal Node</h3>
 <span class="text-[10px] font-black text-slate-200 uppercase tracking-widest">Step 01</span>
 </div>
 
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-2">
 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Date</label>
 <div class="relative">
 <LucideCalendar class="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold" :size="18" />
 <input v-model="form.date" type="date" required :min="today" class="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-slate-900 outline-none focus:ring-1 focus:ring-brand-gold transition-all" />
 </div>
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
 <div class="relative">
 <LucideClock class="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold" :size="18" />
 <input v-model="form.time" type="time" required class="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-slate-900 outline-none focus:ring-1 focus:ring-brand-gold transition-all" />
 </div>
 </div>
 </div>
 </div>

 <!-- Step 2: Contact Matrix -->
 <div class="space-y-6">
 <div class="flex items-center justify-between">
 <h3 class="text-xl font-black text-slate-900 tracking-tight">Contact Matrix</h3>
 <span class="text-[10px] font-black text-slate-200 uppercase tracking-widest">Step 02</span>
 </div>
 
 <div class="space-y-6">
 <div class="space-y-2">
 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
 <input v-model="form.customerName" type="text" required class="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold text-slate-900 outline-none focus:ring-1 focus:ring-brand-gold transition-all" placeholder="Adaobi Dobi" />
 </div>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-2">
 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Digital Mail</label>
 <input v-model="form.customerEmail" type="email" required class="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold text-slate-900 outline-none focus:ring-1 focus:ring-brand-gold transition-all" placeholder="adaobi@dobicakes.com" />
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Line</label>
 <input v-model="form.customerPhone" type="tel" required class="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold text-slate-900 outline-none focus:ring-1 focus:ring-brand-gold transition-all" placeholder="+234..." />
 </div>
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Artisanal Brief (Optional)</label>
 <textarea v-model="form.notes" rows="4" class="w-full bg-slate-50 border-none rounded-3xl px-8 py-6 text-sm font-medium text-slate-700 outline-none focus:ring-1 focus:ring-brand-gold transition-all resize-none" placeholder="Share any specific visions or requirements..."></textarea>
 </div>
 </div>
 </div>

 <div class="pt-8">
 <button :disabled="processing" class="w-full group flex items-center justify-center gap-4 bg-slate-900 text-white py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-brand-gold transition-all shadow-2xl shadow-slate-900/10 active:scale-95 disabled:opacity-50">
 <span v-if="processing" class="animate-pulse">Initializing Payment Gateway...</span>
 <template v-else>
 Secure Consultation
 <LucideZap :size="18" class="group-hover:animate-bounce" />
 </template>
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
import { LucideArrowLeft, LucideCalendar, LucideClock, LucideInfo, LucideZap } from 'lucide-vue-next';

const route = useRoute();
const { fetchApi } = useApiFactory();
const { success: toastSuccess, error: toastError } = useToast();
const auth = useAuth();

const product = ref<any>(null);
const loading = ref(true);
const processing = ref(false);
const today = new Date().toISOString().split('T')[0];

const form = ref({
 customerName: auth.user.value?.firstName ? `${auth.user.value.firstName} ${auth.user.value.lastName}` : '',
 customerEmail: auth.user.value?.email || '',
 customerPhone: '',
 date: '',
 time: '',
 notes: ''
});

const loadProduct = async () => {
 try {
 product.value = await fetchApi(`/appointments/products/${route.params.id}`);
 } catch (e) {
 toastError('Consultation service not found');
 navigateTo('/appointments');
 } finally {
 loading.value = false;
 }
};

const initiateBooking = async () => {
 if (!auth.user.value) {
 toastError('Please sign in to secure a consultation slot');
 return;
 }

 processing.value = true;
 try {
 // Combine date and time
 const scheduledAt = new Date(`${form.value.date}T${form.value.time}`);
 
 const res: any = await fetchApi('/appointments', {
 method: 'POST',
 body: {
 productId: product.value._id,
 userId: auth.user.value._id,
 customerName: form.value.customerName,
 customerEmail: form.value.customerEmail,
 customerPhone: form.value.customerPhone,
 scheduledAt,
 notes: form.value.notes
 }
 });

 if (res.paymentUrl) {
 window.location.href = res.paymentUrl;
 }
 } catch (e: any) {
 toastError(e.data?.message || 'Failed to initialize booking protocol');
 } finally {
 processing.value = false;
 }
};

onMounted(loadProduct);

definePageMeta({ layout: 'default' });
</script>

<style scoped>
.animate-slide-up {
 animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes slideUp {
 from { opacity: 0; transform: translateY(60px); }
 to { opacity: 1; transform: translateY(0); }
}
</style>
