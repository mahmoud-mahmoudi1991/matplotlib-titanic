// JavaScript Document
(function($){
	"use strict";
	$.fn.xcloner = function(options){
		var top = $(this);
		var i =0;
		var settings = $.extend({
			// These are the defaults.
			margin: "5px 0",
			chooseText:"Choose",
			inputs:{},
			del_exist_inputs:false,
			name: 'contacts'
		}, options );

		$(this).find('button .selected-choice').text(settings.chooseText);
		
		if(settings.del_exist_inputs){
			$(top).find('.dropdown-menu').children().remove();
		}
		
		$.each(settings.inputs, function(key, value){
			$(top).find('.dropdown-menu').append('<li><a data-value="'+key+'" href="#">'+value+'</a></li>');
		});

		$('.xcloner .dropdown-menu li a').off().click(function(event){
			event.preventDefault();
			$(this).parents('.xcloner').find('.selected-choice').text($(this).text());
			$(this).parents('.xcloner').find('.main-input').prop('name',settings.name+'['+$(this).data('value')+'][]');
		});

		$('.remove-field',this).off().click(function(){
			$(this).parents('.xcloner').parent().remove();
		});
		
		var add = function(name, value){
			var container = $(top).parent();
			if(name !== undefined && value !== undefined){
				top.find(':input.main-input').val(value).prop("name",settings.name+'['+name+'][]');
				top.find('.selected-choice').text($('a[data-value='+name+']',top).text());
			}
			var new_field = container.clone(true);
			new_field.find(':input.main-input').val('').prop("name","");
			new_field.find('button .selected-choice').text(settings.chooseText);
			$(top).find('.remove-field').removeClass('hidden');
			$(top).find('.add-field').remove();
			$(top).removeAttr('id');
			$(container.parent()).append(new_field);
			
			top = $(".xcloner",new_field);
		};
		
		$('.add-field',this).off().click(function(){
			add();
		});

		return {
			val: function(refresh_val) { // set refresh_val to false to keep values
				var data = {};
				var data_array = top.parent().find(".xcloner :input.main-input").serializeArray();
				$.each(data_array, function(index, item){
					data[item.name.split("_")[1]] = item.value;
				});
				if(refresh_val === undefined){
					this.reset();	
				}
				return JSON.stringify(data);
			},
			reset: function() {
				$('.main-input', top).val("").prop("name","");
				top.parent().not(":last").remove();
				top = $(top).last();
			},
			add: function(object){
				$.each(object, function(name, value){
					add(name,value);
				});
			},
			css: this.css({
				margin: settings.margin,
			}),
			this:this,
		};

	};
})(jQuery);
