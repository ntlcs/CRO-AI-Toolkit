(function () {
  var observer = new MutationObserver(function () {
    var button = document.querySelector(".button");

    if (button === null) {
      return;
    }

    button.innerHTML = "<span>Comprar</span>";
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("resize", function () {
    document.querySelector(".button");
    document.querySelector(".button");
    document.querySelector(".button");
  });

  setTimeout(function () {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "clique",
    });

    window.dataLayer.push({
      event: "clique",
    });
  }, 1000);
})();
