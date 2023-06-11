let listOfGreetings = ["hello", "salutation", "greetings", "welcome"];
let listOfGoodbyes = ["farewell", "godspeed", "good-bye", "bye"];
let listOfLearnedWords = ["hello", "salutation", "greetings", "welcome", "farewell", "godspeed", "good-bye", "bye"];
let listOfKeywords = ["happy", "key", "keyword", "keyphrase", "no", "stop", "cancel"];
let listOfUnknownWords = [];
let listOfMessages = [];
let listOfKeyPhrases = [];
let listOfKeyResponses = [];

let learning = false;
let waitingOnResponse = false;

// Functions
function scrollToBottom() {
    const messages = $("#chatBox")[0];
    messages.scrollTop = messages.scrollHeight;
}

function Opener() {
    var chatBox = $("#chatBox")[0];
    var chatOpener = `<div class="display-inline-flex "><img src="img/Elias.jpg" class="elias-profile-picture" alt="elias profile picture" /><p class="margin-auto margin-left-20 bold e-chatbox">`;
    var chatMessage = "";
    var chatCloser = `</p></div>`;
    chatMessage = listOfGreetings[GetRandomInt(4)] + " and Welcome to our chat sampler. In celebration of my 8th birthday we've released an old version of our A.I. chat system. I currently can only learn keyword and your desired responses to them. Please start the process by saying keyword.";
    chatBox.innerHTML = chatOpener + chatMessage + chatCloser;
}

function Tutorial() {
    var chatBox = $("#chatBox")[0];
    var chatOpener = `<div class="display-inline-flex "><img src="img/Elias.jpg" class="elias-profile-picture" alt="elias profile picture" /><p class="margin-auto margin-left-20 bold e-chatbox">`;
    var chatMessage = "";
    var chatCloser = `</p></div>`;
    chatMessage = `If you need assistance here is the <a href="https://youtu.be/NE7l4FB5BpI" target="_blank" style="color:red; text-decoration:underline">tutorial video.</a>`;
    chatBox.innerHTML += chatOpener + chatMessage + chatCloser;
}

function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function ProcessMessage(message) {
    var chatBox = $("#chatBox")[0];
    var chatOpener = `<div class="display-inline-flex "><img src="img/Elias.jpg" class="elias-profile-picture" alt="elias profile picture" /><p class="margin-auto margin-left-20 bold e-chatbox">`;
    var chatMessage = "";
    var chatCloser = `</p></div>`;

    if (message.length > 0 && learning == false) {
        chatMessage = MessageExtraction(message);
    } else if (message.length > 0 && learning == true) {
        if (waitingOnResponse == false) {
            if (message.includes("no") || message.includes("stop") || message.includes("cancel") || message.includes("never mind") || message.includes("nevermind")) {
                learning = false;
                waitingOnResponse = false;
                chatMessage = "Understood.";
            } else {
                listOfKeyPhrases.push(message.toLowerCase());
                waitingOnResponse = true;
                chatMessage = 'The key is "' + message + '". Understood what would you like for me to say in response to that?';
            }
        }
        else {
            listOfKeyResponses.push(message);
            waitingOnResponse = false;
            learning = false;
            chatMessage = 'The response is "' + message + '". Understood. I will remember this from now on.';
        }
    }
    else {
        chatMessage = "Please enter a message.";
    }
    chatBox.innerHTML += chatOpener + chatMessage + chatCloser;
}

