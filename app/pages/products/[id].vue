<template>
  <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <nav aria-label="Breadcrumb" class="flex items-center space-x-2 text-xs md:text-sm text-muted/70 mb-8">
        <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        
        <NuxtLink to="/products" class="hover:text-primary transition-colors">Products</NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        
        <template v-if="product">
          <NuxtLink 
            :to="`/products?category=${slugify(product.category)}`" 
            class="hover:text-primary transition-colors hidden sm:inline-block"
          >
            {{ product.category }}
          </NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-3 h-3 hidden sm:inline-block" />
        </template>
        
        <span class="text-gray-600 font-medium truncate max-w-[180px] sm:max-w-xs" aria-current="page">
          {{ product?.title || 'Product Details' }}
        </span>
      </nav>

      <div v-if="pending" class="text-center py-32 bg-white rounded-2xl border border-outline/50">
        <Icon name="svg-spinners:ring-resize" class="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
        <p class="text-muted">Fetching pristine beauty details...</p>
      </div>

      <div v-else-if="error || !product" class="text-center py-20 bg-white rounded-2xl border border-outline/50 max-w-md mx-auto p-6">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-bold text-text mb-2">Product Not Found</h2>
        <p class="text-muted text-sm mb-6">Sorry, the product you are looking for doesn't exist or has been moved.</p>
        <NuxtLink to="/products" class="bg-dark hover:bg-primary text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full transition-colors">
          Back to Products
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-5 space-y-4">
          <div class="relative aspect-square w-full bg-white rounded-2xl border border-outline/50 shadow-sm flex items-center justify-center p-8 overflow-hidden group">
            <span v-if="product.onSale" class="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
              Sale
            </span>
            <img 
              :src="activeImage" 
              :alt="product.title" 
              class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
  
          <div v-if="productGallery.length > 1" class="flex gap-3 overflow-x-auto pb-2">
            <button 
              v-for="(img, idx) in productGallery" 
              :key="idx"
              @click="activeImage = img"
              class="w-20 h-20 bg-white border rounded-xl p-2 flex items-center justify-center overflow-hidden flex-shrink-0 transition-all shadow-sm"
              :class="(activeImage === img) ? 'border-primary ring-2 ring-primary/10' : 'border-outline opacity-70 hover:opacity-100'"
              :aria-label="`View product image ${idx + 1}`"
            >
              <img :src="img" :alt="`${product.title} thumbnail ${idx + 1}`" class="max-h-full max-w-full object-contain" />
            </button>
          </div>
        </div>
  
        <div class="lg:col-span-7 space-y-6">
          <div class="space-y-2">
            <span class="text-xs uppercase font-bold text-primary tracking-widest">{{ product.category }}</span>
            <h1 class="text-3xl md:text-4xl font-serif text-text leading-tight">
              {{ product.title }}
            </h1>
            
            <div class="flex items-center gap-3 pt-1">
              <div class="flex items-center text-amber-400" aria-label="5 out of 5 stars rating">
                <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-4 h-4" />
              </div>
              <span class="text-xs text-muted/70 font-semibold">({{ product.reviewsCount || 0 }} Customer Reviews)</span>
            </div>
          </div>
  
          <div class="flex items-center gap-3 py-3 border-y border-outline/50">
            <span v-if="product.oldPrice" class="text-lg text-muted/70 line-through font-normal">
              {{ product.oldPrice }} EGP
            </span>
            <span class="text-2xl md:text-3xl font-bold text-text bg-surface border border-outline/50 px-3 py-1 rounded-lg">
              {{ product.price }} EGP
            </span>
          </div>
  
          <p class="text-gray-600 text-sm md:text-base leading-relaxed">
            {{ product.description }}
          </p>

          <div v-if="product.attributes && Object.keys(product.attributes).length > 0" class="space-y-4 pt-2">
            <div v-for="(value, key) in product.attributes" :key="key" class="flex flex-col gap-1">
              <span class="text-xs font-bold text-text/80 uppercase tracking-wider">{{ key }}:</span>
              <div class="flex flex-wrap gap-2">
                <template v-if="Array.isArray(value)">
                  <span 
                    v-for="item in value" 
                    :key="item"
                    class="text-xs bg-white border border-outline/60 text-gray-700 px-3 py-1.5 rounded-md font-medium shadow-sm"
                  >
                    {{ item }}
                  </span>
                </template>
                <span 
                  v-else 
                  class="text-xs bg-white border border-outline/60 text-gray-700 px-3 py-1.5 rounded-md font-medium shadow-sm"
                >
                  {{ value }}
                </span>
              </div>
            </div>
          </div>
  
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <div class="flex items-center justify-between border border-outline rounded-full bg-white px-2 py-1 max-w-[140px] w-full self-center sm:self-auto shadow-sm">
              <button 
                @click="quantity > 1 ? quantity-- : null"
                class="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-background active:scale-95 transition-all text-lg font-bold"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span class="text-sm font-bold text-text w-8 text-center select-none">{{ quantity }}</span>
              <button 
                @click="quantity++"
                class="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-background active:scale-95 transition-all text-lg font-bold"
                aria-label="Increase quantity"
              >
                &plus;
              </button>
            </div>
  
            <button 
              @click="addToCart"
              class="flex-1 bg-dark hover:bg-primary text-white font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
            >
              <Icon name="uil:shopping-bag" class="w-5 h-5" />
              Add to Bag
            </button>
          </div>
  
          <div class="pt-8 space-y-4">
            <div class="flex border-b border-outline text-sm" role="tablist">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                class="py-3 px-4 font-bold tracking-wide uppercase transition-colors relative"
                :class="activeTab === tab.id ? 'text-primary' : 'text-muted/70 hover:text-muted'"
                role="tab"
                :aria-selected="activeTab === tab.id"
              >
                {{ tab.name }}
                <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              </button>
            </div>
            
            <div class="text-sm text-muted leading-relaxed min-h-[100px] bg-white p-4 rounded-xl border border-outline/30 shadow-sm">
              <p v-if="activeTab === 'desc'">{{ product.description }}</p>
              <!-- <p v-if="activeTab === 'usage'">{{ product.howToUse || 'No application instructions available.' }}</p> -->
              <!-- <p v-if="activeTab === 'ingredients'" class="italic font-light">{{ product.ingredients || 'Ingredients list not provided.' }}</p> -->
            </div>
          </div>
  
        </div>
      </div>
  
    </div>
  </main>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useState, useHead } from '#app'

