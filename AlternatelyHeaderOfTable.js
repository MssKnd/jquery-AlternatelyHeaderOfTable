/*!
 * jQuery.AlternatelyHeaderOfTable.js
 *
 * Repository: https://github.com/MssKnd/jquery-AlternatelyHeaderOfTable
 * License:    MIT
 * Author:     Masashi Kondo
 */

;(function($) {
  $.fn.AlternatelyHeaderOfTable = function() {
    var tableHeaders = [];
    var ths = this; // Table Headers
    var table = $(ths[0]).parent();
    $(table).css('position','relative');
    table.prepend(
        $(ths[0])
          .clone()
          .removeClass()
          .addClass("dummy_AHOT")
          .hide()
      );
    var dummy = $(table).children(".dummy_AHOT");

    $.each(ths,function(){
      $(this).css({
        "width":"100%",
        "position":"static"
      });
      setTdWidth(this);
      tableHeaders.push({
        'header': $(this),
        'offset': this.offsetTop,
        'height': $(this).height()
      });
    });
    
    function setTdWidth(tbody){
      var tds = $(tbody).find('td');
      $.each(tds,function() {
        $(this).css('width', $(this).outerWidth()+'px')
      });
    }
    
    $(window).scroll(function () {
      var movingIndex = 0;
      var scrollTop = $(window).scrollTop();

      for(var i=0;i<tableHeaders.length;i++){
        if($(tableHeaders[i].header).hasClass("fixing_AHOT")){
          movingIndex = i;
          break;
        }
      }
      var tableOffsetTop = table.offset().top;
      var movingPos = tableOffsetTop
              + tableHeaders[movingIndex].offset
              - scrollTop;
      var nextPos = tableOffsetTop
              + ( (tableHeaders.length > movingIndex + 1)? tableHeaders[movingIndex+1].offset : 1000000 )
              - scrollTop;

      dummy.show();
      if( ( movingPos > 0 && movingIndex === 0 ) || ( 0 > tableOffsetTop + table.height() - scrollTop ) ){
        tableHeaders[movingIndex].header.css({
          "top":"",
          "position": "static"
        });
        dummy.hide();
      }else if( 0 > tableOffsetTop + table.height() - scrollTop - tableHeaders[movingIndex].height){
        tableHeaders[movingIndex].header.css({
          "top":"",
          "bottom": 0,
          "position": "absolute"
        });
      }else if( movingPos < 0 && nextPos - tableHeaders[movingIndex].height > 0 ){
        tableHeaders[movingIndex].header.css({
          "bottom": "",
          "top": scrollTop - tableOffsetTop,
          "position": "absolute"
        });
      }else if( movingPos > 0 && movingIndex !== 0 ){
        tableHeaders[movingIndex-1].header.css({
          "top":"",
          "position": "absolute"
        });
        tableHeaders[movingIndex].header.css({
          "top":"",
          "position": "static"
        });
        $(tableHeaders[movingIndex].header).removeClass("fixing_AHOT");
        $(tableHeaders[movingIndex-1].header).addClass("fixing_AHOT");
      }else if( nextPos - tableHeaders[movingIndex].height < 0 && nextPos > 0 ){
        tableHeaders[movingIndex].header.css({
          "top": tableHeaders[movingIndex+1].offset - tableHeaders[movingIndex+1].height,
          "position": "absolute"
        });
      }else if( nextPos < 0 ){
        tableHeaders[movingIndex+1].header.css({
          "top": tableHeaders[movingIndex+1].offset - tableHeaders[movingIndex+1].height,
          "position": "absolute"
        });
        tableHeaders[movingIndex].header.css({
          "top":"",
          "position": "static"
        });
        $(tableHeaders[movingIndex].header).removeClass("fixing_AHOT");
        $(tableHeaders[movingIndex+1].header).addClass("fixing_AHOT");
      }
    });
    return this;
  };
})(jQuery);
