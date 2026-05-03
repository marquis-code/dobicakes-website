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
 <p class=" text-sm md:text-xs font-bold animate-fade-in text-brand-gold-light drop-shadow-sm">
 {{ displayBanners[currentSlide]?.subtitle || 'Artisan Bakery • Est. 2024' }}
 </p>
 <div v-if="displayBanners[currentSlide]?.content" class="rich-banner-content animate-slide-up" v-html="displayBanners[currentSlide].content"></div>
 <h1 v-else class="text-5xl md:text-8xl lg:text-9xl leading-tight tracking-tighter animate-slide-up drop-shadow-2xl">
 <span class="block italic font-light opacity-90">{{ displayBanners[currentSlide]?.titlePart1 || 'The Art of' }}</span>
 <span class="block font-medium -mt-2 md:-mt-6">{{ displayBanners[currentSlide]?.titlePart2 || 'Sweetness' }}</span>
 </h1>
 <div class="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-fade-in animation-delay-700">
 <NuxtLink to="/shop" class="group relative px-12 py-3 bg-brand-gold text-white text-sm font-bold tracking-[0.3em] overflow-hidden transition-all duration-500 hover:bg-white hover:text-brand-charcoal shadow-2xl">
 <span class="relative z-10">Explore Collection</span>
 <div class="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
 </NuxtLink>
 <NuxtLink to="/contact" class="px-12 py-3 border border-white/40 text-white text-sm font-bold tracking-[0.3em] backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-brand-charcoal">
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
 <h4 class="text-sm font-bold text-brand-charcoal">{{ item.title }}</h4>
 <p class="text-[12px] text-brand-muted leading-loose max-w-[240px] font-light">{{ item.desc }}</p>
 </div>
 </div>
 </section>

  <!-- Collections Section - Artistic Reimagining -->
  <section class="py-32 bg-white relative overflow-hidden">
    <!-- Abstract Background Accent -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-brand-cream/10 -skew-x-12 translate-x-1/2 -z-0"></div>
    
    <div class="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
      <div class="flex flex-col md:flex-row justify-between items-end gap-12">
        <div class="space-y-6 max-w-2xl">
          <div class="flex items-center gap-4">
            <div class="h-px w-12 bg-brand-gold"></div>
            <p class="text-brand-gold text-xs font-bold uppercase tracking-[0.4em]">Curated Selection</p>
          </div>
          <h2 class="text-6xl md:text-8xl tracking-tighter leading-none">Our Signature <br/> <span class="italic font-light text-brand-charcoal/80">Collections</span></h2>
          <p class="text-brand-muted text-sm font-light max-w-md leading-relaxed">Explore a world where tradition meets innovation. Each collection is a testament to our artisanal journey, crafted with precision and soul.</p>
        </div>
        <NuxtLink to="/shop" class="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase hover:text-brand-gold transition-all">
          Explore the Full Gallery
          <div class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-white transition-all">
            <LucideArrowRight :size="16" />
          </div>
        </NuxtLink>
      </div>

      <!-- Artistic Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
        <div v-for="(cat, idx) in categories" :key="cat.name" 
          class="group relative"
          :class="{ 'md:translate-y-12': idx % 3 === 1, 'md:translate-y-24': idx % 3 === 2 }">
          
          <!-- Image Container with Arched Top -->
          <div class="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-2xl bg-slate-50 transition-all duration-1000 group-hover:shadow-3xl group-hover:shadow-brand-gold/5">
            <img :src="cat.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-[1.5s] ease-out-expo" />
            
            <!-- Floating Overlay Badge -->
            <div class="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/10 transition-all duration-700"></div>
            
            <div class="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out-expo bg-gradient-to-t from-brand-charcoal/80 to-transparent">
               <NuxtLink :to="`/shop?category=${cat.name}`" class="block w-full py-4 bg-white text-brand-charcoal text-center text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all">
                 View Collection
               </NuxtLink>
            </div>
          </div>

          <!-- Creative Typography Mapping -->
          <div class="mt-8 flex justify-between items-start">
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">0{{ idx + 1 }}</span>
              <h3 class="text-3xl font-serif text-brand-charcoal group-hover:text-brand-gold transition-colors">{{ cat.name }}</h3>
            </div>
            <div class="pt-2">
              <div class="w-8 h-px bg-slate-200 group-hover:w-16 group-hover:bg-brand-gold transition-all duration-700"></div>
            </div>
          </div>

          <!-- Artistic Detail Line -->
          <div class="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-0 group-hover:h-32 bg-brand-gold/30 transition-all duration-1000 hidden lg:block"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Delicacies - Super Natural Organic Layout -->
  <section class="py-40 bg-white relative overflow-hidden">
    <!-- Decorative Blobs -->
    <div class="absolute top-0 -left-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-0 -right-20 w-96 h-96 bg-brand-cream rounded-full blur-3xl opacity-30"></div>

    <div class="max-w-7xl mx-auto px-6 space-y-24 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div class="space-y-4">
          <div class="flex items-center gap-3 justify-center md:justify-start">
            <span class="w-10 h-[1px] bg-brand-gold"></span>
            <span class="text-brand-gold text-xs font-bold uppercase tracking-[0.4em]">Latest Creations</span>
          </div>
          <h2 class="text-5xl md:text-7xl tracking-tighter leading-none">Featured <span class="italic font-light">Delicacies</span></h2>
        </div>
        <p class="text-brand-muted text-sm font-light max-w-sm leading-relaxed italic">"A symphony of rare flavors and artisanal techniques, meticulously curated for the most discerning palates."</p>
      </div>

      <!-- Organic Manifold Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
        <!-- Main Feature (Large) -->
        <div v-if="featuredProductsList[0]" class="md:col-span-7 group">
          <NuxtLink :to="`/shop/${featuredProductsList[0]._id}`" class="block relative space-y-8">
            <div class="aspect-[16/10] overflow-hidden rounded-[3rem] shadow-3xl hover:shadow-brand-gold/10 transition-all duration-1000">
              <img :src="featuredProductsList[0].images?.[0]" class="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105" />
            </div>
            <div class="flex justify-between items-end px-4">
              <div class="space-y-2">
                <span class="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em]">{{ featuredProductsList[0].category }}</span>
                <h3 class="text-4xl font-serif text-brand-charcoal group-hover:text-brand-gold transition-colors">{{ featuredProductsList[0].name }}</h3>
              </div>
              <p class="text-3xl font-light text-brand-charcoal italic">₦{{ featuredProductsList[0].price.toLocaleString() }}</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Secondary Stack -->
        <div class="md:col-span-5 flex flex-col gap-16 pt-12 md:pt-24">
          <div v-for="product in featuredProductsList.slice(1, 3)" :key="product._id" class="group">
            <NuxtLink :to="`/shop/${product._id}`" class="grid grid-cols-5 gap-8 items-center">
              <div class="col-span-2 aspect-square overflow-hidden rounded-full shadow-2xl transition-all duration-700 group-hover:rotate-6">
                <img :src="product.images?.[0]" class="w-full h-full object-cover" />
              </div>
              <div class="col-span-3 space-y-3">
                <span class="text-[9px] font-bold text-brand-gold uppercase tracking-[0.3em] opacity-60">{{ product.category }}</span>
                <h4 class="text-xl font-serif text-brand-charcoal group-hover:text-brand-gold transition-colors leading-tight">{{ product.name }}</h4>
                <p class="text-lg text-brand-gold italic">₦{{ product.price.toLocaleString() }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Fourth Feature (Staggered Bottom) -->
        <div v-if="featuredProductsList[3]" class="md:col-start-4 md:col-span-6 mt-12 md:-mt-12 group">
           <NuxtLink :to="`/shop/${featuredProductsList[3]._id}`" class="block relative">
              <div class="aspect-[16/9] overflow-hidden rounded-t-[10rem] rounded-b-[2rem] shadow-2xl group-hover:shadow-brand-gold/5 transition-all duration-1000">
                <img :src="featuredProductsList[3].images?.[0]" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div class="mt-8 text-center space-y-2">
                <h3 class="text-2xl font-serif text-brand-charcoal group-hover:text-brand-gold transition-colors">{{ featuredProductsList[3].name }}</h3>
                <p class="text-brand-muted text-[10px] font-bold uppercase tracking-[0.4em]">View Masterpiece</p>
              </div>
           </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Story Section -->
  <section class="py-32 overflow-hidden bg-brand-cream/30">
  <div class="max-w-7xl mx-auto px-6">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
  <div class="relative">
  <div class="aspect-[4/5] bg-gray-100 relative overflow-hidden shadow-2xl">
  <img src="/img/red-velvet-luxury.png" class="w-full h-full object-cover" />
  </div>
  <div class="absolute -bottom-12 -right-12 w-2/3 aspect-square border-[16px] border-white overflow-hidden shadow-2xl hidden md:block">
  <img src="/img/bespoke-slices.png" class="w-full h-full object-cover" />
  </div>
  </div>
  <div class="space-y-10 lg:pl-12">
  <div class="space-y-4">
  <p class="text-brand-gold text-sm font-bold ">The Dobi Heritage</p>
  <h2 class="text-5xl md:text-7xl tracking-tight leading-tight">Baked with <span class="italic font-light">Passion</span> & Artistry</h2>
  </div>
  <p class="text-brand-muted leading-relaxed font-light text-sm max-w-lg">Every cake we create tells a unique story. From the selection of the rarest Madagascar vanilla to the final delicate hand-painted detail, we pour our legacy of excellence into every crumb. We believe that life's most precious milestones deserve a centerpiece that is as unforgettable as the memories themselves.</p>
  <div class="pt-6">
  <NuxtLink to="/about" class="inline-block px-10 md:px-14 py-4 bg-brand-charcoal text-white text-[10px] md:text-sm font-bold transition-all duration-500 hover:bg-brand-gold shadow-2xl text-center whitespace-nowrap min-w-[200px] md:min-w-0">
  Discover Our Heritage
  </NuxtLink>
  </div>
  </div>
  </div>
  </div>
  </section>

  <!-- Moments of Joy Section -->
  <section class="py-32 bg-white">
  <div class="max-w-7xl mx-auto px-6">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
  <div class="order-2 lg:order-1 space-y-10">
  <div class="space-y-4">
  <p class="text-brand-gold text-sm font-bold ">Celebrated Together</p>
  <h2 class="text-5xl md:text-7xl tracking-tight">Moments of <span class="italic font-light">Pure Joy</span></h2>
  </div>
  <p class="text-brand-muted leading-relaxed font-light text-sm max-w-lg">There's something magical about sharing a Dobi Cake. Whether it's a student graduation, a casual meetup, or a grand wedding, we bring people together with flavors that spark smiles and laughter. Join our community of cake lovers who choose elegance for every occasion.</p>
  <div class="flex gap-12 pt-4">
    <div class="text-center">
      <p class="text-3xl font-serif text-brand-charcoal">10k+</p>
      <p class="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Happy Moments</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-serif text-brand-charcoal">50+</p>
      <p class="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Unique Flavors</p>
    </div>
  </div>
  </div>
  <div class="order-1 lg:order-2 relative">
    <div class="aspect-square rounded-[4rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-1000">
      <img src="/img/moments-of-joy.png" class="w-full h-full object-cover" />
    </div>
    <!-- Floating Badge -->
    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-gold rounded-full flex items-center justify-center text-white p-6 text-center rotate-[-15deg] animate-pulse">
      <p class="text-[10px] font-bold uppercase tracking-widest">Crafting Smiles Since 2024</p>
    </div>
  </div>
  </div>
  </div>
  </section>

  <!-- Gallery Section -->
  <section class="py-32 bg-brand-charcoal text-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 space-y-20">
      <div class="text-center space-y-4">
        <p class="text-brand-gold text-sm font-bold ">Visual Feast</p>
        <h2 class="text-4xl md:text-6xl ">Our Artisanal Gallery</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="aspect-square bg-white/5 overflow-hidden group">
          <img src="/img/student-cupcakes.png" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        </div>
        <div class="aspect-square bg-white/5 overflow-hidden group">
          <img src="/img/red-velvet-luxury.png" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        </div>
        <div class="aspect-square bg-white/5 overflow-hidden group">
          <img src="/img/bespoke-slices.png" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
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
  imageUrl: '/img/red-velvet-luxury.png',
  title: 'A Red Velvet Masterpiece',
  subtitle: 'Deep Crimson Bliss • Cream Cheese Elegance'
  },
  {
  imageUrl: '/img/hero-2.png',
  title: 'Elegance in Every Bite',
  subtitle: 'Handcrafted With Belgian Chocolate'
  },
  {
  imageUrl: '/img/student-cupcakes.png',
  title: 'Gourmet Cupcake Selection',
  subtitle: 'The Perfect Student Celebration • Small Bites, Big Joy'
  },
  {
  imageUrl: '/img/caramel-drip.png',
  title: 'Golden Salted Caramel',
  subtitle: 'Artisanal Drip Cakes • Pure Indulgence'
  },
  {
  imageUrl: '/img/bespoke-slices.png',
  title: 'Bespoke Cake Slices',
  subtitle: 'Savor Every Layer • Precision & Flavor'
  },
  {
  imageUrl: '/img/sicilian-lemon.png',
  title: 'Sicilian Zest & Pistachio',
  subtitle: 'Refreshing Citrus • Nutty Perfection'
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
 { name: 'Wedding', image: '/img/wedding-collection.png' },
 { name: 'Cupcakes', image: '/img/student-cupcakes.png' },
 { name: 'Red Velvet', image: '/img/red-velvet-luxury.png' },
 { name: 'Bespoke Slices', image: '/img/bespoke-slices.png' },
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

.rich-banner-content :deep(h1) {
 @apply text-5xl md:text-8xl lg:text-9xl leading-tight tracking-tighter drop-shadow-2xl;
}
.rich-banner-content :deep(p) {
 @apply text-lg md:text-xl font-light opacity-90 tracking-widest ;
}
.rich-banner-content :deep(strong) {
 @apply text-brand-gold;
}

/* Aggressive readability fixes */
:deep(.text-sm) { font-size: 0.85rem !important; }
:deep(.text-[11px]) { font-size: 0.95rem !important; }
:deep(.text-xs) { font-size: 1rem !important; }
:deep(.text-sm) { font-size: 1.1rem !important; }
</style>
