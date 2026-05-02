<template>
  <div class="overflow-hidden bg-brand-cream">
    <!-- Premium Hero Section -->
    <header class="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
      <!-- Background images with smooth transition -->
      <div v-for="(banner, index) in displayBanners" :key="index" 
           class="absolute inset-0 transition-all duration-[2000ms] ease-out-expo"
           :class="currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'">
        <img :src="banner.imageUrl" class="w-full h-full object-cover" :alt="banner.title" />
        <div class="absolute inset-0 bg-brand-charcoal/40 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-brand-charcoal/20"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center text-white px-4 space-y-10 max-w-5xl mx-auto">
        <p class=" tracking-[0.5em] text-[10px] md:text-xs font-bold animate-fade-in text-brand-gold-light drop-shadow-sm">
          {{ displayBanners[currentSlide]?.subtitle || 'Artisan Bakery • Est. 2024' }}
        </p>
        <h1 class="text-5xl md:text-8xl lg:text-9xl font-serif leading-tight tracking-tighter animate-slide-up drop-shadow-2xl">
          <span class="block italic font-light opacity-90">{{ displayBanners[currentSlide]?.titlePart1 || 'The Art of' }}</span>
          <span class="block font-medium -mt-2 md:-mt-6">{{ displayBanners[currentSlide]?.titlePart2 || 'Sweetness' }}</span>
        </h1>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-fade-in animation-delay-700">
          <NuxtLink to="/shop" class="group relative px-12 py-5 bg-brand-gold text-white text-[10px] font-bold  tracking-[0.3em] overflow-hidden transition-all duration-500 hover:bg-white hover:text-brand-charcoal shadow-2xl">
            <span class="relative z-10">Explore Collection</span>
            <div class="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </NuxtLink>
          <NuxtLink to="/contact" class="px-12 py-5 border border-white/40 text-white text-[10px] font-bold  tracking-[0.3em] backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-brand-charcoal">
            Custom Enquiry
          </NuxtLink>
        </div>
      </div>

      <!-- Slide Navigation -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex gap-4 z-20">
        <button v-for="(_, idx) in displayBanners" :key="idx" 
                @click="currentSlide = idx"
                class="group flex items-center gap-3">
          <div class="w-12 h-[2px] transition-all duration-500"
               :class="currentSlide === idx ? 'bg-brand-gold' : 'bg-white/30'"></div>
          <span class="text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">0{{ idx + 1 }}</span>
        </button>
      </div>
    </header>

    <!-- Trust / Quality Section -->
    <section class="py-24 border-b border-gray-100 bg-white">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div v-for="item in features" :key="item.title" class="flex flex-col items-center text-center space-y-6 group">
          <div class="w-px h-12 bg-brand-gold group-hover:h-20 transition-all duration-700 mb-2"></div>
          <h4 class="text-[10px] font-bold  tracking-[0.4em] text-brand-charcoal">{{ item.title }}</h4>
          <p class="text-[11px] text-brand-muted leading-loose max-w-[240px] font-light">{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Collections Section -->
    <section class="py-32">
      <div class="max-w-7xl mx-auto px-6 space-y-20">
        <div class="flex flex-col md:flex-row justify-between items-end gap-8">
          <div class="space-y-4">
            <p class="text-brand-gold text-[10px] font-bold  tracking-[0.4em]">Curated Selection</p>
            <h2 class="text-5xl md:text-7xl font-serif tracking-tight">Our Signature <br/> <span class="italic font-light">Collections</span></h2>
          </div>
          <NuxtLink to="/shop" class="text-[10px] font-bold  tracking-[0.3em] border-b border-brand-gold pb-2 hover:text-brand-gold transition-colors">View All Collections</NuxtLink>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div v-for="cat in categories" :key="cat.name" class="group cursor-pointer space-y-6">
            <div class="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 relative shadow-sm hover:shadow-2xl">
              <img :src="cat.image" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              <div class="absolute inset-0 border border-white/20 m-4 group-hover:m-2 transition-all duration-700"></div>
            </div>
            <div class="text-center">
              <h5 class="text-[10px] font-bold  tracking-[0.2em] group-hover:text-brand-gold transition-colors">{{ cat.name }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Grid -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 space-y-20">
        <div class="text-center space-y-4">
          <span class="text-brand-gold text-[10px] font-bold  tracking-[0.5em]">Latest Creations</span>
          <h2 class="text-4xl md:text-6xl font-serif">Featured Delicacies</h2>
          <div class="w-24 h-px bg-brand-gold/20 mx-auto mt-8"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <ShopProductCard v-for="product in featuredProductsList" :key="product._id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-32 overflow-hidden bg-brand-cream/30">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div class="relative">
            <div class="aspect-[4/5] bg-gray-100 relative overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -bottom-12 -right-12 w-2/3 aspect-square border-[16px] border-white overflow-hidden shadow-2xl hidden md:block">
              <img src="https://images.unsplash.com/photo-1557925923-33b27f891f88?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="space-y-10 lg:pl-12">
            <div class="space-y-4">
              <p class="text-brand-gold text-[10px] font-bold  tracking-[0.4em]">The Dobi Heritage</p>
              <h2 class="text-5xl md:text-7xl font-serif tracking-tight leading-tight">Baked with <span class="italic font-light">Passion</span> & Artistry</h2>
            </div>
            <p class="text-brand-muted leading-relaxed font-light text-sm max-w-lg">Every cake we create tells a unique story. From the selection of the rarest Madagascar vanilla to the final delicate hand-painted detail, we pour our legacy of excellence into every crumb. We believe that life's most precious milestones deserve a centerpiece that is as unforgettable as the memories themselves.</p>
            <div class="pt-6">
              <NuxtLink to="/about" class="px-14 py-5 bg-brand-charcoal text-white text-[10px] font-bold  tracking-[0.4em] transition-all duration-500 hover:bg-brand-gold shadow-2xl">
                Discover Our Heritage
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { banners, fetchBanners } = useBanners();
const { products, fetchProducts } = useFetchProducts();

const currentSlide = ref(0);

onMounted(() => {
  fetchBanners();
  fetchProducts({ limit: 4 });
  
  setInterval(() => {
    if (displayBanners.value.length > 0) {
      currentSlide.value = (currentSlide.value + 1) % displayBanners.value.length;
    }
  }, 8000);
});

const displayBanners = computed(() => {
  const base = banners.value.length > 0 ? banners.value : [
    {
      imageUrl: '/img/hero-1.png',
      title: 'The Art of Celebration',
      subtitle: 'Exceptional Quality • Exquisite Taste'
    },
    {
      imageUrl: '/img/hero-2.png',
      title: 'Elegance in Every Bite',
      subtitle: 'Handcrafted With Belgian Chocolate'
    }
  ];

  return base.map(b => {
    const parts = b.title?.split(' ') || ['Sweet', 'Moments'];
    const mid = Math.ceil(parts.length / 2);
    return {
      ...b,
      titlePart1: parts.slice(0, mid).join(' '),
      titlePart2: parts.slice(mid).join(' ')
    };
  });
});

const featuredProductsList = computed(() => {
  return products.value.length > 0 ? products.value : [
    { _id: '1', name: 'Midnight Velvet Rose', price: 45000, category: 'Wedding', images: ['/img/midnight-velvet.png'], tags: ['Best Seller'] },
    { _id: '2', name: 'Golden Salted Caramel Drip', price: 32000, category: 'Birthday', images: ['/img/caramel-drip.png'], tags: ['Trending'] },
    { _id: '3', name: 'Belgian Truffle Box', price: 18500, category: 'Occasion', images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=800'], tags: ['Gift Set'] },
    { _id: '4', name: 'Sicilian Lemon & Pistachio', price: 28000, category: 'Birthday', images: ['/img/sicilian-lemon.png'] },
  ];
});

const latestArticles = [
  {
    title: 'The Secret to the Perfect Velvet Crumb',
    excerpt: 'Our head pastry chef shares why temperature and timing are the true ingredients of luxury...',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aee4d?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: '5 Trends in 2026 Wedding Cake Design',
    excerpt: 'From architectural tiers to hand-painted florals, discover what is trending in boutique weddings...',
    image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=600'
  }
];

const features = [
  { title: 'Master Pastry Chefs', desc: 'Our artisans bring decades of experience to every creation, blending technique with heart.' },
  { title: 'Premium Ingredients', desc: 'Sourcing only the finest Belgian chocolates, organic dairy, and fresh local fruits.' },
  { title: 'Exquisite Presentation', desc: 'Every cake is a bespoke masterpiece, meticulously designed for your special moments.' }
];

const categories = [
  { name: 'Birthday', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400' },
  { name: 'Wedding', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb80d?auto=format&fit=crop&q=80&w=400' },
  { name: 'Cupcakes', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400' },
  { name: 'Brownies', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=400' },
  { name: 'Cheesecake', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400' },
  { name: 'Occasion', image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&q=80&w=400' },
];

definePageMeta({ layout: 'default' });
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.5s ease-out forwards;
}
.animate-slide-up {
  animation: slideUp 1.2s cubic-bezier(0.2, 1, 0.2, 1) forwards;
}
.animation-delay-700 {
  animation-delay: 700ms;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.ease-out-expo {
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
