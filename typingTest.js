//ALL ABOUT VARIABLE 
//All container
const startButContainer = document.querySelector('#start-but-container');
const textContentScreen = document.querySelector('#text-content');//The text on screen
const inputForText = document.querySelector('#input-for-test');//The input that receive value from user
const textT = "The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic-all discovered in a single Mycenaean tomb-suggested commercial connections far more extensive than previously hypothesized. \"We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods, \"the lead researcher observed. \"Globalization isn't as modern as we assume.\""
const personalBestValue = document.querySelector('#personal-best-value');
//All button
const easyBut = document.querySelector('#easy-but');
const mediumBut = document.querySelector('#medium-but');
const hardBut = document.querySelector('#hard-but');
const startBut = document.querySelector('#start-but');
const restartBut = document.querySelector('#restart-but');

let timeValue = document.querySelector('#time-value');
let newText = ""; //This text will be displayed according the user enter is correct or not.
let actualIndex = 0; //Index of prumpt, letter to be changed.
let trueType = 0;
let wrongType = 0;
let completeAcensor = 0;
let wpmCounter =0;
let wpm = 0;
let typingDuration = null;


textContentScreen.innerHTML = textT
    .split('')
    .map(letter => `<span>${letter}</span>`)
    .join(''); //Initial text displayed.

const eachSpan = textContentScreen.querySelectorAll('span');
document.addEventListener('click', () => inputForText.focus());
//Function for comparing letter 
const comparingLetter = () => {
    console.log('comparingLetter')
    const typedChar = inputForText.value.slice(-1);
    const currentLetter = eachSpan[actualIndex];

    if(!currentLetter) return;//Gard clause to privent all error

    currentLetter.classList.remove('active');//Remove cursor from each typed letter (index)

    if(typedChar === currentLetter.textContent && typedChar === ' '){
        wpm++;
    }

    if(typedChar === currentLetter.textContent && typedChar !==''){
        currentLetter.classList.add('true-green');
        trueType++;//Counter of true typed value
    }else if(typedChar !== currentLetter.textContent && typedChar !==''){
        currentLetter.classList.add('wrong-red');
        wrongType++;//Counter of wrong typed value
    }
    
    if(typedChar !== ''){
        actualIndex++;
    }

    //Add cursor for each actual letter
    if(eachSpan[actualIndex]){
        eachSpan[actualIndex].classList.add('active');
        completeAcensor++;
    }
    if(completeAcensor+1 == textT.length){
        console.log(trueType+' '+wrongType);
        console.log(wpm);
    }
    inputForText.value = "";
}

//TIMER
const initialisationTimer = () => {
    if(wpmCounter>0){
        wpmCounter = 0;
    }

    if(typingDuration !== null){
        timeValue.textContent = '0:0'+wpmCounter;
        clearInterval(typingDuration);
        typingDuration = null;
    }
}

const timerForStartAndHard = () => {//Azo heverina ny mampiditra ito any amin'ny fonction: initialisationTimer()
    typingDuration = setInterval(()=>{
        wpmCounter++;
        if(wpmCounter<10){
            timeValue.textContent = '0:0'+wpmCounter;
        }else{
            timeValue.textContent = '0:'+wpmCounter;
        }
        
        if(wpmCounter == 60){//This should go to the hard button
            clearInterval(typingDuration);
            typingDuration = null;
            personalBestValue.textContent = wpm+' WPM';//Value for DATA BASE (Change if it go beyond the last value)
            inputForText.style.display = 'none';
            eachSpan[actualIndex].classList.remove('active');//Remove cursor because 60s is completed
        }
    }, 1000)
}
//The button easy, medium and hard
//All three button need to change behavior itself
const initialisationAction = (self) => {
    if(self.target.classList[1] === 'difficulty-but-inactive'){
        self.target.classList.remove('difficulty-but-inactive');
        self.target.classList.add('difficulty-but-active');
    }

    eachSpan[actualIndex].classList.remove('active');//Remove cursor from the last typing.

    for(let i=0; i<eachSpan.length; i++){
        if(eachSpan[i].classList == "true-green"){
            eachSpan[i].classList.remove('true-green');
        }else if(eachSpan[i].classList == "wrong-red"){
            eachSpan[i].classList.remove('wrong-red');
        }
    }

    if(actualIndex > 0){
        actualIndex = 0;
    }
}

//Behavior of Easy Button
const easyButAction = (e) => {
    //Start of changing color if clicked
    e.target.classList.add('difficulty-but-active');
    initialisationTimer();
    initialisationAction(e);
    if(e.target.textContent === "Easy" && mediumBut.classList[1] === "difficulty-but-active" || e.target.textContent === "Easy" && hardBut.classList[1] === "difficulty-but-active"){
        mediumBut.classList.remove('difficulty-but-active');
        mediumBut.classList.add('difficulty-but-inactive');
        hardBut.classList.remove('difficulty-but-active');
        hardBut.classList.add('difficulty-but-inactive');
    }//End of changing color
    comparingLetter();
}

//Behavior of Medium Button
const mediumButAction = (e) => {
    //Start of changing color if clicked
    e.target.classList.add('difficulty-but-active');
    initialisationTimer();
    initialisationAction(e);
    if(e.target.textContent === "Medium" && mediumBut.classList[1] === "difficulty-but-active" || e.target.textContent === "Medium" && hardBut.classList[1] === "difficulty-but-active"){
        easyBut.classList.remove('difficulty-but-active');
        easyBut.classList.add('difficulty-but-inactive');
        hardBut.classList.remove('difficulty-but-active');
        hardBut.classList.add('difficulty-but-inactive');
    }//End of changing color
    comparingLetter();
}

//Behavior of hard Button
const hardButAction = (e) => {
    //Start of changing color if clicked
    e.target.classList.add('difficulty-but-active');
    initialisationTimer();
    initialisationAction(e);
    if(e.target.textContent === "Hard" && mediumBut.classList[1] === "difficulty-but-active" || e.target.textContent === "Hard" && hardBut.classList[1] === "difficulty-but-active"){
        easyBut.classList.remove('difficulty-but-active');
        easyBut.classList.add('difficulty-but-inactive');
        mediumBut.classList.remove('difficulty-but-active');
        mediumBut.classList.add('difficulty-but-inactive');
    }//End of changing color
    //document.addEventListener('click', () => inputForText.focus());
    comparingLetter();
    timerForStartAndHard();
}

easyBut.addEventListener('click', easyButAction);
mediumBut.addEventListener('click', mediumButAction);
hardBut.addEventListener('click', hardButAction);

personalBestValue.textContent = "0 WPM";

//Compare the typed value with the value in screen

inputForText.addEventListener('input', comparingLetter)

    if(completeAcensor+1 == 503){
        console.log(wpm);
    }

//Initial cursor
eachSpan[0].classList.add('active');

//For the button start
startBut.addEventListener('click', (e) => {
    initialisationTimer();
    textContentScreen.style.filter = 'blur(0)';
    e.target.style.display = 'none';
    startButContainer.style.display = 'none';
    restartBut.style.display = 'flex';
    timeValue.textContent = "0:00";

    comparingLetter();
    timerForStartAndHard();
})