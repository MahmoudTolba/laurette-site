<template>
  <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
    <div class="container mx-auto px-4 max-w-7xl">
      
      <div class="text-center max-w-xl mx-auto mb-12 space-y-3">
        <span class="text-xs font-bold tracking-widest uppercase text-primary">Our Collections</span>
        <h1 class="text-4xl font-serif text-text">
          {{ seoTitleContext }}
        </h1>
        <p class="text-muted text-sm leading-relaxed">
          Explore our handpicked selection of clean cosmetics, non-toxic formulations, and imported authentic Korean skincare.
        </p>
        
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          <div v-if="route.query.search" class="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
            <span>Search: "{{ route.query.search }}"</span>
            <button @click="clearSearch" class="hover:text-text transition-colors font-extrabold ml-1">✕</button>
          </div>
          <div v-if="route.query.category" class="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1.5 rounded-full">
            <span>Category: {{ translateSlugToName(route.query.category) }}</span>
            <button @click="clearCategoryQuery" class="hover:text-text transition-colors font-extrabold ml-1">✕</button>
          </div>
          <div v-if="route.query.subcategory" class="inline-flex items-center gap-2 bg-accent/10 text-[#e4b49d] bg-[#e4b49d]/10 text-xs font-bold px-3 py-1.5 rounded-full">
            <span>Sub: {{ translateSubSlugToName(route.query.subcategory) }}</span>
            <button @click="clearSubCategoryQuery" class="hover:text-text transition-colors font-extrabold ml-1">✕</button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-outline/50 mb-8">
        <button 
          @click="isMobileFilterOpen = true" 
          class="lg:hidden flex items-center gap-2 text-sm font-semibold text-text px-3 py-2 border border-outline rounded-lg"
        >
          <Icon name="heroicons:funnel" class="w-4 h-4 text-primary" />
          Filters
        </button>
        
        <p class="text-xs md:text-sm text-muted">
          Showing <span class="font-bold text-text">{{ filteredProducts.length }}</span> products
        </p>

        <div class="flex items-center gap-2">
          <label class="text-xs text-muted/70 uppercase tracking-wider font-semibold hidden md:block">Sort By:</label>
          <select 
            v-model="sortBy"
            class="bg-background border border-outline text-muted text-sm rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <aside class="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-outline/50 shadow-sm space-y-8 sticky top-32">
          <div class="space-y-3">
            <h2 class="text-sm font-bold uppercase tracking-wider text-text pb-2 border-b border-outline/50">Categories</h2>
            <div class="space-y-2">
              <label 
                v-for="cat in categories" 
                :key="cat" 
                class="flex items-center gap-3 text-sm text-muted cursor-pointer hover:text-primary transition-colors"
              >
                <input 
                  type="checkbox" 
                  :value="cat" 
                  v-model="selectedCategories"
                  class="rounded text-primary focus:ring-primary w-4 h-4 border-outline"
                />
                {{ cat }}
              </label>
            </div>
          </div>

          <div class="space-y-3">
            <h2 class="text-sm font-bold uppercase tracking-wider text-text pb-2 border-b border-outline/50">Max Price</h2>
            <div class="space-y-2">
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="50"
                v-model="maxPrice"
                class="w-full h-1.5 bg-outline/50 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs font-bold text-muted">
                <span>0 EGP</span>
                <span class="text-primary px-2 py-0.5 bg-primary/10 rounded">{{ maxPrice }} EGP</span>
              </div>
            </div>
          </div>
        </aside>

        <div class="lg:col-span-9 space-y-8">
          
          <div v-if="!isLoading && products.length > 0 && subCategories.length > 1" class="w-full bg-white border border-outline/40 p-4 rounded-xl shadow-sm animate-fade-in">
            <div class="flex flex-col gap-2">
              <span class="text-[11px] uppercase font-bold text-[#e4b49d] tracking-wider">Subcategories:</span>
              <div class="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full py-1">
                <button
                  v-for="sub in subCategories"
                  :key="sub"
                  @click="handleSubCategoryClick(sub)"
                  :class="activeSubCategory === sub 
                    ? 'bg-[#e4b49d] text-black font-semibold border-[#e4b49d] shadow-sm' 
                    : 'bg-background text-gray-600 border-gray-200 hover:border-[#e4b49d] hover:text-black'"
                  class="px-5 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-all duration-300 whitespace-nowrap"
                >
                  {{ sub }}
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="isLoading" class="flex flex-col justify-center items-center py-24 space-y-4 bg-white rounded-2xl border border-outline/50 shadow-sm">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p class="text-muted text-sm">Fetching Laurette collections...</p>
          </div>

          <div v-else-if="paginatedProducts.length === 0" class="text-center py-24 bg-white rounded-2xl border border-outline/50">
            <Icon name="heroicons:circle-stack" class="w-12 h-12 text-outline mx-auto mb-3" />
            <p class="text-muted text-lg">No products match your search or filter selections.</p>
            <button @click="resetAllFilters" class="mt-4 text-xs font-bold text-primary underline hover:text-text transition-colors">
              Clear all filters and view all
            </button>
          </div>

          <div v-else class="space-y-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <div 
                v-for="product in paginatedProducts" 
                :key="product.id" 
                class="flex flex-col group relative bg-white rounded-xl p-3 border border-outline/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <NuxtLink :to="`/products/${product.id}`" class="relative aspect-[4/5] w-full bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-4 cursor-pointer block">
                  <span v-if="product.stock <= 2 && product.stock > 0" class="absolute top-2 left-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm z-10">
                    Low Stock
                  </span>
                  
                  <span v-if="product.category && product.category.toLowerCase() === 'korean care'" class="absolute top-2 right-2 bg-secondary text-white text-[9px] font-extrabold px-2 py-0.5 uppercase rounded-sm z-10">
                    K-Beauty
                  </span>
                  
                  <img 
                    :src="product.image_url" 
                    :alt="`Laurette - ${product.title}`" 
                    class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </NuxtLink>

                <div class="flex flex-col pt-4 flex-1 space-y-2">
                  <div class="flex items-center gap-1.5 text-[10px] uppercase font-bold text-muted/70 tracking-wider">
                    <span>{{ formatCategoryName(product.category) }}</span>
                    <span v-if="product.sub_category" class="text-[#e4b49d]">/ {{ formatCategoryName(product.sub_category) }}</span>
                  </div>
                  
                  <NuxtLink :to="`/products/${product.id}`" class="block">
                    <h3 class="text-sm font-semibold text-text line-clamp-2 min-h-[40px] hover:text-primary transition-colors cursor-pointer">
                      {{ product.title }}
                    </h3>
                  </NuxtLink>

                  <div class="flex items-center text-amber-400">
                    <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-3.5 h-3.5" />
                  </div>

                  <div class="flex items-center gap-2 pt-1 font-bold text-xs sm:text-sm">
                    <span class="bg-surface text-text border border-outline/50 px-2 py-0.5 rounded">
                      {{ formatPrice(product.price) }}
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

            <div v-if="totalPages > 1" class="flex items-center justify-center gap-1.5 pt-6 border-t border-outline/30">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="flex items-center justify-center w-9 h-9 rounded-xl border border-outline transition-all disabled:opacity-40 disabled:hover:bg-transparent hover:bg-primary/5 hover:border-primary group"
              >
                <Icon name="heroicons:chevron-left" class="w-4 h-4 text-text group-hover:text-primary" />
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
                  @click="setPage(page)"
                  class="w-9 h-9 rounded-xl font-semibold text-xs transition-all border font-mono"
                  :class="currentPage === page 
                    ? 'bg-[#e4b49d] border-[#e4b49d] text-black font-bold shadow-md shadow-[#e4b49d]/20' 
                    : 'bg-white border-outline text-muted hover:border-[#e4b49d] hover:text-black'"
                >
                  {{ page }}
                </button>
              </template>

              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="flex items-center justify-center w-9 h-9 rounded-xl border border-outline transition-all disabled:opacity-40 disabled:hover:bg-transparent hover:bg-primary/5 hover:border-primary group"
              >
                <Icon name="heroicons:chevron-right" class="w-4 h-4 text-text group-hover:text-primary" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMobileFilterOpen" @click="isMobileFilterOpen = false" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] lg:hidden"></div>
    </Transition>

    <Transition name="slide">
      <aside v-if="isMobileFilterOpen" class="fixed top-0 left-0 h-full w-[290px] bg-white z-[120] shadow-xl lg:hidden flex flex-col p-6" dir="ltr">
        <div class="flex items-center justify-between pb-4 border-b border-outline/50 mb-6">
          <h2 class="text-lg font-bold text-text">Filter Products</h2>
          <button @click="isMobileFilterOpen = false" class="p-1.5 bg-background hover:bg-primary/10 hover:text-primary rounded-full transition-colors">
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
        
        <div class="space-y-6 flex-1 overflow-y-auto">
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-muted/70">Categories</h3>
            <div class="space-y-2">
              <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 text-sm text-muted">
                <input type="checkbox" :value="cat" v-model="selectedCategories" class="rounded text-primary focus:ring-primary w-4 h-4 border-outline" />
                {{ cat }}
              </label>
            </div>
          </div>
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-muted/70">Max Price</h3>
            <input type="range" min="0" max="5000" step="50" v-model="maxPrice" class="w-full appearance-none h-1 bg-outline/50 rounded accent-primary" />
            <div class="text-xs font-bold text-primary">{{ maxPrice }} EGP</div>
          </div>
        </div>
      </aside>
    </Transition>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, useState, useHead, useSupabaseClient } from '#imports'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

