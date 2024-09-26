$(document).ready(function() {
  let scrollPosition = 0;

  /* ================== GNB */
  $(window).on('scroll', function ($e) {
    /* 최상단이 아닐때 */
    if ( $('#header').innerHeight() <= $(window).scrollTop() ){
      $("#header").addClass("fixed");
      // dep1_reset();
      // dep1MB_reset(); 
    }else{
      $("#heade").removeClass("fixed");
    } 
  
    /* scroll UP & DOWN  */
    var st = $(this).scrollTop();
    if (st < 30){
      $("#header").removeClass("fixed");
    } else {
      $("#header").addClass("fixed");
    }
    scrollPosition = st;
  });
  

  /************모바일 GNB 열기/닫기******************/
   $(".js-gnb_open").on("click", function () {
    $("body").addClass("popup-on");
    $('body').css({'overflow' : 'hidden'});
    $("#header .gnb-wrap").css("display", "block"); /* 0320 - 모바일헤더 수정 */
    // $('.gnb-box .gnb > ul li.depth1 > a.tit').removeClass('on');

    if ($(".gnb").find(".tit.on").length) {
      var $titOn = $(".gnb").find(".tit.on");
      $titOn.parent(".depth1").find(".top2m").css({ display: "block" });
      console.log($titOn);
    } else {
    }

    return false;
  });

  $(".js-gnb_close").on("click", function () {
    $("body").removeClass("popup-on");
    $('body').css({'overflow' : 'initial'});
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
  $('.js-modal_open').on('click', function() {
    const modalId = $(this).data('modal');
    const $modal = $('#' + modalId);

    $modal.fadeIn(200);
    openModal(); // 스크롤 방지
  });

  // 모달 닫기
  $(document).on('click', '.js-modal_close', function() {
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