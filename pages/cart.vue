<template>
  <div class="section-container py-20 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-12">
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-serif text-brand-charcoal ">Your Shopping Bag</h1>
        <div class="w-20 h-[1px] bg-brand-gold mx-auto"></div>
      </div>

      <div v-if="cart.length === 0" class="text-center py-32 border-2 border-dashed border-gray-100 rounded-sm">
        <p class="text-gray-400 italic mb-8  tracking-[0.2em] text-sm">Your bag is currently empty.</p>
        <NuxtLink to="/shop" class="btn-primary  tracking-widest text-xs font-bold py-4 px-12">Start Shopping</NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <!-- Items -->
        <div class="lg:col-span-2 space-y-8">
          <div v-for="item in cart" :key="item._id" class="flex gap-6 border-b border-gray-50 pb-8 last:border-0">
            <div class="w-32 h-32 bg-gray-50 overflow-hidden shrink-0">
              <img :src="item.images[0]" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow space-y-3">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-[9px] text-brand-gold  tracking-[0.3em] font-bold">{{ item.category }}</p>
                  <h3 class="text-xs font-bold text-brand-charcoal  tracking-[0.2em]">{{ item.name }}</h3>
                </div>
                <p class="text-sm text-brand-gold font-serif italic">₦{{ item.price.toLocaleString() }}</p>
              </div>

              <!-- Customization Details -->
              <div v-if="item.customization" class="bg-gray-50/50 p-3 space-y-1 text-[9px]  tracking-widest text-brand-muted border-l-2 border-brand-gold/20">
                <p>Flavor: <span class="text-brand-charcoal font-bold">{{ item.customization.flavor }}</span></p>
                <p>Size: <span class="text-brand-charcoal font-bold">{{ item.customization.size }}</span></p>
                <p v-if="item.customization.customMessage">Inscription: <span class="text-brand-charcoal font-bold italic">"{{ item.customization.customMessage }}"</span></p>
              </div>
              
              <div class="flex items-center justify-between pt-4">
                <div class="flex border border-gray-100 bg-white">
                  <button @click="item.quantity > 1 && item.quantity--" class="px-3 py-1 hover:bg-gray-50 transition-colors">-</button>
                  <span class="px-4 py-1 text-[10px] font-bold min-w-[30px] text-center flex items-center justify-center">{{ item.quantity }}</span>
                  <button @click="item.quantity++" class="px-3 py-1 hover:bg-gray-50 transition-colors">+</button>
                </div>
                <button @click="removeFromCart(item._id)" class="text-[9px] text-gray-300  tracking-widest hover:text-rose-500 transition-colors font-bold">Remove From Bag</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="space-y-8">
          <div class="bg-white border border-gray-100 p-8 space-y-6">
            <h4 class="text-xs font-bold  tracking-[0.2em] border-b border-gray-100 pb-4">Order Summary</h4>
            
            <div class="space-y-4 text-[11px]  tracking-widest">
              <div class="flex justify-between">
                <span class="text-gray-400">Subtotal</span>
                <span class="text-brand-charcoal font-bold">₦{{ totalAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Shipping</span>
                <span class="text-brand-charcoal font-bold">Calculated at checkout</span>
              </div>
              <div class="border-t border-gray-100 pt-4 flex justify-between text-sm">
                <span class="font-bold">Total</span>
                <span class="text-brand-gold font-bold">₦{{ totalAmount.toLocaleString() }}</span>
              </div>
            </div>

            <NuxtLink to="/checkout" class="group relative block w-full bg-brand-charcoal text-white text-center  tracking-[0.3em] text-[11px] font-bold py-5 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              <span class="relative z-10">Proceed to Secure Checkout</span>
              <div class="absolute inset-0 bg-brand-gold translate-y-full transition-transform duration-700 group-hover:translate-y-0"></div>
            </NuxtLink>
            <div class="flex items-center justify-center gap-2 pt-2 text-[8px] text-gray-400  tracking-widest font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Encrypted & Secure Payment
            </div>
          </div>
          
          <p class="text-[10px] text-gray-400 italic text-center  tracking-widest">Complimentary delivery for orders over ₦100,000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cart, removeFromCart, totalAmount } = useCart();
definePageMeta({ layout: 'default' });
</script>
