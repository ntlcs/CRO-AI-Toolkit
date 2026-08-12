function () {
  function handleScroll() {
    executeTrigger();
  }

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );
}