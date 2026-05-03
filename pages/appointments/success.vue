<template>
 <div class="min-h-screen bg-[#FCFBFA] flex items-center justify-center py-20 px-6">
 <div v-if="verifying" class="text-center space-y-8 animate-pulse">
 <LucideLoader2 :size="64" class="mx-auto text-brand-gold animate-spin" />
 <h2 class="text-2xl text-brand-charcoal">Synchronizing Ecosystem...</h2>
 <p class="text-slate-400 font-medium">Verifying your consultation protocol and generating credentials.</p>
 </div>

 <div v-else-if="appointment" class="max-w-xl w-full bg-white rounded-[3.5rem] p-16 text-center shadow-2xl shadow-brand-gold/10 border border-brand-gold/10 animate-slide-up">
 <div class="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 ring-8 ring-emerald-50/50">
 <LucideCheckCircle :size="40" />
 </div>
 
 <h1 class="text-3xl text-brand-charcoal mb-4">Slot Secured</h1>
 <p class="text-slate-500 font-medium mb-10 leading-relaxed px-4">Your artisanal session for <strong>{{ (appointment.product as any).title }}</strong> is confirmed. Meeting credentials have been dispatched to your digital mail.</p>

 <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 mb-10 text-left space-y-4">
 <div class="flex justify-between items-center">
 <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Temporal Node</span>
 <span class="text-sm font-bold text-slate-900">{{ new Date(appointment.scheduledAt).toLocaleDateString() }} • {{ new Date(appointment.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
 </div>
 <div class="flex justify-between items-center">
 <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Meeting Link</span>
 <a :href="appointment.googleMeetLink" target="_blank" class="text-xs font-bold text-brand-gold hover:underline truncate ml-4">{{ appointment.googleMeetLink }}</a>
 </div>
 </div>

 <NuxtLink to="/profile" class="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-brand-gold transition-all">
 View My Schedule
 <LucideArrowRight :size="16" />
 </NuxtLink>
 </div>

 <div v-else class="text-center space-y-8 animate-fade-in">
 <LucideAlertCircle :size="64" class="mx-auto text-rose-100" />
 <h2 class="text-2xl text-brand-charcoal">Verification Failed</h2>
 <p class="text-slate-500 font-medium max-w-xs mx-auto">We encountered an issue while synchronizing your payment. Please contact our support studio.</p>
 <NuxtLink to="/" class="text-brand-gold font-black uppercase tracking-widest text-xs hover:underline">Back Home</NuxtLink>
 </div>
 </div>
</template>

<script setup lang="ts">
import { LucideLoader2, LucideCheckCircle, LucideArrowRight, LucideAlertCircle } from 'lucide-vue-next';

const route = useRoute();
const { fetchApi } = useApiFactory();
const verifying = ref(true);
const appointment = ref<any>(null);

const verify = async () => {
 const reference = route.query.reference;
 if (!reference) {
 verifying.value = false;
 return;
 }

 try {
 appointment.value = await fetchApi(`/appointments/verify/${reference}`, {
 method: 'POST'
 });
 } catch (e) {
 console.error('Verification failed');
 } finally {
 verifying.value = false;
 }
};

onMounted(verify);

definePageMeta({ layout: 'empty' });
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
