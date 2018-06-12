(function() {
  /**
   * Effects
   */
  let reverb1 = new Tone.Freeverb(0.3, 10000).receive("reverb").toMaster();
  let reverb2 = new Tone.Freeverb(0.4, 10000).receive("reverb").toMaster();
  let reverb3 = new Tone.Freeverb(0.8, 15000).receive("reverb").toMaster();

  /**
   * Delay
   */
  let feedbackDelay = new Tone.PingPongDelay({
    delayTime: "1hz",
    feedback: 0.01,
    wet: 0.1
  }).toMaster();

  // var fmSynth = new Tone.FMSynth({
  //   harmonicity: 3.01,
  //   modulationIndex: 14,
  //   oscillator: {
  //     type: 'triangle'
  //   },
  //   envelope: {
  //     attack: 0.2,
  //     decay: 0.3,
  //     sustain: 0.1,
  //     release: 1.2
  //   },
  //   modulation: {
  //     type: 'square'
  //   },
  //   modulationEnvelope: {
  //     attack: 0.01,
  //     decay: 0.5,
  //     sustain: 0.2,
  //     release: 0.1
  //   }
  // }).toMaster();

  // var synthPart = new Tone.Sequence(
  //   function(time, note) {
  //     fmSynth.triggerAttackRelease(note, '15hz', time);
  //   },
  //   [[['A1'], ['B2']], [['C1'], ['C2']], ['D3'],[['A2'], ['F2']], [['D1'], ['D2']], ['G3']],
  //   '8n'
  // ).start(0);

  // var fmSynth2 = new Tone.FMSynth({
  //   harmonicity: 8,
  //   modulationIndex: 2,
  //   oscillator: {
  //     type: 'sine'
  //   },
  //   envelope: {
  //     attack: 0.001,
  //     decay: 2,
  //     sustain: 0.1,
  //     release: 2
  //   },
  //   modulation: {
  //     type: 'square'
  //   },
  //   modulationEnvelope: {
  //     attack: 0.002,
  //     decay: 0.2,
  //     sustain: 0,
  //     release: 0.2
  //   }
  // }).toMaster();

  // var synthPart2 = new Tone.Sequence(
  //   function(time, note) {
  //     fmSynth2.triggerAttackRelease(note, '10hz', time);
  //   },
  //   ['C4', [['F3'], ['C3']], [['B1'], ['A1']], ['C1']],
  //   '8n'
  // ).start(0);

  /**
   * Drums
   */
  let drums505 = new Tone.Sampler(
    {
      D4: "snare.[mp3|ogg]",
      A1: "kick.[mp3|ogg]"
    },
    {
      volume: -15,
      release: 1,
      baseUrl:
        "https://raw.githubusercontent.com/Tonejs/Tone.js/dev/examples/audio/505/"
    }
  ).toMaster();

  /**
   * Snare Sequence
   * Rhythm to YYZ :)
   */
  var snarePart = new Tone.Sequence(
    function(time, note) {
      drums505.triggerAttackRelease("D4", "4n", time);
    },
    [
      "D4",
      ["D4", "D4"],
      [null, "D4"],
      [null, "D4"],
      [null, "D4"],
      "D4",
      "D4",
      "D4",
      "D4",
      ["D4", "D4"]
    ],
    "16n"
  ).start(0);

  // Kick Sound
  // let kick = new Tone.MembraneSynth({
  //   envelope: {
  //     sustain: 0,
  //     attack: 0.02,
  //     decay: 0.8
  //   },
  //   volume: -10,
  //   octaves: 10
  // }).toMaster();

  // // Kick Loop
  // let kickPart = new Tone.Loop(function(time) {
  //   kick.triggerAttackRelease('C1', '10hz', time);
  // }, '2n').start(0);

  /**
   * Setting up a basic sequence
   * https://tonejs.github.io/docs/r12/Sequence
   */
  // var seq = new Tone.Sequence(
  //   function(time, note) {
  //     console.log(note);
  //     // 4n means quater notes however you can subdivide the rhythms
  //   },
  //   ['C4', 'E4', [['G4'], ['A4']], ['C3']],
  //   '4n'
  // ).start(0);

  Tone.Transport.bpm.value = 60;
  Tone.Transport.swing = 0;
  Tone.Transport.swingSubdivision = "16n";
  // Tone.Transport.loopStart  = 0;

  /**
   * Play Controls
   */
  document.querySelector("body").addEventListener("click", function() {
    // Tone.Transport.stop();
    Tone.Transport.start("+0.1");
  });
})();
