//Fiona Yang 2020-07-01
//HTML Canvas Animated Chart


//DECLARE THE FUNCKTION TO DRAW THE PICTURES
// Declare the valu of the drawCircle
function drawCircle(canvasId, data_arr, color_arr, text_arr) {
    
    // DECLARE CANVAS AND CONTEXT
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    
    // SET THE RADIUS FOR CIRCLE（canvas hight/2 - numbers）
    var radius = c.height / 2 - 160;
    // SET THE CENTER of THE CIRCLE
    var ox = radius + 160, oy = radius + 60; 
    
    // DRAW THE RECTANGLE ICON OF DATA DESCRIPTION
    var width = 30, height = 10;//icons size
    var posX = ox - 80, posY = oy*2 +20;  //icons positon
    
    // DATA DESCRIPTION
    var textX = posX + width + 15, textY = posY + 10; //text position
    
    // THE START AND END ANGLE of Circle
    var startAngle = 0; 
    var endAngle = 0;   
    
    //Translate data as %
    var totleNb = 0;
    var new_data_arr = [];
    
    // SET THE FOR LOOP TO GET THE TOTAL NUMBER
    for (var i = 0; i < data_arr.length; i++) {
        totleNb += data_arr[i];
    }
    // SET THE FOR LOOP TO TRANSLATE NUMBER TO PERCENTAGE
    for (var i = 0; i < data_arr.length; i++) {
        new_data_arr.push( data_arr[i]/totleNb );
    }

        // SET FOR LOOP TO DEFINE THE DATA TEXT IN DESCRIPTION
        for (var i = 0; i < data_arr.length; i++) {
            ctx.fillStyle = color_arr[i];// Set the icon color same with the related part in pie
            //DEFINE THE COORDINATES
            ctx.fillRect(posX, posY + 25 * i, width, height);

            //DEFINE THE Font size, family, color
            ctx.font = '14px Roboto';
            ctx.fillStyle = '#fff';
            //PRINT OUT
            var percent = text_arr[i] + "：" + parseInt(100 * new_data_arr[i]) + "%";
            ctx.fillText(percent, textX, textY + 25 * i);
        }

    // DECLARE A VARIABLE TO USE AS A COUNTER
    var iNow = 0;
    var moveNomber = 100;//Speed
    var timer = null;//Stop
    
    // DRAW THE PIE
    pieDraw();
    
    // DECLARE THE FUNCTION THAT WILL ANIMATE THE PIE
    function pieDraw(mousePosition) {
        clearInterval(timer);
        timer = setInterval(function() {
            iNow++;
            console.log(iNow);
            //SET UP THE CONDITION TO ACT
            if(mousePosition) {
                clearInterval(timer);
                iNow = moveNomber;
                
            } 
            //SET UP THE CONDITION TO STOP
            else if(iNow>moveNomber) {
                clearInterval(timer);
                timer = null;
                return false;
            }

            //USE clearRect() TO CLEAN UP THE CANVAS
            ctx.clearRect(0, 0, ox * 2 + 20, oy * 2 + 20);
            
            // CALL THE FOR LOOP TO DRAW THE PIE
            for (var j = 0; j < data_arr.length; j++) { 
                endAngle = endAngle + new_data_arr[j]* iNow/moveNomber * Math.PI * 2; //End OF ANGLE
                ctx.fillStyle = color_arr[j];//DEFINE SAME COLOR AS THE DATES
                ctx.beginPath();
                ctx.moveTo(ox, oy); //The center of the circle
                ctx.arc(ox, oy, radius, startAngle, endAngle, false); 
                console.log(mousePosition, mousePosition && ctx.isPointInPath(mousePosition.x, mousePosition.y));
                ctx.closePath();
                ctx.fill();

                // SET THE START AND END ANGLE FOR EACH SLICE OF PIE 
                startAngle = endAngle; 
                // SET THE CONDITION
                if( j == data_arr.length-1 ) {
                    startAngle = 0;
                    endAngle = 0;
                }
            }

        },15);//THE SPEED OF PIE ANIMATION
    }
}

//DECLARE FUNCTION THAT CALL TO USE THE VALUE
function init() {
    // Set data color and text in value
    var data_arr = [30, 30, 17, 18, 5];
    var color_arr = ["#6a48b6", "#f26c4f", "#fbaf5d", "#d24297", "#bd8cbf"];
    var text_arr = ["Grphic Design", "Web Design", "Motion Graphic", "HTML, CSS", "JS & PHP"];
    drawCircle("pie_chart", data_arr, color_arr,text_arr);

}

//OUTPUT
window.onload = init;
