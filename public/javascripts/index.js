const axios = require("axios");

// add tag to .search-tags and clear text from search bar
document.addEventListener("DOMContentLoaded", () => {
  const searchSet = new Set();

  document.getElementById("tags-btn").addEventListener("click", e => {
    const text = document.getElementById("add-tags-bar").value;
    // TODO: add more robust error handling
    if (text === "" || searchSet.has(text)) return;
    searchSet.add(text);
    const tag = document.createElement("DIV");
    tag.innerText = text;
    document.getElementById("search-tags").appendChild(tag);
    document.getElementById("add-tags-bar").value = "";
  });

  document.getElementById("analyze-tags-btn").addEventListener("click", e => {
    // wait for two items to compare
    if (searchSet.size < 2) return;

    // send searchSet back as a get request to backend
    axios
      .get(`/twitter?string=${Array.from(searchSet).join("+")}`)
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    // have backend send the data D3.js and render the 2-3
    // svg charts
  });
});
