let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let play_again = document.getElementById("gameover");

const display_width = 800;
const display_height = 600;


canvas.addEventListener("click", onCanvasClick, false);

  function onCanvasClick(e) {
      var x; 
      var y;
      [x,y] = getCursorPosition(e);
      //alert([x,y]);
      
      
        window.location.href = "PlayGame.html";
        
  
      
  }

  function getCursorPosition(e) {
  	var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
	x = e.pageX;
	y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

return [x,y];
  }


  let lastTime = 0;

  function gameLoop(timestamp)
  {
      let deltaTime = timestamp - lastTime;
      lastTime = timestamp;
  
      ctx.drawImage(play_again,0,0, display_width,display_height); 
  
      requestAnimationFrame(gameLoop);
  }
  
  requestAnimationFrame(gameLoop); 