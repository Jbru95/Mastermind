function Mastermind() {

    this.name_form = $("#signin");
    this.game_form = $('#gameform')
    this.game_form.hide();
    this.guessRows = 0;
    this.winCount = 0;
    this.selectedColor = "";
    this.tableHtml = "";
    this.name = "";
    this.originalGameForm = this.game_form.html();
    this.gameState = "name";
    this.guessArray = ["", "", "", ""];
    this.answerArray = this.generateAnswerArray();
    this.updateCheat();
    this.matchedArray = [];
    var that = this;

    console.log(this.answerArray);


    for(var i = 0; i<6; i++){
        this.configureRadio(i);
        if(i < 4){
            this.configureGuessRow(i);
        }
    }

    this.configNameSubmit();
    this.configGuess();
    this.configGiveUp();
    this.configExit();
    this.configNewGame();


    this.name_form.submit(function(event) {
        event.preventDefault();

        that.name = $("#name").val();

        if(that.name.length != 0) {
            $(".gripe").text("");
            $("#nameTitle").text(that.name + "'s Mastermind");

            that.name_form.fadeOut(1000);
            that.game_form.delay(1000).fadeIn(1000);
            that.gameState = "game";
            console.log(that.gameState);
        }
        else{
            $(".gripe").text("Please enter a name!");
        }
    });

}

Mastermind.prototype.configNewGame = function(){

    var that = this;

    $('#newgame').click(function(event) {
        console.log("ngame");
        event.preventDefault();
        $("table.picker").show();
        $("input#giveup").show();
        $("input#guess").show();
        $("p.end").text("");
        that.guessRows = 0;
        that.winCount = 0;
        that.selectedColor = "";
        that.tableHtml = "";
        that.game_form.html(that.originalGameForm);
        that.guessArray = ["", "", "", ""];
        that.answerArray = that.generateAnswerArray();
        that.updateCheat();
        that.matchedArray = [];

        for(var i = 0; i<6; i++){
            that.configureRadio(i);
            if(i < 4){
                that.configureGuessRow(i);
            }
        }

        $("#nameTitle").text(that.name + "'s Mastermind");
        that.configNameSubmit();
        that.configGuess();
        that.configGiveUp();
        that.configExit();
        that.configNewGame();
    });
}

Mastermind.prototype.configGiveUp = function(){

    var that = this;

    $('#giveup').click(function(event) {
        console.log("giveup");
        event.preventDefault();

        var table = $("table.game");
        var table_html = "<tbody>";
        var trs = table.children("tbody").children();

        trs.each(function(count) {

            if (count < that.guessRows) {

                table_html += "<tr>";
                table_html += trs[count].innerHTML;
                table_html += "</tr>";
            }
            else if (count == that.guessRows) {
                table_html += "<tr><td>" + (that.guessRows + 1) + ":</td>";
                for (var i = 0; i < 4; i++) {
                    var row = "<td><img src=images/" + that.answerArray[i] + ".png></td>";
                    table_html += row;
                }
                table_html += "<td>&nbsp;";
                for (var j = 0; j < 4; j++) {

                    table_html += "<img src='images/redpeg.png' alt='Red Peg'>&nbsp;";
                }
                table_html += "</td></tr>";
            }
        });
        $("table.picker").hide();
        $("input#giveup").hide();
        $("input#guess").hide();
        $("p.end").text("You gave up!");
        table.html(table_html);


    });
}


Mastermind.prototype.configNameSubmit = function(){
    var that = this;

    this.name_form.submit(function(event) {
        event.preventDefault();

        that.name = $("#name").val();

        if(that.name.length != 0) {
            $(".gripe").text("");
            $("#nameTitle").text(that.name + "'s Mastermind");

            that.name_form.fadeOut(1000);
            that.game_form.delay(1000).fadeIn(1000);
            that.gameState = "game";
            console.log(that.gameState);
        }
        else{
            $(".gripe").text("Please enter a name!");
        }
    });

}


