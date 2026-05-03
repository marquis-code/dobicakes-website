<template>
 <div class="bg-brand-cream/20 min-h-screen">
 <div class="max-w-7xl mx-auto px-6 py-24">
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
 <!-- Info -->
 <div class="space-y-12">
 <div class="space-y-4">
 <span class="text-brand-gold text-sm font-bold ">Get In Touch</span>
 <h1 class="text-5xl md:text-7xl text-brand-charcoal tracking-tight">We'd love to hear from you.</h1>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
 <div v-for="item in contactInfo" :key="item.label" class="space-y-3">
 <span class="text-[9px] font-bold tracking-widest text-brand-gold">{{ item.label }}</span>
 <p class="text-sm font-medium text-brand-charcoal tracking-widest">{{ item.value }}</p>
 </div>
 </div>

 <!-- Locations -->
 <div class="space-y-6 pt-12 border-t border-brand-gold/10">
 <h3 class="text-xs font-bold tracking-[0.3em] text-brand-charcoal">Our Studios</h3>
 <div class="space-y-8">
 <div v-for="loc in locations" :key="loc.name" class="space-y-2">
 <h4 class="text-sm italic text-brand-gold">{{ loc.name }}</h4>
 <p class="text-[11px] text-brand-muted tracking-widest leading-relaxed">{{ loc.address }}</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Form -->
 <div class="bg-white p-12 shadow-2xl space-y-10 rounded-2xl border border-slate-100">
 <div class="space-y-2">
 <h3 class="text-2xl text-brand-charcoal">Send a Message</h3>
 <p class="text-[11px] text-brand-muted tracking-widest italic font-light">We usually respond within 24 hours</p>
 </div>
 <form @submit.prevent="handleSubmit" class="space-y-8">
 <div class="space-y-6">
 <div class="space-y-3">
 <label class="text-sm font-bold tracking-widest text-brand-charcoal ">Full Name</label>
 <input v-model="form.name" type="text" required placeholder="John Doe" class="w-full" />
 </div>
 <div class="space-y-3">
 <label class="text-sm font-bold tracking-widest text-brand-charcoal ">Email Address</label>
 <input v-model="form.email" type="email" required placeholder="john@example.com" class="w-full" />
 </div>
 </div>
 <div class="space-y-3">
 <label class="text-sm font-bold tracking-widest text-brand-charcoal ">Subject</label>
 <UiSelect 
 v-model="form.subject" 
 :options="['Custom Cake Inquiry', 'Order Support', 'Partnership', 'Other']"
 />
 </div>
 <div class="space-y-3">
 <label class="text-sm font-bold tracking-widest text-brand-charcoal ">Message</label>
 <textarea v-model="form.message" rows="5" required placeholder="Tell us more about your request..." class="w-full resize-none"></textarea>
 </div>
 <button :disabled="loading" class="btn-premium w-full !py-3 shadow-xl shadow-brand-charcoal/10">
 {{ loading ? 'Sending Enquiry...' : 'Send Message' }}
 </button>
 </form>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
const { success, error: toastError } = useToast();
const { fetchApi } = useApiFactory();
const loading = ref(false);
const form = ref({
 name: '',
 email: '',
 subject: 'Custom Cake Inquiry',
 message: ''
});

const contactInfo = [
 { label: 'General Enquiries', value: 'hello@dobicakes.com' },
 { label: 'Order Support', value: 'orders@dobicakes.com' },
 { label: 'Phone', value: '+234 800 000 0000' },
 { label: 'WhatsApp', value: '+234 900 000 0000' }
];

const locations = [
 { name: 'Lagos Studio', address: '123 Luxury Lane, Victoria Island, Lagos, Nigeria' },
 { name: 'Abuja Studio', address: '456 Elite Crescent, Maitama, Abuja, Nigeria' }
];

const handleSubmit = async () => {
 if (!form.value.name || !form.value.email || !form.value.message) {
 toastError('Please fill in all required fields.');
 return;
 }
 loading.value = true;
 try {
 await fetchApi('/enquiries', {
 method: 'POST',
 body: {
 name: form.value.name,
 email: form.value.email,
 subject: form.value.subject,
 message: form.value.message,
 },
 });
 success('Thank you! Your message has been sent. We will get back to you shortly.');
 form.value = { name: '', email: '', subject: 'Custom Cake Inquiry', message: '' };
 } catch (err: any) {
 console.error('Contact form error:', err);
 toastError(err?.data?.message || 'Something went wrong. Please try again.');
 } finally {
 loading.value = false;
 }
};

definePageMeta({ layout: 'default' });
</script>
