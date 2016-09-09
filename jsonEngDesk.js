if (typeof jQuery === 'undefined') {
  throw new Error('JSON EngDesk JavaScript requires jQuery')
}else{
$.prototype.AjS = function(b,e){
	
			$ele = typeof $(b).attr('return-output') == "undefined"?b:$(b).attr('return-output');
		
			if(typeof $(b).attr('json-output')!=="undefined")
			{	
				$return_c = function(nm,attr){return typeof $(b).attr(attr)=="undefined"?"":nm+"='"+$(b).attr(attr)+"'"}
				
				$tag = "<"+$(b).attr('tag')+" "+$return_c('class','tag-class')+">";
				$tag_end="</"+$(b).attr('tag')+">"
				$tag_parent = typeof $(b).attr('tag-parent')=="undefined"?"":"<"+$(b).attr('tag-parent')+" "+$return_c('class','tag-parent-class')+">";
				$tag_par_end=typeof $(b).attr('tag-parent')=="undefined"?"":"</"+$(b).attr('tag-parent')+">"
				
				e = JSON.parse(e);
				$line="";
				$formats = $(b).attr('json-output').split(',');
				$text = function(w){return $tag+w+$tag_end};
				$text_select = function(v,w){return "<"+$(b).attr('tag')+" value = \"+h['"+v+"']+\""+$return_c('class','tag-class')+">"+w+$tag_end};
				if($(b).attr('tag') != "option"){
				for($i=0;$i<$formats.length;$i++){
					$line += $text("\"+h['"+$formats[$i]+"']+\"");
				}
				}else{
				for($i=1;$i<$formats.length;$i++){
					$line += $text_select($formats[0],"\"+h['"+$formats[$i]+"']+\"");
				}
				}
				$line = '"'+$line+'"';
	
				$html = [];
				$.each(e,function(o,h){
				$html.push($tag_parent+eval($line)+$tag_par_end);	
				})
				if(typeof $(b).prop('tagName') == "script")
					$(b).remove();
			
		//	$(b).removeAttr('json-output tag tag-class tag-parent tag-parent-class')
			$($ele).html($html.join(''))
			}else{
		//	$(b).removeAttr('json-output tag tag-class tag-parent tag-parent-class')
			$($ele).html(e)
			}
}
$.prototype.AjE = function(b){
	var $url = typeof $(b).attr('json-click')=="undefined"? $(b).attr('json-url'):$(b).attr('json-click');
	if($url.includes('{') || $url.includes('[{')){		
			$().AjS(b,$url);
	}else{
	$.ajax({
		url  : typeof $(b).attr('json-click')=="undefined"? $(b).attr('json-url'):$(b).attr('json-click'),
		type : typeof $(b).attr('json-type')=="undefined"?'post':$(b).attr('json-type'),
		datatype : typeof $(b).attr('json-datatype')=="undefined"?'json':$(b).attr('json-datatype'),
		success:function(e){
			$().AjS(b,e);
		}
		})
		//$(b).removeAttr('json-url')
}
}
$.prototype.jsonE = function(b){
	$('*[json-url] , script[json-url]').each(function(i,b){
		$().AjE(b);
	})
	
}

$(function(){
		$().jsonE();
		$('*[json-click]').on('click',function(){
			$().AjE($(this));
		})
		
})
}