(function () {
  function handleResize() {
    console.log("resize");
  }

  function handleClick() {
    console.log("click");
  }

  window.removeEventListener("resize", handleResize);

  window.addEventListener("resize", handleResize);

  document.addEventListener("click", handleClick);

  window.addEventListener("scroll", function () {
    console.log("scroll");
  });
})();
