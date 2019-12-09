import '@fancyapps/fancybox';
import Swiper from 'swiper';
import vhCheck from 'vh-check';
import svg4everybody from 'svg4everybody';
import StickySidebar from 'sticky-sidebar';
import 'selectric';
// import jQuery from 'jquery';

import './components/remcalc'
import './components/location'
import './components/validation';
import './components/form';
import './components/jquery.sTabs';

import {BODY, HTMLBODY, ACTIVE} from "./_const";

/*eslint-disable*/

window.$ = $;

(function ($) {
  $(function () {

    $('.navModalLink').on('click', function(){
        $.fancybox.close();
    });

    $('[data-fancybox]').fancybox({
      touch: false
    })

    $('.resultTable__row').on('click', function(){
        $(this).toggleClass('is-active');
    });

    $('.js-select-default').selectric({
      disableOnMobile: false,
      nativeOnMobile: false,
    });

    $('.js-select').selectric({
      disableOnMobile: false,
      nativeOnMobile: false,
      optionsItemBuilder: function (currItem) {
        let item = currItem.element[0];
        let element = `
          <div class="optionItem">
            <div class="optionItem__title">${currItem.text}</div>
            <div class="optionItem__description">${item.dataset.price}</div>
          </div>
        `;

        return element;
      }
    });

    var sidebar = new StickySidebar('.pageControl', {
      topSpacing: $('.header').outerHeight() + 10,
      bottomSpacing: 20
    });

    $('.tabs').sTabs();

    svg4everybody();
    vhCheck('browser-address-bar');

    const buttonChangeContent = document.querySelector('.btn--changeContent');
    let pageSwipe = null;


    Array.prototype.forEach.call(document.querySelectorAll('.card--unitPreview .card__photo img'), (el) => {
      const item = el;
      item.style.height = `${item.offsetHeight / 16}rem`;
      item.style.width = `${item.offsetWidth / 16}rem`;
    });

    // $('[data-unit-category-target]').on('click', function (e) {
    //   e.preventDefault();
    //   const $parentBlock = $(this).closest('.units');
    //   const target = $(this).data('unit-category-target');
    //
    //   $parentBlock.find('[data-unit-category]').removeClass(ACTIVE);
    //   $parentBlock.find(`[data-unit-category='${target}']`).addClass(ACTIVE);
    //   $parentBlock.addClass(ACTIVE);
    // });

    // $('[data-unit-category]').on('click', function (e) {
    //   e.preventDefault();
    //   const $parentBlock = $(this).closest('.units');
    //   const target = $(this).data('unit-category');
    //
    //   $parentBlock.find('[data-unit-category]').removeClass(ACTIVE);
    //   $parentBlock.find(`[data-unit-category='${target}']`).addClass(ACTIVE);
    //   $parentBlock.addClass(ACTIVE);
    // });


    $('[data-src="#gallery"]').fancybox({
      autoFocus: false,
      touch: false,
      afterShow: function () {
        const $block = $(this.$content[0]);
        new Swiper($block.find('.swiper-container'), {
          slidesPerView: 1,
          pagination: {
            el: $block.find('.swiper-pagination'),
            clickable: true
          },
          navigation: {
            nextEl: $block.find('.swiper-button-next'),
            prevEl: $block.find('.swiper-button-prev')
          }
        });
      }
    });


    $('[data-src="#callback"]').fancybox({
      autoFocus: false,
      beforeLoad() {
        BODY.classList.add('callback-is-open')
      },
      afterClose() {
        BODY.classList.remove('callback-is-open')
      },
      btnTpl: {
        smallBtn:
          `<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="22.3999" width="31.6784" height="2.26274" transform="rotate(-45 0 22.3999)" fill="white"/>
                <rect x="22.3999" y="24" width="31.6784" height="2.26274" transform="rotate(-135 22.3999 24)" fill="white"/>
                </svg>
					</button>`
      }
    })

    $('[data-fancybox-text-modal]').fancybox({
      autoFocus: false,
      btnTpl: {
        smallBtn:
          `<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">
							<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g filter="url(#filter0_d)">
							<circle cx="35" cy="30" r="30" fill="#2A3C83"/>
							</g>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M29.343 22.9289L27.9288 24.3431L33.5857 30L27.9288 35.6569L29.343 37.0711L34.9999 31.4142L40.6567 37.0711L42.071 35.6569L36.4141 30L42.071 24.3431L40.6567 22.9289L34.9999 28.5858L29.343 22.9289Z" fill="white"/>
							<defs>
							<filter id="filter0_d" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"/>
							<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
							<feOffset dy="5"/>
							<feGaussianBlur stdDeviation="2.5"/>
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
							<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
							</filter>
							</defs>
							</svg>
					</button>`
      }
    });

    $('.btn--burger').fancybox({
      autoFocus: false,
      beforeLoad() {
        BODY.classList.add('menu-is-open')
      },
      afterClose() {
        BODY.classList.remove('menu-is-open')
      },
      btnTpl: {
        smallBtn:
          `<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect y="22.3999" width="31.6784" height="2.26274" transform="rotate(-45 0 22.3999)" fill="#060826"/>
						<rect x="22.3999" y="24" width="31.6784" height="2.26274" transform="rotate(-135 22.3999 24)" fill="#060826"/>
						</svg>
					</button>`
      }
    })

    $('.js-anchor-link').on('click', function (e) {
      e.preventDefault();
      const $self = $(this);
      const offset = $self.data('scroll-offset') ? $self.data('scroll-offset') : 0;

      if (BODY.classList.contains('menu-is-open')) {
        $.fancybox.close();
      }

      HTMLBODY.animate({
        scrollTop: $(`${$self.attr('href')}`).offset().top - offset
      }, 700);
    });

    const heroSlider = new Swiper('.heroSlider .swiper-container', {
      speed: 600,
      touchRatio: 0,
      pagination: {
        el: '.heroSlider .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.heroSlider .swiper-button-next',
        prevEl: '.heroSlider .swiper-button-prev'
      }
    })

    pageSwipe = new Swiper('.pageSwipeContent .swiper-container', {
      slidesPerView: 1,
      autoHeight: true,
      initialSlide: 0,
      resistanceRatio: 0,
      effect: 'fade',
      touchRatio: 0,
      // slideToClickedSlide: true,
      watchSlidesProgress: true,
      // watchSlidesVisibility: true,
      on: {
        init() {

        },
        slideChange() {

        },
        progress() {

        },
        touchStart() {
        },
        setTransition(speed) {
        }
      }
    });

    $('.btn--control').on('click', function (e) {
      e.preventDefault();
      pageSwipe.slideTo(this.dataset.slide)
      $('.btn--control').removeClass('is-active');
      $(this).addClass('is-active');
    });


    $('.btn--scrollDown').on('click', function (e) {
      e.preventDefault();

      HTMLBODY.animate({
        scrollTop: $('.pageSwipeContent').offset().top
      }, 700);
    });


  });
})(jQuery);
