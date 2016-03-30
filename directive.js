angular.module('st2forget.word-unscramble-game', [
  'ng-sortable'
]).directive('wordUnscrambleGame', function () {


    var model = { //queston
      Id: 1,
      Statement: 'LOVE',
      Hint: 'Thing that everyone need most'
    };

    var link = function ($scope, $element, $attrs) {
      $element.on('click', function (e) {
        e.stopPropagation();
      });

      $element.on('', function (e) {

      });
    };

    return {
      controllerAs: 'wordUnscrambleGame',
      controller: ['$attrs', '$scope', '$element', '$interval', function ($attrs, $scope, $element, $interval) {

        $scope.data = model; //TODO: get data from api $.get(url, function () {})
        $scope.dataSentence = 'This is an sentence';
        $scope.gameType = $attrs.gameType;
        var letStartMsg = 'Let Start';
        $scope.statusMessage = letStartMsg;
        $scope.hintMsg = $scope.data.Hint;

        //Show and Hide Start Button
        $scope.startVisible = false;
        $scope.startShowHide = function () {
          $scope.startVisible = $scope.startVisible ? false : true;
        };

        //Show and Hide Hint
        $scope.hintVisible = false;
        $scope.hintShowHide = function () {
          $scope.hintVisible = $scope.hintVisible ? false : true;
        }

        // Transform INPUT data to list of charracter with correct index
        var charsArray = _.shuffle($scope.data.Statement.split($scope.gameType == 'word' ? '' : ' '));
        console.log(charsArray);
        $scope.draggableObjects = charsArray;

        $scope.onDragOver = function (index, obj) {
          console.log('Word drag over' + obj);
        };

        // Change position
        $scope.onDropComplete = function () {
          // Get current words
          var shuffleChars = [];
          for (var i = 0; i < $scope.draggableObjects.length; i++) {
            shuffleChars = shuffleChars.concat($scope.draggableObjects[i])
          }
          shuffleChars = shuffleChars.join('');
          console.log(shuffleChars);
          //Checking Status
          if (shuffleChars == $scope.data.Statement) {
            $scope.statusMessage = "Well Done."
            $scope.stopTimer()
          } else {
            $scope.statusMessage = "Try Again."
          }
        }

        //Directive URL
        $scope.directiveRootPath = $attrs.directiveRootPath;
        $scope.getTemplateUrl = function () {
          return $scope.directiveRootPath + '/angular-word-unscramble-game/templates/word-unscramble.html';
        };

        // Add timer
        var totalTime = 5000;
        // $scope.timerRunning = true;
        $scope.countDown = totalTime;
        $scope.interval = null;

        $scope.startTimer = function () {
          $scope.interval = $interval(function () {
            $scope.countDown -= 1;
            if ($scope.countDown == 0) {
              $scope.statusMessage = 'Time Over';
              $scope.stopTimer();
            }
          }, 1)
        };

        $scope.stopTimer = function () {
          $interval.cancel($scope.interval);
        };

        $scope.replayTimer = function () {
          $scope.countDown = totalTime;
          $scope.interval = null;
          $scope.statusMessage = letStartMsg;
          $scope.startTimer();
        }

      }],
      template: '<ng-include src="getTemplateUrl()"></ng-include>',
      link: link
    };
  }
);



