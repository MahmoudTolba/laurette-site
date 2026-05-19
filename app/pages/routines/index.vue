<template>
  <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-4">
        <span class="text-xs font-bold tracking-widest uppercase text-primary">Beauty Rituals</span>
        <h1 class="text-4xl md:text-5xl font-serif text-text">Curated Skincare Routines</h1>
        <p class="text-muted text-sm md:text-base leading-relaxed">
          Step-by-step morning and evening rituals built from our clean beauty essentials — designed to simplify your glow journey.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <article
          v-for="routine in routines"
          :key="routine.id"
          class="bg-white rounded-2xl border border-outline/50 shadow-sm overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
        >
          <div class="relative aspect-[16/9] overflow-hidden">
            <img
              :src="routine.image"
              :alt="routine.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <span class="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {{ routine.time }}
            </span>
          </div>

          <div class="p-6 space-y-4">
            <h2 class="text-xl font-serif text-text">{{ routine.title }}</h2>
            <p class="text-muted text-sm leading-relaxed">{{ routine.description }}</p>

            <ol class="space-y-2">
              <li
                v-for="(step, index) in routine.steps"
                :key="index"
                class="flex items-start gap-3 text-sm text-text"
              >
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {{ index + 1 }}
                </span>
                <span>{{ step }}</span>
              </li>
            </ol>

            <NuxtLink
              :to="routine.shopLink"
              class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors pt-2"
            >
              Shop this routine
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </article>
      </div>

      <section class="bg-surface/60 rounded-2xl border border-outline/30 p-8 md:p-12 text-center space-y-4">
        <h2 class="text-2xl md:text-3xl font-serif text-text">Not sure where to start?</h2>
        <p class="text-muted text-sm max-w-lg mx-auto">
          Browse our full collection or filter by skin concern to build a routine that fits you.
        </p>
        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <NuxtLink
            to="/products"
            class="bg-dark hover:bg-primary text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-colors"
          >
            All Products
          </NuxtLink>
          <NuxtLink
            to="/category/korean-care"
            class="bg-white border border-outline hover:border-primary text-text text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-colors"
          >
            Korean Care
          </NuxtLink>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
const routines = [
  {
    id: 1,
    title: 'Morning Glow Ritual',
    time: 'AM Routine',
    description: 'A lightweight 4-step routine to hydrate, protect, and prep skin for makeup.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800',
    steps: [
      'Gentle micellar cleanse to refresh overnight buildup',
      'Vitamin C serum for brightness and antioxidant shield',
      'Light gel moisturizer to lock in hydration',
      'SPF as the final non-negotiable step',
    ],
    shopLink: '/category/skin-care',
  },
  {
    id: 2,
    title: 'Evening Recovery Ritual',
    time: 'PM Routine',
    description: 'Repair and nourish while you sleep with targeted Korean care actives.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800',
    steps: [
      'Double cleanse: oil balm then water-based cleanser',
      'Hydrating toner to balance pH',
      'Cica cream gel to calm and strengthen barrier',
      'Facial oil seal for overnight nourishment',
    ],
    shopLink: '/category/korean-care',
  },
  {
    id: 3,
    title: 'Weekly Hair Revival',
    time: 'Weekly',
    description: 'Restore shine and scalp health with a focused once-a-week treatment.',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800',
    steps: [
      'Scalp massage with intense tonic spray',
      'Leave-in treatment for 15 minutes',
      'Rinse and apply lightweight conditioner',
      'Air dry or cool blow-dry to protect strands',
    ],
    shopLink: '/category/hair-care',
  },
  {
    id: 4,
    title: 'Soft Glam Makeup Flow',
    time: 'Occasion',
    description: 'Effortless makeup layering for a polished, natural finish.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800',
    steps: [
      'Primer and matte foundation base',
      'Creamy lipstick as the statement shade',
      'Soft contour and setting spray',
      'Touch-up kit ready in your bag',
    ],
    shopLink: '/category/makeup',
  },
]

useHead({
  title: 'Skincare Routines | Laurette Store',
  meta: [
    { name: 'description', content: 'Discover curated morning, evening, and weekly beauty routines at Laurette Store.' },
  ],
})
</script>