// States Control
const products = ref([])
const isLoading = ref(true)
const isMobileFilterOpen = ref(false)
const sortBy = ref('featured')
const maxPrice = ref(5000) 
const selectedCategories = ref([])
const activeSubCategory = ref('ALL')

const currentPage = ref(1)
const itemsPerPage = ref(12) 

const cart = useState('cart', () => [])

const formatCategoryName = (text) => {
  if (!text) return ''
  return text
    .toString()
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const slugify = (text) => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
}

// 1. استخراج الأقسام الرئيسية للـ Sidebar
const categories = computed(() => {
  if (!products.value.length) return []
  const allCategories = products.value
    .map(p => formatCategoryName(p.category))
    .filter(cat => cat !== '')
  return [...new Set(allCategories)]
})

// 2. استخراج الأقسام الفرعية الشاملة
const subCategories = computed(() => {
  if (!products.value.length) return []
  
  let targetedProducts = [...products.value]
  
  if (selectedCategories.value.length > 0) {
    const selectedLower = selectedCategories.value.map(c => c.toLowerCase())
    targetedProducts = targetedProducts.filter(p => p.category && selectedLower.includes(p.category.toLowerCase()))
  }

  const subs = targetedProducts
    .map(p => p.sub_category ? formatCategoryName(p.sub_category) : '')
    .filter(Boolean)

  if (subs.length === 0) return []
  return ['ALL', ...new Set(subs)]
})

