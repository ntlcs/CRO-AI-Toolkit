(function () {
  var menu = document.querySelector(".menu");

  var menuObserver = new MutationObserver(function () {
    console.log("menu mudou");
  });

  menuObserver.observe(menu, {
    childList: true,
  });

  menuObserver.disconnect();

  var bodyObserver = new MutationObserver(function () {
    console.log("body mudou");
  });

  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
