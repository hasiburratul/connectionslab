const Tone = window.Tone;
let osc;

const types = document.querySelectorAll('.typeOption');
types.forEach(type => {
  type.addEventListener('click', () => {
    if (osc) {
      osc.type = type.value;
    }
  })
});

let playing = false;

const buttonEl = document.querySelector('button');
const volumeEl = document.querySelector('#volume');
const frequencyEl = document.querySelector('#frequency');

volumeEl.addEventListener('change', () => {
  let vol = volumeEl.valueAsNumber;
  console.log(vol);
  osc.set({
    volume: vol
  });
});

frequencyEl.addEventListener('change', () => {
  let freq = frequencyEl.valueAsNumber;
  console.log(freq);
  osc.set({
    frequency: freq
  })
})

buttonEl.addEventListener('click', async (e) => {
  if (playing) {
    buttonEl.innerText = 'Start'
    osc.stop();
  } else {
    buttonEl.innerText = 'Stop';
    let waveType;
    types.forEach(type => {
      if (type.checked) {
        waveType = type.value;
      }
    });
    osc = new Tone.Oscillator({
      type: waveType,
      frequency: frequencyEl.valueAsNumber,
      volume: volumeEl.valueAsNumber,
    }).toDestination();
    console.log(osc.get())
    osc.start();
  }
  playing = !playing;
});