'use strict';
$(function() {

	recordTest();
	showTest();
	$('#btn').on('click', showResult);

	function recordTest(){
	    var test = {
	    	title: "Тест по програмированию",
	        buttonText: "Проверить мои результаты",
	        questionList: [
	        {question:"Какой командой выбрать елемент по id?",
	    	variants:["selectElementById();", "findElementById();", "getElementById();"]
	    	}, 
	        {question:"Как вставить элемент в конец списка дочерних элементов родителя?",
	    	variants:["insertAfter();", "Такой опции не существует;", "appendChild();"]
	    	},
	        {question:"Как вставить элемент перед указанным дочерним элементом родителя?",
	    	variants:["insertBefore();", "Такой опции не существует;", "appendChild();"]
	    	},
	        ],
	    };

	    var ansvers = ["getElementById()", "appendChild()", "insertBefore()"];
	    	

	    var str = JSON.stringify(test);
	    var str2 = JSON.stringify(ansvers);
	    localStorage.setItem('test', str);
	    localStorage.setItem('ansvers', str2);
	}

	function showTest(){
	    
    	var str = localStorage.getItem('test');
    	var obj = JSON.parse(str);
		var tmpl = $('#test_template').html();
    	var content = _.template(tmpl);

    	$('#holder').append(content(obj));
	}

	function showResult(e){

		e.preventDefault();
		var rightAnsvers = JSON.parse(localStorage.getItem('ansvers'));
		var ourAnsvers = $('.check:checked').next('span').text().split(';', rightAnsvers.length);
		
		var $ansvers = compareAnsvers(ourAnsvers, rightAnsvers);
		
		var $modal = $('<div class="result">' + $ansvers + '<button id="okBtn" class="btn">--= Ok =--</button></div>');
		var $overlay = $('<div class="overlay"></div>');
		$('body').append($overlay);
		$('body').append($modal);

		function hideResult(){
			$modal.remove();
			$overlay.remove();
			$('.check:checked').attr("checked", false);
		}

		$('#okBtn').one('click', hideResult);
	}
	
	function compareAnsvers(ourAnsvers, rightAnsvers) {
		
		var resultStr = '';
		for(var i = 0; i < ourAnsvers.length; i++) {
			
			if(ourAnsvers[i] === rightAnsvers[i]){
				resultStr += '<p class="rightAnsver">' + ourAnsvers[i] + '<span> Right!!!</span></p>';
			} else {
				resultStr += '<p class="wrongAnsver">' + ourAnsvers[i] + '<span> Wrong!!!</span></p>';
			}
		}

		return resultStr;
	}

    

});