const route = useRoute();
const productId = route.params.id;

const quantity = ref(1);
const activeImage = ref('');
const activeTab = ref('desc');

const cart = useState('cart', () => []);

const tabs = [
  { id: 'desc', name: 'Description' },
  // { id: 'usage', name: 'How to Use' },
  // { id: 'ingredients', name: 'Ingredients' }
];

const slugify = (text) => {
  if (!text) return ''
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-')
}

// ========================================================
// 🔐 Supabase Client integration
// ========================================================
const client = useSupabaseClient();

const { data: product, pending, error } = await useAsyncData(`product-${productId}`, async () => {
  const { data, error: fetchError } = await client
    .from('products') 
    .select('*')
    .eq('id', productId)
    .single();

  if (fetchError) throw fetchError;
  return data;
});

// مزامنة الصورة النشطة مباشرة بدون بناء روابط إضافية لأن الرابط متخزن كامل في الداتابيز
watch(product, (newProd) => {
  if (newProd && newProd.image_url) {
    activeImage.value = newProd.image_url;
  }
}, { immediate: true });

// معرض الصور الديناميكي
const productGallery = computed(() => {
  if (!product.value) return [];
  return product.value.gallery || [product.value.image_url];
});

const addToCart = () => {
  if (!product.value) return;

  const existingProduct = cart.value.find(item => item.id === product.value.id);
  
  if (existingProduct) {
    existingProduct.quantity += quantity.value;
  } else {
    // نمرر البيانات بنفس الصيغة المطلوبة في الـ Cart
    cart.value.push({ 
      ...product.value, 
      name: product.value.title, // الحفاظ على التوافق مع السلة لو بتعتمد على name
      image: product.value.image_url, 
      quantity: quantity.value 
    });
  }

  quantity.value = 1;
};

// ==========================================
// 🌟 حل مشكلة عنوان التاب (SEO Title Fix)
// ==========================================
useHead(() => {
  const pTitle = product.value?.title || 'Product Details';
  const pDesc = product.value?.description || '';
  const pImg = product.value?.image_url || '';
  
  const pageTitle = `${pTitle} | Laurette Store`;
  const currentUrl = `https://laurette-store.com/products/${productId}`;

  return {
    title: pageTitle,
    meta: [
      { name: 'description', content: pDesc },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pDesc },
      { property: 'og:type', content: 'product' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:image', content: pImg }
    ]
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>