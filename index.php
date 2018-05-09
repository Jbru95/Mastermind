<!DOCTYPE html>
<html lang="en">
<head>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="jslib/Mastermind.js"></script>
    <script>
        $(document).ready(function() {
            new Mastermind("form");
        });
    </script>
  <meta charset="UTF-8">
  <title>Mastermind Signin</title>
  <link href="mastermind.css" type="text/css" rel="stylesheet" />
</head>
<body>
<form id="signin">
  <fieldset>
    <p><img src="images/banner.png" width="521" height="346" alt="Mastermind Banner"></p>
    <p>Welcome to Mastermind</p>
    <p><label for="name">Your Name: </label>
      <input type="text" name="name" id="name"></p>
      <p class="gripe"></p>
    <p><input type="submit" value="Start Game"></p>
  </fieldset>
</form>
<form id="gameform">
    <fieldset>
        <p id="nameTitle"></p>
        <table class="game">
            <tr>
                <td>?:</td>
                <td>
                    <button name="pick" value="1"><img src="images/empty.png" alt="A empty sphere"></button>
                </td>
                <td>
                    <button name="pick" value="2"><img src="images/empty.png" alt="A empty sphere"></button>
                </td>
                <td>
                    <button name="pick" value="3"><img src="images/empty.png" alt="A empty sphere"></button>
                </td>
                <td>
                    <button name="pick" value="4"><img src="images/empty.png" alt="A empty sphere"></button>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
        <p class = "end"></p>
        <table class="picker">
            <tr>
                <td><img src="images/orange.png" alt="A orange.png sphere"><br><input type="radio" name="color" value="orange"></td>
                <td><img src="images/purple.png" alt="A purple.png sphere"><br><input type="radio" name="color" value="purple"></td>
                <td><img src="images/green.png" alt="A green.png sphere"><br><input type="radio" name="color" value="green"></td>
                <td><img src="images/red.png" alt="A red.png sphere"><br><input type="radio" name="color" value="red"></td>
                <td><img src="images/yellow.png" alt="A yellow.png sphere"><br><input type="radio" name="color" value="yellow"></td>
                <td><img src="images/blue.png" alt="A blue.png sphere"><br><input type="radio" name="color" value="blue"></td>
            </tr>
        </table>
        <p class="gripe"></p>
        <p><input id="guess" type="submit" name="guess" value="Guess">
            <input id="giveup" type="submit" name="giveup" value="Give Up">
            <input id="newgame" type="submit" name="newgame" value="New Game"></p>
        <p><input id="exit" type="submit" name="exit" value="Exit"></p>
    </fieldset>
</form>
<p class="solution"></p>
</body>
</html>
