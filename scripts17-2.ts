// Earlier in the chapter, we saw an example program that drew a pie chart. Modify this program so that the name of each category is shown next to the slice that represents it. Try to find a pleasing-looking way to automatically position this text that would work for other data sets as well. You may assume that categories are big enough to leave ample room for their labels.

// You might need Math.sin and Math.cos again, which are described in Chapter 14.

//     <canvas width="600" height="300"></canvas>
window.addEventListener('DOMContentLoaded', () => {
  const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
  if (!canvas) {
    return;
  }
  const cx:CanvasRenderingContext2D = canvas.getContext('2d')!;

  const results = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
  ];
  const total = results.reduce((sum, { count }) => sum + count, 0);
  let currentAngle = -0.5 * Math.PI;
  const centerX = 300;
  const centerY = 150;
  const r = 100;

  // Add code to draw the slice labels in this loop.
  for (const result of results) {
    const sliceAngle = (result.count / total) * 2 * Math.PI;
    const textAngle = currentAngle + sliceAngle/2;

    const textAlign  = Math.cos(textAngle) >= 0 ? "start" : "end";
    const textXOffset  = Math.cos(textAngle) >= 0 ? 0 : -60;
    // const textOffset = 0;

    const textXPosition = (centerX + 20 + textXOffset + r * Math.cos(textAngle));
    const textYPosition = (centerY + 20 + r * Math.sin(textAngle)); // note 2.

    cx.beginPath();
    cx.arc(centerX, centerY, r, currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();

    cx.font = '16px Georgia';
    // cx.fillStyle = 'fuchsia';
    cx.textAlign = textAlign;
    cx.fillText(result.name, textXPosition, textYPosition, );
  }
});
