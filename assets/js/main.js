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

  // 聯絡表單（Google Apps Script）
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const endpoint = contactForm.dataset.endpoint || '';
    const statusEl = contactForm.querySelector('[data-form-status]');

    if (!endpoint || endpoint.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL')) {
      if (statusEl) statusEl.textContent = '請先設定表單端點，或改用電話 / LINE 聯絡。';
    } else {
      contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
       if (statusEl) {
          statusEl.textContent = '送出中…';
          statusEl.classList.remove('error');
        }

        const formData = new FormData(contactForm);
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            window.location.href = 'thanks.html';
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (error) {
          console.error('表單送出失敗', error);
          if (statusEl) {
            statusEl.textContent = '送出失敗，請稍後再試或改用電話 / LINE 聯絡我們。';
            statusEl.classList.add('error');
          }
        }
      });
    }
  }
});


