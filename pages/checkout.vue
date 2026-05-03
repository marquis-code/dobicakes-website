<template>
  <div class="section-container py-24 min-h-screen bg-brand-cream/10">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <!-- Delivery Info -->
        <div class="lg:col-span-7 space-y-12">
          <!-- Guest Notice -->
          <div v-if="!isLoggedIn" class="bg-brand-cream/50 border border-brand-gold/10 p-6 space-y-4">
            <div class="flex justify-between items-center">
              <div class="space-y-1">
                <p class="text-xs font-bold  tracking-widest text-brand-charcoal">Checking out as a Guest</p>
                <p class="text-[10px] text-brand-muted  tracking-widest">You don't need an account to place an order.</p>
              </div>
              <button @click="showAuthModal = true" class="text-[11px] font-bold tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors border border-brand-gold px-4 py-2 rounded-lg">
                Login Instead
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-serif text-brand-charcoal  tracking-widest">Delivery Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-bold tracking-widest text-brand-charcoal">Full Name *</label>
                <input v-model="form.name" type="text" placeholder="John Doe" class="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold tracking-widest text-brand-charcoal">Email Address *</label>
                <input v-model="form.email" type="email" placeholder="john@example.com" class="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold tracking-widest text-brand-charcoal">Phone Number *</label>
                <input v-model="form.phone" type="tel" placeholder="+234 ..." class="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold tracking-widest text-brand-charcoal">Delivery Date (Optional)</label>
                <input v-model="form.deliveryDate" type="date" class="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-xs font-bold tracking-widest text-brand-charcoal">Delivery Address *</label>
                <textarea v-model="form.address" placeholder="Street, Apartment, etc." class="w-full h-24 py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none resize-none"></textarea>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold tracking-widest text-brand-charcoal">City</label>
                <input v-model="form.city" type="text" placeholder="Ikeja" class="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold tracking-widest text-brand-charcoal">State</label>
                <UiSelect 
                  v-model="form.state" 
                  :options="['Lagos', 'Abuja', 'Ogun', 'Rivers', 'Oyo', 'Enugu', 'Delta']"
                />
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="space-y-6 pt-10 border-t border-brand-gold/10">
            <h2 class="text-2xl font-serif text-brand-charcoal">Payment Method</h2>
            <div class="grid grid-cols-2 gap-4">
              <label class="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border transition-all cursor-pointer rounded-xl text-center sm:text-left" :class="form.paymentMethod === 'PAYSTACK' ? 'border-brand-gold bg-brand-gold/5 shadow-md' : 'border-slate-200 hover:border-brand-gold/50'">
                <input type="radio" value="PAYSTACK" v-model="form.paymentMethod" class="w-4 h-4 accent-brand-gold mt-1" />
                <div class="space-y-1">
                  <p class="text-xs font-bold tracking-widest text-brand-charcoal">Pay with Card</p>
                  <p class="text-[10px] text-brand-muted tracking-widest italic font-light hidden sm:block">Secure checkout via Paystack</p>
                </div>
              </label>
              <label class="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border transition-all cursor-pointer rounded-xl text-center sm:text-left" :class="form.paymentMethod === 'BANK_TRANSFER' ? 'border-brand-gold bg-brand-gold/5 shadow-md' : 'border-slate-200 hover:border-brand-gold/50'">
                <input type="radio" value="BANK_TRANSFER" v-model="form.paymentMethod" class="w-4 h-4 accent-brand-gold mt-1" />
                <div class="space-y-1">
                  <p class="text-xs font-bold tracking-widest text-brand-charcoal">Direct Bank Transfer</p>
                  <p class="text-[10px] text-brand-muted tracking-widest italic font-light hidden sm:block">Virtual account generated for you</p>
                </div>
              </label>
            </div>

            <div v-if="form.paymentMethod === 'BANK_TRANSFER'" class="p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-xl">
              <p class="text-[11px] tracking-widest text-brand-charcoal leading-relaxed">A unique virtual bank account will be generated for your order. Simply transfer the exact amount and your order will be confirmed automatically.</p>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-5">
          <div class="bg-white border border-slate-100 p-6 sm:p-8 space-y-10 sticky top-32 shadow-2xl rounded-3xl">
            <div class="space-y-2">
              <h4 class="text-xs font-bold tracking-[0.2em] text-brand-muted">Bag Summary</h4>
              <p class="text-xs italic font-light text-slate-400">Review your artisanal selection</p>
            </div>
            
            <div class="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="item in cart" :key="item._id" class="flex gap-4 border-b border-slate-100 pb-4 last:border-0">
                <div class="w-20 h-20 bg-brand-cream/30 overflow-hidden shrink-0 rounded-xl border border-slate-100">
                  <img :src="item.images[0]" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow space-y-1">
                  <h5 class="text-xs font-bold text-brand-charcoal tracking-widest leading-tight">{{ item.name }}</h5>
                  <div v-if="item.customization" class="text-[10px] text-brand-muted tracking-widest space-y-0.5 italic font-light">
                    <p>{{ item.customization.flavor }} • {{ item.customization.size }}</p>
                  </div>
                  <div class="flex justify-between items-center pt-2">
                    <p class="text-[11px] text-brand-muted tracking-widest font-bold">Qty: {{ item.quantity }}</p>
                    <p class="text-sm font-bold text-brand-gold font-serif italic">₦{{ (item.price * item.quantity).toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4 pt-4 text-xs tracking-widest font-bold">
              <div class="flex justify-between">
                <span class="text-brand-muted">Subtotal</span>
                <span class="text-brand-charcoal">₦{{ totalAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brand-muted">Shipping</span>
                <span class="text-brand-charcoal">₦{{ shippingFee.toLocaleString() }}</span>
              </div>
              <div v-if="discount > 0" class="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-₦{{ discount.toLocaleString() }}</span>
              </div>
              <div class="border-t border-brand-gold/10 pt-8 flex justify-between items-baseline">
                <span class="font-bold text-brand-charcoal text-[11px] tracking-[0.3em]">Total Amount</span>
                <span class="text-3xl text-brand-gold font-serif italic font-bold">₦{{ finalTotal.toLocaleString() }}</span>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="pt-6 border-t border-slate-100">
              <button v-if="!showPromoUI" @click="showPromoUI = true" class="text-xs font-bold tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors w-full text-left">
                Have a promo code?
              </button>
              <div v-else class="space-y-3 animate-fade-in">
                <label class="text-[10px] font-bold tracking-widest text-brand-muted italic">Promo Code</label>
                <div class="flex gap-3">
                  <input v-model="promoCode" :disabled="promoApplied" type="text" placeholder="Enter code" class="flex-grow py-2 px-4 rounded-xl border border-slate-200 focus:border-brand-gold outline-none" />
                  <button @click="applyPromo" :disabled="promoApplied || promoLoading" class="text-xs font-bold tracking-widest text-white bg-brand-gold hover:bg-brand-charcoal transition-all disabled:opacity-50 px-6 py-2 rounded-xl shrink-0">
                     {{ promoApplied ? 'Applied ✓' : 'Apply' }}
                  </button>
                </div>
              </div>
            </div>

            <button @click="handleCheckout" :disabled="loading" class="btn-premium w-full !py-3.5 text-sm shadow-xl shadow-brand-gold/20 active:scale-95 transition-all mt-4">
              <span v-if="loading" class="animate-pulse">Processing...</span>
              <span v-else>Complete Purchase</span>
            </button>

            <!-- Trust -->
            <div class="flex items-center justify-center gap-3 text-[10px] text-slate-300 tracking-widest font-bold ">
              <LucideLock :size="14" />
              <span>256-bit SSL Encrypted Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Auth Modal -->
  <div v-if="showAuthModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
      <button @click="showAuthModal = false" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-charcoal hover:bg-slate-50 rounded-full transition-colors">
        <LucideX :size="20" />
      </button>
      
      <div class="text-center space-y-2 mb-8">
        <h3 class="text-3xl font-serif text-brand-charcoal">Login</h3>
        <p class="text-xs text-brand-muted tracking-widest">Sign in to complete your purchase</p>
      </div>

      <div class="space-y-4 mb-6">
        <button @click="handleGoogleLogin" class="w-full flex items-center justify-center gap-4 border border-slate-200 py-3 hover:bg-slate-50 transition-all rounded-xl">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" />
          <span class="text-xs font-bold tracking-widest">Continue with Google</span>
        </button>
      </div>

      <div class="relative flex items-center justify-center mb-6">
        <div class="absolute inset-x-0 h-[1px] bg-slate-100"></div>
        <span class="relative z-10 bg-white px-4 text-[10px] text-brand-muted tracking-widest italic font-light">Or use email</span>
      </div>

      <form @submit.prevent="handleModalLogin" class="space-y-6">
        <div class="space-y-2">
          <label class="text-xs font-bold tracking-widest text-brand-charcoal">Email Address</label>
          <input v-model="loginForm.email" type="email" required placeholder="john@example.com" class="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold outline-none" />
        </div>
        <div class="space-y-2">
          <label class="text-xs font-bold tracking-widest text-brand-charcoal">Password</label>
          <div class="relative">
            <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••" class="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-brand-gold outline-none pr-12" />
            <button @click.prevent="showPassword = !showPassword" type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-gold transition-colors">
              <LucideEye v-if="!showPassword" :size="18" />
              <LucideEyeOff v-else :size="18" />
            </button>
          </div>
        </div>
        
        <button :disabled="authLoading" class="btn-premium w-full !py-3 shadow-lg">
          <span v-if="authLoading" class="animate-pulse">Signing in...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LucideLock, LucideX, LucideEye, LucideEyeOff } from 'lucide-vue-next';
const { error: toastError } = useToast();
const { showToast } = useCustomToast();
const { login, socialLogin } = useLogin();
const { cart, totalAmount, clearCart } = useCart();
const { user, isLoggedIn } = useUser();
const { placeOrder } = useOrders();
const router = useRouter();
const { $firebaseAuth } = useNuxtApp();

const loading = ref(false);
const promoCode = ref('');
const promoApplied = ref(false);
const promoLoading = ref(false);
const showPromoUI = ref(false);

const showAuthModal = ref(false);
const authLoading = ref(false);
const showPassword = ref(false);
const loginForm = ref({ email: '', password: '' });

const populateFormFromUser = () => {
  if (isLoggedIn.value && user.value) {
    form.value.name = `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim();
    form.value.email = user.value.email || '';
    form.value.phone = user.value.phone || '';
  }
};

const handleModalLogin = async () => {
  authLoading.value = true;
  try {
    await login(loginForm.value);
    showAuthModal.value = false;
    populateFormFromUser();
  } catch (error: any) {
    showToast({
      title: 'Login Failed',
      message: error.response?.data?.message || 'Please check your credentials and try again.',
      toastType: 'error'
    });
  } finally {
    authLoading.value = false;
  }
};

const handleGoogleLogin = async () => {
  authLoading.value = true;
  try {
    const provider = new GoogleAuthProvider();
    if (!$firebaseAuth) return;
    const result = await signInWithPopup($firebaseAuth, provider);
    const token = await result.user.getIdToken();
    await socialLogin(token);
    showAuthModal.value = false;
    populateFormFromUser();
  } catch (error) {
    console.error('Google login failed:', error);
  } finally {
    authLoading.value = false;
  }
};

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
    toastError('Please fill in all required fields (Name, Email, Phone, Address).');
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

    // ─── PAYSTACK CARD PAYMENT ───────────────────────
    if (form.value.paymentMethod === 'PAYSTACK' && response.payment?.data?.authorization_url) {
      clearCart();
      window.location.href = response.payment.data.authorization_url;
      return;
    }

    // ─── BANK TRANSFER ──────────────────────────────
    if (form.value.paymentMethod === 'BANK_TRANSFER') {
      clearCart();

      // If Paystack generated a bank transfer page, redirect there
      if (response.bankTransfer?.authorizationUrl) {
        window.location.href = response.bankTransfer.authorizationUrl;
        return;
      }

      // Fallback: go to order success with order ID
      router.push(`/order-success?id=${response.order._id}`);
      return;
    }

    // Default fallback
    clearCart();
    router.push(`/order-success?id=${response.order._id}`);
  } catch (error) {
    console.error('Checkout failed:', error);
    toastError('Something went wrong. Please try again.');
  } finally {
    loading.value = false;
  }
};

definePageMeta({ layout: 'default' });
</script>
