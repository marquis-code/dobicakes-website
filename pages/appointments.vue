<template>
  <div class="bg-brand-cream/20 min-h-screen">
    <div class="max-w-7xl mx-auto px-6 py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <!-- Info -->
        <div class="space-y-12">
          <div class="space-y-4">
            <span class="text-brand-gold text-[10px] font-bold tracking-[0.4em]">Bespoke Consultation</span>
            <h1 class="text-5xl md:text-7xl font-serif text-brand-charcoal tracking-tight">Book a Private Tasting.</h1>
            <p class="text-sm text-brand-muted leading-relaxed font-light italic">
              "Experience the exquisite flavors of Dobi Cakes in a private, one-on-one session. Whether it's for your wedding or a grand celebration, we're here to curate perfection."
            </p>
          </div>

          <div class="space-y-8 pt-12 border-t border-brand-gold/10">
            <div v-for="type in appointmentTypes" :key="type.name" class="flex justify-between items-center group">
              <div>
                <h4 class="text-sm font-serif italic text-brand-gold group-hover:translate-x-2 transition-transform">{{ type.name }}</h4>
                <p class="text-[10px] text-brand-muted tracking-widest">{{ type.duration }} mins • Personalized Session</p>
              </div>
              <span class="text-xs font-bold text-brand-charcoal">₦{{ type.price.toLocaleString() }}</span>
            </div>
          </div>

          <div class="p-8 bg-white shadow-xl space-y-4">
            <div class="flex items-center gap-4 text-brand-gold">
              <LucideCalendar :size="20" />
              <span class="text-[10px] font-bold tracking-widest uppercase">Automated Sync</span>
            </div>
            <p class="text-[11px] text-brand-muted tracking-widest leading-relaxed">Your appointment is automatically synchronized with our master calendar. You'll receive a Google Calendar invitation once payment is confirmed.</p>
          </div>
        </div>

        <!-- Booking Form -->
        <div class="bg-white p-12 shadow-2xl space-y-8">
          <div v-if="!paymentStep">
            <h3 class="text-xl font-serif text-brand-charcoal mb-8">Consultation Details</h3>
            <form @submit.prevent="proceedToPayment" class="space-y-6">
              <div class="space-y-2">
                <label class="text-[9px] font-bold tracking-widest text-gray-400">Full Name</label>
                <input v-model="form.customerName" type="text" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs" />
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[9px] font-bold tracking-widest text-gray-400">Email Address</label>
                  <input v-model="form.customerEmail" type="email" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs" />
                </div>
                <div class="space-y-2">
                  <label class="text-[9px] font-bold tracking-widest text-gray-400">Phone Number</label>
                  <input v-model="form.customerPhone" type="tel" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs" />
                </div>
              </div>
              
              <div class="space-y-2">
                <UiSelect 
                  v-model="form.type" 
                  label="Consultation Type"
                  :options="appointmentTypes.map(t => ({ label: `${t.name} (₦${t.price.toLocaleString()})`, value: t.name }))"
                />
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[9px] font-bold tracking-widest text-gray-400">Preferred Date</label>
                  <input v-model="form.date" type="date" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs" />
                </div>
                <div class="space-y-2">
                  <label class="text-[9px] font-bold tracking-widest text-gray-400">Preferred Time</label>
                  <input v-model="form.time" type="time" required class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs" />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold tracking-widest text-gray-400">Notes (Optional)</label>
                <textarea v-model="form.notes" rows="3" class="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-xs resize-none"></textarea>
              </div>

              <button :disabled="loading" class="w-full py-5 bg-brand-charcoal text-white text-[10px] font-bold tracking-[0.4em] transition-all hover:bg-brand-gold">
                {{ loading ? 'Initializing...' : 'Proceed to Payment' }}
              </button>
            </form>
          </div>

          <div v-else class="text-center space-y-8 py-12">
            <div class="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto text-brand-gold animate-bounce">
              <LucideCreditCard :size="32" />
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-serif text-brand-charcoal">Secure Checkout</h3>
              <p class="text-xs text-brand-muted tracking-widest">You are about to book a <span class="font-bold text-brand-gold">{{ form.type }}</span> session.</p>
            </div>
            <div class="py-6 border-y border-gray-50 flex justify-between items-center px-4">
              <span class="text-[10px] font-bold tracking-widest uppercase">Total Amount</span>
              <span class="text-2xl font-serif text-brand-gold font-bold">₦{{ selectedTypePrice.toLocaleString() }}</span>
            </div>
            <button @click="handlePayment" class="w-full py-5 bg-brand-gold text-white text-[10px] font-bold tracking-[0.4em] transition-all hover:bg-brand-charcoal shadow-xl">
              Pay with Paystack
            </button>
            <button @click="paymentStep = false" class="text-[10px] font-bold tracking-widest text-gray-400 uppercase hover:text-brand-charcoal transition-colors">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LucideCalendar, LucideCreditCard } from 'lucide-vue-next';

const { fetchApi } = useApiFactory();
const { success: toastSuccess, error: toastError } = useToast();

const loading = ref(false);
const paymentStep = ref(false);
const form = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  type: 'Wedding Tasting',
  date: '',
  time: '',
  notes: '',
  price: 0
});

const appointmentTypes = [
  { name: 'Wedding Tasting', price: 15000, duration: 60 },
  { name: 'Birthday Consultation', price: 5000, duration: 30 },
  { name: 'Custom Order Discussion', price: 10000, duration: 45 },
  { name: 'General Enquiry', price: 0, duration: 15 }
];

const selectedTypePrice = computed(() => {
  return appointmentTypes.find(t => t.name === form.value.type)?.price || 0;
});

const proceedToPayment = () => {
  form.value.price = selectedTypePrice.value;
  if (form.value.price === 0) {
    // Handle free consultation directly if needed
    handleFreeBooking();
  } else {
    paymentStep.value = true;
  }
};

const handleFreeBooking = async () => {
  loading.value = true;
  try {
    const res = await fetchApi('/appointments', {
      method: 'POST',
      body: form.value
    });
    toastSuccess('Booking successful! Check your email for confirmation.');
    // Redirect or show success
  } catch (e) {
    toastError('Failed to create booking.');
  } finally {
    loading.value = false;
  }
};

const handlePayment = async () => {
  loading.value = true;
  try {
    const res = await fetchApi('/appointments', {
      method: 'POST',
      body: form.value
    });
    
    if (res.paymentUrl) {
      window.location.href = res.paymentUrl;
    }
  } catch (e) {
    toastError('Failed to initialize payment.');
  } finally {
    loading.value = false;
  }
};

definePageMeta({ layout: 'default' });
</script>
