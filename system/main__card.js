// load svg
document.querySelectorAll('.load').forEach(function(element) {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", '/qualify/' + element.innerText, true);
  ajax.send();
  ajax.onload = function(e) {
    if (ajax.status === 200) { //success
      element.innerHTML = ajax.responseText;

      MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
    } else { //failed
      console.log("load failed: " + element.innerText);
    }
  }
});
