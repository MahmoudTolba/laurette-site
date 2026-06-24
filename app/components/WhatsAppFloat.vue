<template>
    <!-- Wrapper -->
    <div class="whatsapp-wrapper">
      
      <!-- Tooltip -->
      <span class="whatsapp-tooltip">
        contact us
      </span>
  
      <!-- WhatsApp Button -->
      <a
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp-float"
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M20.52 3.48A11.79 11.79 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.6 5.96L0 24l6.34-1.66a11.8 11.8 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.17-1.23-6.15-3.42-8.42ZM12.05 21.3h-.01a9.3 9.3 0 0 1-4.74-1.3l-.34-.2-3.76.98 1-3.66-.22-.38a9.3 9.3 0 0 1-1.42-4.95c0-5.13 4.17-9.3 9.31-9.3 2.49 0 4.83.97 6.58 2.72a9.24 9.24 0 0 1 2.72 6.58c0 5.13-4.18 9.31-9.32 9.31Zm5.1-6.96c-.28-.14-1.64-.81-1.9-.9-.25-.1-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.31.21-.59.07-.28-.14-1.16-.43-2.22-1.37-.82-.73-1.37-1.64-1.53-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.31.42-.46.14-.16.18-.28.28-.47.1-.18.05-.35-.02-.49-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.71.35-.25.28-.95.93-.95 2.27s.97 2.63 1.11 2.81c.14.18 1.91 2.91 4.63 4.08.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.06-.11-.24-.18-.52-.32Z"
          />
        </svg>
      </a>
    </div>
  </template>
  
  <script setup>
  const phone = '2010'
  const message = 'مرحبا، اريد الاستفسار'
  
  const whatsappLink =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  </script>
  
  <style scoped>
  /* --- Wrapper --- */
  .whatsapp-wrapper {
    position: fixed;
    bottom: 20px;
    right: 20px;
  
    z-index: 9999;
  
    display: flex;
    align-items: center;
  }
  
  /* --- Tooltip --- */
  .whatsapp-tooltip {
    position: absolute;
  
    right: 75px;
    top: 50%;
  
    transform: translateY(-50%) translateX(10px);
  
    background: #1f1f1f;
    color: #fff;
  
    padding: 10px 14px;
  
    border-radius: 10px;
  
    font-size: 14px;
    font-weight: 500;
  
    white-space: nowrap;
  
    opacity: 0;
    visibility: hidden;
  
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  
    pointer-events: none;
  }
  
  /* Tooltip Arrow */
  .whatsapp-tooltip::after {
    content: '';
  
    position: absolute;
  
    top: 50%;
    right: -12px;
  
    transform: translateY(-50%);
  
    border-width: 6px;
    border-style: solid;
  
    border-color:
      transparent
      transparent
      transparent
      #1f1f1f;
  }
  
  /* Show Tooltip on Hover */
  .whatsapp-wrapper:hover .whatsapp-tooltip {
    opacity: 1;
    visibility: visible;
  
    transform: translateY(-50%) translateX(0);
  }
  
  /* --- WhatsApp Button --- */
  .whatsapp-float {
    width: 60px;
    height: 60px;
  
    background: #25d366;
  
    border-radius: 50%;
  
    display: flex;
    align-items: center;
    justify-content: center;
  
    text-decoration: none;
  
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      background-color 0.3s ease;
  
    flex-shrink: 0;
  }
  
  /* Hover Effect */
  .whatsapp-float:hover {
    transform: scale(1.08);
  
    background: #20bd5a;
  
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  }
  </style>