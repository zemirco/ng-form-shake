angular.module('app', ['ngAnimate'])

.controller('FormCtrl', ['$scope', '$animate', function($scope, $animate) {

  // hide error messages until 'submit' event
  $scope.submitted = false;

  // hide success message
  $scope.showMessage = false;

  // method called from shakeThat directive
  $scope.submit = function() {
    // show success message
    $scope.showMessage = true;
  };

}])

.directive('shakeThat', ['$animate', function($animate) {

  return {
    require: '^form',
    scope: {
      submit: '&',
      submitted: '=',
      shakeIt: '&shakeThat'
    },
    link: function(scope, element, attrs, form) {
      function shakeItNow() {
          $animate.addClass(element, 'shake', function () {
              $animate.removeClass(element, 'shake');
          });
      }
      
      if (scope.shakeIt) {
          // watch for changes in the passed in attribute
          // if new value is truty, trigger animation
          scope.$watch(scope.shakeIt, function (value) {
              if (value) {
                  shakeItNow();
              }
          });
      }      

      // listen on submit event
      element.on('submit', function() {

        // tell angular to update scope
        scope.$apply(function() {

          // everything ok -> call submit fn from controller
          if (form.$valid) return scope.submit();

          // show error messages on submit
          scope.submitted = true;

          // shake that form
          shakeItNow();

        });

      });

    }
  };

}]);
