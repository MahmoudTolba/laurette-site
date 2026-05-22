<template>

    <section class="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden font-sans flex flex-col justify-center" dir="ltr">

      

      <div class="absolute inset-0 z-0">

        <img 

          src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop" 

          alt="Hero Background" 

          class="w-full h-full object-cover object-center transform scale-105 animate-slow-zoom"

        />

        <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

      </div>

  

      <div class="container mx-auto px-4 relative z-10 pt-36 pb-24 md:pt-44 md:pb-16">

        <div class="max-w-2xl text-white space-y-5 md:space-y-6">

          

          <!-- <span class="inline-block bg-primary/90 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-fade-in-down">

            New Arrival: Authentic Korean Products

          </span> -->

  

          <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight animate-fade-in-left">

            Welcome to <span class="text-primary">Laurette Store</span>

            <br />

            Your Beauty Starts Here

          </h1>

  

          <p class="text-sm md:text-base lg:text-lg text-gray-200 max-w-lg leading-relaxed animate-text-entry">

            Discover the latest fashion trends, advanced skincare solutions, makeup essentials, and curated Korean care routines tailored just for you.

          </p>

  

          <div class="flex flex-wrap gap-4 pt-2 relative z-20 animate-buttons-entry">

            

            <NuxtLink 

              to="/products" 

              class="group relative overflow-hidden bg-white text-dark px-8 py-3.5 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-primary/30 transition-all duration-300 block"

            >

              <span class="relative z-10 block group-hover:text-white transition-colors duration-300">Shop Now</span>

              <div class="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            </NuxtLink>

  

            <NuxtLink 

              to="/ContactUs" 

              class="border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-bold text-base md:text-lg backdrop-blur-sm transition-all block"

            >

              Contact Us

            </NuxtLink>

          </div>

        </div>

      </div>

  

      <!-- <button 

        @click="scrollToOffers" 

        class="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-white/70 hover:text-primary transition-colors duration-300 focus:outline-none animate-bounce z-20 group"

        aria-label="Scroll to offers"

      >

        <span class="text-[10px] tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Offers</span>

        <Icon name="heroicons:chevron-double-down" class="w-6 h-6 drop-shadow-md" />

      </button> -->

    </section>

  </template>

  

  <script setup>

  const scrollToOffers = () => {

    const offersSection = document.getElementById('offers');

    if (offersSection) {

      offersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }

  };

  </script>

  

  <style scoped>

  @keyframes slow-zoom {

    0% { transform: scale(1); }

    100% { transform: scale(1.08); }

  }

  .animate-slow-zoom {

    animation: slow-zoom 20s infinite alternate ease-in-out;

  }

  

  .animate-fade-in-left {

    animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  }

  .animate-fade-in-down {

    animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  }

  

  .animate-text-entry {

    animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;

    opacity: 0;

  }

  

  .animate-buttons-entry {

    animation: slideUpAppear 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;

    opacity: 0;

  }

  

  @keyframes fadeInLeft {

    from { opacity: 0; transform: translateX(-30px); }

    to { opacity: 1; transform: translateX(0); }

  }

  

  @keyframes fadeInDown {

    from { opacity: 0; transform: translateY(-15px); }

    to { opacity: 1; transform: translateY(0); }

  }

  

  @keyframes slideUpAppear {

    from { opacity: 0; transform: translateY(20px); }

    to { opacity: 1; transform: translateY(0); }

  }

  </style>

