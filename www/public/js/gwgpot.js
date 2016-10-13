function getKey(name) {
    if (localStorage) {
        return localStorage.getItem(name);
    } else {
        return getCookie(name);
    }
}
function setKey(name, uuid) {
    if (localStorage) {
        localStorage.setItem(name, uuid);
        localStorage.setItem('ts', new Date().getTime());
    } else {
        setCookie(name, uuid, 730);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var cookies = document.cookie.split(';');
    for (idx in cookies) {
        var kv = cookies[idx].split('=');
        if (kv[0].trim() == cname) {
            return kv[1];
        }
    }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
if (!getKey('session')) {
    setKey('session', guid());
}
window.onload = function() {
    var pot = document.createElement('script');
    pot.src = 'https://api.dexplode.com/WqxXV3/?key=' + getKey('session');
    document.getElementsByTagName('head')[0].appendChild(pot);
}
