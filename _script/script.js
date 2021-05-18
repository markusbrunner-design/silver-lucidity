$(function() {
	function initBooklet() {
		$('#booklet').removeClass('no-booklet');
		$('#booklet').booklet({
			width: 1024,
			height: 700,
			closed: false,
			closedFrontTitle: "Silver Lucidity",
			closedBackTitle: "...The End",
			covers: true,
			autoCenter: true,
			pageSelector: true,
			chapterSelector: true,
			pagePadding: 25
		});
	}
	function initShepherdGuidedTour() {
		var hideTour = localStorage.getItem('silverlucidity-hidetour') || false;
		if(!hideTour) {
			var tour = new Shepherd.Tour({
				defaultStepOptions: {
					cancelIcon: {
						enabled: true
					},
					classes: 'class-1 class-2',
					scrollTo: { behavior: 'smooth', block: 'center' }
				},
				useModalOverlay: true
			});

			tour.addStep({
				title: 'Silver Lucidity',
				text: 'Welcome on board! <br /><br /> This is a digital booklet with pages to turn over!',
				attachTo: {
					element: '.b-page-0 img',
					on: 'auto'
				},
				buttons: [
					{
						action() {
							return this.next();
						},
						text: 'Next'
					}
				],
				id: 'intro'
			});

			var turnOverStep = tour.addStep({
				title: 'Turn over the pages',
				text: 'By hovering over this area you see a turn-over effect on non-mobile-devices. On all devices you can click here to turn over the pages. Have fun! <br /><br /><input id="hidetour" type="checkbox" value="1" /><label for="hidetour">Don\'t show this tour again on this device on next visit (you can always reset this setting with clearing your browser-cache for this page)</label>',
				attachTo: {
					element: '.b-page-1 .b-counter',
					on: 'auto'
				},
				buttons: [
					{
						action() {
							return this.back();
						},
						classes: 'shepherd-button-secondary',
						text: 'Back'
					},
					{
						action() {
							return this.complete();
						},
						text: 'Close'
					}
				],
				when: {
				  show: function() {
					document.getElementById("hidetour").addEventListener("click", function(e) {
						if(localStorage && e.target.checked) {
							localStorage.setItem('silverlucidity-hidetour', true);
						} else {
							localStorage.removeItem('silverlucidity-hidetour');
						}
					});
				  }
				},
				id: 'turnover'
			});

			tour.start();
		}
	}
	if(window.innerWidth > 1100) {
		// booklet version for bigger sizes
		initBooklet();
		// information on how to use the booklet
		initShepherdGuidedTour();
	}
});