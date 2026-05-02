<template>
  <div class="bg-brand-cream/20 min-h-screen">
    <!-- Hero -->
    <div class="bg-brand-charcoal py-20">
      <div class="max-w-4xl mx-auto px-6 text-center space-y-6">
        <span class="text-brand-gold text-[10px] font-bold  tracking-[0.5em]">Support</span>
        <h1 class="text-5xl md:text-7xl font-serif text-white tracking-tight">Frequently Asked Questions</h1>
        <p class="text-xs text-gray-400  tracking-widest">Everything you need to know about ordering from Dobi Cakes</p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-24 space-y-2">
      <div v-for="(item, idx) in faqItems" :key="idx" class="border border-gray-100 bg-white">
        <button @click="toggle(idx)" class="w-full flex justify-between items-center px-8 py-6 text-left transition-all hover:bg-gray-50/50">
          <h3 class="text-xs font-bold  tracking-widest text-brand-charcoal pr-8">{{ item.q }}</h3>
          <LucideChevronDown :size="16" class="text-brand-gold shrink-0 transition-transform duration-500" :class="openIndex === idx ? 'rotate-180' : ''" />
        </button>
        <Transition
          enter-active-class="transition-all duration-300 ease-out overflow-hidden"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-96 opacity-100"
          leave-active-class="transition-all duration-200 ease-in overflow-hidden"
          leave-from-class="max-h-96 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="openIndex === idx" class="px-8 pb-6">
            <p class="text-[11px] text-brand-muted leading-relaxed  tracking-widest">{{ item.a }}</p>
          </div>
        </Transition>
      </div>

      <!-- CTA -->
      <div class="text-center pt-16 space-y-4">
        <p class="text-xs text-brand-muted  tracking-widest">Still have questions?</p>
        <NuxtLink to="/contact" class="inline-block px-12 py-5 bg-brand-charcoal text-white text-[10px] font-bold  tracking-[0.4em] hover:bg-brand-gold transition-all duration-500">
          Get In Touch
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideChevronDown } from 'lucide-vue-next';

const openIndex = ref(0);
const toggle = (idx: number) => {
  openIndex.value = openIndex.value === idx ? -1 : idx;
};

const faqItems = [
  {
    q: 'How far in advance should I place my order?',
    a: 'We recommend placing your order at least 48 hours in advance for standard cakes. For custom or tiered cakes, please allow 5-7 days. Pre-order cakes require a minimum of 7 days lead time.'
  },
  {
    q: 'Do you offer delivery? What areas do you cover?',
    a: 'Yes! We deliver across Lagos and Abuja. Delivery fees are calculated at checkout based on your location. Orders above ₦100,000 qualify for complimentary delivery within Lagos.'
  },
  {
    q: 'Can I customise the flavour and design of my cake?',
    a: 'Absolutely. Each cake can be customised with your choice of flavour, size, filling, and inscription. For elaborate custom designs, please contact us directly via the Contact page or WhatsApp.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Debit/Credit Cards via Paystack (Visa, Mastercard, Verve) and Direct Bank Transfer. For bank transfers, a unique virtual account is generated for each order to ensure seamless payment tracking.'
  },
  {
    q: 'Do I need an account to place an order?',
    a: 'No. You can checkout as a guest with just your email, phone number, and delivery details. Creating an account lets you track order history and save your preferences for faster checkout.'
  },
  {
    q: 'What is a pre-order cake?',
    a: 'Pre-order cakes are special creations that require advance preparation. They are made with premium, seasonal ingredients and crafted with extra detail. Pre-orders typically require 7+ days lead time.'
  },
  {
    q: 'Can I get a receipt for my order?',
    a: 'Yes. After completing your payment, you will see a confirmation page with a "Print Receipt" button. You can also access your order details and print receipts from your order history if you have an account.'
  },
  {
    q: 'What is your cancellation/refund policy?',
    a: 'Orders can be cancelled up to 24 hours before the scheduled delivery date for a full refund. Cancellations within 24 hours may incur a 50% fee as ingredients would have been procured. Custom cakes are non-refundable once production begins.'
  },
];

definePageMeta({ layout: 'default' });
</script>
