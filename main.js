import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =====================
   HEADER SCROLL
   ===================== */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("header--scrolled", window.scrollY > 20);
});

/* =====================
   MOBILE MENU
   ===================== */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
  hamburger.classList.toggle("hamburger--active");
});
// Close menu on link click
nav.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav--open");
    hamburger.classList.remove("hamburger--active");
  });
});

/* =====================
   HERO ANIMATIONS
   ===================== */
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTl
  .from(".hero__badge", { opacity: 0, y: 20, duration: 0.6 })
  .from(".hero__title", { opacity: 0, y: 30, duration: 0.7 }, "-=0.35")
  .from(".hero__desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
  .from(".hero__buttons", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
  .from(".overlap-features", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");

// Robot Image Entrance
gsap.from(".hero__robot", {
  opacity: 0, scale: 0.9, y: 30, duration: 1,
  ease: "back.out(1.4)", delay: 0.3
});

/* =====================
   SCROLL ANIMATIONS
   ===================== */
// Section headers
gsap.utils.toArray(".section-header").forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0, y: 30, duration: 0.7, ease: "power3.out"
  });
});

// Versus cards
gsap.utils.toArray(".versus__card").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0, x: i === 0 ? -30 : 30, duration: 0.6,
    ease: "power3.out"
  });
});

// Human vs AI cards
gsap.utils.toArray(".hvi__card").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0, y: 30, duration: 0.6,
    delay: i * 0.1, ease: "power3.out"
  });
});

// Benefits cards
gsap.utils.toArray(".benefits__card").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0, y: 25, duration: 0.5,
    delay: i * 0.1, ease: "power3.out"
  });
});

// Niches cards
gsap.utils.toArray(".niches__card").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0, scale: 0.95, y: 20, duration: 0.6,
    delay: i * 0.1, ease: "power3.out"
  });
});

// Methodology steps
gsap.utils.toArray(".methodology__step").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0, y: 30, duration: 0.6,
    delay: i * 0.1, ease: "power3.out"
  });
});

// Testimonial cards
gsap.utils.toArray(".testimonials__card").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0, y: 30, duration: 0.6,
    delay: i * 0.1, ease: "power3.out"
  });
});

// CTA section
gsap.from(".cta__inner", {
  scrollTrigger: { trigger: ".testimonials-cta", start: "top 80%" },
  opacity: 0, y: 30, duration: 0.6, ease: "power3.out"
});

// Chat Widget Logic
const chatTrigger = document.getElementById("chatTrigger");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatTyping = document.getElementById("chatTyping");
const chatBadge = document.querySelector(".chat-widget__badge");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

let isFirstOpen = true;

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

chatTrigger.addEventListener("click", () => {
  chatWindow.classList.add("is-open");
  
  if (isFirstOpen) {
    isFirstOpen = false;
    if(chatBadge) chatBadge.style.display = "none";
    
    // Show typing
    chatTyping.style.display = "flex";
    
    // Wait 5 seconds
    setTimeout(() => {
      chatTyping.style.display = "none";
      
      const wrapper = document.createElement("div");
      wrapper.className = "chat-message-wrapper";
      
      const avatar = document.createElement("img");
      avatar.src = "./robot-avatar.jpg";
      avatar.alt = "Avatar do Robô";
      avatar.className = "chat-message-avatar";
      
      const msg = document.createElement("div");
      msg.className = "chat-message";
      msg.innerHTML = `Olá, como posso te chamar? <span class="chat-message__time">${getCurrentTime()}</span>`;
      
      wrapper.appendChild(avatar);
      wrapper.appendChild(msg);
      chatBody.appendChild(wrapper);
      
      // Auto scroll
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 5000);
  }
});

chatClose.addEventListener("click", () => {
  chatWindow.classList.remove("is-open");
});

if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    
    // Escape HTML from user input to prevent XSS
    const tempDiv = document.createElement("div");
    tempDiv.textContent = text;
    const escapedText = tempDiv.innerHTML;
    
    // Append user message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message chat-message--user";
    // Adding the double check mark for the user message
    userMsg.innerHTML = `${escapedText} <span class="chat-message__time">${getCurrentTime()} <i class="ph-bold ph-check-circle" style="color: #53bdeb; margin-left: 2px;"></i></span>`;
    chatBody.appendChild(userMsg);
    
    // Auto scroll
    chatBody.scrollTop = chatBody.scrollHeight;
    chatInput.value = "";
    
    // Redirect to WhatsApp with the message after a brief pause
    setTimeout(() => {
      const waNumber = "5500000000000"; // Substitua pelo número real
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    }, 800);
  });
}
