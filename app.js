window.onload = function () {

    var inputScreen = document.getElementById('calculation');
    var historyInputScreen = document.getElementById('history');
    var buttons = document.getElementsByClassName('buttons'); //Getting the buttons Object

    var calculation = '';
    var topScreen = '';
    var bottomScreen = '';

    for (var i = 0; i < buttons.length; i++) {                //Looping throught the buttons Object

        buttons[i].addEventListener('click', function() {     //Listening for click events in every button

            var value = this.innerHTML;
            'use strict';

            switch(value) {
                    //******************************CLEAR_ALL******************************************
                case 'AC':
                    value = '';
                    topScreen = '';
                    bottomScreen = '';
                    calculation = '';
                    break;
                    //******************************CHANGE_SIGN****************************************
                case '±':
                    value = '';
                    if(calculation !== '') {
                        topScreen = 'negate(' + parseFloat(calculation) + ')'; 
                        calculation = -parseFloat(calculation);
                        bottomScreen = calculation;
                    } 
                    break;
                    //******************************POWER**********************************************
                case 'x<sup>2</sup>':
                    if(calculation !== '') {
                        value = '';
                        topScreen = 'sqr(' + parseFloat(calculation) + ')';
                        calculation = parseFloat(calculation) * parseFloat(calculation);
                        bottomScreen = calculation;
                    } else {
                        value = '';
                    }
                    break;
                    //******************************DIVISION********************************************
                case '÷':
                    value = '/';
                    if(typeof calculation !== 'string') {
                        calculation = calculation.toString();
                    }
                    if(calculation.search(/\/$/) > 0 || calculation === '') {  
                        value = '';
                    } else if (calculation.search(/\W$/) > 0) {
                        calculation = calculation.replace(/.$/, '/');
                        topScreen = calculation;
                    } else {
                        value = '/';
                        calculation += value;
                        topScreen = calculation;
                    } 
                    break;
                    //**********************MULTIPLICATION************************************************
                case '×':
                    value = '*';
                    if(typeof calculation !== 'string') {
                        calculation = calculation.toString();
                    }
                    if(calculation.search(/\*$/) > 0 || calculation === '') {  
                        value = '';
                    } else if (calculation.search(/\W$/) > 0) {
                        calculation = calculation.replace(/.$/, '*');
                        topScreen = calculation;  
                    } else {
                        value = '*';
                        calculation += value;
                        topScreen = calculation;
                    } 
                    break;
                    //******************************ADDITION***********************************************
                case '+':
                    if(typeof calculation !== 'string') {
                        calculation = calculation.toString();
                    }
                    if(calculation.search(/\+$/) > 0 || calculation === '') {  
                        value = '';
                    } else if (calculation.search(/\W$/) > 0) {
                        calculation = calculation.replace(/.$/, '+');
                        topScreen = calculation;      
                    } else {
                        value = '+';
                        calculation += value;
                        topScreen = calculation;
                    } 
                    break;
                    //******************************SUBTRACTION**********************************************   
                case '-':
                    if(typeof calculation !== 'string') {
                        calculation = calculation.toString();
                    }
                    if(calculation.search(/-$/) > 0 || calculation === '') {  
                        value = '';
                    } else if (calculation.search(/\W$/) > 0) {
                        calculation = calculation.replace(/.$/, '-');
                        topScreen = calculation;    
                    } else {
                        value = '-';
                        calculation += value;
                        topScreen = calculation;
                    } 
                    break;
                    //******************************DELETE****************************************************
                case 'DEL':
                    if(typeof calculation !== 'string' || typeof bottomScreen !== 'string' || typeof topScreen !== 'string') {
                        calculation = calculation.toString();
                        bottomScreen = bottomScreen.toString();
                        topScreen = topScreen.toString();
                    }
                    value = '';
                    if(calculation !== '' || topScreen !== '' || bottomScreen !== '') {
                        calculation = calculation.slice(0, -1);
                        topScreen = topScreen.slice(0, -1);
                        bottomScreen = bottomScreen.slice(0, -1);
                    }
                    break;
                    //******************************DOT**************************************************
                case '.':
                    if(typeof calculation !== "string") {
                        calculation = calculation.toString();
                    }
                    if(calculation.search(/\.$/) > 0 || calculation.search(/\W$/) > 0 || calculation === '') {
                        value = '';
                    } else {
                        calculation += value;
                        topScreen += value;
                        bottomScreen += value;
                    } 
                    
                    break;
                     //******************************EQUAL**************************************************
                case '=':
                    if(typeof calculation !== 'string') {
                        calculation = calculation.toString(); 
                    }
                    if(calculation.search(/=$/) > 0 || calculation === '' || calculation.search(/\W$/) > 0) {
                        value = '';
                    } else {
                        if(topScreen.search(/=$/) < 0) {
                            topScreen += value;
                            value = '';
                            if((eval(calculation).toString()).match(/\.\d+$/) === null) {
                                calculation = eval(calculation);
                                bottomScreen = calculation;
                            } else {
                                calculation = parseFloat(eval(calculation)).toFixed(8);
                                calculation = calculation.replace(/0+$/, "");
                                bottomScreen = calculation; 
                            }

                        } else {
                            value = '';
                            if((eval(calculation).toString()).match(/\.\d+$/) === null) {
                                calculation = eval(calculation);
                                calculation = calculation.replace(/0+$/, "");
                                bottomScreen = calculation;
                            } else {
                                calculation = parseFloat(eval(calculation)).toFixed(8);
                                bottomScreen = calculation; 
                            }
                        }
                    }
                    break;

                case '0':
                    if(calculation.search(/(\+|-|\*|\/)$/) > 0) {
                        bottomScreen = '';
                    } 
                    if(calculation === '0' || calculation.match(/[^0-9_\.]0$/) !== null) {
                        value = '';
                    } else {
                        calculation += value;
                        topScreen += value;
                        bottomScreen += value;
                    }
                    break;

                default:
                    if(typeof calculation !== 'string') {
                        calculation = calculation.toString(); 
                    }
                    if(calculation.search(/[^0-9_\.]$/) > 0) {
                        bottomScreen = '';
                    } 
                    if(topScreen.search(/=$/) > 0) {
                        calculation = '';
                        topScreen = '';
                        bottomScreen = '';
                    }
                    calculation += value;
                    topScreen += value;
                    bottomScreen += value;
                        }


            inputScreen.innerHTML = bottomScreen;
            historyInputScreen.innerHTML = topScreen;


        });

    };

};
