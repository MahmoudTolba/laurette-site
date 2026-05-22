<template>
  <header
    class="top-0 left-0 w-full z-[100] font-sans transition-colors duration-300"
    :class="isHomePage
      ? 'absolute bg-transparent'
      : 'absolute bg-surface/95 backdrop-blur-md border-b border-outline shadow-soft'"
    dir="ltr"
  >
    <div class="container mx-auto px-4 py-3 lg:py-5 flex items-center justify-between gap-2 md:gap-4">
      
      <div class="flex items-center justify-start lg:hidden flex-1">
        <button
          @click="isMenuOpen = true"
          class="p-2 rounded-xl transition-colors"
          :class="isHomePage ? 'hover:bg-white/10 text-white' : 'hover:bg-primary/10 text-text'"
          aria-label="Open Menu"
        >
          <Icon name="heroicons:bars-3-bottom-left" class="w-7 h-7" />
        </button>
      </div>

      <div class="flex items-center justify-center lg:justify-start flex-initial lg:flex-shrink-0">
        <NuxtLink to="/" class="block transform hover:scale-105 transition-transform duration-300">
          <img src="~/assets/images/logo.png" alt="Laurette Store" class="h-10 md:h-14 lg:h-16 w-auto object-contain" />
        </NuxtLink>
      </div>

      <nav
        class="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold mx-auto"
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

      <div class="flex items-center gap-1 md:gap-3 justify-end flex-1">
        
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

        <div class="flex items-center gap-0.5 sm:space-x-1">
          <button
            @click="isMobileSearchOpen = !isMobileSearchOpen"
            class="p-2 rounded-full sm:hidden transition-all"
            :class="isHomePage ? 'hover:bg-white/10 text-white' : 'hover:bg-primary/10 text-text'"
          >
            <Icon :name="isMobileSearchOpen ? 'heroicons:x-mark' : 'uil:search'" class="w-6 h-6" />
          </button>

          <div v-if="auth.isLoggedIn" class="hidden sm:flex items-center gap-2">
            <span
              class="text-xs font-semibold max-w-[120px] truncate"
              :class="isHomePage ? 'text-white' : 'text-text'"
            >
              Hi, {{ auth.displayName }}
            </span>
            <button
              @click="openLogoutModal"
              class="p-2 rounded-full transition-all group text-text"
              title="Logout"
            >
              <Icon name="uil:sign-out-alt" class="w-6 h-6" />
            </button>
          </div>
          <button
            v-else
            @click="navigateTo('/login')"
            class="p-2 rounded-full transition-all group"
            :class="isHomePage ? 'text-white' : 'text-text'"
          >
            <Icon name="uil:user" class="w-6 h-6" />
          </button>

          <div class="relative group">
            <button
              @click="navigateTo('/cart')"
              class="p-2 rounded-full transition-all"
              :class="isHomePage ? 'text-white' : 'text-text'"
            >
              <Icon name="uil:shopping-cart" class="w-6 h-6" />
            </button>
            <span 
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 bg-gradient-to-tr from-secondary to-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse-slow"
            >
              {{ cartCount }}
            </span>
          </div>
        </div>
      </div>

    </div>

    <div 
      v-if="isMobileSearchOpen" 
      class="sm:hidden px-4 pb-4 pt-1 bg-white border-b border-outline relative z-[95]"
    >
      <div class="relative w-full">
        <input
          v-model="searchQuery"
          @keyup.enter="goToProductsPageMobile"
          type="text"
          placeholder="Search beauty..."
          class="w-full rounded-full py-2.5 pr-4 pl-10 outline-none text-sm text-right bg-background border border-outline text-text focus:bg-white focus:ring-4 focus:ring-primary/20"
        />
        <Icon
          @click="goToProductsPageMobile"
          name="uil:search"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-muted"
        />

        <div 
          v-if="searchQuery && liveResults.length > 0" 
          class="absolute top-full right-0 left-0 mt-2 bg-white border border-outline rounded-2xl shadow-xl z-[150] overflow-hidden max-h-64 overflow-y-auto text-right"
        >
          <div class="p-2.5 bg-gray-50 text-[10px] font-bold text-gray-400 border-b border-outline/30 tracking-wider">LIVE RESULTS</div>
          
          <NuxtLink 
            v-for="product in liveResults" 
            :key="product.id"
            :to="`/products/${product.id}`"
            @click="searchQuery = ''; isMobileSearchOpen = false"
            class="flex items-center gap-3 p-2.5 hover:bg-primary/5 border-b border-gray-50 last:border-0 transition-colors"
          >
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-semibold text-text truncate">{{ product.name }}</h4>
              <span class="text-[11px] font-bold text-primary block mt-0.5">{{ product.price }} EGP</span>
            </div>
            <img :src="product.image" :alt="product.name" class="w-9 h-9 object-contain bg-gray-50 rounded-lg p-1 flex-shrink-0" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] lg:hidden" />
    </Transition>

    <Transition name="slide">
      <aside 
        v-if="isMenuOpen" 
        class="fixed top-0 left-0 h-screen w-[290px] bg-white text-text z-[250] lg:hidden flex flex-col shadow-[5px_0_25px_rgba(0,0,0,0.3)] select-none" 
        dir="ltr"
      >
        <div class="p-5 flex justify-between items-center border-b border-gray-100 bg-white">
          <img src="~/assets/images/logo.png" alt="Logo" class="h-9 w-auto object-contain" />
          <button @click="isMenuOpen = false" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-text">
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <nav class="p-4 flex flex-col gap-1.5 overflow-y-auto flex-1 bg-white">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="isMenuOpen = false"
            class="flex items-center gap-4 p-3 rounded-xl text-text hover:bg-primary/10 hover:text-primary transition-all group"
          >
            <div class="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
              <Icon :name="link.icon" class="w-5 h-5 text-text group-hover:text-primary opacity-80" />
            </div>
            <span class="font-medium text-[15px]">{{ link.name }}</span>
          </NuxtLink>
        </nav>

        <div class="p-5 border-t border-gray-100 space-y-3 bg-gray-50/50">
          <p v-if="auth.isLoggedIn" class="text-xs font-semibold text-text text-center">
            Welcome, <span class="text-primary">{{ auth.displayName }}</span>
          </p>
          <button
            v-if="auth.isLoggedIn"
            @click="openLogoutModal"
            class="w-full bg-white border border-gray-200 text-text py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            Logout
          </button>
          <button
            v-else
            @click="isMenuOpen = false; navigateTo('/login')"
            class="w-full bg-gradient-to-r from-secondary to-primary text-white py-2.5 rounded-xl text-sm font-bold shadow-md"
          >
            Login / Sign Up
          </button>
        </div>
      </aside>
    </Transition>

    <LogoutModal 
      :is-open="showLogoutModal" 
      @close="showLogoutModal = false" 
      @confirm="handleConfirmLogout" 
    />
  </header>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const isMenuOpen = ref(false)
