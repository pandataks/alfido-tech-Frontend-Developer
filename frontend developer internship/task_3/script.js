const searchBtn = document.getElementById("search-btn");
const randomBtn = document.getElementById("random-btn");
const countryInput = document.getElementById("country-input");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const countryCard = document.getElementById("country-card");

const flag = document.getElementById("flag");
const countryName = document.getElementById("country-name");
const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");
const language = document.getElementById("language");

const countryCode = document.getElementById("country-code");
const area = document.getElementById("area");
const timezone = document.getElementById("timezone");

const bordersList = document.getElementById("borders-list");
const historyList = document.getElementById("history-list");

searchBtn.addEventListener("click", () => {
    fetchCountry(countryInput.value.trim());
});

countryInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchCountry(countryInput.value.trim());
    }
});

randomBtn.addEventListener("click", getRandomCountry);

window.addEventListener("load", loadHistory);

async function fetchCountry(country) {

    if (!country) {
        alert("Please enter a country name.");
        return;
    }

    showLoading();

    try {

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();

        if (!data.length) {
            throw new Error("Country not found");
        }

        displayCountry(data[0]);
        saveHistory(data[0].name.common);

    } catch (err) {

        showError("Country not found.");

    } finally {

        hideLoading();

    }
}

async function getRandomCountry() {

    showLoading();

    try {

        const response = await fetch(
            "https://restcountries.com/v3.1/all"
        );

        if (!response.ok) {
            throw new Error();
        }

        const countries = await response.json();

        const randomCountry =
            countries[
                Math.floor(
                    Math.random() * countries.length
                )
            ];

        displayCountry(randomCountry);

        if (
            randomCountry.name &&
            randomCountry.name.common
        ) {
            saveHistory(
                randomCountry.name.common
            );
        }

    } catch (err) {

        showError(
            "Unable to load random country."
        );

    } finally {

        hideLoading();

    }
}

function displayCountry(country) {

    error.classList.add("hidden");

    flag.src =
        country.flags?.svg ||
        country.flags?.png ||
        "";

    countryName.textContent =
        country.name?.common || "N/A";

    capital.textContent =
        country.capital?.[0] || "N/A";

    region.textContent =
        country.region || "N/A";

    population.textContent =
        country.population
            ? country.population.toLocaleString()
            : "N/A";

    currency.textContent =
        country.currencies
            ? Object.values(
                  country.currencies
              )[0].name
            : "N/A";

    language.textContent =
        country.languages
            ? Object.values(
                  country.languages
              ).join(", ")
            : "N/A";

    countryCode.textContent =
        country.cca2 || "N/A";

    area.textContent =
        country.area
            ? country.area.toLocaleString() +
              " km²"
            : "N/A";

    timezone.textContent =
        country.timezones
            ? country.timezones.join(", ")
            : "N/A";

    displayBorders(country.borders);

    countryCard.classList.remove(
        "hidden"
    );
}

function displayBorders(borders) {

    bordersList.innerHTML = "";

    if (
        !borders ||
        borders.length === 0
    ) {

        const item =
            document.createElement("div");

        item.classList.add(
            "border-item"
        );

        item.textContent =
            "No Border Countries";

        bordersList.appendChild(item);

        return;
    }

    borders.forEach(border => {

        const item =
            document.createElement("div");

        item.classList.add(
            "border-item"
        );

        item.textContent = border;

        bordersList.appendChild(item);

    });
}

function saveHistory(country) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "countryHistory"
            )
        ) || [];

    history =
        history.filter(
            item => item !== country
        );

    history.unshift(country);

    history = history.slice(0, 5);

    localStorage.setItem(
        "countryHistory",
        JSON.stringify(history)
    );

    loadHistory();
}

function loadHistory() {

    historyList.innerHTML = "";

    const history =
        JSON.parse(
            localStorage.getItem(
                "countryHistory"
            )
        ) || [];

    history.forEach(country => {

        const chip =
            document.createElement("div");

        chip.classList.add(
            "history-item"
        );

        chip.textContent = country;

        chip.addEventListener(
            "click",
            () =>
                fetchCountry(country)
        );

        historyList.appendChild(chip);

    });
}

function showLoading() {

    loading.classList.remove(
        "hidden"
    );

    error.classList.add(
        "hidden"
    );

    countryCard.classList.add(
        "hidden"
    );
}

function hideLoading() {

    loading.classList.add(
        "hidden"
    );
}

function showError(message) {

    error.textContent = message;

    error.classList.remove(
        "hidden"
    );

    countryCard.classList.add(
        "hidden"
    );
}