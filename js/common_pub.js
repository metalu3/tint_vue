/* 바디스크롤 방지 start */
var oldScrollNum = $(document).scrollTop();

function bodyNoScroll() {
    if ($('.scroll_area').eq(0).hasClass('noScroll')) {
    } else {
        var addTop = $('.scroll_area').eq(0).offset().top;

        oldScrollNum = $('.scroll_area').scrollTop();
        $('.scroll_area').eq(0).addClass('noScroll');
        $('.scroll_area')
            .eq(0)
            .css('top', -(oldScrollNum - addTop));
    }
}

function bodyYesScroll() {
    $('.scroll_area').eq(0).removeClass('noScroll');
    $('.scroll_area').eq(0).removeAttr('style');
    $('.scroll_area').eq(0).scrollTop(oldScrollNum);
}
/* 바디스크롤 방지  end */

/* 제이쿼리달력 start*/
function makeCal() {
    var pickerOpts = {
        dateFormat: 'yy.mm.dd',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    };

    $('.j_date').datepicker(pickerOpts);
}
/* 제이쿼리달력 end*/

/* 달력검색 버튼 start */
$(document).on('click', '.btn_month li button', function () {
    var thisNum = $(this).parent().index();

    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var date = String(now.getDate()).padStart(2, '0');

    var d = new Date();

    if (thisNum == 0) {
        var sel_month = -1;
    } else if (thisNum == 1) {
        var sel_month = -3;
    } else if (thisNum == 2) {
        var sel_month = -6;
    }

    d.setMonth(d.getMonth() + sel_month);

    var year2 = d.getFullYear();
    var month2 = ('0' + (d.getMonth() + 1)).slice(-2);
    var date2 = ('0' + d.getDate()).slice(-2);

    $(this)
        .parents('.btn_month')
        .next()
        .find('.j_date')
        .eq(0)
        .attr('value', year2 + '.' + month2 + '.' + date2);
    $(this)
        .parents('.btn_month')
        .next()
        .find('.j_date')
        .eq(1)
        .attr('value', year + '.' + month + '.' + date);
});
/* 달력검색 버튼 end */

/* 팝업연결 start */
var targetShow;

$(document).on('click', '.pop_close, .pop_cancel, .pop_confirm', function () {
    var thisPop = $(this).parents('.popup');
    thisPop.stop().fadeOut('500');

    if (thisPop.hasClass('alert_pop')) {
        $('.lay_pop_blind2').stop().fadeOut('500');
    } else {
        $('.lay_pop_blind').stop().fadeOut('500');
    }

    bodyYesScroll();
    return false;
});

$(document).on('click', '.click_show_evt', function () {
    var target = $(this).attr('data-link-show');
    targetShow = $('#' + target + '');

    if (targetShow.hasClass('alert_pop')) {
        $('.lay_pop_blind2').stop().fadeIn('500');
    } else if (targetShow.hasClass('full_pop')) {
    } else {
        $('.lay_pop_blind').stop().fadeIn('500');
    }

    targetShow.stop().fadeIn('500');

    bodyNoScroll();
    return false;
});

$(document).on('change', '.check_show_evt', function () {
    var thisCheck = $(this).children(':checkbox');

    if (thisCheck.is(':checked')) {
        var target = $(this).attr('data-link-show');
        targetShow = $('#' + target + '');
        targetShow.stop().fadeIn('500');
        if (targetShow.hasClass('alert_pop')) {
            $('.lay_pop_blind2').stop().fadeIn('500');
        } else {
            $('.lay_pop_blind').stop().fadeIn('500');
        }
        bodyNoScroll();
    }
});

$(document).on('click', '.lay_pop_blind', function () {
    $('.lay_pop_blind').stop().fadeOut('500');

    if ($('.bottom_pop').is(':visible')) {
        $('.bottom_pop').animate({ bottom: '-100%' }, 500);
    } else {
        targetShow.stop().fadeOut('500');
    }
    bodyYesScroll();
    return false;
});

