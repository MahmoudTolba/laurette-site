<template>
    <div class="home">
  
      <!-- HERO SECTION -->
      <section class="hero">
        <div class="hero-content">
          <h1>Welcome To Laurette Store</h1>
  
          <p>
            Discover the latest fashion, accessories and more.
          </p>
  
          <NuxtLink to="/products" class="shop-btn">
            Shop Now
          </NuxtLink>
        </div>
      </section>
  
      <!-- FEATURED PRODUCTS -->
      <section class="products-section">
  
        <h2 class="section-title">
          Featured Products
        </h2>
  
        <div class="products-grid">
  
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="product-image"
            />
  
            <h3 class="product-title">
              {{ product.title }}
            </h3>
  
            <p class="product-price">
              ${{ product.price }}
            </p>
  
            <NuxtLink
              :to="`/products/${product.id}`"
              class="details-btn"
            >
              View Details
            </NuxtLink>
  
          </div>
  
        </div>
  
      </section>
  
    </div>
  </template>
  
  <script setup>
  const { data: products } = await useFetch(
    'https://fakestoreapi.com/products?limit=8'
  )
  </script>
  
  <style scoped>
  
  .home {
    min-height: 100vh;
    background: #f5f5f5;
  }
  
  /* HERO */
  
  .hero {
    height: 500px;
    background: linear-gradient(to right, #111, #333);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 20px;
  }
  
  .hero-content h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  
  .hero-content p {
    font-size: 18px;
    margin-bottom: 30px;
  }
  
  .shop-btn {
    background: white;
    color: black;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s;
  }
  
  .shop-btn:hover {
    background: #ddd;
  }
  
  /* PRODUCTS */
  
  .products-section {
    padding: 60px 40px;
  }
  
  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .product-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-image {
    height: 220px;
    object-fit: contain;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .product-title {
    font-size: 16px;
    height: 50px;
    overflow: hidden;
    margin-bottom: 15px;
  }
  
  .product-price {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #111;
  }
  
  .details-btn {
    display: inline-block;
    background: black;
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    text-decoration: none;
    transition: 0.3s;
  }
  
  .details-btn:hover {
    background: #444;
  }
  
  /* RESPONSIVE */
  
  @media (max-width: 768px) {
  
    .hero-content h1 {
      font-size: 32px;
    }
  
    .products-section {
      padding: 40px 20px;
    }
  
  }
  
  </style>