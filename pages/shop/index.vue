<template>
  <div class="bg-brand-cream/20 min-h-screen">
    <!-- Shop Hero -->
    <div class="bg-brand-charcoal py-16">
      <div class="max-w-7xl mx-auto px-6 text-center space-y-4">
        <span class="text-brand-gold text-[10px] font-bold  tracking-[0.5em]">The Boutique</span>
        <h1 class="text-5xl md:text-7xl font-serif text-white tracking-tight">Our Collection</h1>
        <p class="text-xs text-gray-400  tracking-widest max-w-lg mx-auto">Discover our handcrafted selection of premium cakes, each made with the finest ingredients.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-56 shrink-0 space-y-10">
          <div>
            <h4 class="text-[10px] font-bold  tracking-[0.3em] mb-6 text-brand-charcoal">Categories</h4>
            <ul class="space-y-3">
              <li v-for="cat in categories" :key="cat" 
                  @click="selectedCategory = cat"
                  :class="selectedCategory === cat ? 'text-brand-gold font-bold' : 'text-brand-muted hover:text-brand-gold'"
                  class="text-[10px]  tracking-widest cursor-pointer transition-colors py-1 border-b border-transparent"
                  :style="selectedCategory === cat ? 'border-color: var(--brand-gold)' : ''">
                {{ cat }}
              </li>
            </ul>
          </div>

          <!-- Availability Filter -->
          <div>
            <h4 class="text-[10px] font-bold  tracking-[0.3em] mb-6 text-brand-charcoal">Availability</h4>
            <ul class="space-y-3">
              <li v-for="avail in availabilityOptions" :key="avail.value"
                  @click="selectedAvailability = avail.value"
                  :class="selectedAvailability === avail.value ? 'text-brand-gold font-bold' : 'text-brand-muted hover:text-brand-gold'"
                  class="text-[10px]  tracking-widest cursor-pointer transition-colors py-1">
                {{ avail.label }}
              </li>
            </ul>
          </div>

          <!-- Sort -->
          <div>
            <UiSelect 
              v-model="sortBy" 
              label="Sort By"
              :options="[
                { label: 'Latest', value: 'latest' },
                { label: 'Price: Low to High', value: 'price_low' },
                { label: 'Price: High to Low', value: 'price_high' },
                { label: 'Name: A — Z', value: 'name' }
              ]"
            />
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-grow space-y-8">
          <div class="flex justify-between items-center border-b border-gray-100 pb-4">
            <p class="text-[10px]  tracking-[0.3em] text-brand-muted">Showing {{ sortedProducts.length }} creations</p>
          </div>

          <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <div v-for="i in 6" :key="i" class="space-y-4">
              <div class="aspect-[4/5] bg-gray-100 animate-pulse"></div>
              <div class="h-3 bg-gray-100 animate-pulse w-2/3 mx-auto"></div>
              <div class="h-3 bg-gray-100 animate-pulse w-1/3 mx-auto"></div>
            </div>
          </div>
          
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <ShopProductCard v-for="product in sortedProducts" :key="product._id" :product="product" />
          </div>

          <div v-if="!pending && sortedProducts.length === 0" class="text-center py-24 border-2 border-dashed border-gray-100 space-y-4">
            <p class="text-brand-muted text-[10px]  tracking-widest">No creations found matching your criteria.</p>
            <button @click="selectedCategory = 'All'; selectedAvailability = 'all'" class="text-[10px] font-bold  tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products, fetchProducts } = useProducts();
const selectedCategory = ref('All');
const selectedAvailability = ref('all');
const sortBy = ref('latest');

const categories = ['All', 'Birthday', 'Wedding', 'Cupcakes', 'Brownies', 'Cheesecake', 'Occasion'];
const availabilityOptions = [
  { label: 'All', value: 'all' },
  { label: 'Available Now', value: 'NOW' },
  { label: 'Pre-order', value: 'PREORDER' },
];

const { pending } = await useAsyncData('products', () => fetchProducts());

const filteredProducts = computed(() => {
  let result = Array.isArray(products.value) ? products.value : (products.value?.data || []);
  if (selectedCategory.value !== 'All') {
    result = result.filter(p => p.category === selectedCategory.value);
  }
  if (selectedAvailability.value !== 'all') {
    result = result.filter(p => p.availabilityType === selectedAvailability.value);
  }
  return result;
});

const sortedProducts = computed(() => {
  const list = [...filteredProducts.value];
  switch (sortBy.value) {
    case 'price_low': return list.sort((a, b) => a.price - b.price);
    case 'price_high': return list.sort((a, b) => b.price - a.price);
    case 'name': return list.sort((a, b) => a.name.localeCompare(b.name));
    default: return list; // 'latest' — already sorted by DB
  }
});

definePageMeta({ layout: 'default' });
</script>
