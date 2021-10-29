function randomIndex(str){
    return Math.floor(Math.random() * str.length);
  }
  
  console.log(randomIndex(`chicken`)); 
  
  function getRandomLower(){
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    return letters[randomIndex(letters)];
  }
  
  console.log(getRandomLower()); 
  
  function getRandomUpper(){
    const letter = getRandomLower();
    return letter.toUpperCase();
  }
  
  console.log(getRandomUpper()); 
  
  function getRandomNumber(){
    const numbers = `0123456789`;
    return numbers[randomIndex(numbers)];
  }
  
  console.log(getRandomNumber()); 
  
  function getRandomSymbol(){
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    return symbols[randomIndex(symbols)];
  }
  
  console.log(getRandomSymbol()); 
  
  const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
  };
  
  const resultEl = document.querySelector(`#result`);
  const clipboardEl = document.querySelector(`#clipboard`);
  const lowercaseEl = document.querySelector(`#lowercase`);
  const uppercaseEl = document.querySelector(`#uppercase`);
  const numbersEl = document.querySelector(`#numbers`);
  const symbolsEl = document.querySelector(`#symbols`);
  const lengthEl = document.querySelector(`#length`);
  const generateEl = document.querySelector(`#generate`);
  
  function generatePassword(lower, upper, number, symbol, length){
  
    console.log(lower, upper, number, symbol, length);
  
    let generatedPassword = ``;
  
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);
  
    if (typesCount === 0){
      alert(`Please select at least one option`);
      return ``;
    }
  
    let typesArr = [
      [`lower`, lower],
      [`upper`, upper],
      [`number`, number],
      [`symbol`, symbol]
    ];
    console.log(typesArr);
  
    typesArr = typesArr.filter(item => {
      console.log(item[1]);
      return item[1];
    });
    console.log(`typesArr:`, typesArr);
  
    for (i = 0; i < length; i += typesCount){
      typesArr.forEach(type => {
        const funcName = type[0];
        console.log(funcName);
        generatedPassword += randomFunctions[funcName]();
        console.log(generatedPassword);
      });
    }
  
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);
  
    return finalPassword;
  }
  
  generatePassword(true, true, true, true, 10);
  
  generateEl.addEventListener(`click`, () => {
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    const length = parseInt(lengthEl.value);
  
    console.log(hasLower, hasUpper, hasNumber, hasSymbol, length);
  
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  });
  
  clipboardEl.addEventListener(`click`, () => {
    const textarea = document.createElement(`textarea`);
  
    const password = resultEl.innerText;
  
    if (password === ``){
      alert(`Please generate a password first`);
      return;
    }
  
    textarea.value = password;
  
    const body = document.querySelector(`body`);
  
    body.append(textarea);
  
    textarea.select();
  
    document.execCommand(`copy`);
  
    textarea.remove();
    
    alert(`Password has been copied to the clipboard`);
  });