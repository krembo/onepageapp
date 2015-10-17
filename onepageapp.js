var OnePageApp = (function(){
  var $menu, $container, $tpl,
  startTpl = location.pathname.split('/').pop();
  var init = function(menu, container, tpl){
    $menu = menu;
    $container = container;
    $tpl = tpl;
    menu.addEventListener('click', function(e){
      if(e.target.tagName === 'A'){
        e.preventDefault();
        var tplPath = e.target.href.replace('onepageapp', 'templates')+'.html';
        history.pushState({tpl: tplPath}, '', e.target.href);
        OnePageApp.dom.updateElement(tplPath, container);
      }
    });
    window.onpopstate = function(e){
      if(!!e.state){
        OnePageApp.dom.updateElement(e.state.tpl, OnePageApp.container());
      } else {
        OnePageApp.dom.updateElement(OnePageApp.tpl(), OnePageApp.container());
      }
    };

    if(startTpl != 'onepageapp')
      $tpl = '/templates/'+startTpl+'.html';
    OnePageApp.dom.updateElement($tpl, $container);
  };
  return {
    init: init,
    container: function(){return $container;},
    menu: function(){return $menu;},
    tpl: function(){return $tpl;}
  };
})();
// ajax module //
(function(){
  OnePageApp = OnePageApp || {};
  OnePageApp.ajax = (function(){
    function get(path, success, error){
      var oReq = new XMLHttpRequest();
      oReq.onload = success;
      oReq.open("GET", path);
      oReq.send();
    }
    function post(path, data, contentType, success, error){
      var oReq = new XMLHttpRequest();
      oReq.onload = success;
      oReq.open("POST", path);
      if(contentType === 'json'){
        oReq.send(JSON.stringify(data));
      } else {
        oReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        oReq.send('some=uno&another=duo');
      }
    }
    return {
      get: get,
      post: post
    };
  })();
})();
// dom module //
(function(){
  OnePageApp = OnePageApp || {};
  OnePageApp.dom = (function(){
    function updateElement(path, element){
      if(OnePageApp.cache.load(path)){
        element.innerHTML = OnePageApp.cache.load(path);
      } else {
        OnePageApp.ajax.get(path, function(e){
          element.innerHTML = this.response;
          OnePageApp.cache.add(path, this.response);
        });
      }
    }

    return {
      // init: init,
      updateElement: updateElement
    };
  })();
})();
// cache module //
(function(){
  OnePageApp = OnePageApp || {};
  OnePageApp.cache = (function(){
      var cache = {};
      function add(key, data){
        cache[key] = data;
      }
      function load(key){
        return cache[key] || false;
      }
      function clear(path){
        delete cache[path];
      }
      function clearAll(){
        cache = {};
      }
      return {
        add: add,
        load: load,
        clear: clear,
        clearAll: clearAll
      };
  })();
})();