function MessageExtraction(userResponse) {
    if (userResponse.length > 0) {
        var response = [];
        userResponse = userResponse.toLowerCase();
        if (listOfKeyPhrases.includes(userResponse)) {
            response.push(listOfKeyResponses[listOfKeyPhrases.findIndex(x => x === userResponse)]);
        } else {
            var sParts = SeperateResponseSentence(userResponse);
            for (i = 0; i < sParts.length; i++) {
                var wordGroup = [];
                if (sParts[0][i].includes(' ')) {
                    wordGroup = sParts[0][i].split(' ');
                    for (w = 0; w < wordGroup.length; w++) {
                        // Check if the word is a keyword or phrase
                        if (listOfKeywords.includes(wordGroup[w])) {
                            switch (wordGroup[w]) {
                                case "happy":
                                    if (wordGroup[w + 1] == "birthday") {
                                        response.push("Thank you so much for the Birthday wishes");
                                    }
                                    break;
                                case "key":
                                    if (wordGroup[w + 1] == "word" || wordGroup[w + 1] == "phrase") {
                                        if (wordGroup[w + 1] == "word") {
                                            response.push("What key word would you like me to remember?");
                                            learning = true;
                                        }
                                        if (wordGroup[w + 1] == "phrase") {
                                            response.push("What key phrase would you like me to remember?");
                                            learning = true;
                                        }
                                    }
                                    break;
                                case "keyword":
                                case "keyphrase":
                                    if (wordGroup[w] == "keyword") {
                                        response.push("What keyword would you like me to remember?");
                                        learning = true;
                                    } else {

                                        response.push("What keyphrase would you like me to remember?");
                                        learning = true;
                                    }
                                    break;
                            }
                        }
                    }
                } else {
                    for (sp = 0; sp < sParts[0].length; sp++) {
                        // Check if the word is a keyword or phrase
                        if (listOfKeywords.includes(sParts[0][sp])) {
                            switch (sParts[0][sp]) {
                                case "happy":
                                    if (sParts[0][sp + 1] == "birthday") {
                                        response.push("Thank you so much for the Birthday wishes");
                                    }
                                    break;
                                case "key":
                                    if (sParts[0][sp + 1] == "word" || sParts[0][sp + 1] == "phrase") {
                                        if (sParts[0][sp + 1] == "word") {
                                            response.push("What key word would you like me to remember?");
                                            learning = true;
                                        }
                                        if (sParts[0][sp + 1] == "phrase") {
                                            response.push("What key phrase would you like me to remember?");
                                            learning = true;
                                        }
                                    }
                                    break;
                                case "keyword":
                                case "keyphrase":
                                    if (sParts[0][sp] == "keyword") {
                                        response.push("What keyword would you like me to remember?");
                                        learning = true;
                                    } else {
                                        response.push("What keyphrase would you like me to remember?");
                                        learning = true;
                                    }
                                    break;
                            }
                        }
                    }

                }
            }
        }

        if (response.join() === "" || response.join() == " ") {
            return "Unfortunately, I am currently not in a smart enough state to effectively respond to your message. Please wait for the release of my latest version and try again.";
        } else {
            return response.join('.');
        }
    } else {
        return "Please enter a message";
    }
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

function SeperateResponseSentence(userResponse) {
    var listOfPunc = [".", "?", "!"];
    var parts = [];

    userResponse = userResponse.toLowerCase();

    if (parts.length === 0) {
        parts[0] = userResponse.split(listOfPunc[0]);
    } else {
        for (i = 0; i < parts[0].length; i++) {
            if (parts[0][i].includes(listOfPunc[0])) {
                var newParts = parts[0][i].split(listOfPunc[0]);
                for (p = 0; p < newParts.length; p++) {
                    parts[0].push(newParts[p]);
                }
            }
        }
    }

    if (parts.length === 0) {
        parts[0] = userResponse.split(listOfPunc[1]);
    } else {
        for (i = 0; i < parts[0].length; i++) {
            if (parts[0][i].includes(listOfPunc[1])) {
                var newParts = parts[0][i].split(listOfPunc[1]);
                for (p = 0; p < newParts.length; p++) {
                    parts[0].push(newParts[p]);
                }
            }
        }
    }

    if (parts.length === 0) {
        parts[0] = userResponse.split(listOfPunc[2]);
    } else {
        for (i = 0; i < parts[0].length; i++) {
            if (parts[0][i].includes(listOfPunc[2])) {
                var newParts = parts[0][i].split(listOfPunc[2]);
                for (p = 0; p < newParts.length; p++) {
                    parts[0].push(newParts[p]);
                }
            }
        }
    }

    for (var i = 0; i < parts[0].length - 1; i++) {
        for (var p = 0; p < listOfPunc.length; p++) {
            if (parts[0][i].includes(listOfPunc[p])) {
                parts[0][i] = "";
            }
        }
    }

    parts[0] = parts[0].filter(n => n);
    parts[0] = removeDuplicates(parts[0]);
    return parts;
}

$(function () {
    Opener();
    Tutorial();
    $("#userInput")[0].placeholder = "Keyphrase";
});

$("#sendMessage").on(
    "click", function () {
        var messageLength = listOfMessages.length;
        var userMessage = $("#userInput")[0].value;
        var chatBox = $("#chatBox")[0];
        var chatOpener = `<div class="display-inline-flex"><p class="margin-auto margin-right-20 bold u-chatbox">`;
        var chatMessage = "";
        var chatCloser = `</p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill elias-profile-picture" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg></div>`;
        listOfMessages[messageLength] = userMessage;

        if (userMessage.length > 0) {
            chatMessage = userMessage;
        } else {
            chatMessage = "...";
        }
        chatBox.innerHTML += chatOpener + chatMessage + chatCloser;
        setTimeout(() => {
            ProcessMessage(userMessage)
            scrollToBottom();
        }, 2000);
        scrollToBottom();
        $("#userInput")[0].value = "";
    },
);

$('#userInput').on(
    'keypress', function (e) {
        if (e.key === 'Enter') {
            $("#sendMessage").trigger("click");
        }
    }
);
