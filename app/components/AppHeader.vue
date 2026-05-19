<template>
    <header
      class="top-0 left-0 w-full z-[100] font-sans transition-colors duration-300"
      :class="isHomePage
        ? 'absolute bg-transparent'
        : 'absolute bg-surface/95 backdrop-blur-md border-b border-outline shadow-soft'"
      dir="ltr"
    >
      <div class="container mx-auto px-4 py-3 lg:py-5 flex items-center justify-between gap-4">
        <button
          @click="isMenuOpen = true"
          class="lg:hidden p-2 rounded-xl transition-colors"
          :class="isHomePage ? 'hover:bg-white/10 text-white' : 'hover:bg-primary/10 text-text'"
          aria-label="Open Menu"
        >
          <Icon name="heroicons:bars-3-bottom-left" class="w-7 h-7" />
        </button>
  
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="block transform hover:scale-105 transition-transform duration-300">
            <img src="~/assets/images/logo.png" alt="Laurette Store" class="h-10 md:h-14 lg:h-16 w-auto" />
          </NuxtLink>
        </div>
  
        <nav
          class="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold"
          :class="isHomePage ? 'text-white' : 'text-text'"
        >
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative py-2 group text-[15px] hover:text-primary transition-colors"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </NuxtLink>
        </nav>
  
        <div class="flex items-center gap-1 md:gap-3 flex-1 justify-end">
          <div class="relative hidden sm:block group max-w-[150px] lg:max-w-xs w-full">
            <input
              v-model="searchQuery"
              @keyup.enter="goToProductsPage"
              type="text"
              placeholder="Search beauty..."
              class="w-full rounded-full py-2 pr-4 pl-10 outline-none transition-all duration-300 text-sm text-right"
              :class="isHomePage
                ? 'bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white focus:text-text focus:placeholder-muted focus:ring-4 focus:ring-primary/20 backdrop-blur-sm'
                : 'bg-background border border-outline text-text placeholder-muted focus:bg-white focus:ring-4 focus:ring-primary/20'"
            />
            <Icon
              @click="goToProductsPage"
              name="uil:search"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer transition-colors group-focus-within:text-primary"
              :class="isHomePage ? 'text-white/60' : 'text-muted'"
            />
  
            <div 
              v-if="searchQuery && liveResults.length > 0" 
              class="absolute top-full right-0 left-0 mt-2 bg-white border border-outline rounded-2xl shadow-xl z-[150] overflow-hidden max-h-80 overflow-y-auto text-right"
            >
              <div class="p-2.5 bg-gray-50 text-[10px] font-bold text-gray-400 border-b border-outline/30 tracking-wider">LIVE RESULTS</div>
              
              <NuxtLink 
                v-for="product in liveResults" 
                :key="product.id"
                :to="`/products/${product.id}`"
                @click="searchQuery = ''"
                class="flex items-center gap-3 p-2.5 hover:bg-primary/5 border-b border-gray-50 last:border-0 transition-colors group"
              >
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-semibold text-text truncate group-hover:text-primary transition-colors">{{ product.name }}</h4>
                  <span class="text-[11px] font-bold text-primary block mt-0.5">{{ product.price }} EGP</span>
                </div>
                <img :src="product.image" :alt="product.name" class="w-9 h-9 object-contain bg-gray-50 rounded-lg p-1 flex-shrink-0" />
              </NuxtLink>
            </div>
  
            <div 
              v-if="searchQuery && liveResults.length === 0" 
              class="absolute top-full right-0 left-0 mt-2 bg-white border border-outline rounded-2xl shadow-xl z-[150] p-4 text-center text-xs text-muted"
            >
              No results for "{{ searchQuery }}"
            </div>
          </div>
  
          <div class="flex items-center space-x-1">
            <button
              class="p-2 rounded-full sm:hidden transition-all"
              :class="isHomePage ? 'hover:bg-white/10 text-white' : 'hover:bg-primary/10 text-text'"
            >
              <Icon name="uil:search" class="w-6 h-6" />
            </button>
  
            <button
              @click="navigateTo('/login')"
              class="p-2 rounded-full transition-all group"
              :class="isHomePage ? 'hover:bg-white/10 text-white hover:text-primary' : 'hover:bg-primary/10 text-text hover:text-primary'"
            >
              <Icon name="uil:user" class="w-6 h-6" />
            </button>
  
            <div class="relative group">
              <button
                @click="navigateTo('/cart')"
                class="p-2 rounded-full transition-all"
                :class="isHomePage ? 'hover:bg-white/10 text-white hover:text-primary' : 'hover:bg-primary/10 text-text hover:text-primary'"
              >
                <Icon name="uil:shopping-cart" class="w-6 h-6" />
              </button>
              <span class="absolute -top-1 -right-1 bg-gradient-to-tr from-secondary to-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center border-2 border-transparent shadow-sm font-bold animate-pulse-slow">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <Transition name="fade">
        <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] lg:hidden" />
      </Transition>
  
      <Transition name="slide">
        <aside v-if="isMenuOpen" class="fixed top-0 left-0 h-full w-[280px] bg-white z-[120] shadow-[10px_0_30px_rgba(0,0,0,0.1)] lg:hidden flex flex-col" dir="ltr">
          <div class="p-6 flex justify-between items-center border-b border-outline/30">
            <img src="~/assets/images/logo.png" alt="Logo" class="h-10 w-auto" />
            <button @click="isMenuOpen = false" class="p-2 bg-background hover:bg-primary/10 hover:text-primary rounded-full transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
  
          <nav class="p-6 flex flex-col gap-2 overflow-y-auto">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="isMenuOpen = false"
              class="flex items-center gap-4 p-3 rounded-xl text-muted hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <div class="w-10 h-10 rounded-lg bg-background flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                <Icon :name="link.icon" class="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </div>
              <span class="font-medium text-[16px]">{{ link.name }}</span>
            </NuxtLink>
          </nav>
  
          <div class="mt-auto p-6 border-t border-outline/30">
            <button @click="isMenuOpen = false; navigateTo('/login')" class="w-full bg-gradient-to-r from-secondary to-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20">
              Login / Sign Up
            </button>
          </div>
        </aside>
      </Transition>
    </header>
  </template>
  
  <script setup>
  const route = useRoute()
  const router = useRouter()
  const isMenuOpen = ref(false)
  const searchQuery = ref('')
  
  const isHomePage = computed(() => route.path === '/')
  
  // نفس قاعدة بيانات المنتجات (Mock Data) للبحث المطابق بداخلها فوريّاً
  const productsMockDatabase = [
    { id: 1, name: 'Topface Instyle Creamy Lipstick 001.', price: 188, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=100' },
    { id: 2, name: 'Topface Micellar Cleansing Water 150 ml.', price: 193, image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=100' },
    { id: 3, name: 'Soralone Hydra Cream Gel 100ml Offer (1+1)', price: 275, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=100' },
    { id: 4, name: 'Soralone Cica Cream Gel 60ml Offer (1+1)', price: 295, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=100' },
    { id: 5, name: 'Capixy Intense Tonic Spray Offer (1+1)', price: 700, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=100' },
    { id: 6, name: 'Luxury Rose Treatment Facial Oil', price: 450, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=100' }
  ]
  
  // مراقبة حقل الإدخال لفلترة المنتجات فوراً وعرضها بالقائمة المنسدلة
  const liveResults = computed(() => {
    if (!searchQuery.value.trim()) return []
    return productsMockDatabase.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).slice(0, 4) // قصر العرض على أول 4 منتجات مطابقة للحفاظ على جمالية المظهر
  })
  
  // دالة توجيه العميل لصفحة المنتجات وتمرير الكلمة في الرابط (Query Param) عند ضغط Enter
  const goToProductsPage = () => {
    if (searchQuery.value.trim()) {
      router.push({ path: '/products', query: { search: searchQuery.value } })
      searchQuery.value = '' // تصفير الخانة لتغلق القائمة المنسدلة تلقائياً بعد الانتقال
    }
  }
  
  const navLinks = [
    { name: 'Home', path: '/', icon: 'uil:home' },
    { name: 'Products', path: '/products', icon: 'uil:box' },
    { name: 'Korean Care', path: '/korean', icon: 'uil:star' },
    { name: 'Make Up', path: '/makeup', icon: 'uil:brush-alt' },
    { name: 'Routines', path: '/routines', icon: 'uil:schedule' },
    { name: 'About Us', path: '/about', icon: 'uil:info-circle' },
    { name: 'Contact Us', path: '/ContactUs', icon: 'uil:envelope' },
  ]
  </script>
  
  <style scoped>
  .router-link-active {
    @apply text-primary font-bold;
  }
  
  .router-link-active span {
    @apply w-full;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .slide-enter-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slide-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slide-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }
  .slide-leave-to {
    transform: translateX(-100%);
  }
  
  @keyframes pulse-slow {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite ease-in-out;
  }
  </style>