<template>
 <div class="section-container py-24 min-h-screen bg-brand-cream/10">
 <div class="max-w-6xl mx-auto space-y-16">
 <div class="text-center space-y-2">
 <h1 class="text-3xl text-brand-charcoal ">Your Shopping Bag</h1>
 <div class="w-20 h-[1px] bg-brand-gold mx-auto"></div>
 </div>

 <div v-if="cart.length === 0" class="text-center py-40 border-2 border-dashed border-slate-100 rounded-3xl bg-white flex flex-col items-center justify-center space-y-8 shadow-sm">
 <div class="w-32 h-32 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold/20 animate-pulse">
 <LucideShoppingBag :size="64" stroke-width="1" />
 </div>
 <div class="space-y-4">
 <p class="text-brand-muted italic text-lg font-light">Your bag is currently empty.</p>
 <p class="text-sm text-slate-900 tracking-widest font-bold">Discover our handcrafted collections to begin</p>
 </div>
 <div class="pt-8">
 <NuxtLink to="/shop" class="btn-premium px-16 shadow-lg shadow-brand-charcoal/5">Start Shopping</NuxtLink>
 </div>
 </div>

 <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
 <!-- Items -->
 <div class="lg:col-span-7 space-y-8">
 <div v-for="item in cart" :key="item._id" class="flex flex-col md:flex-row gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-brand-gold/20 transition-all group relative">
 <!-- Product Image -->
 <div class="w-full md:w-48 h-56 md:h-48 bg-brand-cream/30 rounded-2xl overflow-hidden shrink-0 shadow-inner">
 <img :src="item.images[0]" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
 </div>
 
 <!-- Product Info -->
 <div class="flex-grow flex flex-col justify-between min-w-0">
 <div class="space-y-6">
 <div class="flex justify-between items-start gap-6">
 <div class="space-y-2 min-w-0">
 <p class="text-sm text-brand-gold tracking-[0.3em] font-bold ">{{ item.category }}</p>
 <h3 class="text-xl italic text-brand-charcoal truncate">{{ item.name }}</h3>
 </div>
 <div class="text-right shrink-0">
 <p class="text-2xl text-brand-gold italic font-bold">₦{{ item.price.toLocaleString() }}</p>
 </div>
 </div>

 <!-- Customization Details -->
 <div v-if="item.customization" class="bg-brand-cream/30 p-5 space-y-3 text-[11px] tracking-widest text-brand-muted border-l-4 border-brand-gold/30 rounded-r-2xl shadow-sm">
 <div class="flex justify-between border-b border-brand-gold/5 pb-2">
 <span class="opacity-60 font-bold text-xs">Flavor</span>
 <span class="text-brand-charcoal font-bold">{{ item.customization.flavor }}</span>
 </div>
 <div class="flex justify-between border-b border-brand-gold/5 pb-2">
 <span class="opacity-60 font-bold text-xs">Size</span>
 <span class="text-brand-charcoal font-bold">{{ item.customization.size }}</span>
 </div>
 <div v-if="item.customization.customMessage" class="pt-2 italic text-brand-charcoal font-medium text-xs">
 "{{ item.customization.customMessage }}"
 </div>
 </div>
 </div>
 
 <!-- Footer: Quantity & Remove -->
 <div class="flex items-center justify-between pt-8 mt-4 border-t border-slate-50">
 <div class="flex items-center bg-slate-50 rounded-2xl p-1.5 shadow-inner">
 <button @click="item.quantity > 1 && item.quantity--" class="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-brand-gold transition-all rounded-xl shadow-sm">-</button>
 <span class="px-8 text-sm font-bold text-brand-charcoal min-w-[50px] text-center">{{ item.quantity }}</span>
 <button @click="item.quantity++" class="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-brand-gold transition-all rounded-xl shadow-sm">+</button>
 </div>
 <button @click="removeFromCart(item._id)" class="text-sm text-slate-900 tracking-[0.3em] hover:text-rose-500 transition-colors font-bold flex items-center gap-2">
 <span>Remove</span>
 </button>
 </div>
 </div>
 </div>
 </div>

 <!-- Summary -->
 <div class="lg:col-span-5">
 <div class="bg-white border border-slate-100 p-6 sm:p-8 space-y-8 sticky top-32 shadow-xl rounded-3xl">
 <h4 class="text-sm font-bold text-brand-charcoal border-b border-slate-50 pb-6">Order Summary</h4>
 
 <div class="space-y-6">
 <div class="flex justify-between items-center text-sm">
 <span class="text-brand-muted font-medium">Subtotal</span>
 <span class="text-brand-charcoal font-bold">₦{{ totalAmount.toLocaleString() }}</span>
 </div>
 
 <div class="flex flex-col gap-1 text-sm">
 <div class="flex justify-between items-center">
 <span class="text-brand-muted font-medium">Shipping</span>
 <span class="text-brand-charcoal font-semibold text-[11px] tracking-wider">Calculated next</span>
 </div>
 <p class="text-sm text-slate-400 italic">Final shipping costs calculated at checkout</p>
 </div>

 <div class="border-t border-brand-gold/10 pt-8 flex justify-between items-center">
 <span class="font-bold text-brand-charcoal text-xs tracking-widest ">Total Amount</span>
 <span class="text-3xl text-brand-gold italic font-bold">₦{{ totalAmount.toLocaleString() }}</span>
 </div>
 </div>

 <NuxtLink to="/checkout" class="btn-premium text-sm w-full !py-3 shadow-2xl shadow-brand-charcoal/10 hover:shadow-brand-gold/20 transition-all flex items-center justify-center gap-3">
 <span>Checkout Now</span>
 <LucideChevronRight :size="18" />
 </NuxtLink>
 
 <div class="flex items-center justify-center gap-2 pt-2 text-sm text-slate-900 tracking-wider font-bold ">
 <LucideLock :size="14" />
 <span>Secure Checkout</span>
 </div>
 </div>
 
 <div class="mt-8 p-6 bg-brand-gold/5 rounded-2xl border border-brand-gold/10">
 <p class="text-[11px] text-brand-gold font-bold text-center tracking-widest ">Complimentary delivery for orders over ₦100,000</p>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
import { LucideShoppingBag, LucideLock, LucideChevronRight } from 'lucide-vue-next';
const { cart, removeFromCart, totalAmount } = useCart();
definePageMeta({ layout: 'default' });
</script>
