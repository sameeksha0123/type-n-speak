//Inti SpeechSynth API

const synth= window.speechSynthesis;

//dom elements
const textForm= document.querySelector('form');
const textInput= document.querySelector('#text-input');
const voiceSelect= document.querySelector('#voice-select');
const rate= document.querySelector('#rate');
const rateValue= document.querySelector('#rate-value');
const pitch= document.querySelector('#pitch');
const pitchValue= document.querySelector('#pitch-value');


//voices array
let voices=[];

const getVoice = () =>{
    voices= synth.getVoices();
    // console.log(voices);

    //loop through voices and create an option for each one
    voices.forEach( voice =>{
        //creating option element
        const option= document.createElement('option');
        option.textContent=voice.name + '{'+ voice.lang +'}';
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    })
}
getVoice();
if( synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoice;
}

//speak
const speak= () =>{
    //check if speaking
    if(synth.speaking){
        console.log("Already speaking........");
        return;
    }
    if(textInput.value !== ""){
        //get the speak text
        const speakText= new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e=>{
            console.log("Done speaking ...");
        }
        speakText.onerror = e =>{
            console.log("Something went wrong");

        }

        //selected voice
        const selectedVoice= voiceSelect.selectedOptions[0]
        .getAttribute('data-name');
        console.log(selectedVoice);

        //loop through voices
        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate= rate.value;
        speakText.pitch= pitch.value
        console.log("speakText",speakText);
        //speak
        synth.speak(speakText);
    }
};

//text form submit 
textForm.addEventListener('submit',e =>{
    e.preventDefault();
    speak();
    textInput.blur();
})

//rate value change
rate.addEventListener('change', e =>{
    rate.textContent  = rateValue.value
    console.log(rate.value);
    })
    

//pitch value change
pitch.addEventListener('change', e=>{
    pitch.textContent  = pitchValue.value;
    console.log(pitchValue.value);    
});

//voice select change
voiceSelect.addEventListener('change', e=> speak() )