// دالة التحكم بضغط كبسولات الأقسام الفرعية ومزامنة الـ URL
const handleSubCategoryClick = (subName) => {
  activeSubCategory.value = subName
  
  // تحديث الـ URL لإضافة الـ subcategory كـ query parameter
  if (subName === 'ALL') {
    router.push({ path: '/products', query: { ...route.query, subcategory: undefined } })
    return
  }

  router.push({ path: '/products', query: { ...route.query, subcategory: slugify(subName) } })

  // الربط التلقائي بالقسم الرئيسي المرتبط
  const matchedProduct = products.value.find(
    p => p.sub_category && formatCategoryName(p.sub_category) === subName
  )
  
  if (matchedProduct && matchedProduct.category) {
    const mainCatFormatted = formatCategoryName(matchedProduct.category)
    if (!selectedCategories.value.includes(mainCatFormatted)) {
      selectedCategories.value = [mainCatFormatted]
    }
  }
}

// مراقبة الـ Sidebar
watch(selectedCategories, () => {
  if (activeSubCategory.value !== 'ALL') {
    const isSubStillValid = subCategories.value.includes(activeSubCategory.value)
    if (!isSubStillValid) {
      activeSubCategory.value = 'ALL'
      router.push({ path: '/products', query: { ...route.query, subcategory: undefined } })
    }
  }
  currentPage.value = 1
})

watch(activeSubCategory, () => {
  currentPage.value = 1
})

// جلب المنتجات من سوبابيز
const fetchAllProducts = async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, stock, image_url, category, sub_category, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error
    products.value = data || []
  } catch (error) {
    console.error('Error fetching all products from Supabase:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchAllProducts()
})

// 🌟 [تحديث ذكي]: مراقبة ورصد الـ Category والـ Subcategory القادمة من الـ Breadcrumbs
watch(
  [() => route.query.category, categories],
  ([newCategorySlug, currentCategories]) => {
    if (newCategorySlug && currentCategories.length > 0) {
      const targetCategory = currentCategories.find(cat => slugify(cat) === newCategorySlug)
      if (targetCategory && !selectedCategories.value.includes(targetCategory)) {
        selectedCategories.value = [targetCategory]
      }
    } else if (!newCategorySlug) {
      selectedCategories.value = []
    }
  },
  { immediate: true }
)

watch(
  [() => route.query.subcategory, products],
  ([newSubSlug, currentProducts]) => {
    if (newSubSlug && currentProducts.length > 0) {
      // بنجيب الأقسام الفرعية المتاحة ونطابقها مع الـ Slug القادم
      const allSubs = currentProducts.map(p => p.sub_category ? formatCategoryName(p.sub_category) : '').filter(Boolean)
      const targetSub = [...new Set(allSubs)].find(sub => slugify(sub) === newSubSlug)
      if (targetSub) {
        activeSubCategory.value = targetSub
      }
    } else if (!newSubSlug) {
      activeSubCategory.value = 'ALL'
    }
  },
  { immediate: true }
)

