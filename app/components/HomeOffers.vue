<template>
    <section id="home-offers" class="py-16 bg-white font-sans" dir="ltr">
      <div class="container mx-auto px-4">
        
        <div class="text-center mb-12 max-w-xl mx-auto space-y-3">
          <h2 class="text-4xl lg:text-5xl font-serif text-[#2D1B2D]">Offers</h2>
          <div class="w-20 h-1.5 bg-gradient-to-l from-purple-800 to-pink-500 mx-auto rounded-full"></div>

          <p class="text-gray-600 text-[15px] leading-relaxed">
            Made using clean, non-toxic ingredients, our products are designed for everyone.
          </p>
        </div>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-9 ">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="flex flex-col group relative bg-white rounded-lg transition-all duration-300"
          >
            <div class="relative aspect-[4/5] w-full bg-gray-50 rounded-md overflow-hidden flex items-center justify-center p-4">
              
              <span v-if="product.onSale" class="absolute top-3 left-3 bg-[#421A3B] text-white text-xs font-semibold px-3 py-1 uppercase z-10">
                Sale
              </span>
  
              <span v-if="product.isNew" class="absolute top-3 right-3 bg-[#209F85] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 z-10" dir="rtl">
                <span>جديد</span>
                <span class="text-[9px] opacity-75">NEW</span>
              </span>
  
              <img 
                :src="product.image" 
                :alt="product.name" 
                class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
  
            <div class="flex flex-col items-center text-center mt-4 flex-1 space-y-2">
              <h3 class="text-sm md:text-base font-semibold text-gray-800 min-h-[44px] line-clamp-2 px-2 hover:text-[#421A3B] transition-colors cursor-pointer">
                {{ product.name }}
              </h3>
  
              <div class="flex items-center gap-0.5 text-gray-200">
                <Icon 
                  v-for="star in 5" 
                  :key="star" 
                  name="material-symbols:star" 
                  class="w-4 h-4 text-gray-300" 
                />
              </div>
  
              <div class="flex items-center justify-center gap-2 flex-wrap text-sm font-bold">
                <span class="text-gray-400 line-through font-normal">
                  {{ formatPrice(product.oldPrice) }}
                </span>
                <span class="bg-[#FFFCE4] text-[#2D1B2D] px-1.5 py-0.5 rounded">
                  {{ formatPrice(product.price) }}
                </span>
              </div>
  
              <div class="w-full pt-2 mt-auto">
                <button class="w-full bg-[#421A3B] hover:bg-[#5A2551] text-white text-xs uppercase font-bold py-3 tracking-wider transition-colors duration-300 shadow-sm rounded-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
            <NuxtLink to="/products" class="bg-primary text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-primary/80 transition-colors duration-300">
                View All Products
            </NuxtLink>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  // Helper function to format currency
  const formatPrice = (amount) => {
    return `${amount.toLocaleString('en-EG', { minimumFractionDigits: 2 })} EGP`;
  };
  
  // Mock Data based on the attached image
  const products = [
    {
      id: 1,
      name: 'Topface Instyle Creamy Lipstick 001.',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400', // Substitute with real asset if needed
      price: 188.00,
      oldPrice: 375.00,
      onSale: true,
      isNew: false
    },
    {
      id: 2,
      name: 'Topface Micellar Cleansing Water 150 ml.',
      image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400',
      price: 193.00,
      oldPrice: 385.00,
      onSale: true,
      isNew: false
    },
    {
      id: 3,
      name: 'Soralone Hydra Cream Gel 100ml Offer (1+1)',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400',
      price: 275.00,
      oldPrice: 550.00,
      onSale: true,
      isNew: true
    },
    {
      id: 4,
      name: 'Soralone Cica Cream Gel 60ml Offer (1+1)',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400',
      price: 295.00,
      oldPrice: 590.00,
      onSale: true,
      isNew: true
    },
    {
      id: 5,
      name: 'Capixy Intense Tonic Spray Offer (1+1)',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400',
      price: 700.00,
      oldPrice: 1400.00,
      onSale: true,
      isNew: false
    }
  ];
  </script>
  
  <style scoped>
  /* Force text layout to cut elegantly if titles are too long */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
  </style>