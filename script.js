document.addEventListener('DOMContentLoaded', () => {

  // 1. スクロールトリガー浮き上がりエフェクト
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); 
        
        // カウントアップトリガー
        const stats = entry.target.querySelectorAll('.stat-number');
        if (stats.length > 0) {
          stats.forEach(stat => startCountUp(stat));
        }
      }
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -30px 0px"
  });

  animatedElements.forEach(el => scrollObserver.observe(el));


  // 2. カウントアップアニメーション
  const startCountUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800; 
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOutCubic * target);
      
      el.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(animate);
  };


  // 3. アコーディオン（FAQ）の制御
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.parentElement;
      currentItem.classList.toggle('active');
    });
  });

});