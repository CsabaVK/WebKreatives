// Progressive enhancement — scroll reveal animations
// All content is visible by default without JS
document.documentElement.classList.add('js-loaded');

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.anim').forEach(function(el) {
  observer.observe(el);
});
