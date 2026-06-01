<template>
  <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
    <div class="container mx-auto px-4 max-w-7xl">
      
      <div class="text-center max-w-xl mx-auto mb-12 space-y-3">
        <span class="text-xs font-bold tracking-widest uppercase text-primary font-sans block">Exclusive Deals</span>
        <h1 class="text-4xl font-serif text-text">Value Packages & Offers</h1>
        <p class="text-muted text-sm leading-relaxed">
          Explore our handpicked selection of premium product combinations, exclusive bundle discounts, and value packages tailored to your beauty routine.
        </p>
        
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          <div v-if="route.query.search" class="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
            <span>Search: "{{ route.query.search }}"</span>
            <button @click="clearSearch" class="hover:text-text transition-colors font-extrabold ml-1">✕</button>
          </div>
          <div v-if="route.query.category" class="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1.5 rounded-full">
            <span>Package Type: {{ translateSlugToName(route.query.category) }}</span>
            <button @click="clearCategoryQuery" class="hover:text-text transition-colors font-extrabold ml-1">✕</button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-outline/50 mb-8">
        <button 
          @click="isMobileFilterOpen = true" 
          class="lg:hidden flex items-center gap-2 text-sm font-semibold text-text px-3 py-2 border border-outline rounded-lg"
        >
          <Icon name="heroicons:funnel" class="w-4 h-4 text-primary" />
          Filters
        </button>
        
        <p class="text-xs md:text-sm text-muted hidden sm:block">
          Showing <span class="font-bold text-text">{{ filteredPackages.length }}</span> bundles available
        </p>

        <div class="flex items-center gap-2">
          <label class="text-xs text-muted/70 uppercase tracking-wider font-semibold hidden md:block">Sort By:</label>
          <select 
            v-model="sortBy"
            class="bg-background border border-outline text-muted text-sm rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
          >
            <option value="featured">Featured Deals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <aside class="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-outline/50 shadow-sm space-y-8 sticky top-32">
          <div class="space-y-3">
            <h3 class="text-sm font-bold uppercase tracking-wider text-text pb-2 border-b border-outline/50">Offer Categories</h3>
            <div class="space-y-2">
              <div v-if="packageCategories.length === 0" class="text-xs text-muted italic">Loading categories...</div>
              <label v-for="cat in packageCategories" :key="cat" class="flex items-center gap-3 text-sm text-muted cursor-pointer hover:text-primary transition-colors">
                <input 
                  type="checkbox" 
                  :value="cat" 
                  v-model="selectedCategories"
                  class="rounded text-primary focus:ring-primary w-4 h-4 border-outline"
                />
                {{ cat }}
              </label>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-sm font-bold uppercase tracking-wider text-text pb-2 border-b border-outline/50">Max Price</h3>
            <div class="space-y-2">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="50"
                v-model="maxPrice"
                class="w-full h-1.5 bg-outline/50 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs font-bold text-muted">
                <span>0 EGP</span>
                <span class="text-primary px-2 py-0.5 bg-primary/10 rounded">{{ formatPriceWithoutCurrency(maxPrice) }} EGP</span>
              </div>
            </div>
          </div>
        </aside>

        <div class="lg:col-span-9 space-y-10">
          
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-outline/50 shadow-sm">
            <Icon name="heroicons:arrow-path" class="w-10 h-10 text-primary animate-spin mb-4" />
            <p class="text-muted text-lg font-medium">Loading premium packages...</p>
          </div>

          <div v-else-if="errorMessage" class="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-outline/50 shadow-sm">
            <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500 mb-4" />
            <p class="text-text text-lg font-bold">Oops! Something went wrong.</p>
            <p class="text-muted text-sm mt-1 mb-4">{{ errorMessage }}</p>
            <button @click="fetchPackages" class="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-dark transition-colors">
              Try Again
            </button>
          </div>

          <div v-else-if="paginatedPackages.length === 0" class="text-center py-24 bg-white rounded-2xl border border-outline/50 shadow-sm">
            <Icon name="heroicons:circle-stack" class="w-12 h-12 text-outline mx-auto mb-3" />
            <p class="text-muted text-lg">No value packages available matching your current selection.</p>
            <button @click="resetAllFilters" class="mt-4 text-xs font-bold text-primary underline hover:text-text transition-colors">
              Clear filters and view all packages
            </button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="pkg in paginatedPackages" 
              :key="pkg.id" 
              class="flex flex-col group relative bg-white rounded-xl p-3 border border-outline/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <NuxtLink :to="`/packages/${pkg.id}`" class="relative aspect-[4/5] w-full bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-4 cursor-pointer block">
                <span v-if="pkg.status === 'Active' || pkg.available_limit > 0" class="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-sm z-10">
                  Offer
                </span>
                
                <span v-if="pkg.duration" class="absolute top-2 right-2 bg-dark text-white text-[9px] font-extrabold px-2 py-0.5 rounded-sm z-10">
                  {{ pkg.duration }} Days
                </span>

                <img 
                  :src="pkg.image" 
                  :alt="`Buy ${pkg.name} Bundle`" 
                  class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </NuxtLink>

              <div class="flex flex-col pt-4 flex-1 space-y-2">
                <span class="text-[10px] uppercase font-bold text-muted/70 tracking-wider">{{ pkg.category || 'Package' }}</span>
                
                <NuxtLink :to="`/packages/${pkg.id}`" class="block">
                  <h2 class="text-sm font-semibold text-text line-clamp-2 min-h-[40px] hover:text-primary transition-colors cursor-pointer" :title="pkg.name">
                    {{ pkg.name }}
                  </h2>
                </NuxtLink>

                <div class="flex items-center text-amber-400">
                  <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-3.5 h-3.5" />
                </div>

                <div class="flex items-center gap-2 pt-1 font-bold text-xs sm:text-sm">
                  <span class="bg-surface text-text border border-outline/50 px-2 py-0.5 rounded">
                    {{ formatPrice(pkg.price) }}
                  </span>
                </div>

                <div class="pt-3">
                  <button 
                    @click="addToCart(pkg)"
                    class="w-full bg-dark hover:bg-primary text-white text-[11px] uppercase font-bold py-3 tracking-widest transition-all duration-300 rounded-lg shadow-sm active:scale-95"
                    aria-label="Add package to cart"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="totalPages > 1 && !isLoading && !errorMessage" class="flex items-center justify-center gap-2 pt-6 border-t border-outline/30">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="flex items-center justify-center w-9 h-9 rounded-xl border border-outline transition-all disabled:opacity-40 disabled:hover:bg-transparent hover:bg-primary/5 hover:border-primary group"
              aria-label="Previous Page"
            >
              <Icon name="heroicons:chevron-left" class="w-4 h-4 text-text group-hover:text-primary" />
            </button>

            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="setPage(page)"
              class="w-9 h-9 rounded-xl font-semibold text-sm transition-all border"
              :class="currentPage === page 
                ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white border-outline text-muted hover:border-primary hover:text-primary'"
            >
              {{ page }}
            </button>

            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="flex items-center justify-center w-9 h-9 rounded-xl border border-outline transition-all disabled:opacity-40 disabled:hover:bg-transparent hover:bg-primary/5 hover:border-primary group"
              aria-label="Next Page"
            >
              <Icon name="heroicons:chevron-right" class="w-4 h-4 text-text group-hover:text-primary" />
            </button>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter, useState, useSeoMeta } from '#imports';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

