<template>
  <div v-if="product" class="bg-brand-cream/50 min-h-screen">
    <div class="max-w-7xl mx-auto px-6 py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <!-- Gallery -->
        <div class="space-y-8">
          <div class="aspect-[4/5] bg-white overflow-hidden shadow-2xl relative group">
            <img :src="mainImage" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div class="grid grid-cols-5 gap-4">
            <button v-for="(img, i) in product.images" :key="i" 
                    @click="mainImage = img" 
                    class="aspect-square border-2 transition-all duration-300 overflow-hidden"
                    :class="mainImage === img ? 'border-brand-gold' : 'border-transparent hover:border-brand-gold/30'">
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Details & Customization -->
        <div class="space-y-12">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="text-[10px] font-bold  tracking-[0.4em] text-brand-gold">{{ product.category }}</span>
              <div v-for="tag in product.tags" :key="tag" class="text-[8px] border border-brand-gold/20 text-brand-gold px-2 py-1  tracking-widest">{{ tag }}</div>
            </div>
            <h1 class="text-5xl md:text-7xl font-serif tracking-tight text-brand-charcoal">{{ product.name }}</h1>
            <div class="flex items-end gap-4">
              <p class="text-3xl font-serif text-brand-gold italic">₦{{ totalPrice.toLocaleString() }}</p>
              <p v-if="selectedSize?.priceOffset > 0" class="text-[10px] text-brand-muted  tracking-widest pb-2">(Inc. ₦{{ selectedSize.priceOffset.toLocaleString() }} size offset)</p>
            </div>
          </div>

          <div class="prose prose-sm text-brand-muted leading-relaxed font-light text-sm italic">
            "{{ product.description }}"
          </div>

          <!-- Customization Form -->
          <div class="space-y-10 pt-10 border-t border-brand-gold/10">
            <!-- Flavor Selection -->
            <div v-if="product.flavors?.length" class="space-y-4">
              <span class="text-[10px] font-bold  tracking-[0.3em] text-brand-charcoal">Select Your Flavor</span>
              <div class="flex flex-wrap gap-3">
                <button v-for="flavor in product.flavors" :key="flavor"
                        @click="selection.flavor = flavor"
                        class="px-6 py-3 text-[10px]  tracking-widest transition-all duration-500 border"
                        :class="selection.flavor === flavor ? 'bg-brand-charcoal text-white border-brand-charcoal' : 'bg-transparent text-brand-muted border-gray-200 hover:border-brand-gold'">
                  {{ flavor }}
                </button>
              </div>
            </div>

            <!-- Size Selection -->
            <div v-if="product.sizes?.length" class="space-y-4">
              <span class="text-[10px] font-bold  tracking-[0.3em] text-brand-charcoal">Choose Size</span>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button v-for="size in product.sizes" :key="size.name"
                        @click="selection.size = size.name"
                        class="p-4 text-left transition-all duration-500 border group"
                        :class="selection.size === size.name ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-200 hover:border-brand-gold/30'">
                  <p class="text-[10px] font-bold  tracking-widest" :class="selection.size === size.name ? 'text-brand-gold' : 'text-brand-charcoal'">{{ size.name }}</p>
                  <p v-if="size.priceOffset > 0" class="text-[9px] text-brand-muted  tracking-widest">+ ₦{{ size.priceOffset.toLocaleString() }}</p>
                  <p v-else class="text-[9px] text-brand-muted  tracking-widest">Base Size</p>
                </button>
              </div>
            </div>

            <!-- Custom Message -->
            <div class="space-y-4">
              <span class="text-[10px] font-bold  tracking-[0.3em] text-brand-charcoal">Cake Inscription (Optional)</span>
              <textarea v-model="selection.customMessage" rows="2" class="w-full bg-white border border-gray-100 p-4 text-[11px] focus:outline-none focus:border-brand-gold transition-all" placeholder="e.g., Happy Birthday Adaobi!"></textarea>
            </div>

            <!-- Add to Cart -->
            <div class="flex items-center gap-6 pt-6">
              <div class="flex border border-gray-200 bg-white">
                <button @click="qty > 1 && qty--" class="px-6 py-4 hover:bg-gray-50 transition-colors">-</button>
                <span class="w-12 flex items-center justify-center text-xs font-bold">{{ qty }}</span>
                <button @click="qty++" class="px-6 py-4 hover:bg-gray-50 transition-colors">+</button>
              </div>
              <button @click="handleAddToCart" class="flex-grow py-5 bg-brand-charcoal text-white text-[10px] font-bold  tracking-[0.4em] transition-all duration-500 hover:bg-brand-gold shadow-xl active:scale-95">
                <span v-if="product.availabilityType === 'PREORDER'">Pre-order Now</span>
                <span v-else>Add To Collection</span>
              </button>
            </div>

            <!-- Trust Badges -->
            <ul class="space-y-4 pt-4">
              <li class="flex items-center gap-3 text-[10px]  tracking-widest text-gray-400">
                <LucideCheck :size="14" class="text-brand-gold" /> Handcrafted to Order
              </li>
              <li class="flex items-center gap-3 text-[10px]  tracking-widest text-gray-400">
                <LucideCheck :size="14" class="text-brand-gold" /> Delivery available across Lagos & Abuja
              </li>
              <li class="flex items-center gap-3 text-[10px]  tracking-widest text-gray-400">
                <LucideCheck :size="14" class="text-brand-gold" /> Secure Payment via Paystack
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideCheck } from 'lucide-vue-next';
const route = useRoute();
const { getProduct } = useProducts();
const { addToCart } = useCart();
const { showToast } = useCustomToast();

const { data: product } = await useAsyncData(`product-${route.params.id}`, () => getProduct(route.params.id));

const mainImage = ref('');
const qty = ref(1);

const selection = ref({
  flavor: '',
  size: '',
  customMessage: ''
});

watchEffect(() => {
  if (product.value) {
    mainImage.value = product.value.images?.[0];
    if (product.value.flavors?.length) selection.value.flavor = product.value.flavors[0];
    if (product.value.sizes?.length) selection.value.size = product.value.sizes[0].name;
  }
});

const selectedSize = computed(() => {
  return product.value?.sizes?.find(s => s.name === selection.value.size);
});

const totalPrice = computed(() => {
  if (!product.value) return 0;
  const base = product.value.price || 0;
  const offset = selectedSize.value?.priceOffset || 0;
  return base + offset;
});

const handleAddToCart = () => {
  if (!selection.value.flavor || !selection.value.size) {
    alert('Please select a flavor and size.');
    return;
  }
  
  const cartItem = {
    ...product.value,
    price: totalPrice.value,
    customization: { ...selection.value }
  };
  
  addToCart(cartItem, qty.value);
  alert(`${product.value.name} added to your collection!`);
};

definePageMeta({ layout: 'default' });
</script>
