//add modernizr test for box-sizing, from here:
//https://github.com/Modernizr/Modernizr/issues/248#issuecomment-1101287
Modernizr.addTest('boxsizing', function () {
  var s = ['boxSizing', 'MozBoxSizing', 'WebkitBoxSizing', 'msBoxSizing'],
      div = document.createElement('div');

  for (var i = 0, l = s.length ; i < l ; i++) {
    if(div.style[s[i]] !=undefined)
      return true;
  } 

  return false;
});
