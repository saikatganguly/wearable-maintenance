(function() {
	$( ".msg_container_base" ).css("display","none");
	/*setInterval(function(){blink()}, 1000);
	$( ".msg_container_base" ).css("display","none");
	function blink() {
		$("#message_icon").css("color","#47ab47");
	    $("#message_icon").fadeTo(100, 0.1).fadeTo(200, 1.0);
	}*/
	   
	}());
$(document).on('click', '.panel-heading span.icon_minim', function (e) {
	var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
    	$this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        var element = document.getElementById("messages_div");
    	element.scrollTop = element.scrollHeight;
       /* clearInterval(interval);
		$("#message_icon").css("color","black");*/
    } else {
    	
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        clearInterval(interval);
		$("#message_icon").css("color","black");
		var element = document.getElementById("messages_div");
    	element.scrollTop = element.scrollHeight;
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chat_window_1" ).remove();
});

