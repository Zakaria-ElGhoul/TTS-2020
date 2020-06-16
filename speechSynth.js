let voiceSelect = document.querySelector('select');
let pitch = document.querySelector('#pitch');
let pitchValue = document.querySelector('.pitch-value');
let rate = document.querySelector('#rate');
let rateValue = document.querySelector('.rate-value');
let play = document.querySelector('#play');
let play2 = document.querySelector('#play2');
let play3 = document.querySelector("#play3");
let pause = document.querySelector('#pause');
let resume = document.querySelector('#resume');
let tekstNumberInput = document.querySelector("#hoeveelTekstinput");
let tekstInputs = document.getElementById("tekstInputs");
let synth = window.speechSynthesis;
let voices = []; 
let tekstArray = ["*pffft* Uh oh Stinky! Poop  hahahahaha Poopies Funny poopies alalalahahaha Funny poop Poop funny Weeeeee Haha yay more poopy Good poopy Poopy funny hahahahaha poo poo poo poo poo poo poo funny Yay fun poop hehehe poo Poopy yay poop make me happy happy happy hahahahahahaaa uh oh I think I made a poopy Poop in pants no diaper That's funny hahahaha Oopsie Poopy underwear now hehehehe We want poopies! We want poopies! hahahahaha hahhahahhaaa Poo cough POO!", "Yesterday I was watching porn with my dog when I started doing the whip nae nae uncontrollably, after the seizure feeling was gone I quickly left to the doctors without even pausing the porn, he diagnosed me with whip nae nae, I ended up whip nae naeing home to find out the bastard dog was jerking his small dog penis without me, I beat him and did the whip nae nae on his corpse, I am now in prison for the disappearance of a child in 2017"];
play.addEventListener('click', () => {
  sayTheWord(tekstInputs.firstChild.value);
});

play2.addEventListener('click', () => {
  let tekst = "";
  for (let i = 0; i < tekstInputs.childNodes.length; i++) {
    console.log(tekstInputs.childNodes[i].value);
    tekst += tekstInputs.childNodes[i].value + " ";
  }
  console.log(tekst);
  sayTheWord(tekst);
});

play3.addEventListener('click', () => {
  let tekst = "";
  for (let i = 0; i < tekstArray.length; i++) {
    tekst += tekstArray[i];
  }
  sayTheWord(tekst);
});


pause.addEventListener('click', () => {
  synth.pause();
});
resume.addEventListener('click', () => {
  synth.resume();
});


function populateVoiceList() {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    let option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function sayTheWord(theseWords) {
  synth.cancel(); // reset de speech synthesizer
  let magicWords = new SpeechSynthesisUtterance(theseWords);
  let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      magicWords.voice = voices[i];
    }
  }

  magicWords.pitch = pitch.value;
  magicWords.rate = rate.value;
  synth.speak(magicWords);
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}


tekstNumberInput.addEventListener("keyup", tekstNumberIngevuld);
tekstNumberIngevuld();

function tekstNumberIngevuld() {
  //remove all list that already exist.
  let tekstInputslist = document.getElementById("tekstInputs");
  while (tekstInputslist.hasChildNodes()) {
    tekstInputslist.removeChild(tekstInputslist.firstChild);
  }
  for (let i = 0; i < tekstNumberInput.value; i++) {
    let tekstList = document.createElement("input");
    tekstList.className = "txt";
    tekstList.setAttribute("type", "text");
    tekstList.style.listStyle = "none";
    tekstList.setAttribute("placeholder", "Tekst: " + (i + 1));
    tekstInputs.appendChild(tekstList);
  }
}