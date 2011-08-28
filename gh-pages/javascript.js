    $(function(){
        $('#container').toggle();
        $('.iso').toggle();
$('#container').isotope({
        // options
        containerClass: 'isotope',
        itemClasss : '.item',
        layoutMode : 'fitRows',
        getSortData : {
    name : function ( $elem ) {
      return $elem.attr('name');
    },
    type : function ( $elem ) {
      return $elem.attr('class');
    }
    },
    
        sortBy: 'name',
        animationOptions: {
     duration: 750,
     easing: 'linear',
     queue: false
   }
      });
  $.ajax({
    crossDomain:true,
    dataType: "JSONP",
    url: "http://vimeo.com/api/v2/launchhouse/videos.json",
    success: function(resp){
        console.log(resp);
      if(resp[0]){
        for(i=0;i<resp.length;i++){
          var newItem = $('<div data-id="' + resp[i].id + '" data-title="' + resp[i].title + '" class="item vimeo">' + resp[i].title + '<img src="' + resp[i].thumbnail_medium + '"/></div>');
          $('#container').isotope( 'insert', newItem );
        }    
      }
      $('#container').isotope('reLayout');
    }
  });
  $.ajax({
    crossDomain:true,
    dataType: "JSONP",
    url: "http://api.meetup.com/events.json",
    data: {'group_urlname':'LaunchHouse','key':'3355185ba2f32674b5e527e6b204521'},
    success: function(resp){
        console.log(resp);
        var results = resp.results;
      if(results){
        for(i=0;i<results.length;i++){
          var $newItem = $('<div class="item meetup" data-desc="' + results[i].description + '" data-title="' + results[i].name + '" name="' + results[i].time +'"><p>' + results[i].name + '</p></div>');
          $('#container').isotope( 'insert', $newItem );
        }    
      }
      $('#container').isotope('reLayout');
    }
  });
  $.ajax({
    crossDomain:true,
    dataType: "JSONP",
    url: "http://search.twitter.com/search.json",
    data: {'q':'@lnchhouse'},
    success: function(resp){
      console.log(resp);
      twttr.anywhere(function(T){
      var results = resp.results;
      if(results){
        for(i=0;i<results.length;i++){
          var $newItem = $('<div class="item twitter" name="' + results[i].created_at + '"><p>' + results[i].text + '</p></div>');
          $('#container').isotope( 'insert', $newItem );
        }    
      }
      $('#container').isotope('reLayout');
      T('#container').linkifyUsers();
      T('#container').hovercards({ expanded: true });
      });
    }
  });
  $('#all').click(function(){
    $('#container').isotope({ filter: '.item' });
  });
  $('#videos').click(function(){
    $('#container').isotope({ filter: '.vimeo' });
  });
  $('#news').click(function(){
    $('#container').isotope({ filter: '.news' });
  });
  $('#meetups').click(function(){
    $('#container').isotope({ filter: '.meetup' });
  });
  $('#twitter').click(function(){
    $('#container').isotope({ filter: '.twitter' });
  });
  $('#sort').click(function(){
    $('#container').isotope({ sortBy: type });
  });  
  $('#iso').click(function(){
    $('#container').hide();
  });
  $('#dash').click(function(){
    $('#isotope').toggle();
    $('.iso').toggle('slow');
    $('#container').toggle('fast',function(){
          $('#container').isotope('reLayout');
        });
  });
  $('.vimeo').live('click',function(){
      var vid = $(this).data('id');
      var title = $(this).data('title');
      var html = title;
      html+= '<iframe src="http://player.vimeo.com/video/';
      html+= vid;
      html+= '" width="400" height="225" frameborder="0"></iframe>';
      $(this).html(html);
      $(this).css({'width':'420px','height':'300px'});
      $('#container').isotope('reLayout');
  });
  $('.meetup').live('click',function(){
      var desc = $(this).data('desc');
      var title = $(this).data('title');
      var html = '<p>' + title + '</p>';
      html+= desc;
      $(this).html(html);
      $(this).css({'width':'350px'});
      $('#container').isotope('reLayout');
  });
});
