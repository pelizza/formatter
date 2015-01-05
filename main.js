angular.module('FormatterPOC', [])
  .directive('formatter', function() {
    return {
      require: 'ngModel',
      link: function($scope, element, attrs, controller) {
        controller.$render = function() {
          var value = controller.$viewValue || '';
          console.log('Rendering value: ', value);
          element.val(value);
          element.formatter({
              pattern: attrs.formatter,
              persistent: true
          });
          console.log();
          return element;
        };
        controller.$parsers.push(function(value) {
          var isValid;
          console.log('parsing', value);
          isValid = element.formatter().length === 6;
          console.log('isvalid', isValid);
          controller.$setValidity('mask', isValid);
          if (isValid) {
            console.log('returning', element.mask());
            return element.mask();
          } else {
            return null;
          }
        });
        return element.bind('keyup', function() {
          console.log('change');
          return $scope.$apply(function() {
            return controller.$setViewValue(element.mask());
          });
        });
      }
    };
  });
