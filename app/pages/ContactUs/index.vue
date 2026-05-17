<template>
    <main class="min-h-screen bg-gray-50/50 font-sans pt-28 pb-16 lg:pt-36" dir="ltr">
      <div class="container mx-auto px-4 max-w-6xl">
        
        <div class="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span class="text-xs font-bold tracking-widest uppercase text-pink-600">Get In Touch</span>
          <h1 class="text-4xl lg:text-5xl font-serif text-[#1F0D1C]">We'd Love To Hear From You</h1>
          <p class="text-gray-500 text-sm md:text-base leading-relaxed">
            Have a question about our clean beauty products, authentic Korean skincare, or need help with an order? Drop us a line below.
          </p>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div class="lg:col-span-7 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
            <h2 class="text-2xl font-serif text-[#1F0D1C] mb-6">Send Us A Message</h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-gray-600">Full Name</label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    placeholder="Your name" 
                    class="w-full bg-gray-50/50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 rounded-xl py-3 px-4 outline-none text-sm transition-all text-gray-800"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-gray-600">Email Address</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    placeholder="name@example.com" 
                    class="w-full bg-gray-50/50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 rounded-xl py-3 px-4 outline-none text-sm transition-all text-gray-800"
                    required
                  />
                </div>
              </div>
  
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-gray-600">Subject</label>
                <input 
                  v-model="form.subject"
                  type="text" 
                  placeholder="How can we help?" 
                  class="w-full bg-gray-50/50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 rounded-xl py-3 px-4 outline-none text-sm transition-all text-gray-800"
                  required
                />
              </div>
  
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-gray-600">Your Message</label>
                <textarea 
                  v-model="form.message"
                  rows="5" 
                  placeholder="Write your message here..." 
                  class="w-full bg-gray-50/50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 rounded-xl py-3 px-4 outline-none text-sm transition-all resize-none text-gray-800"
                  required
                ></textarea>
              </div>
  
              <button 
                type="submit" 
                class="w-full sm:w-auto bg-gradient-to-r from-[#1F0D1C] to-[#421A3B] hover:from-pink-700 hover:to-pink-600 text-white font-bold text-sm uppercase tracking-widest py-4 px-10 rounded-full shadow-lg hover:shadow-pink-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
  
          <div class="lg:col-span-5 space-y-8">
            
            <div class="space-y-6">
              <h2 class="text-2xl font-serif text-[#1F0D1C] mb-2">Store Information</h2>
              
              <!-- <div class="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 flex-shrink-0">
                  <Icon name="uil:map-marker" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-gray-800">Our HQ Address</h4>
                  <p class="text-xs text-gray-500 leading-relaxed">
                    123 Luxury Beauty Street, Fifth Settlement, Cairo, Egypt
                  </p>
                </div>
              </div> -->
  
              <div class="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 flex-shrink-0">
                  <Icon name="uil:phone" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-gray-800">WhatsApp Support</h4>
                  <p class="text-xs text-gray-500">+20 123 456 7890</p>
                  <!-- <p class="text-[10px] text-gray-400">Mon - Fri, 9:00 AM to 6:00 PM</p> -->
                </div>
              </div>
              <div class="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 flex-shrink-0">
                  <Icon name="uil:envelope" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-gray-800">Email Support</h4>
                  <p class="text-xs text-gray-500">support@laurettestore.com</p>
                  <p class="text-xs text-gray-500">info@laurettestore.com</p>
                  <!-- <p class="text-[10px] text-gray-400">Mon - Fri, 9:00 AM to 6:00 PM</p> -->
                </div>
              </div>
  
              <div class="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 flex-shrink-0">
                  <Icon name="uil:envelope" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-gray-800">Email Enquiries</h4>
                  <p class="text-xs text-gray-500">support@laurettestore.com</p>
                  <p class="text-xs text-gray-500">info@laurettestore.com</p>
                </div>
              </div>
            </div>
  
            <!-- <div class="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white p-2">
              <div class="relative rounded-xl overflow-hidden bg-gray-100 aspect-video w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61186259023!2d31.18823675!3d30.05948385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2s!4v1715893241031!5m2!1sen!2s"
                  class="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-500" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div> -->
  
          </div>
  
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  // Reactive reference to bind form data
  const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Submit logic function
  const handleSubmit = () => {
    // Replace this placeholder alert with your real API endpoint call (e.g., Strapi, SendGrid, Node, Serverless routes)
    alert(`Thank you, ${form.value.name}! Your message was sent successfully.`);
    
    // Clear fields after success
    form.value.name = '';
    form.value.email = '';
    form.value.subject = '';
    form.value.message = '';
  };
  
  // Hooking page meta configuration for clean SEO titles
  useHead({
    title: 'Contact Us | Laurette Store',
    meta: [
      { name: 'description', content: 'Contact Laurette Store for beauty, makeup, and organic skincare support.' }
    ]
  });
  </script>