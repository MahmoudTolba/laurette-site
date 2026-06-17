<template>
  <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
    <div class="container mx-auto px-4 max-w-7xl">
      
      <div class="text-center max-w-xl mx-auto mb-8 space-y-3">
        <span class="text-xl font-bold tracking-widest uppercase text-primary">Category Collection</span>
        <h1 class="text-4xl font-serif text-text capitalize">Shop {{ categoryName }}</h1>
        <p class="text-muted text-sm leading-relaxed">
          Discover our curated premium products under the {{ categoryName }} collection, tailored specially for your pristine daily routine.
        </p>
      </div>

      <div v-if="!isLoading && products.length > 0 && subCategories.length > 1" class="flex justify-center items-center pb-10">
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full px-4 py-1">
          <button
            v-for="sub in subCategories"
            :key="sub"
            @click="activeSubCategory = sub"
            :class="activeSubCategory === sub 
              ? 'bg-[#e4b49d] text-black font-semibold border-[#e4b49d] shadow-sm' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#e4b49d] hover:text-black'"
            class="px-5 py-2 rounded-full text-xs uppercase tracking-wider border transition-all duration-300 whitespace-nowrap"
          >
            {{ sub }}
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="flex flex-col justify-center items-center py-24 space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p class="text-muted text-sm">Loading collection products...</p>
      </div>

      <div v-else class="space-y-10">
        <div v-if="paginatedProducts.length === 0" class="text-center py-24 bg-white rounded-2xl border border-outline/50">
          <Icon name="heroicons:circle-stack" class="w-12 h-12 text-outline mx-auto mb-3" />
          <p class="text-muted text-lg">No products available in this selection at the moment.</p>
          <NuxtLink to="/" class="mt-4 inline-block text-xs font-bold bg-dark text-white px-6 py-3 rounded-full hover:bg-primary transition-colors">
            Back to Home
          </NuxtLink>
        </div>

        <div v-else class="space-y-12">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="flex flex-col group relative bg-white rounded-xl p-3 border border-outline/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <NuxtLink :to="`/products/${product.id}`" class="relative aspect-[4/5] w-full bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-4 cursor-pointer block">
                <span v-if="product.old_price || product.stock <= 2" class="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-sm z-10">
                  {{ product.stock <= 2 && product.stock > 0 ? 'Low Stock' : 'Sale' }}
                </span>
                
                <img
                  :src="product.image || product.image_url"
                  :alt="product.title"
                  class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </NuxtLink>

              <div class="flex flex-col pt-4 flex-1 space-y-2">
                <div class="flex items-center gap-1.5 text-[10px] uppercase font-bold text-muted/70 tracking-wider">
                  <span>{{ product.category }}</span>
                  <span v-if="product.subCategory" class="text-[#e4b49d]">/ {{ product.subCategory }}</span>
                </div>

                <NuxtLink :to="`/products/${product.id}`" class="block">
                  <h2 class="text-sm font-semibold text-text line-clamp-2 min-h-[40px] hover:text-primary transition-colors cursor-pointer">
                    {{ product.title }}
                  </h2>
                </NuxtLink>

                <div class="flex items-center text-amber-400">
                  <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-3.5 h-3.5" />
                </div>

                <div class="flex items-center gap-2 pt-1 font-bold text-xs sm:text-sm">
                  <span v-if="product.old_price" class="text-muted/70 line-through font-normal">
                    {{ product.old_price }} EGP
                  </span>
                  <span class="bg-surface text-text border border-outline/50 px-2 py-0.5 rounded">
                    {{ product.price }} EGP
                  </span>
                </div>

                <div class="pt-3">
                  <button
                    @click="addToCart(product)"
                    :disabled="product.stock === 0"
                    class="w-full bg-dark hover:bg-primary text-white text-[11px] uppercase font-bold py-3 tracking-widest transition-all duration-300 rounded-lg shadow-sm active:scale-95 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                  >
                    {{ product.stock === 0 ? 'Out of Stock' : 'Add to Bag' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="totalPages > 1" class="flex justify-center items-center gap-1.5 pt-6 border-t border-outline/30">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              class="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-[#e4b49d] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <template v-for="(page, idx) in visiblePages" :key="idx">
              <span 
                v-if="page === '...'" 
                class="w-9 h-9 flex items-center justify-center text-gray-400 font-mono text-xs select-none"
              >
                ...
              </span>
              
              <button
                v-else
                @click="currentPage = page"
                :class="currentPage === page 
                  ? 'bg-[#e4b49d] text-black font-bold border-[#e4b49d]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#e4b49d] hover:text-black'"
                class="w-9 h-9 flex items-center justify-center rounded-lg text-xs font-mono border transition-all"
              >
                {{ page }}
              </button>
            </template>

            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-[#e4b49d] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useSupabaseClient, useState, useServerSeoMeta } from '#imports'

const route = useRoute()
const supabase = useSupabaseClient()

const products = ref([])
const isLoading = ref(true)
const cart = useState('cart', () => [])

const activeSubCategory = ref('ALL')
const currentPage = ref(1)
const itemsPerPage = 12

watch(activeSubCategory, () => {
  currentPage.value = 1
})

const slugToCategoryName = (slug) => {
  if (!slug) return ''
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const currentSlug = computed(() => String(route.params.slug))
const categoryName = computed(() => slugToCategoryName(currentSlug.value))

const subCategories = computed(() => {
  const subs = products.value
    .map(p => p.subCategory ? p.subCategory.trim() : '')
    .filter(Boolean)
  return ['ALL', ...new Set(subs)]
})

const filteredProducts = computed(() => {
  if (activeSubCategory.value === 'ALL') return products.value
  return products.value.filter(p => p.subCategory && p.subCategory.trim() === activeSubCategory.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage) || 1
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

/**
 * دالة الحساب الذكية لحصر نطاق الأزرار الظاهرة (Pagination Window)
 * تضمن اختصار الـ 12 صفحة إلى أزرار مدمجة بحد أقصى 5 إلى 6 عناصر فقط
 */
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 5) {
    // لو الصفحات كلها 5 أو أقل، اظهرهم بالكامل عادي
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    // دائماً ضع الصفحة الأولى
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    // حساب الصفحات المحيطة بالصفحة الحالية
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) {
      pages.push('...')
    }

    // دائماً ضع الصفحة الأخيرة
    pages.push(total)
  }

  return pages
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    scrollToTop()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    scrollToTop()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const fetchCategoryProducts = async () => {
  try {
    isLoading.value = true
    activeSubCategory.value = 'ALL' 
    currentPage.value = 1 
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('category', categoryName.value)
      
    if (error) throw error
    
    products.value = data || []
  } catch (error) {
    console.error('Error loading category products:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategoryProducts()
})

watch(currentSlug, () => {
  fetchCategoryProducts()
})

const addToCart = (product) => {
  const img = product.image || product.image_url
  const existingProduct = cart.value.find(item => item.id === product.id)
  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.value.push({ 
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: img,
      quantity: 1 
    })
  }
}

useServerSeoMeta({
  title: () => `Shop ${categoryName.value} Collection | Laurette Store`,
  ogTitle: () => `Shop ${categoryName.value} Collection | Laurette Store`,
  description: () => `Explore the ultimate premium selection of ${categoryName.value} at Laurette. High-quality items tailored carefully for your exceptional daily beauty and care routine.`,
  ogDescription: () => `Explore the ultimate premium selection of ${categoryName.value} at Laurette. High-quality items tailored carefully for your exceptional daily beauty and care routine.`,
  ogType: 'website',
  ogImage: () => products.value[0]?.image || products.value[0]?.image_url || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>