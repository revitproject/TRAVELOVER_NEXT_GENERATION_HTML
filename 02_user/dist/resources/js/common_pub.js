$(document).ready(function () {
  let scrollPosition = 0;

  /* ================== GNB */
  $(window).on('scroll', function ($e) {
    /* 최상단이 아닐때 */
    if ($('#header').innerHeight() <= $(window).scrollTop()) {
      $("#header").addClass("fixed");
      // dep1_reset();
      // dep1MB_reset(); 
    } else {
      $("#heade").removeClass("fixed");
    }

    /* scroll UP & DOWN  */
    var st = $(this).scrollTop();
    if (st < 30) {
      $("#header").removeClass("fixed");
    } else {
      $("#header").addClass("fixed");
    }
    scrollPosition = st;
  });

  /************모바일 GNB 열기/닫기******************/
  $(".js-gnb_open").on("click", function () {
    $("body").addClass("popup-on");
    $('body').css({
      'overflow': 'hidden'
    });
    $("#header .gnb-wrap").css("display", "block"); /* 0320 - 모바일헤더 수정 */
    // $('.gnb-box .gnb > ul li.depth1 > a.tit').removeClass('on');

    if ($(".gnb").find(".tit.on").length) {
      var $titOn = $(".gnb").find(".tit.on");
      $titOn.parent(".depth1").find(".top2m").css({
        display: "block"
      });
      console.log($titOn);
    } else {}
    return false;
  });
  $(".js-gnb_close").on("click", function () {
    $("body").removeClass("popup-on");
    $('body').css({
      'overflow': 'initial'
    });
    /* $('.gnb a.tit').removeClass('on').next('.menuBox').hide();
    $('.top3m').removeClass('on').hide(); */

    $("#header .gnb-wrap").css("display", "none"); /* 0320 - 모바일헤더 수정 */
    return false;
  });

  /* ================== Layer popup */
  function openModal() {
    // 현재 스크롤 위치 저장
    scrollPosition = $(window).scrollTop();

    // 스크롤을 막고, 저장된 위치 유지
    $('body').css({
      'overflow': 'hidden',
      'position': 'fixed',
      'top': -scrollPosition + 'px',
      'width': '100%' // 가로 스크롤 방지
    });
  }
  function closeModal() {
    // 스크롤을 원상복구
    $('body').css({
      'overflow': '',
      'position': '',
      'top': '',
      'width': ''
    });

    // 스크롤 위치 복원
    $(window).scrollTop(scrollPosition);
  }

  // 모달 열기
  $('.js-modal_open').on('click', function () {
    const modalId = $(this).data('modal');
    const $modal = $('#' + modalId);
    $modal.fadeIn(200);
    openModal(); // 스크롤 방지
  });

  // 모달 닫기
  $(document).on('click', '.js-modal_close', function () {
    $(this).closest('.popup-wrap').fadeOut(200);
    closeModal(); // 스크롤 복원
  });

  // // 모달 외부 클릭 시 닫기
  // $(document).on('click', function(e) {
  //   if ($(e.target).is('.modal')) {
  //     $(e.target).fadeOut(200);
  //     closeModal(); // 스크롤 복원
  //   }
  // });

  // $(window).on("resize", function(){
  //   $('#contents').css({ 
  //     "padding-top": $('#header').innerHeight(), 
  //     "min-height" : 'calc(100vh - ' +  $('#footer').innerHeight() + 'px)' 
  //   });

  //   //22.1116
  //   $('.pc_mypage.mypage-wrap').removeClass('open');
  //   $('.mb_mypage.mypage-wrap').removeClass('open');
  //   $('body').removeClass('popup-on');
  //   $('body').css({'overflow' : 'initial'});

  // }).trigger("resize");
});
$(function () {
  /* ======================== Select Box */
  $(".select2Basic").select2({
    minimumResultsForSearch: Infinity
  });

  /* ======================== checkbox 전체 체크 */
  $("#checkbox_all").click(function () {
    if ($("#checkbox_all").is(":checked")) $("input[name=chk]").prop("checked", true);else $("input[name=chk]").prop("checked", false);
  });
  $("input[name=chk]").click(function () {
    var total = $("input[name=chk]").length;
    var checked = $("input[name=chk]:checked").length;
    if (total != checked) $("#checkbox_all").prop("checked", false);else $("#checkbox_all").prop("checked", true);
  });

  /* ======================== accordion */
  $(".js-accordion_menu .header-area").click(function () {
    $(this).toggleClass('active').next().slideToggle(300);
    $(".js-accordion_menu .header-area").not(this).removeClass('active').next().slideUp(300);
    return false;
  });

  /* ======================== tab content */
  $('.tab-wrap').each(function (i) {
    var oTab = $(this);
    var tabIndex = $(this).find('.active').attr('id').match(/\d+$/);
    $(this).find('.tab-panel').find('#content-' + tabIndex[0]).show();
    $(this).find('.tab-list li a').click(function () {
      /*선택색인*/
      var tabIndex = $(this).attr('id').match(/\d+$/);
      /*타이틀*/
      oTab.find('.tab-list li a').removeClass('active');
      $(this).addClass('active');
      /*패널*/
      oTab.find('.tab-panel .tab-cont').hide();
      oTab.find('.tab-panel').find('#content-' + tabIndex[0]).show();
      return false;
    });
  });

  /* ========================  jQuery datepicker */
  //input을 datepicker로 선언
  $("#datepicker").datepicker({
    dateFormat: 'yy-mm-dd' //달력 날짜 형태
    ,
    showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
    ,
    showMonthAfterYear: true // 월- 년 순서가아닌 년도 - 월 순서
    ,
    changeYear: true //option값 년 선택 가능
    ,
    changeMonth: true //option값  월 선택 가능                
    ,
    showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
    ,
    buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
    ,
    buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
    ,
    buttonText: "선택" //버튼 호버 텍스트              
    ,
    yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
    ,
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 텍스트
    ,
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip
    ,
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 텍스트
    ,
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 Tooltip
    ,
    minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
    ,
    maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
  });
  //초기값을 오늘 날짜로 설정해줘야 합니다.
  $('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)     

  /* ========================  jQuery tooltip */
  /* 일반 툴팁 */
  $(".js-tooltip").tooltip({
    position: {
      my: "center bottom-15",
      at: "center top",
      using: function (position, feedback) {
        $(this).css(position);
        $("<div>").addClass("arrow").addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
      }
    }
  }); //.tooltip( "open" );

  /* 길설명 툴팁 */
  $(".js-tooltip_sendstate").tooltip({
    position: {
      my: "center bottom-10",
      at: "center top",
      using: function (position, feedback) {
        $(this).css(position);
        var _dotL = feedback.target.left - position.left + 6;
        $("<div>").addClass("arrow").addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this).css({
          left: _dotL
        });
      }
    },
    tooltipClass: "tooltip_big",
    items: "img, [data-geo], [title]",
    content: function () {
      var element = $(this);
      var selcet = $(this).attr("data-geo");
      if (element.is("[data-geo]")) {
        $(".ui-tooltip").css({
          "max-width": "500px;"
        });
        return $(selcet).html();
      }
      if (element.is("[title]")) {
        return element.attr("title");
      }
      if (element.is("img")) {
        return element.attr("alt");
      }
    }
  }); //.tooltip( "open" );       
});