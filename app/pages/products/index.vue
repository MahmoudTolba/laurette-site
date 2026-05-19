<template>
    <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
      <div class="container mx-auto px-4 max-w-7xl">
        
        <div class="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span class="text-xs font-bold tracking-widest uppercase text-primary">Our Collections</span>
          <h1 class="text-4xl font-serif text-text">Shop All Products</h1>
          <p class="text-muted text-sm leading-relaxed">
            Explore our handpicked selection of clean cosmetics, non-toxic formulations, and imported authentic Korean skincare.
          </p>
          <div v-if="route.query.search" class="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mt-2">
            <span>Search results for: "{{ route.query.search }}"</span>
            <button @click="clearSearch" class="hover:text-text transition-colors font-extrabold ml-1">✕</button>
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
            Showing <span class="font-bold text-text">{{ filteredProducts.length }}</span> products
          </p>
  
          <div class="flex items-center gap-2">
            <label class="text-xs text-muted/70 uppercase tracking-wider font-semibold hidden md:block">Sort By:</label>
            <select 
              v-model="sortBy"
              class="bg-background border border-outline text-muted text-sm rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <aside class="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-outline/50 shadow-sm space-y-8 sticky top-32">
            <div class="space-y-3">
              <h3 class="text-sm font-bold uppercase tracking-wider text-text pb-2 border-b border-outline/50">Categories</h3>
              <div class="space-y-2">
                <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 text-sm text-muted cursor-pointer hover:text-primary transition-colors">
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
                  max="1500" 
                  step="50"
                  v-model="maxPrice"
                  class="w-full h-1.5 bg-outline/50 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs font-bold text-muted">
                  <span>0 EGP</span>
                  <span class="text-primary px-2 py-0.5 bg-primary/10 rounded">{{ maxPrice }} EGP</span>
                </div>
              </div>
            </div>
          </aside>
  
          <div class="lg:col-span-9 space-y-10">
            <div v-if="paginatedProducts.length === 0" class="text-center py-24 bg-white rounded-2xl border border-outline/50">
              <Icon name="heroicons:circle-stack" class="w-12 h-12 text-outline mx-auto mb-3" />
              <p class="text-muted text-lg">No products match your search or filter selections.</p>
              <button v-if="route.query.search" @click="clearSearch" class="mt-4 text-xs font-bold text-primary underline hover:text-text transition-colors">
                Clear search query and view all
              </button>
            </div>
  
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <div 
                v-for="product in paginatedProducts" 
                :key="product.id" 
                class="flex flex-col group relative bg-white rounded-xl p-3 border border-outline/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <NuxtLink :to="`/products/${product.id}`" class="relative aspect-[4/5] w-full bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-4 cursor-pointer block">
                  <span v-if="product.onSale" class="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-sm z-10">
                    Sale
                  </span>
                  <span v-if="product.category === 'Korean Care'" class="absolute top-2 right-2 bg-secondary text-white text-[9px] font-extrabold px-2 py-0.5 uppercase rounded-sm z-10">
                    K-Beauty
                  </span>
                  <img 
                    :src="product.image" 
                    :alt="product.name" 
                    class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>
  
                <div class="flex flex-col pt-4 flex-1 space-y-2">
                  <span class="text-[10px] uppercase font-bold text-muted/70 tracking-wider">{{ product.category }}</span>
                  
                  <NuxtLink :to="`/products/${product.id}`" class="block">
                    <h2 class="text-sm font-semibold text-text line-clamp-2 min-h-[40px] hover:text-primary transition-colors cursor-pointer">
                      {{ product.name }}
                    </h2>
                  </NuxtLink>
  
                  <div class="flex items-center text-amber-400">
                    <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-3.5 h-3.5" />
                  </div>
  
                  <div class="flex items-center gap-2 pt-1 font-bold text-xs sm:text-sm">
                    <span v-if="product.oldPrice" class="text-muted/70 line-through font-normal">
                      {{ product.oldPrice }} EGP
                    </span>
                    <span class="bg-surface text-text border border-outline/50 px-2 py-0.5 rounded">
                      {{ product.price }} EGP
                    </span>
                  </div>
  
                  <div class="pt-3">
                    <button 
                      @click="addToCart(product)"
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
            <h2 class="text-lg font-bold text-text">Filter Products</h2>
            <button @click="isMobileFilterOpen = false" class="p-1.5 bg-background hover:bg-primary/10 hover:text-primary rounded-full transition-colors">
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
          
          <div class="space-y-6 flex-1 overflow-y-auto">
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-muted/70">Categories</h3>
              <div class="space-y-2">
                <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 text-sm text-muted">
                  <input type="checkbox" :value="cat" v-model="selectedCategories" class="rounded text-primary focus:ring-primary w-4 h-4 border-outline" />
                  {{ cat }}
                </label>
              </div>
            </div>
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-muted/70">Max Price</h3>
              <input type="range" min="0" max="1500" step="50" v-model="maxPrice" class="w-full appearance-none h-1 bg-outline/50 rounded accent-primary" />
              <div class="text-xs font-bold text-primary">{{ maxPrice }} EGP</div>
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
  const maxPrice = ref(1500);
  const selectedCategories = ref([]);
  
  // متغيرات نظام الباجينيشن (Pagination State)
  const currentPage = ref(1);
  const itemsPerPage = ref(8); // عدد المنتجات في كل صفحة
  
  // 🔵 تهيئة السلة كـ حالة مشتركة (Shared State) ليتعرف عليها الهيدر تلقائياً
  const cart = useState('cart', () => []);
  
  const categories = ['Skin Care', 'Body Care', 'Hair Care', 'Korean Care', 'Make Up'];
  
  const products = [
    { id: 1, name: 'Topface Instyle Creamy Lipstick 001.', category: 'Make Up', price: 188, oldPrice: 375, onSale: true, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400' },
    { id: 2, name: 'Topface Micellar Cleansing Water 150 ml.', category: 'Skin Care', price: 193, oldPrice: 385, onSale: true, image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400' },
    { id: 3, name: 'Soralone Hydra Cream Gel 100ml Offer (1+1)', category: 'Korean Care', price: 275, oldPrice: 550, onSale: true, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400' },
    { id: 4, name: 'Soralone Cica Cream Gel 60ml Offer (1+1)', category: 'Korean Care', price: 295, oldPrice: 590, onSale: true, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400' },
    { id: 5, name: 'Capixy Intense Tonic Spray Offer (1+1)', category: 'Hair Care', price: 700, oldPrice: 1400, onSale: true, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400' },
    { id: 6, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 7, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 8, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 9, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 10, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 11, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 12, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 13, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 14, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 15, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 16, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 17, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 18, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 19, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
    { id: 20, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' }
  ];
  
  // 1. الفلترة الأساسية (تتأثر بالبحث، والأقسام، والأسعار)
  const filteredProducts = computed(() => {
    let result = [...products];
  
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
  
  // 2. حساب إجمالي عدد الصفحات بناءً على المنتجات المفلترة
  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
  });
  
  // 3. المنتجات التي ستعرض في الصفحة الحالية فقط بعد التقطيع (Slice)
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProducts.value.slice(start, end);
  });
  
  // 🔵 دالة إضافة المنتج إلى السلة وزيادة الكمية إذا كان مكرراً
  const addToCart = (product) => {
    const existingProduct = cart.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };
  
  // مراقبة أي تغيير في الفلاتر أو السعر أو البحث لإرجاع المستخدم للصفحة 1 فوراً
  watch([selectedCategories, maxPrice, sortBy, () => route.query.search], () => {
    currentPage.value = 1;
  });
  
  // دالات التحكم في الصفحات (Pagination Actions)
  const setPage = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // صعود سلس لأعلى الصفحة عند الانتقال
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
    router.push({ path: '/products', query: { ...route.query, search: undefined } });
  };
  
  useHead({
    title: 'Shop Clean Beauty & Skincare | Laurette Store'
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