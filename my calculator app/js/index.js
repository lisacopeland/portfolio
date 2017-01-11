var app = angular.module('calculatorApp', []);

app.controller('calculatorController', function() {

  this.currentSum = 0;
  this.currDisplay = '0'; // what is currently displayed 
  this.currArray = [];
  this.wasDigit = false;

  // This gets called every time user presses a key
  this.keyPress = function(digit) {

    console.log(digit + " was pressed");

    switch (digit) {

      // If it is a number or operand, just push it into the stack  
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '*':
      case '/':
      case '+':
      case '-':
      case '.':
        this.update(digit);
        break;

        // If they push the AC button clear everything  
      case 'A':
        this.currentSum = 0;
        this.currDisplay = '0'; // what is currently displayed 
        this.currArray = [];
        this.wasDigit = false;
        break;

        // If they push CE then they just want to clear to last number or operand  
      case 'C':
        this.removeLast();
        break;

        // Time to do the math  
      case '=':
        this.sumTotal();
        break;

      default:
        break;
    }
  };

  this.removeLast = function() {

    // This gets called when the user presses CE
    console.log("In removelast currArray = " + this.currArray);
    this.currArray.pop();
    this.wasDigit = false;
    this.currDisplay = this.currDisplay.slice(0, this.currDisplay.lastIndexOf(' '));
    console.log("In removelast after remove currArray = " + this.currArray);

  };

  this.sumTotal = function() {

    var NextNum = 0;
    var tempTotal = 0;
    var lastOp = '';

    // Parse the currArray and do the operations from left to right
    for (var i = 0; i < this.currArray.length; i++) {

      nextItem = this.currArray[i];
      nextNum = parseInt(this.currArray[i]);

      if (parseInt(nextItem)) {
        // This is a number, if there is a lastOp then do it
        if (lastOp !== '') {
          // Do the operation
          switch (lastOp) {
            case '+':
              tempTotal += nextNum;
              break;
            case '-':
              tempTotal -= nextNum;
              break;
            case '*':
              tempTotal *= nextNum;
              break;
            case '/':
              tempTotal /= nextNum;
              break;
          }

        } else {
          tempTotal = nextNum;
        }
      } else {
        lastOp = nextItem;
      }

    }

    // Update currDisplay 
    this.currentSum = tempTotal;
    this.currArray = [];
    this.currArray.push(tempTotal.toString());
    this.currDisplay = tempTotal.toString();
    this.wasDigit = true;

  };

  // This is what gets called when the user presses a digit or operand button

  this.update = function(digit) {

    console.log("In update digit = " + digit);
    if ((digit >= '0') && (digit <= 9)) {
      // This is a digit, see if you are building a number or this is the start of a new number
      console.log("This is a digit, wasdigit = " + this.wasDigit);
      if (this.wasDigit === false) {

        this.currArray.push(digit);
        if (this.currDisplay == "0") {
          this.currDisplay = digit;
        } else {
          this.currDisplay = this.currDisplay + ' ' + digit;
        }
      } else {
        this.currArray[this.currArray.length - 1] += digit;
        this.currDisplay = this.currDisplay + digit;
      }
      this.wasDigit = true;

    } else {
      // This is an operand, but they have to have at least one digit before they can do one
      if (this.wasDigit === true) {
        
        console.log("This is an operand, typeof currArray = "+typeof(this.currArray));
        this.currArray.push(digit);
        console.log("This is an operand, added "+this.currArray);
        this.currDisplay = this.currDisplay + ' ' + digit;
        this.wasDigit = false;
      }
    }

  };

});