$(document).on('click', '.lay_pop_blind2', function () {
    $('.lay_pop_blind2').stop().fadeOut('500');

    $('.alert_pop').stop().fadeOut('500');
    bodyYesScroll();
    return false;
});
/* 팝업연결 end */

/* 하단팝업 start */
$(document).on('click', '.click_show_evt2', function () {
    var target = $(this).attr('data-link-show');
    targetShow = $('#' + target + '');
    targetShow.css('display', 'block');
    targetShow.stop().animate({ bottom: 0 }, 500);
    $('.lay_pop_blind').stop().fadeIn('500');
    bodyNoScroll();
    return false;
});

$(document).on('click', '.bottom_pop .close, .bottom_pop .confirm', function () {
    var thisPop = $(this).parents('.bottom_pop');
    thisPop.stop().animate({ bottom: '-100%' }, 500);
    $('.lay_pop_blind').stop().fadeOut('500');
    bodyYesScroll();
    return false;
});
/* 하단팝업 end */

/* 토글클래스 start */
$(document).on(
    //단일객채 토글 클래스
    'click',
    '.click_add_on',
    function () {
        var thisNum = $('.click_add_on').index(this);
        var thisAddOn = $('.click_add_on').eq(thisNum);

        thisAddOn.toggleClass('on');
        return false;
    }
);

$(document).on(
    //단일객채 토글 클래스
    'change',
    '.toggle_check :checkbox',
    function () {
        var thisAddOn = $(this).parents('.toggle_check');

        if ($(this).is(':checked')) {
            thisAddOn.addClass('on');
        } else {
            thisAddOn.removeClass('on');
        }
    }
);

$(document).on(
    //여러객채중 하나만 클래스 주기
    'click',
    '.click_select_on > li',
    function () {
        $(this).addClass('on');
        $(this).siblings().removeClass('on');
        return false;
    }
);
/* 토글클래스 end*/

/* 장바구니 썸네일 동작 start */
$(document).on('click', '.pro_list .cart, .bottom_list .cart', function () {
    $(this).fadeOut();
    $(this).parent('.cart_num').stop().animate({ width: 87 }, 500);
    return false;
});

$(document).on('click', '.cart_num .plus', function () {
    var theTxt = Number($(this).prev('input').val()) + 1;
    $(this).prev('input').val(theTxt);
});

$(document).on('click', '.cart_num .minus', function () {
    var theTxt = $(this).next('input').val();

    if (theTxt == 1) {
        $(this).parent().stop().animate({ width: 38 }, 500);
        $(this).closest('div').find('.cart').fadeIn();
    } else {
        var theTxt = Number($(this).next('input').val()) - 1;
        $(this).next('input').val(theTxt);
    }
});
/* 장바구니 썸네일 동작 end */

/* 전체체크 start */
$(document).on('click', '.check_all_btn :checkbox', function () {
    if ($(this).is(':checked')) {
        $(this).closest('.check_all_area').find(':checkbox').prop('checked', true);
    } else {
        $(this).closest('.check_all_area').find(':checkbox').prop('checked', false);
    }
});
/* 전체체크 end */

/* 동작되는 탭 start */
$(document).on('click', '.real_tap .tap_btn li', function () {
    var thisNum = $(this).index();
    $('.real_tap .tap_btn li').removeClass('on');
    $(this).addClass('on');
    $('.real_tap .tap_cont').removeClass('on');
    $('.real_tap .tap_cont').eq(thisNum).addClass('on');
});
/* 동작되는 탭 end */

/* 셀렉트 선택시 특정영역 보이기 start */
$(document).on(
    //접기 버튼 클릭시
    'change',
    '.show_sel',
    function () {
        var thsSelect = $(this).children('option:selected');
        var thisAttr = thsSelect.attr('s_target');
        var thisLink = $('.' + thisAttr + '');
        $('.show_sel_opt').hide();
        thisLink.show();
    }
);
/* 셀렉트 선택시 특정영역 보이기 end */

/* 라디오 선택시 특정영역 보이기 start */
$(document).on(
    //접기 버튼 클릭시
    'change',
    '.show_radio',
    function () {
        var thisAttr = $(this).attr('s_target');
        var thisLink = $('.' + thisAttr + '');
        $('.show_sel_opt').hide();
        thisLink.show();
    }
);

