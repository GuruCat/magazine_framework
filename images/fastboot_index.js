if(rssLogFlag){
	/* Simply make up your index design! --------------------------
	12 is 1 row. 6 + 6 = 12, so this is the 1 row, too. 
	Examples: 6 + 3 + 3 / 4 + 4 + 4 / 3 + 3 + 3 + 3 / 3 + 6 + 3... */
	var index_design = [12, 6, 6, 12, 6, 6, 12, 12, 12, 12, 6, 6]; 
	$.ajax({
		url:"/rss",
		dataType:"xml",
		success:function(rss){
			var tmpMediaContents = new Array;
			var tmpMediaImages='';
			$('#coverDiv .loading').remove();
			$(rss).find('item').each(function() {
				var link = $(this).children('link').text();
				var title = $(this).children('title').text();
				var des = $(this).children('description').text();
				var date = $(this).children('pubDate').text();
				var img = '';
				date = date.substr(0, date.length - 6)
				if(des.match("http://cfile(.*?)\"")!=null){
					var a = des.match("http://cfile(.*?)\"")[0];
					a = a.substring(0,a.length-1);
					img = a;
					a = a.replace('image', 'C80x80');
					a = a.replace('original', 'C80x80');
					tmpMediaImages+='<a href="'+link+'"><img src="' + a + '"/></a>';
				}
				des = des.replace(/(<([^>]+)>)/ig,"").substring(0,800);
				if(isMobile){
					des = des.substring(0,140);
					tmpMediaContents.push('<a href="' + link + '"><h5>'+title+'</h5><img src="'+img+'"/></a><br>'+'<p class="des"> '+des+'...<a href="' + link + '">자세히 보기</a></p>'+'<h6 class="pubDate">'+date+'</h6><div class="clearfix"></div>');
				}
				else {
					if (index_design[tmpMediaContents.length] == 6)
						des = des.substring(0,400);
					tmpMediaContents.push('<a href="' + link + '"><img src="'+img+'"/><h5>'+title+'</h5></a>'+'<p class="des"> '+des+'...<a href="' + link + '">자세히 보기</a></p>'+'<h6 class="pubDate">'+date+'</h6><div class="clearfix"></div>');
				}
			})
			
			var row_tmp = 0;
			var des_tmp = '';
			for (i = 0; i < index_design.length; i++) {
				var content_tmp = $(tmpMediaContents[i]);
				var wrap_tmp = $('<div class="col-md-'+ index_design[i] +'"><div class="contentPadding"></div></div>');
				//if(index_design[i] == 6)
				//	content_tmp = content_tmp.substring(0, 400);
				wrap_tmp.children('.contentPadding').html(content_tmp);
				$('#coverDiv').append(wrap_tmp);
				row_tmp += index_design[i];
				if (row_tmp >= 12) {
					$('#coverDiv').append('<div class="row"></div>');
					row_tmp = 0;
				}
			}
		},
		error:function() {

		}
	});
	rssLogFlag = 0;
}