<template>
  <main class="min-h-screen bg-background font-sans pt-40 pb-20 md:pt-48 lg:pt-56" dir="ltr">
    
    <section class="container mx-auto px-4 max-w-6xl mb-16 md:mb-24 relative z-10">
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xl font-bold tracking-widest uppercase text-primary tracking-widest block animate-pulse-slow">
          Our Story
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif text-text leading-tight tracking-tight">
          Redefining Beauty Through <span class="text-primary italic">Clean Science</span>
        </h1>
        <div class="w-12 h-[2px] bg-primary/60 mx-auto my-3 rounded-full"></div>
        <p class="text-muted text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-2xl mx-auto">
          Welcome to Laurette Store, where nature’s finest botanical secrets meet cutting-edge cosmetic science. We believe skincare isn't just a routine—it's a ritual of self-love.
        </p>
      </div>
    </section>

    <section class="bg-surface/40 py-16 md:py-24 border-y border-outline/30 relative z-10">
      <div class="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <div class="lg:col-span-6 grid grid-cols-12 gap-4 relative w-full items-end min-h-[320px] md:min-h-[420px]">
          <div class="col-span-8 overflow-hidden rounded-2xl shadow-sm border border-outline/30 aspect-[4/5] bg-white group w-full transition-all duration-500 hover:shadow-xl hover:border-primary/20">
            <img 
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600" 
              alt="Natural Skincare textures and authentic laboratory testing" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 block"
              loading="lazy"
            />
          </div>
          <div class="col-span-4 overflow-hidden rounded-2xl shadow-sm border border-outline/30 aspect-square bg-white group w-full transition-all duration-500 hover:shadow-xl hover:border-primary/20">
            <img 
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=400" 
              alt="Premium Korean Beauty serums curated by Laurette Store" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 block"
              loading="lazy"
            />
          </div>
        </div>

        <div class="lg:col-span-6 space-y-6 w-full">
          <h2 class="text-3xl md:text-4xl font-serif text-text leading-snug">
            Crafted For Your Skin's Health
          </h2>
          <p class="text-muted text-sm md:text-base leading-relaxed">
            Founded by skincare experts who grew tired of toxic additives and confusing ingredient labels, Laurette was born from a singular mission: to deliver safe, highly-effective, non-toxic products designed for all skin tones and complexities.
          </p>
          <p class="text-muted text-sm md:text-base leading-relaxed">
            We travel across the globe—especially sourcing premium innovations from the heart of Seoul—to deliver authentic <strong class="text-text font-semibold">Korean Skincare</strong> secrets alongside clean global makeup staples straight to your vanity.
          </p>
          
          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-outline/60">
            <div class="space-y-1">
              <span class="block text-2xl md:text-3xl font-serif font-bold text-primary">100%</span>
              <span class="block text-[10px] md:text-xs text-muted/80 uppercase tracking-widest font-semibold leading-none">Cruelty Free</span>
            </div>
            <div class="space-y-1">
              <span class="block text-2xl md:text-3xl font-serif font-bold text-primary">Clean</span>
              <span class="block text-[10px] md:text-xs text-muted/80 uppercase tracking-widest font-semibold leading-none">Ingredients</span>
            </div>
            <div class="space-y-1">
              <span class="block text-2xl md:text-3xl font-serif font-bold text-primary">Authentic</span>
              <span class="block text-[10px] md:text-xs text-muted/80 uppercase tracking-widest font-semibold leading-none">Korean Import</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="container mx-auto px-4 max-w-6xl py-16 md:py-24 relative z-10">
      <div class="text-center max-w-md mx-auto mb-16 space-y-2">
        <h2 class="text-3xl font-serif text-text">The Laurette Pillars</h2>
        <p class="text-xs text-primary uppercase tracking-widest font-bold">What guides our selection</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="text-center p-8 space-y-4 rounded-2xl bg-white border border-outline/40 shadow-sm hover:shadow-xl hover:border-primary/20 transform hover:-translate-y-1 transition-all duration-300 group">
          <div class="w-12 h-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm">
            <Icon name="uil:heart" class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-bold text-text group-hover:text-primary transition-colors">Clean & Conscious</h3>
          <p class="text-xs md:text-sm text-muted leading-relaxed">
            Every product on our shelves is meticulously tested to be parabens-free, cruelty-free, and ethically sourced.
          </p>
        </div>

        <div class="text-center p-8 space-y-4 rounded-2xl bg-white border border-outline/40 shadow-sm hover:shadow-xl hover:border-primary/20 transform hover:-translate-y-1 transition-all duration-300 group">
          <div class="w-12 h-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm">
            <Icon name="uil:star" class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-bold text-text group-hover:text-primary transition-colors">Authentic Innovations</h3>
          <p class="text-xs md:text-sm text-muted leading-relaxed">
            Direct supply chains with authentic Korean labs mean you receive pristine, verified formulations every time.
          </p>
        </div>

        <div class="text-center p-8 space-y-4 rounded-2xl bg-white border border-outline/40 shadow-sm hover:shadow-xl hover:border-primary/20 transform hover:-translate-y-1 transition-all duration-300 group">
          <div class="w-12 h-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm">
            <Icon name="uil:smile" class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-bold text-text group-hover:text-primary transition-colors">Designed For All</h3>
          <p class="text-xs md:text-sm text-muted leading-relaxed">
            Inclusivity is core to our selection. Skincare patterns curated flawlessly to accommodate various skin dynamics.
          </p>
        </div>

      </div>
    </section>

    <section class="container mx-auto px-4 max-w-5xl mb-8 relative z-10">
      <div class="bg-dark rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-xl border border-white/5">
        <div class="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-primary/10 pointer-events-none"></div>
        <div class="relative z-10 max-w-xl mx-auto space-y-6">
          <h2 class="text-3xl md:text-4xl font-serif leading-tight">Ready To Find Your Ultimate Routine?</h2>
          <p class="text-white/70 text-xs md:text-sm leading-relaxed max-w-md mx-auto font-light">
            Dive right into our selected product catalog and build the glow you have always envisioned.
          </p>
          <NuxtLink 
            to="/products" 
            class="inline-block bg-white text-dark font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-xl active:scale-95"
          >
            Explore Best Sellers
          </NuxtLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { useSeoMeta } from '#imports';

// تفعيل ميزات الـ SEO المتقدمة للـ Crawlers ومواقع التواصل الاجتماعي بالكامل
useSeoMeta({
  title: 'Our Story & Brand Philosophy | Laurette Store',
  description: 'Discover the Laurette Store vision. Sourcing authentic non-toxic Korean Skincare solutions, organic beauty secret bundles, and premium cosmetics in Egypt.',
  ogTitle: 'About Laurette Store | Redefining Beauty Through Clean Science',
  ogDescription: 'We merge traditional botanicals with cutting-edge clean cosmetic formulations. Explore our handpicked authentic Korean skincare imports.',
  ogType: 'website',
  ogImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600',
  twitterCard: 'summary_large_image',
  keywords: 'about laurette, korean skincare egypt, clean beauty, non-toxic cosmetics, skincare routine, organic bundles egypt'
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse-slow 4s infinite ease-in-out;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(0.98); }
}
</style>