$(document).on(
    //접기 버튼 클릭시
    'change',
    '.show_radio2',
    function () {
        var thisAttr = $(this).attr('s_target');
        var thisLink = $('.' + thisAttr + '');
        $('.show_sel_opt2').hide();
        thisLink.show();
    }
);
/* 라디오 선택시 특정영역 보이기 end */

/* 하단메뉴 숨기기 start */
function menuHide() {
    var scrollNumMenu = $('.scroll_area').scrollTop();
    var scrollEndNum = 0;
    var scrollGoing = 0;

    function footerShow() {
        scrollGoing = 0;
        $('.footer_menu').stop().animate({ bottom: 0 }, 500);
    }

    $('.index').scroll(function () {
        if (scrollGoing == 0) {
            scrollGoing = 1;
            scrollEndNum = $('.scroll_area').scrollTop();
        }

        scrollNumMenu = $('.scroll_area').scrollTop();

        if (Math.abs(scrollNumMenu - scrollEndNum) >= 100) {
            $('.footer_menu').stop().animate({ bottom: '-150%' }, 500);
            clearInterval(footerShow);
            setTimeout(footerShow, 500);
        }
    });
}
/* 하단메뉴 숨기기 end */

/* 전체메뉴 start */
$(document).on('click', '.footer_menu .menu1', function () {
    $('.all_menu').stop().animate({ left: 0, opacity: 1 }, 500);
    bodyNoScroll();
});

$(document).on('click', '.all_menu header > .close', function () {
    $('.all_menu')
        .stop()
        .animate({ left: -120 + '%', opacity: 0 }, 500);
    bodyYesScroll();
});
/* 전체메뉴 end */

/* 탑메뉴 이동 start */
$(document).on('click', '.footer_menu .top_btn', function () {
    $('.scroll_area').animate({ scrollTop: 0 }, 500);
    return false;
});

$(document).on('click', '.scroll_area .btn_top', function () {
    $('.scroll_area').animate({ scrollTop: 0 }, 500);
    return false;
});
/* 탑메뉴 이동 end */

/* 상품상세 펼쳐보기 start */
$(document).on('click', '.pro_img_area .fold_btn', function () {
    if ($('.pro_img_area').hasClass('on')) {
        $('.pro_img_area').removeClass('on');
        $('.pro_img_area .fold_btn button').text('상품설명 펼쳐보기');
    } else {
        $('.pro_img_area').addClass('on');
        $('.pro_img_area .fold_btn button').text('상품설명 접어보기');
    }
});
/* 상품상세 펼쳐보기 end */

/* 상품상세 장바구니 옵션 start */
$(document).on('click', '.add_cart_btn', function () {
    if (!$('.cart_opt').hasClass('on')) {
        $('.cart_opt').addClass('on');
        $('.cart_opt').animate({ bottom: 44 }, 500);
    }
});

$(document).on('click', '.pro_btn .key_color', function () {
    $('.cart_opt').addClass('on');
    $('.cart_opt').animate({ bottom: 44 }, 500);
});

$(document).on('click', '.cart_opt .close_btn', function () {
    if ($('.cart_opt').hasClass('on')) {
        $('.cart_opt').removeClass('on');
        $('.cart_opt').animate({ bottom: -156 }, 500);
    } else {
        $('.cart_opt').addClass('on');
        $('.cart_opt').animate({ bottom: 44 }, 500);
    }
});
/* 상품상세 장바구니 옵션 end */

/* 현재시간 알림 start */
function thisTime() {
    //
    var date = new Date();
    var hours = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');
    $('.time_area .time').text(`${hours}:${min}:${sec}`);
}
/* 현재시간 알림 end */

/* 주문서 start */
$(document).on('click', '.order_step > dt', function () {
    if ($(this).hasClass('on')) {
        $(this).removeClass('on');
    } else {
        $(this).addClass('on');
    }
});
/* 주문서 end */
