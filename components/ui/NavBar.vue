<template>
 <nav class="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
 <div class="section-container !py-0 flex items-center justify-between h-16 md:h-20">
 <!-- Logo -->
 <NuxtLink to="/" class="flex items-center gap-2">
 <div class="w-9 h-9 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold text-lg">
 D
 </div>
 <div class="hidden sm:block">
 <span class="text-lg font-bold tracking-tight text-brand-charcoal ">Dobi</span>
 <span class="text-lg font-light tracking-widest text-brand-gold ml-1">Cakes</span>
 </div>
 </NuxtLink>

 <!-- Desktop Nav -->
 <div class="hidden lg:flex items-center gap-10 text-sm font-bold text-brand-charcoal ">
 <NuxtLink to="/" class="hover:text-brand-gold transition-colors py-7 border-b-2 border-transparent" active-class="text-brand-gold !border-brand-gold">Home</NuxtLink>
 <NuxtLink to="/shop" class="hover:text-brand-gold transition-colors py-7 border-b-2 border-transparent" active-class="text-brand-gold !border-brand-gold">Shop</NuxtLink>
 <NuxtLink to="/about" class="hover:text-brand-gold transition-colors py-7 border-b-2 border-transparent" active-class="text-brand-gold !border-brand-gold">Our Story</NuxtLink>
 <NuxtLink to="/blog" class="hover:text-brand-gold transition-colors py-7 border-b-2 border-transparent" active-class="text-brand-gold !border-brand-gold">Blog</NuxtLink>
 <NuxtLink to="/faq" class="hover:text-brand-gold transition-colors py-7 border-b-2 border-transparent" active-class="text-brand-gold !border-brand-gold">FAQ</NuxtLink>
 <NuxtLink to="/contact" class="hover:text-brand-gold transition-colors py-7 border-b-2 border-transparent" active-class="text-brand-gold !border-brand-gold">Contact</NuxtLink>
 </div>

 <!-- Actions -->
 <div class="flex items-center gap-4">
 <NuxtLink to="/cart" class="relative hover:text-brand-gold transition-colors p-2">
 <LucideShoppingBag :size="20" />
 <span v-if="itemCount > 0" class="absolute -top-0 -right-0 bg-brand-gold text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
 {{ itemCount }}
 </span>
 </NuxtLink>
 <div class="h-5 w-[1px] bg-gray-200 hidden md:block"></div>
 <NuxtLink v-if="!isAuthenticated" to="/auth/login" class="hidden md:block text-sm font-bold tracking-widest hover:text-brand-gold transition-colors">
 Login
 </NuxtLink>
 <NuxtLink v-else to="/profile" class="hidden md:flex items-center gap-2 hover:text-brand-gold transition-colors">
 <LucideUser :size="18" />
 <span class="hidden xl:inline text-sm font-bold capitalize tracking-widest">{{ user?.firstName || user?.email?.split('@')[0] }}</span>
 </NuxtLink>

 <!-- Mobile Menu Button -->
 <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 hover:text-brand-gold transition-colors">
 <LucideMenu v-if="!mobileMenuOpen" :size="22" />
 <LucideX v-else :size="22" />
 </button>
 </div>
 </div>

 <!-- Mobile Menu -->
 <Transition
 enter-active-class="transition-all duration-300 ease-out"
 enter-from-class="opacity-0 -translate-y-2"
 enter-to-class="opacity-100 translate-y-0"
 leave-active-class="transition-all duration-200 ease-in"
 leave-from-class="opacity-100 translate-y-0"
 leave-to-class="opacity-0 -translate-y-2"
 >
 <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-50 shadow-xl">
 <div class="section-container !py-8 space-y-6">
 <NuxtLink v-for="link in mobileLinks" :key="link.to" :to="link.to" @click="mobileMenuOpen = false"
 class="block text-sm font-bold tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors py-2 border-b border-gray-50 last:border-0">
 {{ link.label }}
 </NuxtLink>
 <div class="pt-4 space-y-4">
 <NuxtLink v-if="!isAuthenticated" to="/auth/login" @click="mobileMenuOpen = false" class="block w-full py-4 bg-brand-charcoal text-white text-center text-sm font-bold tracking-[0.3em]">
 Login / Register
 </NuxtLink>
 <button v-else @click="handleLogout" class="block w-full py-4 border border-gray-200 text-center text-sm font-bold tracking-[0.3em] hover:border-rose-300 hover:text-rose-500 transition-colors">
 Sign Out
 </button>
 </div>
 </div>
 </div>
 </Transition>
 </nav>
</template>

<script setup lang="ts">
import { LucideShoppingBag, LucideUser, LucideMenu, LucideX } from 'lucide-vue-next';

const { itemCount } = useCart();
const { isAuthenticated, user, logout } = useAuth();
const mobileMenuOpen = ref(false);

const handleLogout = () => {
 logout();
 mobileMenuOpen.value = false;
 window.location.href = '/';
};

const mobileLinks = [
 { to: '/', label: 'Home' },
 { to: '/shop', label: 'Shop All Cakes' },
 { to: '/about', label: 'Our Story' },
 { to: '/blog', label: 'Blog' },
 { to: '/faq', label: 'FAQ' },
 { to: '/contact', label: 'Contact Us' },
];

// Close mobile menu on route change
const route = useRoute();
watch(() => route.fullPath, () => {
 mobileMenuOpen.value = false;
});
</script>