watch(selectedCategories, (newVal) => {
  if (newVal.length === 0 && route.query.category) {
    router.push({ path: '/products', query: { ...route.query, category: undefined, subcategory: undefined } })
  }
})

// فلترة وعرض الداتا بحسب المعايير المختارة
const filteredProducts = computed(() => {
  let result = [...products.value]

  // 1. فلتر البحث
  if (route.query.search) {
    const searchWord = route.query.search.toString().toLowerCase()
    result = result.filter(p => p.title && p.title.toLowerCase().includes(searchWord))
  }

  // 2. فلتر السعر
  result = result.filter(p => p.price <= maxPrice.value)

  // 3. فلتر الأقسام الرئيسية (Sidebar)
  if (selectedCategories.value.length > 0) {
    const selectedLower = selectedCategories.value.map(c => c.toLowerCase())
    result = result.filter(p => p.category && selectedLower.includes(p.category.toLowerCase()))
  }

  // 4. فلتر الأقسام الفرعية العلوي
  if (activeSubCategory.value !== 'ALL') {
    const activeSubLower = activeSubCategory.value.toLowerCase()
    result = result.filter(p => p.sub_category && p.sub_category.toLowerCase() === activeSubLower)
  }

  // 5. الترتيب
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (current < total - 2) pages.push('...')
    pages.push(total)
  }
  return pages
})

const formatPrice = (amount) => {
  if (!amount) return '0 EGP'
  return `${Number(amount).toLocaleString('en-EG', { minimumFractionDigits: 0 })} EGP`
}

const addToCart = (product) => {
  const existingProduct = cart.value.find(item => item.id === product.id)
  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.value.push({ 
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      quantity: 1 
    })
  }
}

watch([selectedCategories, activeSubCategory, maxPrice, sortBy, () => route.query.search], () => {
  currentPage.value = 1
})

const setPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const clearSearch = () => {
  router.push({ path: '/products', query: { ...route.query, search: undefined } })
}

const clearCategoryQuery = () => {
  router.push({ path: '/products', query: { ...route.query, category: undefined, subcategory: undefined } })
  selectedCategories.value = []
}

// دالة لتنظيف القسم الفرعي فقط من الـ Badges العلوية
const clearSubCategoryQuery = () => {
  router.push({ path: '/products', query: { ...route.query, subcategory: undefined } })
  activeSubCategory.value = 'ALL'
}

const resetAllFilters = () => {
  maxPrice.value = 5000
  selectedCategories.value = []
  activeSubCategory.value = 'ALL'
  router.push({ path: '/products', query: {} })
}

const translateSlugToName = (slug) => {
  if (!slug) return ''
  const targetCategory = categories.value.find(cat => slugify(cat) === slug)
  return targetCategory || slug
}

// دالة لترجمة سلاج القسم الفرعي إلى نص مقروء في شارات الفلتر
const translateSubSlugToName = (slug) => {
  if (!slug) return ''
  const allSubs = products.value.map(p => p.sub_category ? formatCategoryName(p.sub_category) : '').filter(Boolean)
  const targetSub = [...new Set(allSubs)].find(sub => slugify(sub) === slug)
  return targetSub || slug
}

const seoTitleContext = computed(() => {
  if (route.query.category) {
    return `Shop ${translateSlugToName(route.query.category)} Collections`
  }
  if (route.query.search) {
    return `Search Results for "${route.query.search}"`
  }
  return 'Shop All Products'
})

const seoDescriptionContext = computed(() => {
  if (route.query.category) {
    return `Discover our premium, handpicked selection of authentic ${translateSlugToName(route.query.category)} products. Clean cosmetics and non-toxic skincare at Laurette Store Egypt.`
  }
  return 'Explore our handpicked selection of clean cosmetics, non-toxic formulations, and imported authentic Korean skincare at Laurette Store. Safe beauty products for your skin.'
})

useHead(() => {
  const baseTitle = `${seoTitleContext.value} | Laurette Store`
  const description = seoDescriptionContext.value
  
  const siteUrl = 'https://laurette-store.com' 
  let canonicalPath = `${siteUrl}/products`
  if (route.query.category) {
    canonicalPath += `?category=${route.query.category}`
  }

  return {
    title: baseTitle,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: baseTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalPath },
      { property: 'og:image', content: 'https://laurette-store.com/og-image.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: baseTitle },
      { name: 'twitter:description', content: description }
    ],
    link: [
      { rel: 'canonical', href: canonicalPath }
    ]
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>