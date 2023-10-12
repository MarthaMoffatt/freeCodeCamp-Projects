
function Buttons({ name, src, letter, setDisplayText, volume, power }) {
  
    const [tap, setTap] = React.useState(false)
    const audioSrc = React.useRef();

  const playNote = () => {
    setTap(true);
    setTimeout(() => setTap(false), 100);
    if (power) {
      audioSrc.current.volume = volume;
      audioSrc.current.play();
      setDisplayText(name.replace(/[-]/g, " "));
    }
  };

  const handleKeyPress = (event) => {
    if (power) {
      if (event.key === audioSrc.current.id.toUpperCase()) {
        playNote();
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [power]);

  return (
    <div id={name} className={ tap ? "drum-pad active" : "drum-pad"} onClick={playNote}>
      <audio className="clip" ref={audioSrc} id={letter} src={src}></audio>
      {letter}
    </div>
  );
}

function Display({displayText}) {
  return (
    <div id="display" className="display">{displayText}</div>
  )
}

function Controler({ handleVolume, volume }) {
  return (
    <label htmlFor="volume">
      Volume Control
      <input
        type="range"
        className="volume"
        min={0}
        value={volume}
        max={1}
        step={0.01}
        onChange={handleVolume}
      />
    </label>
  );
}

 function Toggle({id, name, label, onClick}) {
  return (
    <label htmlFor={label}>
      {name}
      <div className="toggleBody">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          autoComplete="off"
          onClick={onClick}
        ></input>
        <span></span>
      </div>
    </label>
  );
}

const Heater = [
  {
    letter: "Q",
    name: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    letter: "W",
    name: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    letter: "E",
    name: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    letter: "A",
    name: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    letter: "S",
    name: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    letter: "D",
    name: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    letter: "Z",
    name: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    letter: "X",
    name: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    letter: "C",
    name: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const Piano = [
  {
    letter: "Q",
    name: "Chord-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    letter: "W",
    name: "Chord-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    letter: "E",
    name: "Chord-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    letter: "A",
    name: "Shaker",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    letter: "S",
    name: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    letter: "D",
    name: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    letter: "Z",
    name: "Punchy-Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    letter: "X",
    name: "Side-Stick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    letter: "C",
    name: "Snare",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [bank, setBank] = React.useState(false);
  const [power, setPower] = React.useState(false);
  const [displayText, setDisplayText] = React.useState("");
  const [volume, setVolume] = React.useState(1);

  const handleTogglePower = () => {
    setPower((prev) => !prev);
    if (power) setDisplayText("");
  };
  const handleToggleBank = () => {
    setBank((prev) => !prev);
    if (power) {
      if (!bank) setDisplayText("Smooth Piano Kit");
      if (bank) setDisplayText("Heater Kit");
    }
  };

  const handleVolume = (event) => {
    setVolume(event.target.value);
  };

  
  return (
    <div className="container" id="drum-machine">
      <div className={`buttons ${power ? "powerOn" : ""}`}>
        {!bank &&
          Piano.map((btn) => {
            return (
              <Buttons
              key={btn.name}
              name={btn.name}
              letter={btn.letter}
              src={btn.src}
              volume={volume}
              power={power}
              setDisplayText={setDisplayText}
              />
            );
          })}

        {bank &&
          Heater.map((btn) => {
            return (
              <Buttons
              key={btn.name}
              name={btn.name}
              letter={btn.letter}
              src={btn.src}
              volume={volume}
              power={power}
              setDisplayText={setDisplayText}
              />
            );
          })}
      </div>
      <div className="inputs">
        <Toggle
          id="power"
          name="O/I"
          label="power"
          onClick={handleTogglePower}
        />
        <Display displayText={displayText} />
        <Toggle id="bank" name="BANK" label="bank" onClick={handleToggleBank} />
        <Controler volume={volume} handleVolume={handleVolume} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