Mastermind.prototype.configGuess = function(){

    var that = this;

    $('#guess').click(function(event) {

        event.preventDefault();
        for(var i = 0; i<4; i++){
            if(that.guessArray[i] == ""){

                $("p.gripe").text("Must select a color for all spheres!").show().delay(2000).fadeOut(1000);
                return;

            }
        }

        that.matchedArray=[];
        var table = $("table.game");
        var table_html = "<tbody>";
        var trs = table.children("tbody").children();

        trs.each(function(count) {

            if (count < that.guessRows) {

                table_html += "<tr>";
                table_html += trs[count].innerHTML;
                table_html += "</tr>";
            }
            else if (count == that.guessRows) {
                table_html += "<tr><td>" + (that.guessRows + 1) + ":</td>";
                for (var i = 0; i < 4; i++) {
                    var row = "<td><img src=images/" + that.guessArray[i] + ".png></td>";
                    table_html += row;
                }
                table_html += "<td>&nbsp;";
                for (var j = 0; j < 4; j++) {
                    if (that.guessArray[j] == that.answerArray[j]) {
                        table_html += "<img src='images/redpeg.png' alt='Red Peg'>&nbsp;";
                        that.winCount += 1;
                        that.matchedArray.push(that.guessArray[j]);
                    }
                }
                for (var k = 0; k < 4; k++) {
                    if (($.inArray(that.guessArray[k], that.answerArray) != -1) && ($.inArray(that.guessArray[k], that.matchedArray) == -1)) {
                        table_html += "<img src='images/whitepeg.png' alt='White Peg'>&nbsp;";
                    }
                }
                table_html += "</td></tr>";
            }
        });
        console.log(that.winCount);
        if(that.winCount != 4) {
            that.winCount = 0;
            table_html += '<tr>\n' +
                '                <td>?:</td>\n' +
                '                <td>\n' +
                '                    <button name="pick" value="1"><img src="images/empty.png" alt="A empty sphere"></button>\n' +
                '                </td>\n' +
                '                <td>\n' +
                '                    <button name="pick" value="2"><img src="images/empty.png" alt="A empty sphere"></button>\n' +
                '                </td>\n' +
                '                <td>\n' +
                '                    <button name="pick" value="3"><img src="images/empty.png" alt="A empty sphere"></button>\n' +
                '                </td>\n' +
                '                <td>\n' +
                '                    <button name="pick" value="4"><img src="images/empty.png" alt="A empty sphere"></button>\n' +
                '                </td>\n' +
                '                <td>&nbsp;</td>\n' +
                '            </tr>\n' +
                '        </tbody>';
            table.html(table_html);
            that.guessRows++;
            that.guessArray = ["", "", "", ""];
            that.resetGuessRow();
            that.matchedArray = [];
            for(var i = 0; i<6; i++){
                that.configureRadio(i);
                if(i < 4){
                    that.configureGuessRow(i);
                }
            }
        }
        else{
            table.html(table_html);
            $("table.picker").hide();
            $("input#giveup").hide();
            $("input#guess").hide();
            $("p.end").text("You won!");
        }

    });
}




Mastermind.prototype.configureGuessRow = function(index){
    var that = this;

    var button = $(that.game_form.find("button").get(index));

    button.click(function(event){
        event.preventDefault();
        if(that.selectedColor != ""){
            button.children().attr("src", "images/" + that.selectedColor + ".png")
            button.children().attr("alt", "A " + that.selectedColor + " sphere");
            that.guessArray[index] = that.selectedColor;
        }
    });
}


Mastermind.prototype.resetGuessRow = function(){
    var that = this;

    for(var i = 0; i<4; i++){
        var button = $(that.game_form.find("button").get(i));
        button.children().attr("src", "images/empty.png");
        button.children().attr("alt", "An empty sphere");
    }
}


Mastermind.prototype.configureRadio = function(index){
    var radio = $(this.game_form.find("table.picker input").get(index));
    var that = this;

    radio.click(function(event) {
        that.selectedColor = radio.val();
        console.log(that.selectedColor);
    });
}


Mastermind.prototype.configExit = function(){

    var that = this;

    $('#exit').click(function(event) {
        event.preventDefault();
        window.location.assign("./");
    });
}

Mastermind.prototype.generateAnswerArray = function(){
    var colorArray = ['orange', 'purple', 'green', 'red', 'yellow', 'blue'];

    var answerArray = [];
    while(answerArray.length < 4){
        var randomIndex = Math.floor(Math.random()*6);

        if(answerArray.indexOf(colorArray[randomIndex]) == -1){
            answerArray.push(colorArray[randomIndex]);
        }
    }

    return answerArray;
}

Mastermind.prototype.updateCheat = function(){
    var that = this;
    var answerArray = this.answerArray;

    var solutionHtml = "<p>";

    for (var i = 0; i < 4; i++) {
        solutionHtml += "<img src=images/" + that.answerArray[i] + ".png>";
    }

    $("p.solution").html(solutionHtml);
}


