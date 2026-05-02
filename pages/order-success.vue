<template>
  <div class="section-container py-32 min-h-screen flex items-center justify-center">
    <div v-if="verifying" class="text-center space-y-4">
      <div class="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-[10px]  tracking-[0.3em] text-gray-400">Verifying your payment...</p>
    </div>

    <div v-else-if="success" class="max-w-2xl w-full animate-fade-in space-y-12">
      <!-- Success Header -->
      <div class="text-center space-y-6">
        <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <LucideCheck class="text-green-500" :size="40" />
        </div>
        <div class="space-y-3">
          <h1 class="text-4xl font-serif text-brand-charcoal  tracking-tight">Magnificent!</h1>
          <p class="text-[10px] text-brand-gold  tracking-[0.4em] font-bold">Your Order is Confirmed</p>
        </div>
        <p class="text-xs text-brand-muted leading-relaxed max-w-md mx-auto font-light">
          We've received your order #{{ orderId.slice(-8).toUpperCase() }}. Our artisans are preparing to craft your masterpieces.
        </p>
      </div>

      <!-- Bank Transfer Alert if applicable -->
      <div v-if="order?.paymentStatus === 'PENDING' && order?.paymentMethod === 'BANK_TRANSFER'" class="bg-brand-charcoal p-8 space-y-6">
        <div class="flex justify-between items-center border-b border-white/10 pb-4">
          <p class="text-[10px]  tracking-[0.3em] text-brand-gold font-bold italic">Bank Transfer Required</p>
          <span class="text-[9px]  tracking-widest bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full">Virtual Account</span>
        </div>
        <div class="space-y-4">
          <div v-for="(val, label) in { 'Bank': order.virtualAccount?.bankName, 'Account Number': order.virtualAccount?.accountNumber, 'Account Name': order.virtualAccount?.accountName }" :key="label" class="flex justify-between items-center text-[10px]  tracking-widest">
            <span class="text-gray-400">{{ label }}</span>
            <span class="text-white font-bold">{{ val }}</span>
          </div>
          <div class="border-t border-white/10 pt-4 flex justify-between items-center">
            <span class="text-gray-400 text-[10px]  tracking-widest">Amount Due</span>
            <span class="text-2xl font-serif text-brand-gold">₦{{ order.totalAmount.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- Cute Receipt Preview (The design for PDF) -->
      <div class="bg-white p-12 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden" id="receipt-to-print">
        <!-- Decorative Elements -->
        <div class="absolute top-0 left-0 w-full h-2 bg-brand-gold"></div>
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-cream/30 rounded-full blur-3xl"></div>
        
        <div class="flex justify-between items-start mb-16">
          <div class="space-y-1">
            <h2 class="text-2xl font-serif text-brand-charcoal ">Receipt</h2>
            <p class="text-[9px] text-brand-muted  tracking-[0.3em]">{{ new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
          </div>
          <div class="text-right">
            <p class="text-[11px] font-bold text-brand-charcoal  tracking-widest">Dobi Cakes Boutique</p>
            <p class="text-[9px] text-brand-muted  tracking-widest">Lagos, Nigeria</p>
          </div>
        </div>

        <div class="space-y-8">
          <div v-for="item in order?.items" :key="item._id" class="flex justify-between items-center border-b border-gray-50 pb-4">
            <div class="flex gap-4 items-center">
              <div class="w-12 h-12 bg-brand-cream rounded-sm overflow-hidden flex-shrink-0">
                <img :src="item.image" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-brand-charcoal  tracking-widest">{{ item.name }}</p>
                <p class="text-[8px] text-brand-muted  tracking-widest">Qty: {{ item.quantity }}</p>
              </div>
            </div>
            <p class="text-xs font-serif italic text-brand-gold">₦{{ (item.price * item.quantity).toLocaleString() }}</p>
          </div>
        </div>

        <div class="mt-12 space-y-3 pt-8 border-t border-dashed border-gray-200">
          <div class="flex justify-between text-[10px]  tracking-widest text-brand-muted">
            <span>Subtotal</span>
            <span>₦{{ order?.totalAmount.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-[10px]  tracking-widest text-brand-muted">
            <span>Delivery</span>
            <span>₦0</span>
          </div>
          <div class="flex justify-between text-lg font-serif text-brand-charcoal pt-4">
            <span>Total Amount</span>
            <span class="text-brand-gold font-bold">₦{{ order?.totalAmount.toLocaleString() }}</span>
          </div>
        </div>

        <div class="mt-16 text-center space-y-4">
          <div class="flex justify-center gap-1">
            <div v-for="i in 3" :key="i" class="w-1 h-1 rounded-full bg-brand-gold/40"></div>
          </div>
          <p class="text-[8px]  tracking-[0.5em] text-brand-muted font-bold">Thank You For Choosing Elegance</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 no-print">
        <button 
          @click="generatePDF" 
          :disabled="downloading"
          class="flex-grow group relative bg-white border border-brand-charcoal py-5 px-8 overflow-hidden transition-all duration-500 hover:text-white disabled:opacity-50"
        >
          <div class="absolute inset-0 bg-brand-charcoal translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
          <div class="relative z-10 flex items-center justify-center gap-3">
            <LucideDownload v-if="!downloading" :size="16" />
            <div v-else class="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
            <span class="text-[10px] font-bold  tracking-[0.3em]">{{ downloading ? 'Preparing PDF...' : 'Download Receipt' }}</span>
          </div>
        </button>
        <NuxtLink to="/shop" class="flex-grow btn-primary text-center py-5 px-8 text-[10px] font-bold  tracking-[0.3em]">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>

    <div v-else class="max-w-md w-full text-center space-y-8 animate-fade-in">
      <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
        <LucideX class="text-red-500" :size="40" />
      </div>
      <div class="space-y-4">
        <h1 class="text-3xl font-serif  text-red-500">Verification Failed</h1>
        <p class="text-xs text-gray-500 leading-relaxed  tracking-widest px-8">
          We couldn't verify your payment reference. If you believe this is a mistake, please contact our support team.
        </p>
      </div>
      <div class="pt-8">
        <NuxtLink to="/checkout" class="btn-primary w-full block  tracking-widest text-xs font-bold py-4">Try Again</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideCheck, LucideX, LucideDownload } from 'lucide-vue-next';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const route = useRoute();
const { verifyOrder, getOrder } = useOrders();
const { showToast } = useCustomToast();

const verifying = ref(true);
const success = ref(false);
const downloading = ref(false);
const orderId = ref(route.query.id || '');
const order = ref<any>(null);

const generatePDF = async () => {
  if (downloading.value) return;
  downloading.value = true;
  
  try {
    const element = document.getElementById('receipt-to-print');
    if (!element) throw new Error('Receipt element not found');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`Dobi-Cakes-Receipt-${orderId.value.slice(-8).toUpperCase()}.pdf`);
    
    showToast({
      title: 'Success',
      message: 'Your receipt has been downloaded successfully.',
      toastType: 'success'
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    showToast({
      title: 'Error',
      message: 'Failed to generate PDF. Please try printing instead.',
      toastType: 'error'
    });
  } finally {
    downloading.value = false;
  }
};

onMounted(async () => {
  const reference = route.query.reference;
  const id = route.query.id;

  if (reference) {
    try {
      const response = await verifyOrder(String(reference));
      order.value = response;
      orderId.value = response._id;
      success.value = true;
    } catch (error) {
      success.value = false;
    } finally {
      verifying.value = false;
    }
  } else if (id) {
    try {
      order.value = await getOrder(String(id));
      success.value = true;
    } catch (error) {
      success.value = false;
    } finally {
      verifying.value = false;
    }
  } else {
    verifying.value = false;
    success.value = false;
  }
});

definePageMeta({ layout: 'default' });
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

#receipt-to-print {
  box-shadow: 0 20px 50px rgba(0,0,0,0.04);
}
</style>


<style>
@media print {
  .no-print {
    display: none !important;
  }
  body {
    background: white !important;
  }
  .section-container {
    padding: 0 !important;
  }
}
</style>
