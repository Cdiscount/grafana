import { coreModule } from 'app/core/core';

const headerNameSuffix = 'httpHeaderName';
const headerValueSuffix = 'httpHeaderValue';

coreModule.directive('datasourceHeadersSettings', () => {
  return {
    scope: {
      current: '=',
    },
    templateUrl: 'public/app/features/datasources/partials/headers_settings.html',
    link: ($scope, elem, attrs) => {
      $scope.headers = [];
      for (const key in $scope.current.jsonData) {
        if (key.startsWith(headerNameSuffix)) {
          const index = key.substring(headerNameSuffix.length);
          $scope.headers = [
            {
              name: $scope.current.jsonData[key],
              value: '',
              configured: $scope.current.secureJsonFields[`${headerValueSuffix}${index}`],
            },
            ...$scope.headers,
          ];
        }
      }
      $scope.$watch(
        'headers',
        v => {
          if (!$scope.current.secureJsonData) {
            $scope.current.secureJsonData = {};
          }
          console.log(v);
          v.forEach((header, index) => {
            $scope.current.jsonData[`${headerNameSuffix}${index + 1}`] = header.name;
            $scope.current.secureJsonData[`${headerValueSuffix}${index + 1}`] = header.value;
          });
          console.log($scope.current);
        },
        true
      );
    },
  };
});
