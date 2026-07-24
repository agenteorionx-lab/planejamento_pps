document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Ano Corrente no Rodapé
    // ==========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. FAQ Acordeão (Alternador de Abas)
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha outros itens ativos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = '0';
                }
            });
            
            // Alterna o item atual
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ==========================================
    // 3. Rolagem Suave Premium
    // ==========================================
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const time = Math.min(progress / duration, 1);
            
            // Easing function (easeInOutCubic)
            const ease = time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Aplica a todos os links internos de âncora
    document.querySelectorAll('.scroll-to-offer').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#offer', 1600); // 1.6 segundos para a rolagem ser fluida e premium
        });
    });

    // ==========================================
    // 4. Contador Regressivo & Links de Checkout Automatizados
    // ==========================================
    // Links de Checkout (Altere o EXPIRED_CHECKOUT_URL para o link do novo lote/preço cheio quando necessário)
    const PRIMARY_CHECKOUT_URL = 'https://checkout.bravvius.com/17753885';
    const EXPIRED_CHECKOUT_URL = 'https://checkout.bravvius.com/26288547'; // 2º link acionado automaticamente após o encerramento do tempo

    // Alvo do cronômetro: 30/07 às 23:59:59 (Ano 2026)
    const countdownDate = new Date('2026-07-30T23:59:59').getTime();

    const updateCheckoutButtons = (url) => {
        if (!url) return;
        const checkoutBtns = document.querySelectorAll('.checkout-btn, #main-checkout-btn');
        checkoutBtns.forEach(btn => {
            if (btn.getAttribute('href') !== url) {
                btn.setAttribute('href', url);
            }
        });
    };

    const updateCountdown = () => {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            
            // Troca automática para o segundo link de checkout quando o tempo encerra
            if (EXPIRED_CHECKOUT_URL && EXPIRED_CHECKOUT_URL.trim() !== '') {
                updateCheckoutButtons(EXPIRED_CHECKOUT_URL);
            }
            return;
        }

        // Garante o link primário enquanto a oferta estiver ativa
        updateCheckoutButtons(PRIMARY_CHECKOUT_URL);

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // 5. Inicialização do Swiper (Palestrantes)
    // ==========================================
    const isMobile = window.innerWidth < 992;
    const swiperOptions = {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: !isMobile, // Loop infinito apenas no desktop
        rewind: isMobile, // No mobile, volta ao início ao chegar no fim
        grabCursor: true,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2
        },
        speed: 800, 
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            992: { 
                slidesPerView: 3, 
                spaceBetween: 30,
            },
            1200: { slidesPerView: 4, spaceBetween: 30 }
        }
    };

    if (typeof Swiper !== 'undefined' && document.querySelector('.specialistsSlider')) {
        try {
            new Swiper('.specialistsSlider', swiperOptions);
        } catch (e) {
            console.error("Erro Swiper:", e);
        }
    }
});
