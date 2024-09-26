$(function(){
  /* ================== 불러 오기 ================== */
  var json = $.getJSON("state_json-php.json", function(data){
    //console.log( Object.keys(data) )
    /*
    for(var name in data){console.log(name , data[name])}
    */
    
    $("._GUIDE__list__body > li").each(function($i){
      var $key  = $( "._GUIDE__list__col--url", this).attr("data-search");
      var $val; 
      
      if( data.hasOwnProperty($key) ) {
        // 키값이 있으면
        $val = $( "._GUIDE__list__col--state--check select", this).val(data[$key]);
      }else{
        // 키값이 없으면
        $val = $( "._GUIDE__list__col--state--check select", this).val(0);
      }
      
    });
    
  });

  
  
  
  /* ================== 데이터 저장 ================== */
  $( "._GUIDE__list__col--state--check select").on("change", function(){
    // 데이터 추출
    var _obj = new Object();
    $("._GUIDE__list__body > li").each(function($i){
      var $id  = $( "._GUIDE__list__col--url", this).attr("data-search");
      var $val = $( "._GUIDE__list__col--state--check select", this).val();
      _obj[$id]  = $val;
    })
    var jsonData = JSON.stringify(_obj);  
    
    
    $.ajax({
      url:'./state_json.php',
      //url:'./state_json.jsp',
      type:'post',
      //data:$('form').serialize(),
      data : {
        json : jsonData
      },
      success:function(data){
        console.log("success");
      }
    })

  })
  

});