const button = document.getElementById("btn");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const history = document.getElementById("history");

button.addEventListener("click", async () => {
    const response = await fetch("/quote");
    const data = await response.json();

    quote.innerText = data.quote;
    author.innerText = "- " + data.author;

    const historyResponse = await fetch("/history");
    const historyData = await historyResponse.json();

    history.innerHTML = "";

    historyData.forEach(item => {
        history.innerHTML += `<p>"${item.quote}" - ${item.author}</p>`;
    });
});