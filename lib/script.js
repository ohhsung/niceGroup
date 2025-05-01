$(function () {
    AOS.init();

    // ########################### 마우스커서 ##############################

    $(function () {
        $('.veiw-more-btn').on('mousemove', function (e) {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;

            $(this).find('.cursor').css({
                top: y,
                left: x,
            });
        });

        $('.veiw-more-btn')
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
    $header.on('mouseenter', function () {
        isHeaderHovered = true;
        $header.css('top', '0'); // top값 고정
    });

    // header에서 마우스가 나갔을 때 원래대로 스크롤 방향에 맞게 top값 변경
    $header.on('mouseleave', function () {
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

    // ############################ 카운트 올라가는 숫자 ################################

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function animateValues(moneyEl, percentEl, endValue, duration) {
        let current = 0;
        const frameCount = endValue;
        const interval = duration / frameCount;

        const timer = setInterval(() => {
            current++;

            moneyEl.querySelector('.number').textContent =
                current.toLocaleString();
            percentEl.querySelector('.number').textContent = Math.floor(
                (current / endValue) * 100
            );

            if (current >= endValue) {
                clearInterval(timer);
            }
        }, interval);
    }

    const animatedSet = new WeakSet(); // 요소별 중복 방지

    // ############################ 위로 올라오는 텍스트 ################################

    function onScroll() {
        const translateYElements = document.querySelectorAll('.translateY');

        translateYElements.forEach((translateY) => {
            // 이미 애니메이션 실행된 요소는 패스
            if (animatedSet.has(translateY)) return;

            if (isInViewport(translateY)) {
                const moneyEl = translateY
                    .closest('.section')
                    .querySelector('.money');
                const percentEl = translateY
                    .closest('.section')
                    .querySelector('.percent');

                if (!moneyEl || !percentEl) return;

                translateY.classList.add('show');
                moneyEl.classList.add('show');
                percentEl.classList.add('show');

                moneyEl.querySelector('.number').textContent = '0';
                percentEl.querySelector('.number').textContent = '0';

                setTimeout(() => {
                    animateValues(moneyEl, percentEl, 392, 300);
                }, 2000);

                animatedSet.add(translateY); // 한 번 실행 후 다시 실행 안 되도록
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // 초기 실행

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
            duration: 0.7,
            ease: 'power2.out',
            stagger: -0.09,
        });
    }
}); // 스크립트 마지막
