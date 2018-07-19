(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }

  //To Add orders for new users
  RemoteDataStore.prototype.add = function(key, val) {
    this.remove(key);
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  // To get all orders
  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  // To get order of specific user
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '?emailAddress=' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  // To delete orders
  RemoteDataStore.prototype.remove = function(key) {
    var serverUrl = this.serverUrl;
    this.get(key, function(serverResponse) {

      if (serverResponse.length != 0) {
        console.log('server resposne is :' + serverResponse);
        var id = getId(key, serverResponse[0]['id']);
        console.log('id is :' + id);
        $.ajax(serverUrl + '/' + id, {
          type: 'DELETE'
        });
      }

    });
  };

  function getId(key, id) {
    console.log('The id to remove is :' + id);
    return id;
  }

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
