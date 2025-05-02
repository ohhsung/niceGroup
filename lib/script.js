$(function () {
    AOS.init();

    // ########################### 마우스커서 ##############################

    $(function () {
        $('.view-more-btn').on('mousemove', function (e) {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;

            $(this).find('.cursor').css({
                top: y,
                left: x,
            });
        });

        $('.view-more-btn')
            .on('mouseenter', function () {
                $(this).find('.cursor').addClass('active');
            })
            .on('mouseleave', function () {
                $(this).find('.cursor').removeClass('active');
            });
    });

    // ########################### 움직이는 메뉴바 ##############################

    let $menuBar = $('.header .menu-bar');
    let $gnbItems = $('.gnb > li');

    // 마우스가 메뉴 항목 위에 있을 때
    $gnbItems.on('mouseenter', function () {
        let moveLeft = $(this).position().left;
        let moveWidth = $(this).width();

        // 위치/너비 애니메이션 + active 클래스 추가
        $menuBar
            .stop(true, true) // 중첩된 애니메이션 방지
            .addClass('active')
            .animate(
                {
                    left: moveLeft,
                    width: moveWidth,
                },
                200
            );
    });

    // ########################### 헤더 호버시 뎁스2 영역 유지 ##############################

    $('.nav').on('mouseleave', function () {
        $menuBar.removeClass('active');
    });

    $(document).ready(function () {
        $('.nav-bg').hover(
            function () {
                $('.depth-02').addClass('active');
                $('.nav-bg').addClass('active');
            },
            function () {
                $('.depth-02').removeClass('active');
                $('.nav-bg').removeClass('active');
            }
        );
    });

    // ########################### 스크롤시 헤더 숨김 ##############################

    let $header = $('.header');
    let lastScrollTop = 0;
    let isHeaderHovered = false; // header에 마우스가 올라갔는지 체크하는 변수

    $(window).on('scroll', function () {
        let scrollTop = $(this).scrollTop();

        if (!isHeaderHovered) {
            // 마우스가 header에 있을 때는 스크롤 이벤트 무시
            if (scrollTop > lastScrollTop) {
                // 스크롤 다운 시
                $header.css('top', '-193px');
            } else {
                // 스크롤 업 시
                $header.css('top', '0');
            }
        }

        lastScrollTop = scrollTop;
    });

    // header에 마우스가 들어갔을 때 top값 0으로 고정
    $header.on('mouseover', function (e) {
        // 진짜 header 자체에 마우스가 들어왔을 때만
        if (e.target === $header[0]) {
            isHeaderHovered = true;
            $header.css('top', '0');
        }
    });

    // header에서 마우스가 나갔을 때 원래대로 스크롤 방향에 맞게 top값 변경
    $header.on('mouseleave', function () {
        isHeaderHovered = false;
    });

    $('.header button').on('click', function () {
        isHeaderHovered = false;
    });

    // ########################### nav 백그라운드 생성 ##############################

    $('.gnb').on('mouseenter', function () {
        $('.nav-bg').addClass('active');
    });

    // .gnb에서 마우스가 나가면 .nav-bg에서 'active' 클래스 제거
    $('.gnb').on('mouseleave', function () {
        $('.nav-bg').removeClass('active');
    });

    // ########################### 다크 라이트모드 ##############################

    let body = document.getElementsByTagName('body')[0];
    let btn = document.querySelector('.mode-btn-wrap .btn');
    let btnWrap = document.querySelector('.mode-btn-wrap');

    btn.addEventListener('click', () => {
        if (getComputedStyle(body).backgroundColor == 'rgb(23, 28, 34)') {
            body.classList.add('active');
            btn.classList.add('active');
            btnWrap.classList.add('active');
            btn.innerHTML = 'Dark';
        } else {
            body.classList.remove('active');
            btn.classList.remove('active');
            btnWrap.classList.remove('active');
            btn.innerHTML = 'Light';
        }
    });

    // ########################### 메인비주얼 GSAP ##############################

    var tl_intro = gsap.timeline({
        delay: 0.6,
    });
    // tl_intro.addLabel('start');

    tl_intro.to('.main-visual .mask-item', {
        scaleX: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: -0.09, //왼쪽에서 오른쪽으로 0.9초 간격으로 줄어듬
        // onStart: function onStart() { }
    });
    // tl_intro.addLabel('mask');

    // ########################### 햄버거 메뉴 애니메이션 ##############################

    const menu = document.querySelector('.mobile-gnb .menu-wrap');
    const accordion = document.querySelector('.accordion');

    menu.addEventListener('click', function () {
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        } else {
            menu.classList.add('open');
        }

        accordion.classList.toggle('active');

        if (accordion.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // ########################### 모바일 아코디언 메뉴 ##############################

    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach((header) => {
        const icon = header.querySelector('.accordion-icon');

        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            //회전 아이콘
            icon.classList.toggle('rotate');

            // 내용이 열려있으면 닫고, 닫혀있으면 열기
            if (content.style.height === '0px' || content.style.height === '') {
                content.style.height = `${content.scrollHeight}px`; // 현재 높이를 자동으로 맞추기
            } else {
                content.style.height = '0'; // 닫기
            }
        });
    });

    // ############################ 섹션 1 카운트 올라가는 숫자 ################################

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function animateNumber(el, endValue, duration) {
        let start = null;
        const numberEl = el.querySelector('.number');
        const startValue = 0;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const rate = Math.min(progress / duration, 1);
            const value = Math.floor(rate * endValue);
            numberEl.textContent = value.toLocaleString();

            if (rate < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    function animateValuesOnce(moneyEl, percentEl, endValue, duration) {
        moneyEl.querySelector('.number').textContent = '0';
        percentEl.querySelector('.number').textContent = '0';

        animateNumber(moneyEl, endValue, duration);
        animateNumber(percentEl, 100, duration);
    }

    const animatedSet = new WeakSet(); // ✅ 숫자 요소 기준

    function onScroll() {
        const translateYElements = document.querySelectorAll('.translateY');

        translateYElements.forEach((translateY) => {
            if (isInViewport(translateY)) {
                // ✅ 글자 애니메이션은 항상 실행
                translateY.classList.add('show');

                // ✅ 숫자 애니메이션은 한번만 실행
                const section = translateY.closest('.section');
                const moneyEl = section.querySelector('.money');
                const percentEl = section.querySelector('.percent');

                if (moneyEl && percentEl && !animatedSet.has(moneyEl)) {
                    moneyEl.classList.add('show');
                    percentEl.classList.add('show');

                    setTimeout(() => {
                        animateValuesOnce(moneyEl, percentEl, 392, 2000);
                    }, 2000);

                    animatedSet.add(moneyEl);
                }
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    // ############################ 섹션 2 이벤트 ################################

    let alerted = false;

    window.addEventListener('scroll', function () {
        var section02 = document.querySelector('.section-02');
        var section02OffsetTop = section02.offsetTop;
        var scrollY = window.scrollY;

        if (!alerted && scrollY + window.innerHeight >= section02OffsetTop) {
            var tl_intro = gsap.timeline({
                delay: 0.6,
            });
            // tl_intro.addLabel('start');

            tl_intro.to('.section-02 .mask-item', {
                scaleX: 0,
                duration: 0.7,
                ease: 'power2.out',
                stagger: -0.09, //왼쪽에서 오른쪽으로 0.9초 간격으로 줄어듬
                // onStart: function onStart() { }
            });
        }
    });

    // ############################ 섹션 3 이벤트 ################################
    let animated = false;

    window.addEventListener('scroll', function () {
        const section03 = document.querySelector('.section-03');
        const section03OffsetTop = section03.offsetTop;
        const scrollY = window.scrollY;

        if (!animated && scrollY + window.innerHeight >= section03OffsetTop) {
            const fadeUps = section03.querySelectorAll('.fade-up');

            fadeUps.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 300); // 100ms씩 순차 적용
            });

            animated = true;
        }
    });

    // ############################ 섹션 4 스와이퍼 슬라이드 ################################

    var swiperSlide = new Swiper('.swiperSlide', {
        spaceBetween: 'auto',
        effect: 'fade',
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // ############################ 섹션 5 화살표 ################################

    $('.news-wrap').hover(
        function () {
            $(this).find('.arrow-news').addClass('active'); // 혹은 .show(), .fadeIn() 등
        },
        function () {
            $(this).find('.arrow-news').removeClass('active'); // 혹은 .hide(), .fadeOut() 등
        }
    );

    // ############################ 섹션 6 스와이퍼 슬라이드 ################################

    const bannerSwiper = new Swiper('.bannerSwiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        on: {
            init: function () {
                runGsap(this);
            },
            slideChangeTransitionStart: function () {
                runGsap(this);
            },
        },
    });

    // ############################ 섹션 6 슬라이드 마스크 ################################

    function runGsap(swiperInstance) {
        // .section-06 안의 모든 .mask-item 초기화
        document.querySelectorAll('.section-06 .mask-item').forEach((item) => {
            gsap.set(item, { scaleX: 1 });
        });

        // 현재 활성 슬라이드에서만 애니메이션 적용
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        const maskItems = activeSlide.querySelectorAll('.mask-item');

        gsap.to(maskItems, {
            scaleX: 0,
            duration: 1.4,
            ease: 'power2.out',
            stagger: -0.09,
        });
    }

    // ############################ 섹션 7 카운팅 숫자 ################################

    const target = 11260; // 목표 숫자
    const duration = 1500; // 총 애니메이션 시간 (ms)
    const delay = 1500; // 시작 전 딜레이 (ms)

    const counterElement = document.querySelector('.section-07 .counter');

    // section-07 요소를 선택
    const section07 = document.querySelector('.section-07');

    // 애니메이션 실행 여부를 판단할 변수
    let isAnimating = false;

    // 뷰포트에 닿을 때의 이벤트 처리
    window.addEventListener('scroll', function () {
        const rect = section07.getBoundingClientRect();

        // section-07이 뷰포트에 닿았고, 아직 애니메이션이 실행되지 않았을 때
        if (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0 &&
            !isAnimating
        ) {
            isAnimating = true; // 애니메이션이 실행 중임을 표시

            // 애니메이션 함수 실행
            setTimeout(() => {
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1); // 최대값 제한

                    const currentNumber = Math.floor(progress * target);
                    counterElement.textContent = currentNumber.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counterElement.textContent = target.toLocaleString(); // 정확하게 끝내기
                    }
                }

                requestAnimationFrame(update);
            }, delay);
        }
    });
    // ############################ 섹션 7 버튼 ################################

    const section7Button = document.querySelector('.section-07 .btn');

    section7Button.addEventListener('mouseenter', () => {
        section7Button.classList.add('active');
    });

    section7Button.addEventListener('mouseleave', () => {
        section7Button.classList.remove('active');
    });

    // ############################ 푸터 ################################

    document
        .querySelectorAll('.footer .toggle-container')
        .forEach((container) => {
            const btn = container.querySelector('.toggle-btn');
            const content = container.querySelector('.toggle-content');

            container.addEventListener('click', () => {
                btn.classList.toggle('open');
                content.classList.toggle('open');
            });
        });
}); // 스크립트 마지막
