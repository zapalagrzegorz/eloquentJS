

  let cat = document.querySelector("#cat");
  let hat = document.querySelector("#hat");

  let angle = 0;
  let lastTime = null;
  function animate(time) {
    if (lastTime != null) angle += (time - lastTime) * 0.001;
    lastTime = time;
    // cat.style.top = (Math.sin(angle) * 40 + 100) + "px";
    // cat.style.left = (Math.cos(angle) * 100 + 430) + "px";
    // hat.style.top = (Math.sin(-angle) * 100 ) + "px";
    // hat.style.left = (Math.cos(-angle) * 80 + 10) + "px";
    cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
    cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
    hat.style.top = (Math.sin(angle + Math.PI) * 40 + 40) + "px";
    hat.style.left = (Math.cos(angle + Math.PI) * 200 + 230) + "px";

    // Your extensions here.

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);