<template>
    <main class="min-h-screen bg-background font-sans pt-28 pb-16 lg:pt-36" dir="ltr">
      <div class="container mx-auto px-4 max-w-6xl">
        
        <div class="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span class="text-xs font-bold tracking-widest uppercase text-primary">Get In Touch</span>
          <h1 class="text-4xl lg:text-5xl font-serif text-text">We'd Love To Hear From You</h1>
          <p class="text-muted text-sm md:text-base leading-relaxed">
            Have a question about our clean beauty products, authentic Korean skincare, or need help with an order? Drop us a line below.
          </p>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div class="lg:col-span-7 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-outline/50">
            <h2 class="text-2xl font-serif text-text mb-6">Send Us A Message</h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-muted">Full Name</label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    placeholder="Your name" 
                    class="w-full bg-background border border-outline focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 outline-none text-sm transition-all text-text"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-muted">Email Address</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    placeholder="name@example.com" 
                    class="w-full bg-background border border-outline focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 outline-none text-sm transition-all text-text"
                    required
                  />
                </div>
              </div>
  
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-muted">Subject</label>
                <input 
                  v-model="form.subject"
                  type="text" 
                  placeholder="How can we help?" 
                  class="w-full bg-background border border-outline focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 outline-none text-sm transition-all text-text"
                  required
                />
              </div>
  
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-muted">Your Message</label>
                <textarea 
                  v-model="form.message"
                  rows="5" 
                  placeholder="Write your message here..." 
                  class="w-full bg-background border border-outline focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 outline-none text-sm transition-all resize-none text-text"
                  required
                ></textarea>
              </div>
  
              <button 
                type="submit" 
                class="w-full sm:w-auto bg-dark hover:bg-primary text-white font-bold text-sm uppercase tracking-widest py-4 px-10 rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
  
          <div class="lg:col-span-5 space-y-8">
            
            <div class="space-y-6">
              <h2 class="text-2xl font-serif text-text mb-2">Store Information</h2>
              
              <!-- <div class="flex gap-4 p-4 rounded-xl bg-white border border-outline/50 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon name="uil:map-marker" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-text">Our HQ Address</h4>
                  <p class="text-xs text-muted leading-relaxed">
                    123 Luxury Beauty Street, Fifth Settlement, Cairo, Egypt
                  </p>
                </div>
              </div> -->
  
              <div class="flex gap-4 p-4 rounded-xl bg-white border border-outline/50 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon name="uil:phone" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-text">WhatsApp Support</h4>
                  <p class="text-xs text-muted">+20 123 456 7890</p>
                  <!-- <p class="text-[10px] text-gray-400">Mon - Fri, 9:00 AM to 6:00 PM</p> -->
                </div>
              </div>
              <div class="flex gap-4 p-4 rounded-xl bg-white border border-outline/50 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon name="uil:envelope" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-text">Email Support</h4>
                  <p class="text-xs text-muted">support@laurettestore.com</p>
                  <p class="text-xs text-muted">info@laurettestore.com</p>
                  <!-- <p class="text-[10px] text-gray-400">Mon - Fri, 9:00 AM to 6:00 PM</p> -->
                </div>
              </div>
  
              <div class="flex gap-4 p-4 rounded-xl bg-white border border-outline/50 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon name="uil:envelope" class="w-5 h-5" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold text-text">Email Enquiries</h4>
                  <p class="text-xs text-muted">support@laurettestore.com</p>
                  <p class="text-xs text-muted">info@laurettestore.com</p>
                </div>
              </div>
            </div>
  
            <!-- <div class="rounded-2xl overflow-hidden shadow-sm border border-outline/50 bg-white p-2">
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