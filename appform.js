/**
 * Copyright (C) Harish Rohilla - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Author codefixup.gmail.com
 */

(function ( $ ) {
 "use strict";
    $.fn.appPlugin = function(options) 
    {
        // Default options
        var settings = $.extend({
            whatsappPhone: '',
            submissionMessage: '',
        }, options );
   
   var redirectWindow;     
   var responsedata;
   var whatsappUrl;
   $(this).on('submit', (function(e) 
   {
      if(!$(this).valid())
      {
         return false;
      }
      e.preventDefault();
	   var whatsAppNumber = settings.whatsappPhone;
      var submissionMessageTxt = settings.submissionMessage;
      var out = {};
      var s_data = $(this).serializeArray();
      var formTitle = $(this).data('title')+"\n";
      var arr = [];
      arr.push(formTitle);
    
	for(var i = 0; i<s_data.length; i++)
	{
        var record = s_data[i];  
        out[record.name] = record.value;
        var allstring = $('#'+record.name).attr('placeholder') || $('#'+record.name).parent().find('.officeName').html() || record.name;
        
        var newstring = allstring+" : "+record.value+"\n";
        arr.push(newstring);
    }
   
    var currValue = arr.join('');
    whatsappUrl = "https://api.whatsapp.com/send?phone="+whatsAppNumber+"&text="+encodeURIComponent(currValue);
    responsedata = JSON.stringify(out);
	 redirectWindow = window.open(whatsappUrl, '_blank');
    $("#whatsappFormResponse").html(submissionMessageTxt); 
    $("#whatsappFormResponse").show();
    //this.reset();
	}));
        
      redirectWindow=whatsappUrl;   
 
}; 
}(jQuery));
