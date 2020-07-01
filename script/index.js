const API_URL = "https://api.pokemontcg.io/v1/cards?name=";

const loaderSection = document.getElementById("loader");
const resultsSection = document.getElementById("results");
const resultsOutcome = document.getElementById("results-outcome");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("submit-search");
const searchErrorMessage = document.getElementById("search-error");

const cardList = document.getElementById("card-list");

const searchCards = event => {
  // prevent default behavior of submitting a form
  event.preventDefault();

  // clear everything
  cardList.innerHTML = "";
  searchErrorMessage.innerHTML = "";
  resultsOutcome.innerHTML = "";

  resultsSection.classList.add("hidden");

  // check we have written anything in the input
  if (searchInput.value.length >= 3) {
    resultsOutcome.innerHTML = "Loading...";

    // check what has been written
    fetch(`${API_URL}${searchInput.value}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        // read from response the array of cards
        let cards = json.cards;

        if (cards.length > 0) {
          const listItems = cards.map(function(card) {
            const pokemonInfo = document.createElement("p"); 
            const listItem = document.createElement("li");
            const cardImage = document.createElement("img");
            const cardTitle = document.createElement("h3");
            pokemonInfo.innerText = `${card.name} is a ${card.types} and ${card.subtype} Pokemon.`
            cardImage.src = card.imageUrl;
            cardImage.alt = `${card.name} from ${card.set}`;
            cardTitle.innerText = `${card.name} from ${card.set}`;
            console.log(`${card.types}`); 

            listItem.append(pokemonInfo); 
            listItem.append(cardImage);
            listItem.append(cardTitle);

            return listItem;
          });
          listItems.forEach(item => cardList.append(item));

          const cardsNumberMessage = document.createElement("p");
          cardsNumberMessage.innerHTML = `Found <strong>${cards.length}</strong> pokémon cards for '<em>${searchInput.value}</em>'`;
          resultsOutcome.append(cardsNumberMessage);
        } else {
          const noCardsMessage = document.createElement("p");
          noCardsMessage.innerHTML = `Cannot find pokémon cards for '<em>${searchInput.value}</em>'`;
          resultsOutcome.append(noCardsMessage);
        }

        resultsSection.classList.remove("hidden");
      });
  } else {
    const minimumCharactersMessage = document.createElement("p");
    minimumCharactersMessage.innerHTML = `Please enter at least three letters (you searched for '<em>${searchInput.value}</em>').`;
    searchErrorMessage.append(minimumCharactersMessage);
  }
};

if (searchButton) searchButton.addEventListener("click", searchCards);

