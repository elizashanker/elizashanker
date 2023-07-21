
(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},

		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
						} else {
							_.guess = null;
							_.paused = true;
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		// перезапуск игры
		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://static.tildacdn.com/tild6566-3736-4561-b839-663462623037/Group.svg" alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{	
			name: "php",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/297px-PHP-logo.svg.png",
			id: 1,
		},
		{
			name: "css3",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/160px-CSS3_logo.svg.png",
			id: 2
		},
		{
			name: "html5",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/160px-HTML5_logo_and_wordmark.svg.png",
			id: 3
		},
		{
			name: "jquery",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/JQuery-Logo.svg/440px-JQuery-Logo.svg.png",
			id: 4
		}, 
		{
			name: "javascript",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/160px-Unofficial_JavaScript_logo_2.svg.png",
			id: 5
		},
		{
			name: "node",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/262px-Node.js_logo.svg.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/164px-Adobe_Photoshop_CC_icon.svg.png",
			id: 7
		},
		{
			name: "python",
			img: "https://www.python.org/static/img/python-logo@2x.png",
			id: 8
		},
		{
			name: "rails",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/425px-Ruby_On_Rails_Logo.svg.png",
			id: 9
		},
		{
			name: "sass",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/213px-Sass_Logo_Color.svg.png",
			id: 10
		},
		{
			name: "sublime",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Breezeicons-apps-48-sublime-text.svg/160px-Breezeicons-apps-48-sublime-text.svg.png",
			id: 11
		},
		{
			name: "wordpress",
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/WordPress_logo.svg/440px-WordPress_logo.svg.png",
			id: 12
		},
	];
    
	// запускаем игру
	Memory.init(cards);


})();
