function createSketch2() {
    return function(p) {
      let song;
      let fft;
      let bins = 64, smoothing = 0.7;
  
      p.preload = function() {
        song = p.loadSound('NajehRD1.wav');
      };
  
      p.setup = function() {
        p.createCanvas(400, 400).parent('visualization2');
        p.angleMode(p.DEGREES);
        p.noFill();
        fft = new p5.FFT(smoothing, bins);
        fft.setInput(song);  // Make sure FFT input is set to the song
      };
  
      p.draw = function() {
        p.background(0);
        p.stroke(0, 255, 0);  // Set stroke color to green for differentiation
        let spectrum = fft.analyze(); // Get the spectrum analysis from FFT
  
        let level = fft.getEnergy("mid");
        p.strokeWeight(Math.max(1, level / 150));  // Ensure there's always a visible stroke weight
  
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let innerRadius = Math.min(p.width, p.height) / 5;
        let outerRadius = Math.min(p.width, p.height) / 3;
  
        let numPoints = spectrum.length / 2;
        for (let i = 0; i < numPoints; i++) {
          let angle = p.map(i, 0, numPoints - 1, -90, 90); // Map from -90 to 90 degrees
          let mirrorAngle = 180 - angle;  // Calculate the mirrored angle
  
          let r = p.map(spectrum[i], 0, 255, innerRadius, outerRadius);
  
          let x1 = centerX + innerRadius * p.cos(angle);
          let y1 = centerY + innerRadius * p.sin(angle);
          let x2 = centerX + r * p.cos(angle);
          let y2 = centerY + r * p.sin(angle);
  
          p.line(x1, y1, x2, y2);
  
          let mx1 = centerX + innerRadius * p.cos(mirrorAngle);
          let my1 = centerY + innerRadius * p.sin(mirrorAngle);
          let mx2 = centerX + r * p.cos(mirrorAngle);
          let my2 = centerY + r * p.sin(mirrorAngle);
  
          p.line(mx1, my1, mx2, my2);
        }
      };
  
      p.playSong = function() {
        if (song && !song.isPlaying()) {
          song.play();
        }
      };
    };
  }
  
  let sketch2 = new p5(createSketch2());
  
  document.querySelector("#playButton").addEventListener("click", () => {
    sketch2.playSong();
  });
  