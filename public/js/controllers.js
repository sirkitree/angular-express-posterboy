'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $location) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts.reverse();
    });

  $scope.form = {};
  $scope.submitPost = function() {
    $http.post('/api/post', $scope.form).
      success(function(data) {

        // We always want to reset the captcha, but if the previous entry was invalid,
        // we should NOT reset the postbox and markdown-preview.
        if (data.captcha !== false) {
          // empty the postbox
          $('#postbox').val('').height('50px');
          // reset the preview
          $('#markdown-preview').html('');
        }

        $location.path('/');
        $http.get('/api/posts').
          success(function(data, status, headers, config) {
            $scope.posts = data.posts.reverse();
          });
      });

    // reset the captcha image
    $('#captcha-image').remove();
    $('#captcha-input').before('<img src="/captcha.png" id="captcha-image"></img>');
    // reset the captcha input
    $('#captcha-input').val('');

  };

}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function() {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function() {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/' + $routeParams.id);
      });
  };

}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function() {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function() {
    $location.url('/');
  };
}
