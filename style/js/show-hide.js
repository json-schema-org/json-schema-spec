$(function () {
	var showHide = $('.show-hide');
	showHide.each(function () {
		var $this = $(this);
		$this.text("+ show");
		var targetId = this.getAttribute("data-target");
		var $target = $('#' + targetId);
		var contents = $('<div></div>').hide();
		$target.contents().appendTo(contents);
		contents.appendTo($target);
		
		var hidden = true;
		$this.click(function () {
			if (hidden) {
				contents.slideDown();
				$this.text("- hide");
			} else {
				contents.slideUp();
				$this.text("+ show");
			}
			hidden = !hidden;
		});
	});
});