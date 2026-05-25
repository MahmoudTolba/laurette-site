<template>
  <section id="home-packages" class="py-16 bg-surface font-sans" dir="ltr">
    <div class="container mx-auto px-4 max-w-7xl">

      <!-- Title -->
      <div class="text-center mb-12 max-w-xl mx-auto space-y-3">
        <h2 class="text-4xl lg:text-5xl font-serif text-text">
          Packages
        </h2>

        <div class="w-20 h-1.5 bg-gradient-to-l from-secondary to-primary mx-auto rounded-full"></div>

        <p class="text-muted text-[15px] leading-relaxed">
          Exclusive value bundles curated just for you using our finest clean beauty products.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="text-center py-12">
        <Icon
          name="svg-spinners:ring-resize"
          class="w-10 h-10 text-primary mx-auto mb-2 animate-spin"
        />
        <p class="text-sm text-muted">
          Loading our exclusive packages...
        </p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-12 text-red-500">
        <p>Failed to load packages. Please try again later.</p>
      </div>

      <!-- Packages Row -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <div
          v-for="pkg in displayedPackages"
          :key="pkg.id"
          class="flex flex-col group relative bg-surface rounded-xl border border-outline/30 p-3 hover:border-primary/30 hover:shadow-md transition-all duration-300"
        >

          <!-- Image -->
          <div
            class="relative aspect-square w-full bg-background rounded-lg overflow-hidden flex items-center justify-center p-4 bg-gray-50/50"
          >

            <!-- Sale Badge -->
            <span
              v-if="pkg.onSale || pkg.oldPrice"
              class="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider z-10 rounded-sm"
            >
              Sale
            </span>

            <!-- Discount -->
            <span
              v-if="pkg.oldPrice"
              class="absolute top-2 right-2 bg-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 z-10"
              dir="rtl"
            >
              <span>
                خصم {{ calculateDiscount(pkg.oldPrice, pkg.price) }}%
              </span>
            </span>

            <!-- Product Image -->
            <img
              :src="pkg.image"
              :alt="pkg.name"
              class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col items-center text-center mt-4 flex-1 space-y-2">

            <!-- Name -->
            <NuxtLink :to="`/packages/${pkg.id}`" class="block w-full">
              <h3
                class="text-sm font-semibold text-text min-h-[40px] line-clamp-2 px-1 hover:text-secondary transition-colors cursor-pointer leading-snug"
              >
                {{ pkg.name }}
              </h3>
            </NuxtLink>

            <!-- Stars -->
            <div class="flex items-center gap-0.5">
              <Icon
                v-for="star in 5"
                :key="star"
                name="material-symbols:star"
                class="w-3.5 h-3.5 text-amber-400"
              />
            </div>

            <!-- Price -->
            <div
              class="flex items-center justify-center gap-2 flex-wrap text-xs md:text-sm font-bold pt-1"
            >
              <span
                v-if="pkg.oldPrice"
                class="text-gray-400 line-through font-normal text-xs"
              >
                {{ formatPrice(pkg.oldPrice) }}
              </span>

              <span class="text-text font-extrabold">
                {{ formatPrice(pkg.price) }}
              </span>
            </div>

            <!-- Button -->
            <div class="w-full pt-3 mt-auto">
              <button
                @click="addToCart(pkg)"
                class="w-full bg-dark hover:bg-primary text-white text-[11px] uppercase font-bold py-2.5 tracking-widest transition-all duration-300 shadow-sm rounded-md active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- View All -->
      <div class="text-center mt-14">
        <NuxtLink
          to="/packages"
          class="inline-block bg-dark text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all duration-300 shadow-sm"
        >
          View All Packages
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useState, useAsyncData } from '#app'

// Cart State
const cart = useState('cart', () => [])

// Supabase Client
const client = useSupabaseClient()

// Fetch Packages
const { data: packages, pending, error } = await useAsyncData(
  'home-packages',
  async () => {
    const { data, error: fetchError } = await client
      .from('packages')
      .select('*')

    if (fetchError) throw fetchError

    return data
  }
)

// ✅ عرض صف واحد فقط (5 كاردات)
const displayedPackages = computed(() => {
  return packages.value?.slice(0, 5) || []
})

// Format Price
const formatPrice = (amount) => {
  if (!amount) return '0.00 EGP'

  return `${amount.toLocaleString('en-EG', {
    minimumFractionDigits: 2
  })} EGP`
}

// Calculate Discount
const calculateDiscount = (oldPrice, newPrice) => {
  if (!oldPrice || oldPrice <= newPrice) return 0

  return Math.round(((oldPrice - newPrice) / oldPrice) * 100)
}

// Add To Cart
const addToCart = (pkg) => {
  const existingItem = cart.value.find(
    item => item.id === pkg.id
  )

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      category: 'Package Deal',
      quantity: 1
    })
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>