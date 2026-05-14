<template>
    <!-- الهيدر مع خلفية زجاجية بسيطة وتثبيت في الأعلى -->
    <header class="bg-white/95 backdrop-blur-md border-b border-gray-100 font-['Cairo'] sticky top-0 z-[100] transition-all duration-300 shadow-sm" dir="rtl">
      <div class="container mx-auto px-4 py-2 lg:py-4 flex items-center justify-between gap-4">
        
        <!-- زر القائمة الجانبية للموبايل بتصميم دائري -->
        <button 
          @click="isMenuOpen = true" 
          class="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors"
          aria-label="Open Menu"
        >
          <Icon name="heroicons:bars-3-bottom-right" class="w-7 h-7" />
        </button>
  
        <!-- اللوجو مع تحسين الحجم -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="block transform hover:scale-105 transition-transform duration-300">
            <img src="~/assets/images/logo.png" alt="Dr. Dawood" class="h-10 md:h-14 lg:h-16 w-auto" />
          </NuxtLink>
        </div>
  
        <!-- القائمة الرئيسية: تم إضافة أنيميشن Underline عند الـ Hover -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-600 font-semibold">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path" 
            class="relative py-2 group text-[15px] hover:text-pink-600 transition-colors"
          >
            {{ link.name }}
            <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </nav>
  
        <!-- قسم الأدوات: البحث، الحساب، والسلة -->
        <div class="flex items-center gap-1 md:gap-3 flex-1 justify-end">
          
          <!-- البحث المتطور: يتوسع عند التركيز -->
          <div class="relative hidden md:block group max-w-[180px] lg:max-w-xs w-full">
            <input 
              type="text" 
              placeholder="ابحثي عن جمالك..." 
              class="w-full bg-gray-50 border border-transparent rounded-full py-2.5 pr-10 pl-4 focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all duration-300 text-sm"
            />
            <Icon name="uil:search" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 w-5 h-5 transition-colors" />
          </div>
  
          <!-- أيقونات الأكشن بتصميم موحد -->
          <div class="flex items-center">
            <button class="p-2.5 hover:bg-pink-50 rounded-full text-gray-700 hover:text-pink-600 transition-all sm:hidden">
              <Icon name="uil:search" class="w-6 h-6" />
            </button>
            
            <button class="p-2.5 hover:bg-pink-50 rounded-full text-gray-700 hover:text-pink-600 transition-all group">
              <Icon name="uil:user" class="w-6 h-6" />
            </button>
            
            <div class="relative group">
              <button class="p-2.5 hover:bg-pink-50 rounded-full text-gray-700 hover:text-pink-600 transition-all">
                <Icon name="uil:shopping-cart" class="w-6 h-6" />
              </button>
              <span class="absolute top-1 left-1 bg-gradient-to-tr from-purple-800 to-pink-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm font-bold animate-pulse-slow">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- القائمة الجانبية للموبايل مع تأثير Blur للخلفية -->
      <Transition name="fade">
        <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden"></div>
      </Transition>
  
      <Transition name="slide">
        <aside v-if="isMenuOpen" class="fixed top-0 right-0 h-full w-[300px] bg-white z-[120] shadow-[ -10px_0_30px_rgba(0,0,0,0.1)] lg:hidden flex flex-col">
          <div class="p-6 flex justify-between items-center border-b border-gray-50">
            <img src="~/assets/images/logo.png" alt="Logo" class="h-10 w-auto" />
            <button @click="isMenuOpen = false" class="p-2 bg-gray-100 hover:bg-pink-50 hover:text-pink-600 rounded-full transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <nav class="p-6 flex flex-col gap-2 overflow-y-auto">
            <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" 
              @click="isMenuOpen = false"
              class="flex items-center gap-4 p-3 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all group"
            >
              <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                <Icon :name="link.icon" class="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </div>
              <span class="font-medium text-[17px]">{{ link.name }}</span>
            </NuxtLink>
          </nav>
  
          <div class="mt-auto p-6 border-t border-gray-50">
             <button class="w-full bg-gradient-to-r from-purple-800 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-pink-500/20">
               تسجيل الدخول
             </button>
          </div>
        </aside>
      </Transition>
    </header>
  </template>
  
  <script setup>
  const isMenuOpen = ref(false);
  
  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: 'uil:home' },
    { name: 'المنتجات', path: '/products', icon: 'uil:box' },
    { name: 'منتجات كورية', path: '/korean', icon: 'uil:star' },
    { name: 'مكياج', path: '/makeup', icon: 'uil:brush-alt' },
    { name: 'روتين', path: '/routines', icon: 'uil:schedule' },
    { name: 'من نحن', path: '/about', icon: 'uil:info-circle' },
    { name: 'اتصل بنا', path: '/contact', icon: 'uil:envelope' },
  ];
  </script>
  
  <style scoped>
  /* خط Cairo متوفر بناءً على تفضيلاتك */
  .router-link-active {
    @apply text-pink-600 font-bold;
  }
  
  .router-link-active span {
    @apply w-full;
  }
  
  /* تحسينات الأنيميشن */
  .fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  
  .slide-enter-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
  .slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .slide-enter-from { transform: translateX(100%); opacity: 0; }
  .slide-leave-to { transform: translateX(100%); }
  
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite ease-in-out;
  }
  </style>