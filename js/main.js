$(document).ready(function(){
    if(typeof(document.body.ontouchstart) == "undefined"){
	var click = 'click';
    }else{
	var click = 'touchstart';
    }

    var multiple = 1;
    multiple_max = 10;
    var coin_state = 'heads';
    var dice_path = 'img/dice/all/'
    $('#multiple').on(click, function(){
	multiple++;
	if(multiple>multiple_max){
	    multiple = 1;
	}
	$('#multiple').text(multiple+'d');
    })
    var play_sounds = 0;
    if(play_sounds){
	var sound = 'sounds/dice.wav';
	if(typeof(Media)=='undefined')
	    var snd = new Audio(sound); // buffers automatically when created
	else
	    var snd = new Media(sound); // buffers automatically when created
    }
    function createDice(){
	dice = [
	    '1d2','1d4','1d6','1d8','1d10','1d12','1d20','1d100'
	];
	$('#dice').empty();
	for(var i=0; i<dice.length; i++){
	    var die = dice[i];
	    var html = '<img src="'+dice_path+die+'.jpg" data-die="'+die+'" class="need_event" id="die_'+die+'"/>'
	    $('#dice').append(html);
	    console.log('here');
	}
	setDiceEvents();
    }

    function setDiceEvents(){
	$('#dice .need_event').
	    removeClass('.need_event').
	    on(click, function(){
		$('#recent').show();
		die_name = $(this).attr('data-die');
		die = die_name.split('d');
		value = die[1];
		outcome = roll(value, multiple);
		$('#recent .outcome').html(outcome.name+': '+outcome.total);
		if(multiple==1)
		    outcome.dice = '';
		$('#recent .each').html(outcome.dice+'&nbsp;');

		$('#recent').clone().removeAttr('id').
		    addClass('roll').prependTo('#history');
		$('#instructions').hide();

		if(value == '2'){
		    $('#die_1d2').attr('src', dice_path+coin_state+'.jpg');
		}
		if(play_sounds)
		    snd.play();
	    });
    };
    function roll(value, quantity){
	var outcome = {total:0, dice:'', name:'<span class="quantity">'+quantity+'d</span>'+value};
	comma = '';
	for(var i=0; i<quantity; i++){
	    var die = Math.ceil(Math.random()*value);
	    outcome.total += die;
	    if(value == '2'){
		coin_state = 'heads';
		if(die=='2')
		    coin_state = 'tails';
	    }
	    outcome.dice+=comma+die;
	    comma = ', ';
	}
	if((value == 2)&&(quantity==1)){
	    outcome.total = outcome.total+' <span class="coin_state">('+coin_state+')</span>';
	}
	return outcome;
    }
    createDice();
});