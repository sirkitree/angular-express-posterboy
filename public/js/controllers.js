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
        $location.path('/');
        $http.get('/api/posts').
          success(function(data, status, headers, config) {
            $scope.posts = data.posts.reverse();
          });
      });
    $('#postbox').val('').height('50px');
  };

  $scope.msgExpand = function(post) {
    $('.msg-' + post.id + ' a.msg-expand').hide();
    $('.msg-' + post.id + ' span.msg-remains').show();
    $('.msg-' + post.id + ' a.msg-collapse').show();
  }

  $scope.msgCollapse = function(post) {
    $('.msg-' + post.id + ' span.msg-remains').hide();
    $('.msg-' + post.id + ' a.msg-expand').show();
    $('.msg-' + post.id + ' a.msg-collapse').hide();
  }

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
