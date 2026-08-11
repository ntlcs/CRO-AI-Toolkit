(function () {
  var button = document.querySelector(".button");

  if (button === null) {
    return;
  }

  function handleClick() {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "clique",
    });
  }

  button.addEventListener("click", handleClick);
})();
