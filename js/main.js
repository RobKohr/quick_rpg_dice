$(document).ready(function(){
    var multiple = 1;
    multiple_max = 6;
    $('#multiple').touchstart(function(){
	multiple++;
	if(multiple>multiple_max){
	    multiple = 1;
	}
	$('#multiple').text(multiple+'x');
    })
    var sound = 'sounds/dice.wav';
    if(typeof(Media)=='undefined')
	var snd = new Audio(sound); // buffers automatically when created
    else
	var snd = new Media(sound); // buffers automatically when created
    function createDice(){
	dice = [
	    '1d2','1d4','1d6','1d8','1d10','1d12','1d100'
	];
	$('#dice').empty();
	for(var i=0; i<dice.length; i++){
	    var die = dice[i];
	    var html = '<img src="img/dice/all/'+die+'.jpg" data-die="'+die+'" class="need_event" id="die_'+die+'"/>'
	    $('#dice').append(html);
	    console.log('here');
	}
	setDiceEvents();
    }

    function setDiceEvents(){
	$('#dice .need_event').
	    removeClass('.need_event').
	    touchstart(function(){
		die_name = $(this).attr('data-die');
		die = die_name.split('d');
		value = die[1];
		outcome = roll(value, multiple);
		$('#recent #outcome').text(outcome.name+': '+outcome.total);
		if(multiple==1)
		    outcome.dice = '';
		$('#recent #each').text(outcome.dice);

		$('#recent').clone().removeAttr('id').
		    addClass('roll').prependTo('#history');
		snd.play();
	    });
    };
    function roll(value, quantity){
	var outcome = {total:0, dice:'', name:quantity+'d'+value};
	comma = '';
	for(var i=0; i<quantity; i++){
	    var die = Math.ceil(Math.random()*value);
	    outcome.total += die;
	    outcome.dice+=comma+die;
	    comma = ', ';
	}
	return outcome;
    }
    createDice();
});