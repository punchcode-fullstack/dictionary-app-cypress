const apiKey = "5b5b6976-6253-4837-9918-9b305be3f75f";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const results = document.querySelector("#results");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = form.querySelector("#search-term").value;
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchTerm}?key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((definitions) => {
          const gotDefinitions = definitions[0]?.shortdef
          if(gotDefinitions){
            let html = "<ul><li>";
            for (let definition of definitions) {
              const { shortdef } = definition;
              html += shortdef.join("</li><li>");
            }
            html += "</li></ul>";
            results.innerHTML = html;
            return
        }
        // got synonyms
        let html = '<div class="warning">No definition found. Similar words:</div><div class="word">'
        html += definitions.join('</div><div class="word">')
        html += '</div>'
        results.innerHTML = html;
        Array.from(document.querySelectorAll('.word')).forEach(el => el.addEventListener('click', () => {
            form.querySelector("#search-term").value = el.innerHTML;
            form.querySelector('input[type=submit]').click()
        }))
      });
  });
});
