/**
* Template Name: MySchool
* Template URL: https://bootstrapmade.com/myschool-bootstrap-school-template/
* Updated: Jul 28 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();



window.addEventListener('DOMContentLoaded', function() {
  function toArabicNumbers(num) {
    const arabicNums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().split('').map(d => arabicNums[d] ?? d).join('');
  }

  function updateDateTimeArabic() {
    const now = new Date();
    const months = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
    
    const day = toArabicNumbers(now.getDate());
    const month = months[now.getMonth()];
    const year = toArabicNumbers(now.getFullYear());
    const hours = toArabicNumbers(now.getHours().toString().padStart(2,'0'));
    const minutes = toArabicNumbers(now.getMinutes().toString().padStart(2,'0'));
    const seconds = toArabicNumbers(now.getSeconds().toString().padStart(2,'0'));

    document.getElementById("current-datetime").innerHTML = `
      <div>${day} ${month} ${year}</div>
      <div>${hours}:${minutes}:${seconds}</div>
    `;
  }

  // تحديث أول مرة فورًا
  updateDateTimeArabic();
  // ثم كل ثانية
  setInterval(updateDateTimeArabic, 1000);
});








// دالة تحويل الأرقام إلى عربية
function animateCounter(element, start, end, duration) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        const arabicValue = value.toString().split('').map(digit => arabicDigits[digit]).join('');
        element.textContent = arabicValue;
        element.setAttribute('data-current-value', arabicValue);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            const finalArabicValue = end.toString().split('').map(digit => arabicDigits[digit]).join('');
            element.textContent = finalArabicValue;
            element.setAttribute('data-completed', 'true');
        }
    };
    
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                
                if (counter.getAttribute('data-completed') === 'true') {
                    const end = parseInt(counter.getAttribute('data-purecounter-end') || 0);
                    const finalArabicValue = end.toString().split('').map(digit => arabicDigits[digit]).join('');
                    counter.textContent = finalArabicValue;
                    return;
                }
                
                if (!counter.getAttribute('data-started')) {
                    counter.setAttribute('data-started', 'true');
                    const start = parseInt(counter.getAttribute('data-purecounter-start') || 0);
                    const end = parseInt(counter.getAttribute('data-purecounter-end') || 0);
                    const duration = parseInt(counter.getAttribute('data-purecounter-duration') || 2) * 1000;
                    
                    animateCounter(counter, start, end, duration);
                }
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.purecounter').forEach(counter => observer.observe(counter));
});

// إصلاح سريع عند التمرير
setInterval(() => {
    document.querySelectorAll('.purecounter[data-completed="true"]').forEach(counter => {
        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const end = parseInt(counter.getAttribute('data-purecounter-end') || 0);
        const finalArabicValue = end.toString().split('').map(digit => arabicDigits[digit]).join('');
        if (counter.textContent !== finalArabicValue) {
            counter.textContent = finalArabicValue;
        }
    });
}, 500);
