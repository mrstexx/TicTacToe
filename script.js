// Choose X or O player - visual
$(window).on('load', function () {
    firstModal();
});

function firstModal() {
    $('#exampleModalCenter').modal('show');
    $('#modalBody').prepend('<div class="row" id="choosePlayer">' +
        '<div class="col">' +
        '<button type="button" id="chooseX" class="btn btn-outline-danger btn-block">X</button>' +
        '</div>' +
        '<div class="col">' +
        '<button type="button" id="chooseO" class="btn btn-outline-danger btn-block">O</button>' +
        '</div>' +
        '</div>');
}

// Variables
var isX = false;
var isO = false;
var num;
var fields = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Choose X or O player - logical
$(document).ready(function () {

    $('#chooseX').on('click', function () {
        isX = true;
        $('#exampleModalCenter').modal('hide');
    });

    $('#chooseO').on('click', function () {
        isO = true;
        $('#exampleModalCenter').modal('hide');
        computerLogic("X");
    });

});

// Close buttons - header and footer
$('#closeButton').click(function () {
    $('.field').off('click');
});

$('#closeButton1').click(function () {
    $('.field').off('click');
});

$('.field').on('click', function () {
    num = $(this).attr('name');
    num = Number.parseInt(num);
    if (isX) {
        if (fields[num - 1] != "X" && fields[num - 1] != "O") {
            fields[num - 1] = "X";
            $('.field[name=' + num + ']').prepend("X");
            computerLogic("O");
            checkWrite();
        }
    } else {
        fields[num - 1] = "O";
        $('.field[name=' + num + ']').prepend("O");
        computerLogic("X");
        checkWrite();
    }
});

// Check win or draw end
function checkWin() {
    if (fields[0] === fields[1] && fields[1] === fields[2] && fields[0] === fields[2]) {
        return fields[0];
    } else if (fields[3] === fields[4] && fields[4] === fields[5] && fields[3] === fields[5]) {
        return fields[3];
    } else if (fields[6] === fields[7] && fields[7] === fields[8] && fields[6] === fields[8]) {
        return fields[6];
    } else if (fields[0] === fields[3] && fields[3] === fields[6] && fields[0] === fields[6]) {
        return fields[0];
    } else if (fields[1] === fields[4] && fields[4] === fields[7] && fields[1] === fields[7]) {
        return fields[1];
    } else if (fields[2] === fields[5] && fields[5] === fields[8] && fields[2] === fields[8]) {
        return fields[2];
    } else if (fields[0] === fields[4] && fields[4] === fields[8] && fields[0] === fields[8]) {
        return fields[0];
    } else if (fields[2] === fields[4] && fields[4] === fields[6] && fields[2] === fields[6]) {
        return fields[4];
    }
}

function checkDraw() {
    for (var i = 0; i < fields.length; i++) {
        if (Number.isInteger(Number.parseInt(fields[i]))) {
            return false;
        }
    }
    return true;
}

function checkWrite() {
    if (checkWin() === "X") {
        $('#exampleModalLongTitle').empty();
        $('#modalBody').empty();
        $('#exampleModalCenter').modal('show');
        $('#exampleModalLongTitle').prepend("Game Over");
        $('#modalBody').prepend('<h3>X player won!</h3>');
        $('#footer').prepend('<button type="button" class="btn btn-primary" id="resetGame">Play Again</button>');

        // Play again button
        $('#resetGame').on('click', function () {
            location.reload();
        });
    } else if (checkWin() === "O") {
        $('#exampleModalLongTitle').empty();
        $('#modalBody').empty();
        $('#exampleModalCenter').modal('show');
        $('#exampleModalLongTitle').prepend("Game Over");
        $('#modalBody').prepend('<h3>O player won!</h3>');
        $('#footer').prepend('<button type="button" class="btn btn-primary" id="resetGame">Play Again</button>');

        // Play again button
        $('#resetGame').on('click', function () {
            location.reload();
        });
    } else if (checkDraw()) {
        $('#exampleModalLongTitle').empty();
        $('#modalBody').empty();
        $('#footer').empty();
        $('#exampleModalCenter').modal('show');
        $('#exampleModalLongTitle').prepend("Game Over");
        $('#modalBody').prepend('<h3>Draw!</h3>');
        $('#footer').prepend('<button type="button" class="btn btn-primary" id="resetGame">Play Again</button>');

        // Play again button
        $('#resetGame').on('click', function () {
            location.reload();
        });
    } else {
        return false;
    }
}

// Computer player
function computerLogic(player) {
    var x;
    var randomNumber = uniqueRandomNumber();
    if (fields.indexOf(Number.toString(randomNumber)) == -1) {
        fields[randomNumber - 1] = player;
        x = $('.field[name=' + randomNumber + ']');
        x.append(player);
    }
}

function uniqueRandomNumber() {
    var i = 0;
    var randomNumber;
    while (i < fields.length) {
        randomNumber = Math.floor((Math.random() * 9) + 1);
        if (Number.parseInt(fields[randomNumber - 1]) === randomNumber) {
            break;
        }
        i++;
    }
    return randomNumber;
}