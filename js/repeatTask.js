var dateObj = new Date();
var year = dateObj.getUTCFullYear();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var month = ("0" + month).slice(-2); //months from 1-12 add a 0
var day = dateObj.getDate();
var day = ("0" + day).slice(-2);
var currentHours = dateObj.getHours();
var currentHours = ("0" + currentHours).slice(-2);
var currentMinutes = dateObj.getMinutes();
var currentMinutes = ("0" + currentMinutes).slice(-2);
var currentSeconds = dateObj.getSeconds();
var currentSeconds = ("0" + currentSeconds).slice(-2);
var formattedDate = year + "-" + month + "-" + day + "T" + currentHours + ":" + currentMinutes + ":" + currentSeconds;
var selectedDays = null;

$(".select-repeat").on('click', function () {
    $(".repeat-input")[0].value = $(this)[0].innerText;
    $('input[name="RepeatType"]')[0].value = $(this)[0].innerText;
    $(".repeat-days")[0].classList.add('visually-hidden');
    $(".repeat-start-date")[0].classList.add('visually-hidden');
    $(".repeat-on-date")[0].classList.add('visually-hidden');
});

$(".dropdown-no-repeat").on('click', function () {
    $(".repeat-input")[0].value = $(this)[0].innerText;
    $('input[name="RepeatType"]')[0].value = $(this)[0].innerText;
    $(".h-Start-Date")[0].value = formattedDate;
    $(".repeat-days")[0].classList.add('visually-hidden');
    $(".repeat-start-date")[0].classList.add('visually-hidden');
    $(".repeat-on-date")[0].classList.add('visually-hidden');
});

$(".daily").on('click', function () {
    $(".repeat-input")[0].value = $(this)[0].innerText;
    $('input[name="RepeatType"]')[0].value = $(this)[0].innerText;
    $(".h-Start-Date")[0].value = formattedDate;
    $(".repeat-days")[0].classList.add('visually-hidden');
    $(".repeat-start-date")[0].classList.add('visually-hidden');
    $(".repeat-on-date")[0].classList.add('visually-hidden');
});

$(".weekly").on('click', function () {
    $(".repeat-input")[0].value = $(this)[0].innerText;
    $('input[name="RepeatType"]')[0].value = $(this)[0].innerText;
    $(".repeat-days")[0].classList.remove('visually-hidden');
    $(".repeat-start-date")[0].classList.add('visually-hidden');
    $(".repeat-on-date")[0].classList.add('visually-hidden');
});

$(".monthly").on('click', function () {
    $(".repeat-input")[0].value = $(this)[0].innerText;
    $('input[name="RepeatType"]')[0].value = $(this)[0].innerText;
    $(".repeat-start-date")[0].classList.remove('visually-hidden');
    $(".repeat-days")[0].classList.add('visually-hidden');
    $(".repeat-on-date")[0].classList.add('visually-hidden');
});

$(".yearly").on('click', function () {
    $(".repeat-input")[0].value = $(this)[0].innerText;
    $('input[name="RepeatType"]')[0].value = $(this)[0].innerText;
    $(".repeat-on-date")[0].classList.remove('visually-hidden');
    $(".repeat-days")[0].classList.add('visually-hidden');
    $(".repeat-start-date")[0].classList.add('visually-hidden');
});