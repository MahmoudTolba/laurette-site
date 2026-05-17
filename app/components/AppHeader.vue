<template>
    <header class="absolute top-0 left-0 w-full z-[100] bg-transparent font-sans" dir="ltr">
      <div class="container mx-auto px-4 py-3 lg:py-5 flex items-center justify-between gap-4">
        
        <button 
          @click="isMenuOpen = true" 
          class="lg:hidden p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
          aria-label="Open Menu"
        >
          <Icon name="heroicons:bars-3-bottom-left" class="w-7 h-7" />
        </button>
  
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="block transform hover:scale-105 transition-transform duration-300">
            <img src="~/assets/images/logo.png" alt="Dr. Dawood" class="h-10 md:h-14 lg:h-16 w-auto" />
          </NuxtLink>
        </div>
  
        <nav class="hidden lg:flex items-center gap-6 xl:gap-8 text-white font-semibold">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path" 
            class="relative py-2 group text-[15px] hover:text-pink-400 transition-colors"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </nav>
  
        <div class="flex items-center gap-1 md:gap-3 flex-1 justify-end">
          
          <div class="relative hidden sm:block group max-w-[150px] lg:max-w-xs w-full">
            <input 
              type="text" 
              placeholder="Search beauty..." 
              class="w-full bg-white/10 border border-white/20 rounded-full py-2 pr-4 pl-10 text-white placeholder-white/60 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:ring-4 focus:ring-pink-500/20 outline-none transition-all duration-300 text-sm backdrop-blur-sm"
            />
            <Icon name="uil:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-pink-500 w-5 h-5 transition-colors" />
          </div>
  
          <div class="flex items-center space-x-1">
            <button class="p-2 hover:bg-white/10 rounded-full text-white sm:hidden">
              <Icon name="uil:search" class="w-6 h-6" />
            </button>
            
            <button class="p-2 hover:bg-white/10 rounded-full text-white hover:text-pink-400 transition-all group">
              <Icon name="uil:user" class="w-6 h-6" />
            </button>
            
            <div class="relative group">
              <button class="p-2 hover:bg-white/10 rounded-full text-white hover:text-pink-400 transition-all">
                <Icon name="uil:shopping-cart" class="w-6 h-6" />
              </button>
              <span class="absolute top-1 right-1 bg-gradient-to-tr from-purple-700 to-pink-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center border-2 border-transparent shadow-sm font-bold animate-pulse-slow">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <Transition name="fade">
        <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] lg:hidden"></div>
      </Transition>
  
      <Transition name="slide">
        <aside v-if="isMenuOpen" class="fixed top-0 left-0 h-full w-[280px] bg-white z-[120] shadow-[10px_0_30px_rgba(0,0,0,0.1)] lg:hidden flex flex-col" dir="ltr">
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
              <span class="font-medium text-[16px]">{{ link.name }}</span>
            </NuxtLink>
          </nav>
  
          <div class="mt-auto p-6 border-t border-gray-50">
             <button class="w-full bg-gradient-to-r from-purple-800 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-pink-500/20">
               Login / Sign Up
             </button>
          </div>
        </aside>
      </Transition>
    </header>
  </template>
  
  <script setup>
  const isMenuOpen = ref(false);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: 'uil:home' },
    { name: 'Products', path: '/products', icon: 'uil:box' },
    { name: 'Korean Care', path: '/korean', icon: 'uil:star' },
    { name: 'Make Up', path: '/makeup', icon: 'uil:brush-alt' },
    { name: 'Routines', path: '/routines', icon: 'uil:schedule' },
    { name: 'About Us', path: '/about', icon: 'uil:info-circle' },
    { name: 'Contact', path: '/contact', icon: 'uil:envelope' },
  ];
  </script>
  
  <style scoped>
  /* Highlighting active links - White/Pink contrast */
  .router-link-active {
    @apply text-pink-400 font-bold;
  }
  
  .router-link-active span {
    @apply w-full;
  }
  
  /* Transitions for Mobile Menu */
  .fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  
  .slide-enter-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
  .slide-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .slide-enter-from { transform: translateX(-100%); opacity: 0; }
  .slide-leave-to { transform: translateX(-100%); }
  
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite ease-in-out;
  }
  </style>