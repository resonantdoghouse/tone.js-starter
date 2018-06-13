(function() {
  const bassNotes = [
    ['F#3', 'F#3'],
    null,
    ['F#3', 'F#3'],
    null,
    ['F#3', 'F#3'],
    null,
    null,
    null,
    ['F#3', 'F#3'],
    null,
    null,
    null,
    ['F#3', 'F#3'],
    null,
    null,
    null,
    ['E3', 'E3'],
    null,
    ['E3', 'E3'],
    null,
    ['E3', 'E3'],
    null,
    null,
    null,
    ['E3', 'E3'],
    null,
    null,
    null,
    ['E3', 'E3'],
    null,
    null,
    null,
    ['F#3', 'F#3'],
    null,
    ['F#3', 'F#3'],
    null,
    ['F#3', 'F#3'],
    null,
    null,
    null,
    ['F#3', 'F#3'],
    null,
    null,
    null,
    ['F#3', 'F#3'],
    null,
    null,
    null,
    ['G3', 'G3'],
    null,
    ['G3', 'G3'],
    null,
    ['G3', 'G3'],
    null,
    null,
    null,
    ['G3', 'G3'],
    null,
    null,
    null,
    ['G3', 'G3'],
    null,
    null,
    null
  ];
  const pizzNotes = [
    'C#4',
    ['D4', 'C#4'],
    ['C#4', 'D4'],
    ['C#4', 'C#4'],
    ['D4', 'C#4'],
    ['C#4', 'C#4'],
    ['B#3', 'C#4'],
    ['C#4', 'C#4'],
    'C#4',
    ['D4', 'C#4'],
    ['C#4', 'D4'],
    ['C#4', 'C#4'],
    ['D4', 'C#4'],
    ['C#4', 'C#4'],
    ['B#3', 'C#4'],
    ['C#4', 'C#4'],
    'B3',
    ['B#3', 'B3'],
    ['B3', 'B#3'],
    ['B3', 'B3'],
    ['B#3', 'B3'],
    ['B3', 'B3'],
    ['A#3', 'B3'],
    ['B3', 'B3'],
    'B3',
    ['B#3', 'B3'],
    ['B3', 'B#3'],
    ['B3', 'B3'],
    ['B#3', 'B3'],
    ['B3', 'B3'],
    ['A#3', 'B3'],
    ['B3', 'B3']
  ];
  const highHatNotes = [
    ['G3', null],
    ['G3', null],
    [null, 'G3'],
    [null, ['A3', null]],
    ['G3', null],
    ['G3', 'G3'],
    ['G3', 'G3'],
    ['G3', 'G3'],
    ['G3', null],
    ['G3', null],
    [null, 'G3'],
    [null, ['A3', null]],
    ['G3', null],
    ['G3', 'G3'],
    ['G3', 'G3'],
    ['G3', 'G3']
  ];
  const kickNotes = ['C3', null, null, null, ['C3', 'C3'], null, null, null];
  /**
   * Effects
   */
  // let reverb1 = new Tone.Freeverb(0.3, 10000).receive('reverb').toMaster();
  // let reverb2 = new Tone.Freeverb(0.4, 10000).receive('reverb').toMaster();
  // let reverb3 = new Tone.Freeverb(0.8, 15000).receive('reverb').toMaster();

  /**
   * Delay
   */
  let feedbackDelay = new Tone.PingPongDelay({
    delayTime: '16n',
    feedback: 0.3,
    wet: 0.3
  }).toMaster();

  const pizzSynth = new Tone.MonoSynth({
    oscillator: {
      type: 'sawtooth'
    },
    filter: {
      Q: 3,
      type: 'highpass',
      rolloff: -12
    },
    envelope: {
      attack: 0.01,
      decay: 0.3,
      sustain: 0,
      release: 0.9
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0,
      release: 0.1,
      baseFrequency: 800,
      octaves: -1.2
    }
  }).connect(feedbackDelay);

  const pizzPart = new Tone.Sequence(
    function(time, note) {
      pizzSynth.triggerAttackRelease(note, '10hz', time);
    },
    pizzNotes,
    '16n'
  ).start();

  const bassSynth = new Tone.MonoSynth({
    oscillator: {
      type: 'fmsquare5',
      modulationType: 'triangle',
      modulationIndex: 2,
      harmonicity: 0.501
    },
    filter: {
      Q: 1,
      type: 'lowpass',
      rolloff: -24
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.4,
      release: 2
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.8,
      release: 1.5,
      baseFrequency: 50,
      octaves: 4.4
    }
  }).toMaster();

  const bassPart = new Tone.Sequence(
    function(time, note) {
      bassSynth.triggerAttackRelease(note, '10hz', time);
    },
    bassNotes,
    '16n'
  ).start();

  /**
   * Drums
   */
  const drums505 = new Tone.Sampler(
    {
      D4: 'snare.[mp3|ogg]',
      C3: 'kick.[mp3|ogg]',
      G3: 'hh.[mp3|ogg]',
      A3: 'hho.[mp3|ogg]'
    },
    {
      volume: 5,
      release: 1,
      baseUrl:
        'https://raw.githubusercontent.com/Tonejs/Tone.js/dev/examples/audio/505/'
    }
  ).toMaster();

  const highHatPart = new Tone.Sequence(
    function(time, note) {
      drums505.triggerAttackRelease(note, '4n', time);
    },
    highHatNotes,
    '16n'
  ).start('2m');

  const snarePart = new Tone.Sequence(
    function(time, note) {
      drums505.triggerAttackRelease('D4', '4n', time);
    },
    ['D4'],
    '4n'
  ).start('2:0:2');

  const kickPart = new Tone.Sequence(
    function(time, note) {
      console.log(note);
      drums505.triggerAttackRelease('C3', '4n', time);
    },
    kickNotes,
    '16n'
  ).start('2m');

  /**
   * Tone Transport
   */
  Tone.Transport.bpm.value = 60;
  Tone.Transport.swing = 0;
  Tone.Transport.swingSubdivision = '16n';
  Tone.Transport.loopStart = 0;

  /**
   * Play Controls
   */
  document.querySelector('body').addEventListener('click', function() {
    // Tone.Transport.stop();
    Tone.Transport.start('+0.1');
  });
})();
