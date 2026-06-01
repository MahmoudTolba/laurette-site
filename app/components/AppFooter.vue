<template>
  <footer class="bg-dark text-white/70 font-sans border-t border-white/5 pt-16 pb-8" dir="ltr">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-16 pb-12 border-b border-white/5">
        
        <div class="space-y-5">
          <NuxtLink to="/" class="inline-block transform hover:scale-105 transition-all duration-300">
            <img src="~/assets/images/logo.png" alt="Laurette Store" class="h-14 w-auto object-contain brightness-110" />
          </NuxtLink>
          <p class="text-sm text-white/50 leading-relaxed font-light">
            Your ultimate destination for clean beauty, advanced skincare routines, and authentic Korean cosmetic innovations. Designed to elevate your natural glow.
          </p>
          <div class="flex items-center space-x-3 pt-2">
            <a href="#" aria-label="Follow us on Facebook" class="w-9 h-9 bg-white/5 text-white/60 hover:bg-primary hover:text-white rounded-full transition-all duration-300 flex items-center justify-center border border-white/5 hover:border-primary hover:-translate-y-1 shadow-sm">
              <Icon name="uil:facebook-f" class="w-4 h-4" />
            </a>
            <a href="#" aria-label="Follow us on Instagram" class="w-9 h-9 bg-white/5 text-white/60 hover:bg-primary hover:text-white rounded-full transition-all duration-300 flex items-center justify-center border border-white/5 hover:border-primary hover:-translate-y-1 shadow-sm">
              <Icon name="uil:instagram" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="text-white font-serif font-semibold text-md tracking-wide relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-6 after:h-[2px] after:bg-primary">
            Shop Categories
          </h4>
          <ul class="space-y-3 text-sm pt-1">
            <li v-for="link in shopLinks" :key="link.path">
              <NuxtLink :to="link.path" class="text-white/60 hover:text-primary transition-all duration-200 flex items-center group">
                <Icon name="heroicons:chevron-right" class="w-3 h-3 mr-1.5 text-primary/40 group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1" />
                <span class="font-light group-hover:font-normal">{{ link.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-white font-serif font-semibold text-md tracking-wide relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-6 after:h-[2px] after:bg-primary">
            Customer Care
          </h4>
          <ul class="space-y-3 text-sm pt-1">
            <li v-for="link in infoLinks" :key="link.path">
              <NuxtLink :to="link.path" class="text-white/60 hover:text-primary transition-all duration-200 flex items-center group">
                <Icon name="heroicons:chevron-right" class="w-3 h-3 mr-1.5 text-primary/40 group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1" />
                <span class="font-light group-hover:font-normal">{{ link.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-white font-serif font-semibold text-md tracking-wide relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-6 after:h-[2px] after:bg-primary">
            Newsletter
          </h4>
          <p class="text-sm text-white/50 leading-relaxed font-light">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form @submit.prevent="handleSubscribe" class="space-y-2 pt-1">
            <div class="relative flex items-center group">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                class="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-white placeholder-white/30 text-xs focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                required
              />
              <button 
                type="submit"
                class="absolute right-1.5 bg-primary hover:bg-white text-white hover:text-dark w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center shadow-md active:scale-95"
                aria-label="Subscribe"
              >
                <Icon name="heroicons:paper-airplane" class="w-3.5 h-3.5 transform rotate-45 -translate-x-0.5 group-hover:translate-x-0 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </form>
        </div>

      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 tracking-wide">
        <p class="font-light">&copy; {{ currentYear }} <span class="text-white/50 font-normal">Laurette Store</span>. All rights reserved.</p>
        <div class="flex items-center space-x-1 font-light text-[11px]">
          <span>Made with</span>
          <Icon name="uil:heart" class="w-3.5 h-3.5 text-primary animate-pulse shadow-sm" />
          <span>for premium skin luxury.</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());

const shopLinks = [
  { name: 'Skin Care', path: '/category/skin-care' },
  { name: 'Body Care', path: '/category/body-care' },
  { name: 'Hair Care', path: '/category/hair-care' },
  { name: 'Makeup Set', path: '/category/makeup' },
];

const infoLinks = [
  { name: 'Our Story', path: '/about' },
  { name: 'Contact Support', path: '/ContactUs' },
];

const handleSubscribe = () => {
  alert('Thank you for subscribing to Laurette newsletter!');
};
</script>

<style scoped>
/* إزالة أي قيود قديمة للحفاظ على الاتساق الكامل مع الهيكل العام للصفحات */
</style>