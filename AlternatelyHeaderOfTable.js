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
		$(table).css({"position":"relative"});

		for(var i=0;i<ths.length;i++){
			var headerInfo = {};
			headerInfo.header = $(ths[i]);
			headerInfo.offset = ths[i].offsetTop;
			headerInfo.height = $(ths[i]).height();
			$(ths[i]).css({"position":"static"});
			tableHeaders.push(headerInfo);
		}
		table.prepend(
			$(ths[0])
				.clone()
				.addClass("dummy")
				.hide()
		);
		var dummy = $(table).children(".dummy");
		
		$(window).scroll(function () {
			var movingIndex = 0;
			var scrollTop = $(window).scrollTop();

			for(var i=0;i<tableHeaders.length;i++){
				if($(tableHeaders[i].header).hasClass("fixing")){
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
					"position": "static"
				});
				dummy.hide();
			}else if( 0 > tableOffsetTop + table.height() - scrollTop - tableHeaders[movingIndex].height){
				tableHeaders[movingIndex].header.css({
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
					"position": "absolute"
				});
				tableHeaders[movingIndex].header.css({
					"position": "static"
				});
				$(tableHeaders[movingIndex].header).removeClass("fixing");
				$(tableHeaders[movingIndex-1].header).addClass("fixing");
			}else if( nextPos - tableHeaders[movingIndex].height < 0 && nextPos > 0 ){
				tableHeaders[movingIndex].header.css({
					"top": tableHeaders[movingIndex+1].offset - tableHeaders[movingIndex+1].height,
					"position": "absolute"
				});
			}else if( nextPos < 0 ){
				tableHeaders[movingIndex+1].header.css({
					"position": "absolute"
				});
				tableHeaders[movingIndex].header.css({
					"position": "static"
				});
				$(tableHeaders[movingIndex].header).removeClass("fixing");
				$(tableHeaders[movingIndex+1].header).addClass("fixing");
			}
		});

		return this;
	};
})(jQuery);
