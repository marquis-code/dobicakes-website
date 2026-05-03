<template>
 <div class="section-container py-20 min-h-screen">
 <div class="max-w-4xl mx-auto space-y-12">
 <div class="text-center space-y-4">
 <span class="text-brand-gold text-sm font-bold ">My Account</span>
 <h1 class="text-4xl text-brand-charcoal ">Your Profile</h1>
 </div>

 <!-- Profile Card -->
 <div class="bg-white border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-center">
 <div class="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-white text-3xl shrink-0">
 {{ user?.firstName?.[0] || 'U' }}
 </div>
 <div class="flex-grow text-center md:text-left space-y-1">
 <h2 class="text-lg font-bold text-brand-charcoal tracking-widest">{{ user?.firstName }} {{ user?.lastName }}</h2>
 <p class="text-sm text-brand-muted tracking-widest">{{ user?.email }}</p>
 </div>
 <button @click="logOut()" class="text-sm font-bold tracking-widest text-rose-400 hover:text-rose-600 transition-colors border border-rose-200 px-6 py-3">
 Sign Out
 </button>
 </div>

 <!-- Order History -->
 <div class="space-y-6">
 <h3 class="text-xs font-bold tracking-[0.3em] text-brand-charcoal">Order History</h3>
 
 <div v-if="loadingOrders" class="text-center py-16">
 <div class="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
 </div>

 <div v-else-if="orders.length === 0" class="text-center py-16 border-2 border-dashed border-gray-100 space-y-4">
 <p class="text-brand-muted text-sm tracking-widest">No orders yet.</p>
 <NuxtLink to="/shop" class="inline-block px-8 py-3 bg-brand-charcoal text-white text-sm font-bold tracking-widest hover:bg-brand-gold transition-all">
 Start Shopping
 </NuxtLink>
 </div>

 <div v-else class="space-y-4">
 <div v-for="order in orders" :key="order._id" class="bg-white border border-gray-100 p-6 space-y-4 hover:shadow-md transition-all">
 <div class="flex flex-wrap justify-between items-start gap-4">
 <div class="space-y-1">
 <p class="text-sm text-brand-gold tracking-widest font-bold">#{{ order._id.slice(-8) }}</p>
 <p class="text-[9px] text-brand-muted tracking-widest">{{ new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
 </div>
 <div class="flex items-center gap-4">
 <span class="text-sm text-brand-gold italic font-bold">₦{{ order.totalAmount.toLocaleString() }}</span>
 <span class="text-[9px] font-bold tracking-widest px-3 py-1 rounded-sm"
 :class="{
 'bg-amber-50 text-amber-600': order.status === 'PENDING',
 'bg-emerald-50 text-emerald-600': order.status === 'PAID',
 'bg-blue-50 text-blue-600': order.status === 'PROCESSING',
 'bg-gray-50 text-gray-600': order.status === 'DELIVERED',
 'bg-rose-50 text-rose-600': order.status === 'CANCELLED',
 }">
 {{ formatLabel(order.status) }}
 </span>
 </div>
 </div>
 <div class="flex flex-wrap gap-3 pt-2 border-t border-gray-50">
 <div v-for="item in order.items" :key="item._id" class="flex items-center gap-3">
 <div class="w-10 h-10 bg-brand-cream/30 overflow-hidden">
 <img :src="item.product?.images?.[0]" class="w-full h-full object-cover" />
 </div>
 <span class="text-[9px] font-bold tracking-widest text-brand-charcoal">{{ item.product?.name }} × {{ item.quantity }}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated: isLoggedIn, logout } = useAuth();
const { getMyOrders } = useOrders();
const router = useRouter();

const logOut = () => {
  logout();
  router.push('/');
};

const orders = ref([]);
const loadingOrders = ref(true);

onMounted(async () => {
 if (!isLoggedIn.value) {
 router.push('/auth/login');
 return;
 }
 try {
 orders.value = await getMyOrders() || [];
 } catch (e) {
 console.error('Failed to load orders:', e);
 } finally {
 loadingOrders.value = false;
 }
});

definePageMeta({ layout: 'default' });
</script>
