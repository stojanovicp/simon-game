var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level =0;
var started = false;

if(started===false)
    {
        $("body").on("keypress", function(){
            nextSequence();
        });
    }

function nextSequence()
{
    var randNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randNumber];
    level++;
    $("h1").text("Level "+level);
    
    started=true;
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

$(".btn").on("click",function(event)
{
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
    var audio = new Audio ("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(currentLevel===gamePattern.length-1)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern=[];
        }
    }
    else{
        playSound("wrong");
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);
        started=false;
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}