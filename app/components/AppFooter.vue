<template>

    <footer class="bg-dark text-white/70 font-sans border-t border-white/5 pt-16 pb-8" dir="ltr">

      <div class="container mx-auto px-4">

        

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-16 pb-12 border-b border-white/5">

          

          <div class="space-y-5">

            <NuxtLink to="/" class="inline-block transform hover:scale-105 transition-transform">

              <img src="~/assets/images/logo.png" alt="Laurette Store" class="h-14 w-auto " />

            </NuxtLink>

            <p class="text-sm text-white/50 leading-relaxed">

              Your ultimate destination for clean beauty, advanced skincare routines, and authentic Korean cosmetic innovations. Designed to elevate your natural glow.

            </p>

            <div class="flex items-center space-x-3 pt-2">

              <a href="#" class="p-2 bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all duration-300">

                <Icon name="uil:facebook-f" class="w-5 h-5" />

              </a>

              <a href="#" class="p-2 bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all duration-300">

                <Icon name="uil:instagram" class="w-5 h-5" />

              </a>

              <a href="#" class="p-2 bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all duration-300">

                <Icon name="uil:twitter" class="w-5 h-5" />

              </a>

              <a href="#" class="p-2 bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all duration-300">

                <Icon name="uil:youtube" class="w-5 h-5" />

              </a>

            </div>

          </div>

  

          <div class="space-y-4">

            <h4 class="text-white font-serif font-semibold text-lg tracking-wide relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">

              Shop Categories

            </h4>

            <ul class="space-y-2.5 text-sm">

              <li v-for="link in shopLinks" :key="link.path">

                <NuxtLink :to="link.path" class="hover:text-primary transition-colors duration-200 flex items-center group">

                  <Icon name="heroicons:chevron-right" class="w-3 h-3 mr-2 text-primary/50 group-hover:text-primary transition-transform group-hover:translate-x-1" />

                  {{ link.name }}

                </NuxtLink>

              </li>

            </ul>

          </div>

  

          <div class="space-y-4">

            <h4 class="text-white font-serif font-semibold text-lg tracking-wide relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">

              Customer Care

            </h4>

            <ul class="space-y-2.5 text-sm">

              <li v-for="link in infoLinks" :key="link.path">

                <NuxtLink :to="link.path" class="hover:text-primary transition-colors duration-200 flex items-center group">

                  <Icon name="heroicons:chevron-right" class="w-3 h-3 mr-2 text-primary/50 group-hover:text-primary transition-transform group-hover:translate-x-1" />

                  {{ link.name }}

                </NuxtLink>

              </li>

            </ul>

          </div>

  

          <div class="space-y-4">

            <h4 class="text-white font-serif font-semibold text-lg tracking-wide relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">

              Newsletter

            </h4>

            <p class="text-sm text-white/50 leading-relaxed">

              Subscribe to receive updates, access to exclusive deals, and more.

            </p>

            <form @submit.prevent="handleSubscribe" class="space-y-2">

              <div class="relative flex items-center">

                <input 

                  type="email" 

                  placeholder="Enter your email..." 

                  class="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"

                  required

                />

                <button 

                  type="submit"

                  class="absolute right-2 bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition-colors duration-300 flex items-center justify-center"

                  aria-label="Subscribe"

                >

                  <Icon name="heroicons:paper-airplane" class="w-4 h-4 transform rotate-45 -translate-x-0.5" />

                </button>

              </div>

            </form>

          </div>

  

        </div>

  

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">

          <p>&copy; {{ currentYear }} Laurette Store. All rights reserved.</p>

          

          <!-- <div class="flex items-center space-x-3 filter grayscale opacity-60 hover:opacity-100 transition-opacity duration-300">

            <Icon name="logos:visa" class="w-10 h-6 object-contain" />

            <Icon name="logos:mastercard" class="w-8 h-6 object-contain" />

            <Icon name="fa6-solid:money-bill-wave" class="w-6 h-6 text-primary object-contain" title="Cash on Delivery" />

          </div> -->

        </div>

  

      </div>

    </footer>

  </template>

  

  <script setup>

  const currentYear = computed(() => new Date().getFullYear());

  

  const shopLinks = [

    { name: 'Skin Care', path: '/category/skin-care' },

    { name: 'Body Care', path: '/category/body-care' },

    { name: 'Hair Care', path: '/category/hair-care' },

    { name: 'Korean Cosmetics', path: '/category/korean-care' },

    { name: 'Makeup Set', path: '/category/makeup' },

  ];

  

  const infoLinks = [

    { name: 'About Us', path: '/about' },

    { name: 'Contact Support', path: '/ContactUs' },

    { name: 'Shipping & Returns', path: '/shipping' },

    { name: 'Privacy Policy', path: '/privacy' },

    { name: 'Terms of Service', path: '/terms' },

  ];

  

  const handleSubscribe = () => {

    alert('Thank you for subscribing!');

  };

  </script>

  

  <style scoped>

  .container {

    max-width: 1200px;

  }

  </style>

