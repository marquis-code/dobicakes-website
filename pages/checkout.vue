<template>
  <div class="section-container py-20 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Delivery Info -->
        <div class="lg:col-span-2 space-y-12 flex-grow">
          <!-- Guest Notice -->
          <div v-if="!isLoggedIn" class="bg-brand-cream/50 border border-brand-gold/10 p-6 space-y-4">
            <div class="flex justify-between items-center">
              <div class="space-y-1">
                <p class="text-xs font-bold  tracking-widest text-brand-charcoal">Checking out as a Guest</p>
                <p class="text-[10px] text-brand-muted  tracking-widest">You don't need an account to place an order.</p>
              </div>
              <NuxtLink to="/auth/login" class="text-[10px] font-bold  tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors border border-brand-gold px-4 py-2">
                Login Instead
              </NuxtLink>
            </div>
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-serif text-brand-charcoal  tracking-widest">Delivery Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-bold  tracking-widest text-gray-400">Full Name *</label>
                <input v-model="form.name" type="text" placeholder="John Doe" class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold  tracking-widest text-gray-400">Email Address *</label>
                <input v-model="form.email" type="email" placeholder="john@example.com" class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold  tracking-widest text-gray-400">Phone Number *</label>
                <input v-model="form.phone" type="tel" placeholder="+234 ..." class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold  tracking-widest text-gray-400">Delivery Date (Optional)</label>
                <input v-model="form.deliveryDate" type="date" class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] font-bold  tracking-widest text-gray-400">Delivery Address *</label>
                <textarea v-model="form.address" placeholder="Street, Apartment, etc." class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm resize-none h-24"></textarea>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold  tracking-widest text-gray-400">City</label>
                <input v-model="form.city" type="text" placeholder="Ikeja" class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold  tracking-widest text-gray-400">State</label>
                <select v-model="form.state" class="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm bg-transparent">
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Delta">Delta</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="space-y-6 pt-12 border-t border-gray-50">
            <h2 class="text-2xl font-serif text-brand-charcoal  tracking-widest">Payment Method</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="flex items-center gap-4 p-6 border transition-all cursor-pointer rounded-sm" :class="form.paymentMethod === 'PAYSTACK' ? 'border-brand-gold bg-brand-cream/30' : 'border-gray-100 hover:border-gray-200'">
                <input type="radio" value="PAYSTACK" v-model="form.paymentMethod" class="accent-brand-gold" />
                <div class="space-y-1">
                  <p class="text-xs font-bold  tracking-widest">Pay with Card</p>
                  <p class="text-[10px] text-gray-400  tracking-widest">Secure checkout via Paystack</p>
                </div>
              </label>
              <label class="flex items-center gap-4 p-6 border transition-all cursor-pointer rounded-sm" :class="form.paymentMethod === 'BANK_TRANSFER' ? 'border-brand-gold bg-brand-cream/30' : 'border-gray-100 hover:border-gray-200'">
                <input type="radio" value="BANK_TRANSFER" v-model="form.paymentMethod" class="accent-brand-gold" />
                <div class="space-y-1">
                  <p class="text-xs font-bold  tracking-widest">Direct Bank Transfer</p>
                  <p class="text-[10px] text-gray-400  tracking-widest">Virtual account generated for you</p>
                </div>
              </label>
            </div>

            <div v-if="form.paymentMethod === 'BANK_TRANSFER'" class="p-6 bg-brand-cream/20 border border-brand-gold/10 rounded-sm space-y-2">
              <p class="text-[10px]  tracking-widest text-brand-muted">A unique virtual bank account will be generated for your order after checkout. Simply transfer the exact amount and your order will be confirmed automatically.</p>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-8 lg:w-[400px]">
          <div class="bg-white border border-gray-100 p-8 space-y-8 sticky top-32 shadow-sm">
            <h4 class="text-[10px] font-bold  tracking-[0.3em] border-b border-gray-50 pb-4">Bag Summary</h4>
            
            <div class="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="item in cart" :key="item._id" class="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                <div class="w-20 h-20 bg-brand-cream/30 overflow-hidden shrink-0">
                  <img :src="item.images[0]" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow space-y-1">
                  <h5 class="text-[10px] font-bold  text-brand-charcoal tracking-widest leading-tight">{{ item.name }}</h5>
                  <div v-if="item.customization" class="text-[8px] text-brand-muted  tracking-widest space-y-0.5">
                    <p>{{ item.customization.flavor }} • {{ item.customization.size }}</p>
                  </div>
                  <div class="flex justify-between items-center pt-2">
                    <p class="text-[9px] text-gray-400  tracking-widest">Qty: {{ item.quantity }}</p>
                    <p class="text-[10px] font-bold text-brand-gold font-serif italic">₦{{ (item.price * item.quantity).toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4 pt-4 text-[10px]  tracking-[0.2em]">
              <div class="flex justify-between">
                <span class="text-gray-400">Subtotal</span>
                <span class="text-brand-charcoal font-medium">₦{{ totalAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Shipping</span>
                <span class="text-brand-charcoal font-medium">₦{{ shippingFee.toLocaleString() }}</span>
              </div>
              <div v-if="discount > 0" class="flex justify-between text-emerald-600 font-bold">
                <span>Discount</span>
                <span>-₦{{ discount.toLocaleString() }}</span>
              </div>
              <div class="border-t border-brand-gold/10 pt-6 flex justify-between items-baseline">
                <span class="font-bold text-brand-charcoal  text-[10px] font-sans tracking-[0.3em]">Total Amount</span>
                <span class="text-2xl text-brand-gold font-serif italic font-bold">₦{{ finalTotal.toLocaleString() }}</span>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="space-y-4 pt-6 border-t border-gray-50">
              <label class="text-[9px] font-bold  tracking-widest text-gray-400">Promo Code</label>
              <div class="flex gap-2">
                <input v-model="promoCode" :disabled="promoApplied" type="text" placeholder="Enter Code" class="flex-grow border-b border-gray-100 py-2 outline-none focus:border-brand-gold transition-colors text-[10px] bg-transparent  tracking-widest placeholder:text-gray-200" />
                <button @click="applyPromo" :disabled="promoApplied || promoLoading" class="text-[9px] font-bold  tracking-widest text-brand-gold hover:text-brand-gold-dark transition-all disabled:opacity-50">
                   {{ promoApplied ? 'Applied ✓' : 'Apply' }}
                </button>
              </div>
            </div>

            <button @click="handleCheckout" :disabled="loading" class="w-full py-5 bg-brand-charcoal text-white text-[10px] font-bold  tracking-[0.4em] transition-all duration-500 hover:bg-brand-gold shadow-xl disabled:opacity-50 active:scale-95">
              <span v-if="loading" class="animate-pulse">Processing...</span>
              <span v-else>Complete Purchase</span>
            </button>

            <!-- Trust -->
            <div class="flex items-center justify-center gap-2 text-[8px] text-gray-300  tracking-widest">
              <LucideLock :size="10" />
              <span>256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideLock } from 'lucide-vue-next';
const { cart, totalAmount, clearCart } = useCart();
const { user, isLoggedIn } = useUser();
const { placeOrder } = useOrders();
const router = useRouter();

const loading = ref(false);
const promoCode = ref('');
const promoApplied = ref(false);
const promoLoading = ref(false);

const form = ref({
  name: isLoggedIn.value ? `${user.value?.firstName || ''} ${user.value?.lastName || ''}`.trim() : '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  address: '',
  city: '',
  state: 'Lagos',
  deliveryDate: '',
  paymentMethod: 'PAYSTACK'
});

const subtotal = computed(() => totalAmount.value);
const shippingFee = ref(2500);
const discount = ref(0);

const finalTotal = computed(() => Math.max(0, subtotal.value + shippingFee.value - discount.value));

const applyPromo = async () => {
  if (!promoCode.value) return;
  promoLoading.value = true;
  // Simulated promo validation — replace with actual API call
  await new Promise(r => setTimeout(r, 800));
  promoApplied.value = true;
  promoLoading.value = false;
};

const handleCheckout = async () => {
  if (!form.value.name || !form.value.phone || !form.value.address || !form.value.email) {
    alert('Please fill in all required fields (Name, Email, Phone, Address).');
    return;
  }

  loading.value = true;
  try {
    const orderData = {
      items: cart.value.map(i => ({ 
        product: i._id, 
        quantity: i.quantity, 
        price: i.price,
        customization: i.customization 
      })),
      totalAmount: finalTotal.value,
      paymentMethod: form.value.paymentMethod,
      guestEmail: form.value.email,
      shippingAddress: {
        name: form.value.name,
        email: form.value.email,
        address: form.value.address,
        city: form.value.city,
        state: form.value.state,
        phone: form.value.phone
      },
      deliveryDate: form.value.deliveryDate || undefined,
      promoCode: promoApplied.value ? promoCode.value : undefined
    };

    const response = await placeOrder(orderData);
    if (!response) return;
    
    if (form.value.paymentMethod === 'PAYSTACK' && response.payment?.data?.authorization_url) {
      window.location.href = response.payment.data.authorization_url;
    } else {
      clearCart();
      router.push(`/order-success?id=${response.order._id}`);
    }
  } catch (error) {
    console.error('Checkout failed:', error);
    alert('Something went wrong. Please try again.');
  } finally {
    loading.value = false;
  }
};

definePageMeta({ layout: 'default' });
</script>
