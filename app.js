(function () {
    var app = angular.module('farkle', []);

    app.directive('onEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    app.controller('scoreController', [
        function () {
            var self = this;
            this.colClass = "col-md-12";
            this.players = [];
            var maxPlayers = 4;

            function setColClass() {
                if (self.players.length === 0) {
                    self.colClass = "col-md-12";
                } else {
                    var width = Math.floor(12 / self.players.length);
                    self.colClass = "col-md-" + width;
                }
            }

            this.addPlayer = function () {
                if (this.players.length < maxPlayers) {
                    self.players.push({
                        name: self.newPlayer,
                        score: 0,
                        previous: []
                    });
                    self.newPlayer = "";
                    setColClass();
                } else {
                    alert('Too many players!');
                }
            };

            this.delPlayer = function (playerIdx) {
                self.players.splice(playerIdx, 1);
                setColClass();
            };

            this.addScore = function (playerIdx) {
                var score = this.players[playerIdx].newScore;
                this.players[playerIdx].score += score;
                this.players[playerIdx].previous.splice(0, null, score);
                this.players[playerIdx].newScore = 0;
            };

            this.quickAdd = function (playerIdx, score) {
                this.players[playerIdx].score += score;
                this.players[playerIdx].previous.splice(0, null, score);
            };

            this.removeScore = function (player, scoreIdx) {
                player.previous.splice(scoreIdx, 1);
                updateScore(player);
            };

            function updateScore(player) {
                try {
                    player.score = player.previous.reduce(function (previousValue, currentValue) {
                        return previousValue + currentValue;
                    })
                }
                catch (TypeError) {
                    player.score = 0;
                }
            }
        }
    ]);
})();