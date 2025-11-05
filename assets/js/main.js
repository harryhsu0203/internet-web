document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const yearEl = document.getElementById('year');
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 捲動陰影效果
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY || 0;
    if (header) {
      if (y > 8 && lastY <= 8) header.style.boxShadow = '0 8px 24px rgba(0,0,0,.28)';
      if (y <= 8 && lastY > 8) header.style.boxShadow = 'none';
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 行動裝置選單
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});


