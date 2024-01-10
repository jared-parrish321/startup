function preload() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("quote", data.content);
        localStorage.setItem("author", data.author);
      });
}
preload();