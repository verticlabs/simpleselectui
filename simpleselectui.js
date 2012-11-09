/**
* Simple select UI
*
* jQuery plugin for prettifying HTML selects by creating pseudo selects in regular markup.
*
* @author Laust Deleuran
*/
(function (jQuery) {
	var defaults, log;

	// Settings defaults
	defaults = {
		hideStyles: {
			visibility: 'hidden',
			position: 'absolute',
			left: '-9999em',
			outline: 'none none'
		},
		inheritClasses: true,
		inlineStyles: true,
		keyboardSupport: true,
		klass: 'simpleselectui'
	};

	// Small log for errors and whatnot
	log = function(){
		log.history = log.history || [];   // store logs to an array for reference
		log.history.push(arguments);
		if(window.console){
			console.log( Array.prototype.slice.call(arguments) );
		}
	};

	jQuery.fn.simpleSelectUI = function (userSettings) {
		var settings, buildItems;

		// Instance settings
		settings = {};
		if (typeof userSettings === 'object') {
			$.extend(settings, defaults, userSettings);
		}
		settings.klass = settings.klass || defaults.klass;

		// Helpers
		buildItems = function ($options, $group, groupId) {
			$options.each(function (index) {
				var $item = $(this), $listItem, itemClasses;
				$listItem = $('<li class="' + settings.klass + '-option"></li>')
					.data('value', $item.attr('value'))
					.data('groupid', groupId)
					.data('id', index)
					.text($item.text());

				itemClasses = $item.attr('class');
				if (settings.inheritClasses && itemClasses) {
					$listItem.addClass(itemClasses);
				}

				$listItem.appendTo($group);
			});
		};

		// Loop
		return this.each(function (index,	element) {
			var $element, containerClasses, $container, $header, $headerText, $options, $lastElementChild, $group, groupIndex;

			$element = $(element);

			if (!$element.is('select')) {
				log('** SimpleDropdownUI ** Given element does not look like a <select>. Element with index ' + index + ' ignored.', index, element);
				return;
			}

			// Set up container markup
			$container = $('<div></div>');
			containerClasses = settings.inheritClasses ? $element.attr('class') + ' ' : '' ;
			containerClasses += settings.klass;
			$container.addClass(containerClasses);

			// Set up header markup
			$header = $('<div class="' + settings.klass + '-header"></div>');
			$headerText = $('<a class="' + settings.klass + '-headertext"></a>');

			// Set up options markup
			$options = $('<div class="' + settings.klass + '-options"></div>');
			$element.children('optgroup, option').each(function(index, element) {
				var $item = $(this);

				if ($item.is('optgroup')) {
					$item.children('option').each(function (index, element) {

					});
				} else if ($item.is('option')) {
					if (!$lastElementChild.is('option')) {
						$group = $('<ul class="' + settings.klass + '-optgroup"></ul>');
					}
				}
				$lastElementChild = $item;
			});
			if ($optgroupTags.length) {
				$optgroupTags.each(function (index) {
					var $optgroupTag = $(this);
					$group = $('<ul class="' + settings.klass + '-optgroup"></ul>');
					$optionTags = $optgroupTag.children('option');
					buildItems($optionTags, $group, index);
					$group.appendTo($options);
				});
			}
			$optionTags = $element.children('option');
			if ($optionTags.length) {
				$group = $('<ul class="' + settings.klass + '-optgroup"></ul>');
				buildItems($optionTags, $group, false);
				$group.appendTo($options);
			}
			$options.appendTo($container);
			
			// Insert markup
			$container.insertAfter($element);
			$element.appendTo($container);
		});
	};
}($));
/*
(function(c) {
	c.fn.simpleFormUI = function(k) {
		var d = {cssClass:"simpleFormUI", inheritClasses:!0, inlineStyles:!0, keyboardSupport:!0, hideStyles:{visibility:"hidden", position:"absolute", left:"-9999em", outline:"none none"}};
		k && c.extend(d, k);
		var i = d.cssClass ? "." + d.cssClass : "", e = {selectOption:function(a, b, e, d) {
			if(c(a).attr("id")) {
				var a = c(a), b = a.closest(b + ".select"), g = a.attr("id").split("select-")[1], g = b.find('option[value="' + g + '"]'), d = "undefined" === typeof d ? !0 : d;
				b.find("li").removeClass("selected");
				a.addClass("selected");
				b.find("option").removeAttr("selected");
				g.attr("selected", "selected");
				d && g.parent().trigger("change");
				e.text(g.text()).removeAttr("class").attr("class", a.attr("data-cssclass"))
			}
		}, showList:function(a, b) {
			a.offset().top + b.outerHeight() + a.outerHeight() > c(window).height() + c(window).scrollTop() ? b.css({top:"auto", bottom:"110%"}).slideDown(175) : b.css({top:"110%", bottom:"auto"}).slideDown(175);
			a.css("z-index", 1E4).addClass("open");
			c("html").bind("click", {container:a, list:b}, e.htmlHideList)
		}, htmlHideList:function(a) {
			e.hideList(a.data.container, a.data.list);
			c("html").unbind("click", e.htmlHideList)
		}, hideList:function(a, b) {
			b.css("display", "none");
			a.css("z-index", 1).removeClass("open");
			c("html").unbind("click", e.htmlHideList)
		}, toggleList:function(a, b) {
			"block" == b.css("display") ? e.hideList(a, b) : e.showList(a, b)
		}, hideOtherLists:function(a) {
			c("." + d.cssClass + ".select").find("ul").each(function() {
				this !== a && c(this).hide()
			})
		}};
		return this.each(function() {
			if(c(this).is("select")) {
				var a = c(this), b = a.clone(), f = c('<div class="' + d.cssClass + ' select"' + (d.inlineStyles ? ' style="position:relative;"' : "") + "></div>").append(b), h = c("<ul" + (d.inlineStyles ? ' style="display:none;position:absolute;top:110%;left:0;z-index:9000;margin:0;"' : "") + "></ul>").appendTo(f), g = c("<div></div>").appendTo(f), j = c('<a href="javascript:void(0);"' + (d.inlineStyles ? ' style="display:block;overflow:hidden;"' : "") + ">Default</a>").appendTo(g);
				"" != b.attr("class") && d.inheritClasses && (f.addClass(b.attr("class")), f.attr("data-cssclass", b.attr("class")));
				d.inlineStyles && b.css(d.hideStyles);
				b.find("option").each(function() {
					var a = d.inlineStyles ? ' style="list-style:none; margin:0;"' : "", b = c(this), a = c("<li" + a + '><a href="#">' + b.text() + "</a></li>");
					"" != b.attr("class") && (a.attr("class", b.attr("class")), a.attr("data-cssclass", b.attr("class")));
					var f = !1;
					if(this.disabled || b.hasClass("disabled")) {
						f = !0, a.attr("data-disabled", "true")
					}
					a.attr("id", "select-" + c(this).attr("value"));
					a.click(function(a) {
						a.preventDefault();
						f || (e.selectOption(this, i, j), g.click())
					});
					h.append(a);
					this.selected && e.selectOption(a, i, j, !1)
				});
				a.replaceWith(f);
				g.click(function() {
					e.hideOtherLists(h[0]);
					e.toggleList(f, h)
				});
				g.keydown(function(a) {
					var b = a.keyCode;
					if(38 == b || 40 == b || 27 == b) {
						a.preventDefault(), a = h.find("li.selected"), a[0] ? 38 == b ? e.selectOption(a.prev("li"), i, j) : 40 == b ? e.selectOption(a.next("li"), i, j) : 27 == b && e.hideList(h) : h.children().first().click()
					}
				});
				f.click(function(a) {
					a.stopPropagation()
				})
			}
		})
	}
})(jQuery);
*/