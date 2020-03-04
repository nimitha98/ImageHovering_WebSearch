$(document).ready(function(){

	$.ajax({
      dataType: "json",
      url: 'js/data.json',
      type: "GET",
      success: success,
      error : error
  });
});

function success(data){

	$(data).each(function(i, item){

    var img = '<li><img class = "square-image" ';
    var path = "images/square/";
    path+=item.path;
    img+= 'src="' +path +'"'+' alt="'+item.title+'"/></li>';
    
    $(".gallery").append(img);

	});

    $("li").on("mouseenter", ".square-image", function(){
        $(this).addClass("gray");
        var src = ''+$(this).attr("src");
        
        var newsrc = src.replace("/square/","/medium/");
        var div = '<div id="preview"><img src="';
        div+=newsrc+'"/>';
        var path = src.slice(14,src.length);
        var title ='';
        var city ='';
        var date ='';
        var country ='';

        var x = event.pageX; 
        var y = event.pageY;
        
       
        jQuery(data).each(function(i, item){
          if(path == item.path)
          {
             title = item.title;
             city = item.city;
             date = item.taken;
             country = item.country;
            return false;
          }
        });
        var p ='<p>'+title+'<br>'+city+', '+country+' ['+ date +']</p></div>';
        div+=p;

        $("body").append(div);

        $("#preview").css("left",x+20);
        $("#preview").css("top",y-20);
        $("#preview").fadeIn("3000");
      }); 

    $("li").on("mouseleave", ".square-image", function(){
        $(this).removeClass("gray");
        $("#preview").remove();
      });  

    $("li").on("mousemove", ".square-image", function(){
       var x= event.pageX;
       var y = event.pageY;
       $("#preview").css("left",x+20);
       $("#preview").css("top",y-20);
       $('#preview').fadeIn("3000");
      });  

}

function error(data)
{
	alert("Error Occurred while loading the data");
}
