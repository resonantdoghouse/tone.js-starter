# Tone.js Starter

Starter code to get up and running making music with Tone.js

[Tone.js](https://github.com/Tonejs/Tone.js/) is an amazing JavaScript library which makes working with the Web Audio API much easier! 

## Running the code locally

- Download or clone this repo
- Install dependencies `npm install`
- Run gulp tasks `gulp`, `gulp-sass`, & `gulp-scripts`

## About

**This repo is intended to help others who are interested in making music with JavaScript.**
The code provided is utilizing an excellent library called Tone.js

Tone.js makes working with the Web Audio API much easier as it takes care of a lot of tedious tasks for you. If you've ever worked with the Web Audio API you may have some strong opinions but one thing you are likely to agree with is that it's a bit tricky to do anything meaningful, other than having a couple of oscillators genrate a tone. Tone.js has a ton of features but rather than me explaining all of them you can check out:  [tone.js examples](https://tonejs.github.io/examples/) and here are a few things people have made:  [Demos](https://tonejs.github.io/demos)

**What this repo contains** is a demo project which recreates the theme to the 80's TV show **Knight Rider** 

![knight rider car](./img/Knightlogo.png)

Yes the man the legend David Hasselhoff stared in this 80's TV show before baywatch and if you don't know the theme song you may have heard it sampled by artists like Busta Rhymes e.g. the song: ["Turn It Up (Remix) / Fire It Up"](https://youtu.be/YmHziduwBgI?t=1m5s)
Many others have also sampled this icon TV theme, maybe you recognize [some of these songs](https://www.whosampled.com/Stu-Phillips/Theme-From-Knight-Rider/sampled/).

But this projects purpose isn't about the history of sampled TV themes, it's about create music with JavaScript, so let's take a look at a few examples before jumping into the project code.

**Link to Tone.js [CDN](https://cdnjs.cloudflare.com/ajax/libs/tone/13.0.1/Tone.min.js)**

I recommend starting out by trying some of the examples in CodePen.

### Create a kick sound
```
const synth = new Tone.MembraneSynth().toMaster();
synth.triggerAttackRelease("C2", "8n");
```

### Loop the kick sound

```
const synth = new Tone.MembraneSynth().toMaster();

var loop = new Tone.Loop(function(time) {
  //triggered every eighth note.
  console.log(time);
  synth.triggerAttackRelease("C2", "8n");
}, "8n").start(0);
Tone.Transport.start();
```

### Create a sequence and pass in an array of notes
```
const synth = new Tone.MembraneSynth().toMaster();
const notes = ["C3", "Eb3", "G3", "Bb3"];

const synthPart = new Tone.Sequence(
  function(time, note) {
    synth.triggerAttackRelease(note, "10hz", time);
  },
  notes,
  "4n"
);

synthPart.start();
Tone.Transport.start();
```

## CodePen Links

**Turn your device volume down before opening the links!**

- Mebrane Synth Example [codepen](https://codepen.io/Onomicon/pen/MqOGEO?editors=1010)
- Membrane Synth Loop [codepen](https://codepen.io/Onomicon/pen/rZYvdK)
- Synth Sequence [codepen](https://codepen.io/Onomicon/pen/dqZKbP?editors=0010)

## Additional Resources
- [Tone.js Presets](http://tonejs.github.io/Presets/) 
- [Tone.js Sequence](https://tonejs.github.io/docs/r12/Sequence)
- [Piano Key Frequencies](https://en.wikipedia.org/wiki/Piano_key_frequencies)