const isMobileFilterOpen = ref(false);
const sortBy = ref('featured');

const maxPrice = ref(10000);
const selectedCategories = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(8);

const cart = useState('cart', () => []);

// إعداد حالات الـ Supabase Fetching الجديدة
const packagesList = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);

// دالة جلب البيانات مباشرة وحية من جدول الـ packages في Supabase
const fetchPackages = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = null;
    
    const { data, error } = await supabase
      .from('packages')
      .select('id, created_at, name, description, category, price, available_limit, duration, image, status')
      .order('created_at', { ascending: false });

    if (error) throw error;
    packagesList.value = data || [];
  } catch (err) {
    console.error('Error fetching packages from Supabase:', err.message);
    errorMessage.value = err.message || "We couldn't load the packages at this time.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPackages();
});

// استخراج الفئات الفريدة ديناميكياً ودعم اللغة العربية من الـ DB مباشرة
const packageCategories = computed(() => {
  if (!packagesList.value || !Array.isArray(packagesList.value)) return [];
  
  return packagesList.value
    .map(p => p.category)
    .filter((cat, index, self) => cat && cat.trim() !== '' && self.indexOf(cat) === index);
});

const translateSlugToName = (slug) => {
  if (!slug) return '';
  return decodeURIComponent(String(slug)).replace(/-/g, ' ');
};

