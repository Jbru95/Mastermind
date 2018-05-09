/*! DO NOT EDIT exam 2018-04-26 */
function Mastermind() {

    this.name_form = $("#signin");
    this.game_form = $('#gameform')
    this.game_form.hide();
    this.guessRows = 0;
    this.winCount = 0;
    this.selectedColor = "";
    this.tableHtml = "";
    this.name = "";
    this.gameState = "name";
    this.guessArray = ["", "", "", ""];
    this.answerArray = ['blue', 'green', 'orange', 'purple'];
    var that = this;

    for(var i = 0; i<6; i++){
        this.configureRadio(i);
        if(i < 4){
            this.configureGuessRow(i);
        }
    }

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




    $('#guess').click(function(event) {

        event.preventDefault();
        for(var i = 0; i<4; i++){
            if(that.guessArray[i] == ""){
                console.log(that.guessArray[i]);
                return;
            }
        }

        var matchedArray=[];
        var table = $("table.game");
        var table_html = "<tbody>";
        var trs = table.children("tbody").children();

        trs.each(function(count) {
            console.log("grow:", that.guessRows);
            console.log("cnt: " ,count);
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
                console.log("G: ", that.guessArray, " A: ",that.answerArray, " M: ", matchedArray);
                for (var j = 0; j < 4; j++) {
                    if (that.guessArray[j] == that.answerArray[j]) {
                        table_html += "<img src='images/redpeg.png' alt='Red Peg'>&nbsp;";
                        that.winCount += 1;
                        matchedArray.push(that.guessArray[j]);
                    }
                }
                console.log("after matchG: ", that.guessArray, " A: ",that.answerArray, " M: ", matchedArray);
                for (var k = 0; k < 4; k++) {
                    console.log(that.guessArray[k], $.inArray(that.guessArray[k], that.answerArray));
                    if (($.inArray(that.guessArray[k], that.answerArray) != -1) && ($.inArray(that.guessArray[k], matchedArray) == -1)) {
                        table_html += "<img src='images/whitepeg.png' alt='White Peg'>&nbsp;";
                    }
                }
                console.log("after both G: ", that.guessArray, " A: ",that.answerArray, " M: ", matchedArray);
                table_html += "</td></tr>";
            }
        });
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
        for(var i = 0; i<6; i++){
            that.configureRadio(i);
            if(i < 4){
                that.configureGuessRow(i);
            }
        }


    });

    $('#exit').click(function(event) {
        console.log("exit");
        event.preventDefault();
        that.name = $("#name").val("");
        that.gameState = "name";
        that.name = "";
        that.game_form.fadeOut(1000);
        that.name_form.delay(1000).fadeIn(1000);
    });

    $('#giveup').click(function(event) {
        console.log("giveup");
        event.preventDefault();


    });

    $('#newgame').click(function(event) {
        console.log("ngame");
        event.preventDefault();


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