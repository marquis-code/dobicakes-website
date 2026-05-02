<template>
  <div class="bg-brand-cream/20 min-h-screen">
    <div class="max-w-7xl mx-auto px-6 py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <!-- Info -->
        <div class="space-y-12">
          <div class="space-y-4">
            <span class="text-brand-gold text-[10px] font-bold  tracking-[0.4em]">Get In Touch</span>
            <h1 class="text-5xl md:text-7xl font-serif text-brand-charcoal tracking-tight">We'd love to hear from you.</h1>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div v-for="item in contactInfo" :key="item.label" class="space-y-3">
              <span class="text-[9px] font-bold  tracking-widest text-brand-gold">{{ item.label }}</span>
              <p class="text-sm font-medium text-brand-charcoal  tracking-widest">{{ item.value }}</p>
            </div>
          </div>

          <!-- Locations -->
          <div class="space-y-6 pt-12 border-t border-brand-gold/10">
            <h3 class="text-xs font-bold  tracking-[0.3em] text-brand-charcoal">Our Studios</h3>
            <div class="space-y-8">
              <div v-for="loc in locations" :key="loc.name" class="space-y-2">
                <h4 class="text-sm font-serif italic text-brand-gold">{{ loc.name }}</h4>
                <p class="text-[11px] text-brand-muted  tracking-widest leading-relaxed">{{ loc.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="bg-white p-12 shadow-2xl space-y-8">
          <h3 class="text-xl font-serif text-brand-charcoal ">Send a Message</h3>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[9px] font-bold  tracking-widest text-gray-400">Full Name</label>
                <input v-model="form.name" type="text" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs" />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold  tracking-widest text-gray-400">Email Address</label>
                <input v-model="form.email" type="email" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-bold  tracking-widest text-gray-400">Subject</label>
              <select v-model="form.subject" class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs bg-transparent">
                <option>Custom Cake Inquiry</option>
                <option>Order Support</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-bold  tracking-widest text-gray-400">Message</label>
              <textarea v-model="form.message" rows="5" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs resize-none"></textarea>
            </div>
            <button :disabled="loading" class="w-full py-5 bg-brand-charcoal text-white text-[10px] font-bold  tracking-[0.4em] transition-all hover:bg-brand-gold">
              {{ loading ? 'Sending...' : 'Send Inquiry' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  loading.value = true;
  await new Promise(r => setTimeout(r, 1000));
  alert('Thank you! Your message has been sent. We will get back to you shortly.');
  loading.value = false;
  form.value = { name: '', email: '', subject: 'Custom Cake Inquiry', message: '' };
};

definePageMeta({ layout: 'default' });
</script>