const slugify = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-');
};

// مراقبة الـ URL Query لربط الأقسام عند الانتقال المباشر أو الضغط عليها
watch(
  [() => route.query.category, packageCategories],
  ([newCategorySlug, currentCategories]) => {
    if (newCategorySlug && currentCategories.length > 0) {
      const targetCategory = currentCategories.find(cat => slugify(cat) === newCategorySlug || cat === translateSlugToName(newCategorySlug));
      if (targetCategory && !selectedCategories.value.includes(targetCategory)) {
        selectedCategories.value = [targetCategory];
      }
    } else if (!newCategorySlug) {
      selectedCategories.value = [];
    }
  },
  { immediate: true }
);

watch(selectedCategories, (newVal) => {
  if (newVal.length === 0 && route.query.category) {
    router.push({ path: '/packages', query: { ...route.query, category: undefined } });
  }
});

// عملية الفلترة والترتيب للمصفوفة المحلية
const filteredPackages = computed(() => {
  if (!packagesList.value || !Array.isArray(packagesList.value)) return [];
  
  let result = [...packagesList.value];

  // فلترة البحث (البحث في الاسم أو الوصف)
  if (route.query.search) {
    const searchWord = route.query.search.toString().toLowerCase().trim();
    result = result.filter(p => {
      const nameStr = p.name || '';
      const descStr = p.description || '';
      return nameStr.toLowerCase().includes(searchWord) || descStr.toLowerCase().includes(searchWord);
    });
  }

  // فلترة السعر
  result = result.filter(p => {
    const price = Number(p.price) || 0;
    return price <= maxPrice.value;
  });

  // فلترة الأقسام المستخرجة ديناميكياً
  if (selectedCategories.value && selectedCategories.value.length > 0) {
    result = result.filter(p => p.category && selectedCategories.value.includes(p.category));
  }

  // الترتيب والتنظيم
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  }

  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredPackages.value.length / itemsPerPage.value);
});

const paginatedPackages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredPackages.value.slice(start, end);
});

const formatPrice = (amount) => {
  if (!amount) return '0.00 EGP';
  return `${Number(amount).toLocaleString('en-EG', { minimumFractionDigits: 2 })} EGP`;
};

const formatPriceWithoutCurrency = (amount) => {
  return Number(amount).toLocaleString('en-EG', { minimumFractionDigits: 0 });
};

const addToCart = (product) => {
  const existingProduct = cart.value.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.value.push({ 
      id: product.id,
      title: product.name,
      price: product.price,
      image_url: product.image,
      quantity: 1 
    });
  }
};

watch([selectedCategories, maxPrice, sortBy, () => route.query.search], () => {
  currentPage.value = 1;
});

const setPage = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const clearSearch = () => {
  router.push({ path: '/packages', query: { ...route.query, search: undefined } });
};

const clearCategoryQuery = () => {
  router.push({ path: '/packages', query: { ...route.query, category: undefined } });
  selectedCategories.value = [];
};

const resetAllFilters = () => {
  maxPrice.value = 10000;
  selectedCategories.value = [];
  router.push({ path: '/packages', query: {} });
};

useSeoMeta({
  title: () => 'Shop Premium Value Packages & Beauty Offers | Laurette Store',
  description: 'Discover dynamic beauty bundles, exclusive skincare packages, and limited-time savings customized to your daily routine at Laurette Store.',
  ogTitle: 'Exclusive Value Packages & Skincare Offers | Laurette Store',
  ogDescription: 'Get more for less. Explore our dynamically updated packages and exclusive set combinations.',
  ogImage: '/images/packages-og-banner.jpg',
  twitterCard: 'summary_large_image',
  keywords: () => {
    const dynamicCats = packageCategories.value.join(', ');
    return `beauty packages, offers, skincare sets, ${dynamicCats}, Laurette discounts, beauty bundles Egypt`;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>