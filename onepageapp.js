var OnePageApp = (function(){
  var config = {},
  startTpl = location.pathname.split('/').pop();
  var init = function(menu, container, tpl, tplBase, basePath){
    config.menu = menu;
    config.container = container;
    config.tplBase = tplBase || '/';
    config.tpl = tplBase + tpl;
    config.basePath = basePath || '/';
    menu.addEventListener('click', function(e){
      if(e.target.tagName === 'A'){
        e.preventDefault();
        var tplPath = OnePageApp.config().tplBase + e.target.href.split('/').pop()+'.html';
        history.pushState({tpl: tplPath}, '', e.target.href);
        OnePageApp.dom.updateElement(tplPath, container);
      }
    });
    window.onpopstate = function(e){
      var config = OnePageApp.config();
      if(!!e.state){
        OnePageApp.dom.updateElement(e.state.tpl, config.container);
      } else {
        OnePageApp.dom.updateElement(config.tpl, config.container);
      }
    };

    if(startTpl !== '' && startTpl !== config.basePath.slice(1))
      config.tpl = config.tplBase+startTpl+'.html';

    OnePageApp.dom.updateElement(config.tpl, config.container);
  };
  return {
    init: init,
    config: function(){
      return config;
    }
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
