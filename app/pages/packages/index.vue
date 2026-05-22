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
                  max="2500" 
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
            <div v-if="paginatedPackages.length === 0" class="text-center py-24 bg-white rounded-2xl border border-outline/50">
              <Icon name="heroicons:circle-stack" class="w-12 h-12 text-outline mx-auto mb-3" />
              <p class="text-muted text-lg">No value packages match your search or filter selections.</p>
              <button v-if="route.query.search || route.query.category" @click="resetAllFilters" class="mt-4 text-xs font-bold text-primary underline hover:text-text transition-colors">
                Clear all filters and view all packages
              </button>
            </div>
  
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <div 
                v-for="pkg in paginatedPackages" 
                :key="pkg.id" 
                class="flex flex-col group relative bg-white rounded-xl p-3 border border-outline/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <NuxtLink :to="`/packages/${pkg.id}`" class="relative aspect-[4/5] w-full bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-4 cursor-pointer block">
                  <span v-if="pkg.onSale" class="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-sm z-10">
                    Sale
                  </span>
                  
                  <span class="absolute top-2 right-2 bg-dark text-white text-[9px] font-extrabold px-2 py-0.5 uppercase rounded-sm z-10">
                    Save {{ calculateDiscount(pkg.oldPrice, pkg.price) }}%
                  </span>
  
                  <img 
                    :src="pkg.image" 
                    :alt="pkg.name" 
                    class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>
  
                <div class="flex flex-col pt-4 flex-1 space-y-2">
                  <span class="text-[10px] uppercase font-bold text-muted/70 tracking-wider">{{ pkg.category }}</span>
                  
                  <NuxtLink :to="`/packages/${pkg.id}`" class="block">
                    <h2 class="text-sm font-semibold text-text line-clamp-2 min-h-[40px] hover:text-primary transition-colors cursor-pointer">
                      {{ pkg.name }}
                    </h2>
                  </NuxtLink>
  
                  <div class="flex items-center text-amber-400">
                    <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-3.5 h-3.5" />
                  </div>
  
                  <div class="flex items-center gap-2 pt-1 font-bold text-xs sm:text-sm">
                    <span v-if="pkg.oldPrice" class="text-muted/70 line-through font-normal">
                      {{ formatPrice(pkg.oldPrice) }}
                    </span>
                    <span class="bg-surface text-text border border-outline/50 px-2 py-0.5 rounded">
                      {{ formatPrice(pkg.price) }}
                    </span>
                  </div>
  
                  <div class="pt-3">
                    <button 
                      @click="addToCart(pkg)"
                      class="w-full bg-dark hover:bg-primary text-white text-[11px] uppercase font-bold py-3 tracking-widest transition-all duration-300 rounded-lg shadow-sm active:scale-95"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 pt-6 border-t border-outline/30">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="flex items-center justify-center w-9 h-9 rounded-xl border border-outline transition-all disabled:opacity-40 disabled:hover:bg-transparent hover:bg-primary/5 hover:border-primary group"
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
              >
                <Icon name="heroicons:chevron-right" class="w-4 h-4 text-text group-hover:text-primary" />
              </button>
            </div>
          </div>
  
        </div>
      </div>
  
      <Transition name="fade">
        <div v-if="isMobileFilterOpen" @click="isMobileFilterOpen = false" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] lg:hidden"></div>
      </Transition>
  
      <Transition name="slide">
        <aside v-if="isMobileFilterOpen" class="fixed top-0 left-0 h-full w-[290px] bg-white z-[120] shadow-xl lg:hidden flex flex-col p-6" dir="ltr">
          <div class="flex items-center justify-between pb-4 border-b border-outline/50 mb-6">
            <h2 class="text-lg font-bold text-text">Filter Offers</h2>
            <button @click="isMobileFilterOpen = false" class="p-1.5 bg-background hover:bg-primary/10 hover:text-primary rounded-full transition-colors">
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
          
          <div class="space-y-6 flex-1 overflow-y-auto">
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-muted/70">Offer Categories</h3>
              <div class="space-y-2">
                <label v-for="cat in packageCategories" :key="cat" class="flex items-center gap-3 text-sm text-muted">
                  <input type="checkbox" :value="cat" v-model="selectedCategories" class="rounded text-primary focus:ring-primary w-4 h-4 border-outline" />
                  {{ cat }}
                </label>
              </div>
            </div>
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-muted/70">Max Price</h3>
              <input type="range" min="0" max="2500" step="50" v-model="maxPrice" class="w-full appearance-none h-1 bg-outline/50 rounded accent-primary" />
              <div class="text-xs font-bold text-primary">{{ formatPriceWithoutCurrency(maxPrice) }} EGP</div>
            </div>
          </div>
        </aside>
      </Transition>
    </main>
  </template>
  
  <script setup>
  const route = useRoute();
  const router = useRouter();
  
  const isMobileFilterOpen = ref(false);
  const sortBy = ref('featured');
  const maxPrice = ref(2500);
  const selectedCategories = ref([]);
  
  const currentPage = ref(1);
  const itemsPerPage = ref(8);
  
  const cart = useState('cart', () => []);
  
  // تقسيم وتصنيف الباكدجات لسهولة فلترة عروض الميك اب والسكين كير المجمعة
  const packageCategories = ['Skin Care Offers', 'Body Care Offers', 'Makeup Bundles', 'K-Beauty Combos'];
  
  // محاكاة استدعاء كومبوزبل جلب عروض الباكدجات لربطها بالـ IDs البرمجية
  // إذا كان الكومبوزبل المعتمد لديك باسم آخر (مثلاً usePackages) يمكنك تعديله هنا فوراً.
  const { products } = useProducts();
  
  // استخلاص وعزل الباكدجات فقط بناء على الكلمة المفتاحية أو التصنيفات الخاصة بها
  const packagesOnly = computed(() => {
    return products.filter(p => 
      p.category?.toLowerCase().includes('offer') || 
      p.category?.toLowerCase().includes('package') ||
      p.name?.toLowerCase().includes('offer') || 
      p.name?.toLowerCase().includes('1+1')
    );
  });
  
  const translateSlugToName = (slug) => {
    if (!slug) return '';
    return String(slug).replace(/-/g, ' ');
  };
  
  // مراقبة وحفظ الحالات وتغييرات الرابط والـ Queries في المتصفح والـ Slugs
  watch(
    () => route.query.category,
    (newCategorySlug) => {
      if (newCategorySlug) {
        const targetCategory = translateSlugToName(newCategorySlug);
        if (!selectedCategories.value.includes(targetCategory)) {
          selectedCategories.value = [targetCategory];
        }
      } else {
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
  
  // مصفاة وعمليات فلترة وترتيب الباكدجات والخصومات المتقدمة والأسعار
  const filteredPackages = computed(() => {
    let result = [...packagesOnly.value];
  
    if (route.query.search) {
      const searchWord = route.query.search.toString().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(searchWord));
    }
  
    result = result.filter(p => p.price <= maxPrice.value);
  
    if (selectedCategories.value.length > 0) {
      result = result.filter(p => selectedCategories.value.includes(p.category));
    }
  
    if (sortBy.value === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === 'price-high') {
      result.sort((a, b) => b.price - a.price);
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
  
  // تفقيط وتنسيق الأسعار بالـ EGP طبقا للكود الأول المرجعي
  const formatPrice = (amount) => {
    return `${amount.toLocaleString('en-EG', { minimumFractionDigits: 2 })} EGP`;
  };
  
  const formatPriceWithoutCurrency = (amount) => {
    return amount.toLocaleString('en-EG', { minimumFractionDigits: 0 });
  };
  
  // حساب نسبة الخصم الفورية لتغذية شارة الحفظ أعلى الكارت
  const calculateDiscount = (oldPrice, newPrice) => {
    if (!oldPrice || oldPrice <= newPrice) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };
  
  // دالة الإضافة وحفظ المنتجات وتحديث الكميات بالسلة التلقائية الفورية التزامنية
  const addToCart = (product) => {
    const existingProduct = cart.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
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
    maxPrice.value = 2500;
    selectedCategories.value = [];
    router.push({ path: '/packages', query: {} });
  };
  
  useHead({
    title: 'Shop Best Value Packages & Skincare Offers | Laurette Store'
  });
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  
  .slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
  </style>