const isMobileSearchOpen = ref(false) 
const searchQuery = ref('')

const showLogoutModal = ref(false)

const openLogoutModal = () => {
  isMenuOpen.value = false
  showLogoutModal.value = true
}

const handleConfirmLogout = () => {
  showLogoutModal.value = false
  auth.logout()
  navigateTo('/')
}

const isHomePage = computed(() => route.path === '/')

const cart = useState('cart', () => [])

const cartCount = computed(() => {
  return cart.value.reduce((total, item) => total + (item.quantity || 0), 0)
})

const productsMockDatabase = [
  { id: 1, name: 'Topface Instyle Creamy Lipstick 001.', price: 188, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=100' },
  { id: 2, name: 'Topface Micellar Cleansing Water 150 ml.', price: 193, image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=100' },
  { id: 3, name: 'Soralone Hydra Cream Gel 100ml Offer (1+1)', price: 275, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=100' },
  { id: 4, name: 'Soralone Cica Cream Gel 60ml Offer (1+1)', price: 295, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=100' },
  { id: 5, name: 'Capixy Intense Tonic Spray Offer (1+1)', price: 700, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=100' },
  { id: 6, name: 'Luxury Rose Treatment Facial Oil', price: 450, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=100' }
]

const liveResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  return productsMockDatabase.filter(p => 
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 4)
})

const goToProductsPage = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value } })
    searchQuery.value = ''
  }
}

const goToProductsPageMobile = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value } })
    searchQuery.value = ''
    isMobileSearchOpen.value = false 
  }
}

const navLinks = [
  { name: 'Home', path: '/', icon: 'uil:home' },
  { name: 'Products', path: '/products', icon: 'uil:box' },
  { name: 'Make Up', path: '/category/makeup', icon: 'uil:brush-alt' },
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
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
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