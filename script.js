//IndexReserve Function
/*Identify pre-occupied index in the array using this function. This is to ensure that each
criteria is represented at least once in the overall password string. The index where each
character will sit will be randomly selected in this function.*/
function IndexReserve(lowerCase, upperCase, numCase, spChar, arrLen)
{
	var reserveIndex = []; //create an array to collect all reserve indexes represented as objects
	if (lowerCase) {
		var lwrIndex = Math.floor(Math.random() * arrLen);
		var objLower = {
			indexPosition: lwrIndex, type: "lwr"
		};
		reserveIndex.push(objLower);
	}
	if (upperCase) {
		var uprIndex = Math.floor(Math.random() * arrLen);
		while (uprIndex == lwrIndex){
			uprIndex = Math.floor(Math.random() * arrLen);
		}
		var objUpper = {
			indexPosition: uprIndex, type: "upr"
		};
		reserveIndex.push(objUpper);
	}
	if (numCase) {
		var numIndex = Math.floor(Math.random() * arrLen);
		while (numIndex == lwrIndex || numIndex == uprIndex){
			numIndex = Math.floor(Math.random() * arrLen);
		}
		var objNum = {
			indexPosition: numIndex, type: "num"
		};
		reserveIndex.push(objNum);
	}
	if (spChar) {
		var spCharIndex = Math.floor(Math.random() * arrLen);
		while (spCharIndex == lwrIndex || spCharIndex == uprIndex || spCharIndex == numIndex) {
			spCharIndex = Math.floor(Math.random() * arrLen);
		}
		var objSpChar = {
			indexPosition: spCharIndex, type: "spc"
		};
		reserveIndex.push(objSpChar);
	}
	return reserveIndex;
}

//RandomCodeGenerate Function
/*This function will randomly select character in four different criteria using UTF-16 code instead
of array selection.*/
function RandomCodeGenerate(charType)
{
	var charGenerated;
	var minCode;
	var maxCode;
	
	switch (charType) {
		case 0: {
			minCode = 97; //utf-16 code of character 'a'
			maxCode = 122;//utf-16 code of character 'z'
			charGenerated = String.fromCharCode(Math.floor(Math.random() * (maxCode-minCode)) + minCode);
			break;
		}
		case 1: {
			minCode = 65; //utf-16 code of character 'A'
			maxCode = 90; //utf-16 code of character 'Z'
			charGenerated = String.fromCharCode(Math.floor(Math.random() * (maxCode-minCode)) + minCode);
			break;
		}
		case 2: {
			minCode = 48; //utf-16 code of character '0'
			maxCode = 57; //utf-16 code of character '9'
			charGenerated = String.fromCharCode(Math.floor(Math.random() * (maxCode-minCode)) + minCode);
			break;
		}
		case 3: {
			minCode = 0;
			maxCode = 33; //specified the number of charactes included in this scope
			var temp = Math.floor(Math.random() * maxCode);
			if (temp >=0 && temp <= 15) {
				charGenerated = String.fromCharCode(temp + 32);
			}
			else if (temp >= 16 && temp <= 22){
				charGenerated = String.fromCharCode(temp + 42);
			}
			else if (temp >=23 && temp <= 28){
				charGenerated = String.fromCharCode(temp + 68);
			}
			else if (temp >= 29 && temp <= 32){
				charGenerated = String.fromCharCode(temp + 94);
			}
			else
				charGenerated = "Invalid";
			break;
		}
	}
return charGenerated;
}

/*THIS IS THE MAIN CODE THAT HANDLES PASSWORD GENERATION*/
function generatePassword(lowerCaseIncluded, upperCaseIncluded, numericIncluded, spCharacterIncluded, arrayLength)
{
  var generatedPassword = [];

  /*Reserve an index for each criteria to ensure that they are represented at least once in the overall password string. 
  This is particulary useful for shorter password*/
  var reservedArray = IndexReserve(lowerCaseIncluded, upperCaseIncluded, numericIncluded, spCharacterIncluded, arrayLength);

  //assign designated values to reserved index
for (var i = 0; i < reservedArray.length; i++) {
	if (reservedArray[i].type == "lwr") {
		generatedPassword[reservedArray[i].indexPosition] = RandomCodeGenerate(0);
	}
	else if (reservedArray[i].type == "upr") {
		generatedPassword[reservedArray[i].indexPosition] = RandomCodeGenerate(1);
	}
	else if (reservedArray[i].type == "num") {
		generatedPassword[reservedArray[i].indexPosition] = RandomCodeGenerate(2);
	}
	else if (reservedArray[i].type == "spc") {
		generatedPassword[reservedArray[i].indexPosition] = RandomCodeGenerate(3);
	}
}

//assign the rest of the characters
for (var i = 0; i < arrayLength; i++){
	var cntMatch = 0;
	for (var j = 0; j < reservedArray.length; j++){
		if (reservedArray[j].indexPosition == i)
			cntMatch++;
	}

	if (cntMatch > 0) {
		continue;
	}
	var tempRandom = Math.floor(Math.random() * 4);
		while (!(((tempRandom == 0) && lowerCaseIncluded) || ((tempRandom == 1) && upperCaseIncluded) ||
				 ((tempRandom == 2) && numericIncluded) || ((tempRandom == 3) && spCharacterIncluded))) {		
			tempRandom = Math.floor(Math.random() * 4);
	}
	generatedPassword[i] = RandomCodeGenerate(tempRandom);

}
return generatedPassword.join('');
}


// Assignment Code
var generateBtn = document.querySelector("#generate");

alert("This program will generate a password meeting all selected criteria")
var numOfChar = prompt("Please enter the required number of characters between 8 and 128", "8");
numOfChar = parseInt(numOfChar);
//Validate entry as an integer from 8 to 128
while (numOfChar < 8 || numOfChar > 128){
  alert("You entered an invalid number!")
  var numOfChar = prompt("Please enter the required number of characters", "8");
  numOfChar = parseInt(numOfChar);
} 

var entryCount = 0;
//confirm if lowercase characters are required
var lwrIncluded = confirm("Do you want to include lowercase letters?");
        if (lwrIncluded){
          entryCount++;
        }
//confirm if uppercase characters are required
var uprIncluded = confirm("Do you want to include uppercase letters?");
        if (uprIncluded){
          entryCount++;
        }
//confirm if number characters are required
var numIncluded = confirm("Do you want to include numeric characters?");
        if (numIncluded){
          entryCount++;
        }
//confirm if special characters are included
var spIncluded = confirm("Do you want to include special characters?");
        if (spIncluded){
          entryCount++;
        }

while (entryCount == 0){
alert("IMPORTANT!!! You need to select at least one criteria.");
//confirm if lowercase characters are required
var lwrIncluded = confirm("Do you want to include lowercase letters?");
        if (lwrIncluded){
          entryCount++;
        }
//confirm if uppercase characters are required
var uprIncluded = confirm("Do you want to include uppercase letters?");
        if (uprIncluded){
          entryCount++;
        }
//confirm if number characters are required
var numIncluded = confirm("Do you want to include numeric characters?");
        if (numIncluded){
          entryCount++;
        }
//confirm if special characters are included
var spIncluded = confirm("Do you want to include special characters?");
        if (spIncluded){
          entryCount++;
        }
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword(lwrIncluded, uprIncluded, numIncluded, spIncluded, numOfChar);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
