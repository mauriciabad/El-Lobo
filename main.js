var EventDuration;
(function (EventDuration) {
    EventDuration["temporal"] = "temporal";
    EventDuration["inmediato"] = "inmediato";
    EventDuration["permanente"] = "permanente";
})(EventDuration || (EventDuration = {}));
var CardType;
(function (CardType) {
    CardType["event"] = "event";
    CardType["character"] = "character";
    CardType["profession"] = "profession";
    CardType["marker"] = "marker";
})(CardType || (CardType = {}));
// ------ CODE -------- //
var fs = require('fs');
// const pdf = require('html-pdf');
var cards = JSON.parse(fs.readFileSync('cards.json'));
var teams = JSON.parse(fs.readFileSync('teams.json'));
var html = '<link href="main.css" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i" rel="stylesheet">';
html += generateCardDeck(cards);
// console.log(html);
fs.writeFile("deck.html", html, function (err) {
    if (err)
        return console.log(err);
});
// tsc main.ts --lib ESNext --downlevelIteration && node main.js
// pdf.create(html).toFile('./deck.pdf', function(err, res) {if (err) { console.error(err); }});
// ----------- FUNCTIONS ------------ //
function generateCardDeck(deck) {
    // Explanation: for each type of card we generate and combine the html of each card.
    // Note: the order of generation is important to match the front widhth the backs.
    return "\n  <div class=\"deck\">\n    " + deck['characters'].reduce(function (total, card) { return total + generateCharacterCard(card); }, '') + "\n    " + deck['professions'].reduce(function (total, card) { return total + generateProfessionCard(card); }, '') + "\n    " + deck['events'].reduce(function (total, card) { return total + generateEventCard(card); }, '') + "\n    " + deck['markers'].reduce(function (total, card) { return total + generateMarkerCard(card); }, '') + "\n  </div>\n  <div class=\"deck deck--back\">\n    " + deck['characters'].reduce(function (total, card) { return total + generateCardBack(CardType.character, card.amount); }, '') + "\n    " + deck['professions'].reduce(function (total, card) { return total + generateCardBack(CardType.profession, card.amount); }, '') + "\n    " + deck['events'].reduce(function (total, card) { return total + generateCardBack(CardType.event, card.amount); }, '') + "\n    " + deck['markers'].reduce(function (total, card) { return total + generateCardBack(CardType.marker, card.amount); }, '') + "\n  </div>";
}
function generateCharacterCard(info) {
    if (Array.isArray(info.img)) {
        var cardHTML = '';
        for (var i = 0; i < info.amount; i++) {
            cardHTML += "\n      <div class=\"card card--character\">\n        <img src=\"" + info.img[i % info.img.length] + "\" class=\"card__img\">\n        <h2 class=\"card__title\">" + info.title + "</h2>\n        <p class=\"card__description\">" + info.description + "</p>\n      </div>";
        }
        return cardHTML;
    }
    else {
        return ("\n    <div class=\"card card--character\">\n      <img src=\"" + info.img + "\" class=\"card__img\">\n      <h2 class=\"card__title\">" + info.title + "</h2>\n      <p class=\"card__description\">" + info.description + "</p>\n    </div>").repeat(info.amount);
    }
}
function generateProfessionCard(info) {
    if (Array.isArray(info.img)) {
        var cardHTML = '';
        for (var i = 0; i < info.amount; i++) {
            cardHTML += "\n      <div class=\"card card--profession\">\n        <img src=\"" + info.img[i % info.img.length] + "\" class=\"card__img\">\n        <h2 class=\"card__title\">" + info.title + "</h2>\n        <p class=\"card__description\">" + info.description + "</p>\n      </div>";
        }
        return cardHTML;
    }
    else {
        return ("\n    <div class=\"card card--profession\">\n      <img src=\"" + info.img + "\" class=\"card__img\">\n      <h2 class=\"card__title\">" + info.title + "</h2>\n      <p class=\"card__description\">" + info.description + "</p>\n    </div>").repeat(info.amount);
    }
}
function generateEventCard(info) {
    return ("\n    <div class=\"card card--event\">\n      <img src=\"media/img/events/" + info.duration + ".svg\" class=\"card__img--event\">\n      <h2 class=\"card__title\">" + info.title + "</h2>\n      <p class=\"card__description\">" + info.description + "</p>\n    </div>").repeat(info.amount);
}
function generateMarkerCard(info) {
    if (Array.isArray(info.img)) {
        var cardHTML = '';
        for (var i = 0; i < info.amount; i++) {
            cardHTML += "\n      <div class=\"card card--marker\">\n        <img src=\"" + info.img[i % info.img.length] + "\" class=\"card__img--marker\">\n      </div>";
        }
        return cardHTML;
    }
    else {
        return ("\n    <div class=\"card card--marker\">\n      <img src=\"" + info.img + "\" class=\"card__img--marker\">\n    </div>").repeat(info.amount);
    }
}
function generateCardBack(type, times) {
    if (times === void 0) { times = 1; }
    switch (type) {
        case CardType.character:
            return ("\n        <div class=\"card card--back card--" + type + "\">\n          <img src=\"media/img/detective.svg\" class=\"card__img--back card__img--" + type + "--back\">\n        </div>").repeat(times);
        case CardType.profession:
            return ("\n        <div class=\"card card--back card--" + type + "\">\n          <img src=\"media/img/detective.svg\" class=\"card__img--back card__img--" + type + "--back\">\n        </div>").repeat(times);
        case CardType.event:
            return ("\n        <div class=\"card card--back card--" + type + "\">\n          <img src=\"media/img/detective.svg\" class=\"card__img--back card__img--" + type + "--back\">\n        </div>").repeat(times);
        case CardType.marker:
            return ("\n        <div class=\"card card--back card--" + type + "\">\n          <img src=\"media/img/detective.svg\" class=\"card__img--back card__img--" + type + "--back\">\n        </div>").repeat(times);
    }
}
