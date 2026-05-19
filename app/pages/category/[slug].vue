<template>
  <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center max-w-xl mx-auto mb-12 space-y-3">
        <span class="text-xs font-bold tracking-widest uppercase text-primary">Category Collection</span>
        <h1 class="text-4xl font-serif text-text">Shop {{ categoryName }}</h1>
        <p class="text-muted text-sm leading-relaxed">
          Discover our curated premium products under the {{ categoryName }} collection, tailored specially for your pristine daily routine.
        </p>
      </div>

      <div class="space-y-10">
        <div v-if="filteredProducts.length === 0" class="text-center py-24 bg-white rounded-2xl border border-outline/50">
          <Icon name="heroicons:circle-stack" class="w-12 h-12 text-outline mx-auto mb-3" />
          <p class="text-muted text-lg">No products available in {{ categoryName }} at the moment.</p>
          <NuxtLink to="/products" class="mt-4 inline-block text-xs font-bold bg-dark text-white px-6 py-3 rounded-full hover:bg-primary transition-colors">
            View All Products
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="flex flex-col group relative bg-white rounded-xl p-3 border border-outline/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
          >
            <NuxtLink :to="`/products/${product.id}`" class="relative aspect-[4/5] w-full bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-4 cursor-pointer block">
              <span v-if="product.onSale" class="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-sm z-10">
                Sale
              </span>
              <img
                :src="product.image"
                :alt="product.name"
                class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </NuxtLink>

            <div class="flex flex-col pt-4 flex-1 space-y-2">
              <span class="text-[10px] uppercase font-bold text-muted/70 tracking-wider">{{ product.category }}</span>

              <NuxtLink :to="`/products/${product.id}`" class="block">
                <h2 class="text-sm font-semibold text-text line-clamp-2 min-h-[40px] hover:text-primary transition-colors cursor-pointer">
                  {{ product.name }}
                </h2>
              </NuxtLink>

              <div class="flex items-center text-amber-400">
                <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-3.5 h-3.5" />
              </div>

              <div class="flex items-center gap-2 pt-1 font-bold text-xs sm:text-sm">
                <span v-if="product.oldPrice" class="text-muted/70 line-through font-normal">
                  {{ product.oldPrice }} EGP
                </span>
                <span class="bg-surface text-text border border-outline/50 px-2 py-0.5 rounded">
                  {{ product.price }} EGP
                </span>
              </div>

              <div class="pt-3">
                <button
                  @click="addToCart(product)"
                  class="w-full bg-dark hover:bg-primary text-white text-[11px] uppercase font-bold py-3 tracking-widest transition-all duration-300 rounded-lg shadow-sm active:scale-95"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const cart = useState('cart', () => [])
const { getBySlug } = useProducts()

const currentSlug = computed(() => String(route.params.slug))
const categoryName = computed(() => slugToCategoryName(currentSlug.value))
const filteredProducts = computed(() => getBySlug(currentSlug.value))

const addToCart = (product) => {
  const existingProduct = cart.value.find(item => item.id === product.id)
  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

useHead({
  title: computed(() => `Shop ${categoryName.value} Collection | Laurette Store`),
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
