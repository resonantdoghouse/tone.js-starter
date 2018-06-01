(function() {
  /**
   * Very helpful resources
   * http://tonejs.github.io/Presets/
   * https://tonejs.github.io/docs/r12/Sequence
   */

  /**
   * Effects
   */
  let reverb1 = new Tone.Freeverb(0.3, 10000).receive('reverb').toMaster();
  let reverb2 = new Tone.Freeverb(0.4, 10000).receive('reverb').toMaster();
  let reverb3 = new Tone.Freeverb(0.8, 15000).receive('reverb').toMaster();

  /**
   * Delay
   */
  let feedbackDelay = new Tone.PingPongDelay({
    delayTime: '1hz',
    feedback: 0.01,
    wet: 0.1
  }).toMaster();

  var fmSynth = new Tone.FMSynth({
    harmonicity: 3.01,
    modulationIndex: 14,
    oscillator: {
      type: 'triangle'
    },
    envelope: {
      attack: 0.2,
      decay: 0.3,
      sustain: 0.1,
      release: 1.2
    },
    modulation: {
      type: 'square'
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.5,
      sustain: 0.2,
      release: 0.1
    }
  }).toMaster();
  var synthPart = new Tone.Sequence(
    function(time, note) {
      fmSynth.triggerAttackRelease(note, '15hz', time);
    },
    [[['A1'], ['B2']], [['C1'], ['C2']], ['D3'],[['A2'], ['F2']], [['D1'], ['D2']], ['G3']],
    '8n'
  ).start(0);

  var fmSynth2 = new Tone.FMSynth({
    harmonicity: 8,
    modulationIndex: 2,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.001,
      decay: 2,
      sustain: 0.1,
      release: 2
    },
    modulation: {
      type: 'square'
    },
    modulationEnvelope: {
      attack: 0.002,
      decay: 0.2,
      sustain: 0,
      release: 0.2
    }
  }).toMaster();
  var synthPart2 = new Tone.Sequence(
    function(time, note) {
      fmSynth2.triggerAttackRelease(note, '10hz', time);
    },
    ['C4', [['F3'], ['C3']], [['B1'], ['A1']], ['C1']],
    '8n'
  ).start(0);

  /**
   * Drums
   */
  let drums505 = new Tone.Sampler(
    {
      A2: 'snare.[mp3|ogg]',
      A1: 'kick.[mp3|ogg]'
    },
    {
      volume: -15,
      release: 1,
      baseUrl:
        'https://raw.githubusercontent.com/Tonejs/Tone.js/dev/examples/audio/505/'
    }
  ).toMaster();

  // Snare Sequence
  var snarePart = new Tone.Sequence(
    function(time, note) {
      drums505.triggerAttackRelease('A2', '4n', time);
    },
    ['A2', 'A2', [['A2'], ['A2']], ['A2']],
    '8n'
  ).start(0);

  // Kick Sound
  let kick = new Tone.MembraneSynth({
    envelope: {
      sustain: 0,
      attack: 0.02,
      decay: 0.8
    },
    volume: -10,
    octaves: 10
  }).toMaster();

  // Kick Loop
  let kickPart = new Tone.Loop(function(time) {
    kick.triggerAttackRelease('C1', '10hz', time);
  }, '2n').start(0);

  /**
   * Setting up a basic sequence
   * https://tonejs.github.io/docs/r12/Sequence
   */
  var seq = new Tone.Sequence(
    function(time, note) {
      console.log(note);
      // 4n means quater notes however you can subdivide the rhythms
    },
    ['C4', 'E4', [['G4'], ['A4']], ['C3']],
    '4n'
  ).start(0);

  // let reverb = new Tone.JCReverb(0.6).connect(Tone.Master);
  // let reverb2 = new Tone.JCReverb(0.1).connect(Tone.Master);

  /**
   * Melody
   */
  // let mainMelody = new Tone.Synth({
  //   volume: -15,
  //   oscillator: {
  //     type: 'amtriangle',
  //     harmonicity: 0.5,
  //     modulationType: 'square'
  //   },
  //   envelope: {
  //     attackCurve: 'exponential',
  //     attack: 0.1,
  //     decay: 0.5,
  //     sustain: 0.5,
  //     release: 2
  //   },
  //   portamento: 0.02
  // }).connect(feedbackDelay);

  // let mainMelodyPart = new Tone.Sequence(
  //   function(time, note) {
  //     mainMelody.triggerAttackRelease(note, '5hz', time);
  //   },
  //   [
  //     'Bb3', // bar 1
  //     [[null, null], ['Bb3', 'A3']],
  //     'Bb3',
  //     [[null, null], ['Bb3', 'A3']],
  //     [['Bb3'], [null, 'C4']], // bar 2
  //     [['C4'], [null, 'Eb4']],
  //     'Eb4',
  //     [null, ['D4', 'Bb3']],
  //     [['C4'], [null, 'A3']], // bar 3
  //     [['F3'], ['D4', 'Bb3']],
  //     'C4',
  //     [[null], ['F4', 'Bb3']],
  //     [['Eb4'], [null, 'D4']], // bar 4, 6 beats
  //     [['D4'], [null, 'C4']],
  //     'C4',
  //     null,
  //     'Bb3',
  //     [['A3'], ['Bb4', 'A4']],
  //     'Bb4', // bar 5
  //     [[null, null], ['Bb4', 'A4']],
  //     'Bb4',
  //     [[null, null], ['Bb4', 'A4']],
  //     [['Bb4'], [null, 'C5']], // bar 6
  //     [['C5'], [null, 'Eb5']],
  //     'Eb5',
  //     [null, ['D5', 'Bb4']],
  //     [['C5'], [null, 'A4']], // bar 7
  //     [['F4'], ['D5', 'Bb4']],
  //     'C5',
  //     [[null], ['F5', 'Bb4']],
  //     [['Eb5'], [null, 'D5']], // bar 8
  //     [['D5'], [null, 'C5']],
  //     'C5',
  //     [null, ['Bb5', 'A5']],
  //     ['Bb5', 'F5'], // bar 9
  //     ['Eb5', ['Bb5', 'A5']],
  //     ['Bb5', 'F5'],
  //     ['Eb5', ['Bb5', 'A5']],
  //     [['A5', 'Bb5'], null], // bar 10
  //     ['F5', 'Bb4'],
  //     'Ab5',
  //     [null, ['Bb5', 'A5']]
  //   ]
  // ).start(0);

  // mainMelodyPart.probability = 1;
  // mainMelodyPart.loopEnd = '4m';

  /**
   * Bass Melody
   */
  // let bassMelody = new Tone.MonoSynth({
  //   volume: -20,
  //   oscillator: {
  //     type: 'square'
  //   },
  //   envelope: {
  //     attack: 0.05,
  //     decay: 0.3,
  //     sustain: 0.4,
  //     release: 0.8
  //   },
  //   filterEnvelope: {
  //     attack: 0.001,
  //     decay: 0.7,
  //     sustain: 0.1,
  //     release: 0.8,
  //     baseFrequency: 200,
  //     octaves: 4
  //   }
  // }).toMaster();

  // let bassMelodyPart = new Tone.Sequence(
  //   function(time, note) {
  //     bassMelody.triggerAttackRelease(note, '1hz', time);
  //   },
  //   [
  //     'Bb1', // bar 1
  //     null,
  //     'Eb1',
  //     null,
  //     'Bb1', //  bar 2
  //     null,
  //     'Bb1',
  //     ['Bb1', 'Bb1'],
  //     'F1', // bar 3
  //     ['F1', 'Bb1'],
  //     'F1',
  //     [null, 'D1'],
  //     ['Eb1', [null, 'F1']], // bar 4, 6 beats
  //     ['F1', [null, 'F1']],
  //     'F1',
  //     'F1',
  //     [null, ['F1']],
  //     [null, ['F1']],
  //     'Bb1', // bar 5
  //     'Bb1',
  //     'Eb1',
  //     'Eb1',
  //     'Bb1', // bar 6
  //     ['Bb1', [null, 'F2']],
  //     'Bb1',
  //     ['Bb1', 'Bb1'],
  //     'F1', // bar 7
  //     ['F2', 'F2'],
  //     'F1',
  //     ['F1', 'D1'],
  //     ['G1', [null, 'F1']], // bar 8
  //     ['F1', [null, 'F1']],
  //     'F1',
  //     'F1',
  //     'Bb1', // bar 9
  //     ['Eb1', 'Eb1'],
  //     'Bb1',
  //     ['Eb1', 'Eb1'],
  //     'Bb1', // bar 10
  //     'Bb2',
  //     ['Eb1', 'Eb1'],
  //     ['Eb1', 'F1']
  //   ]
  // ).start(0);

  // bassMelodyPart.probability = 1;

  Tone.Transport.bpm.value = 60;
  Tone.Transport.swing = 0.3;
  Tone.Transport.swingSubdivision = '16n';
  // Tone.Transport.loopStart  = 0;
  /**
   * Play Controls
   */
  document.querySelector('body').addEventListener('click', function() {
    // Tone.Transport.stop();
    Tone.Transport.start('+0.1');
  });

  // Tone.Transport.start();

  // });
})();
