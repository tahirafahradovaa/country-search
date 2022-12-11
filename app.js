const select = document.querySelector("select");
const container = document.querySelector(".container");
const input = document.querySelector("input");
let isChoosen = false;

const getCountry = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all");
  const data = res.data;
  filling(data);
};

const fillPage = (src, country, pop, region, capital) => {
  const card = document.createElement("div");
  if (capital === undefined) {
    capital = "";
  }
  card.classList.add("card");
  const newA = document.createElement("a");
  newA.setAttribute("value", country);
  newA.setAttribute("href", "details.html");
  newA.addEventListener("click", () => {
    const clickedCountry = newA.getAttribute("value");
    sessionStorage.setItem("country", clickedCountry);
  });
  card.innerHTML = `<div class="img">
  <img src="${src}" alt="" />
  </div>
  <div class="content">
  <h2 class="country">${country}</h2>
  <p>Population: <span class="population">${pop}</span></p>
  <p>Region: <span class="region">${region}</span></p>
  <p class='capName'>Capital: <span class="capital">${capital}</span></p>
  </div>`;
  newA.appendChild(card);
  container.appendChild(newA);
};

input.addEventListener("input", async () => {
  container.innerHTML = "";
  let countryName = input.value.trim(" ").toLocaleLowerCase();
  if (countryName === "" && isChoosen === false) {
    container.innerHTML = "";
    getCountry();
  } else if (isChoosen) {
    regionSearch();
  } else if (isChoosen === true && countryName === "") {
    regionSearch();
  } else if (regArr.length === 0) {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await res.data;
    filling(data);
  }
});

function filling(data) {
  data.forEach((element) => {
    let name = element.name.common;
    let pop = element.population;
    let region = element.region;
    let source = element.flags.svg;
    let capital = element.capital;
    fillPage(source, name, pop, region, capital);
  });
}
let regArr = [];
window.addEventListener("load", getCountry());

const getRegion = async (region) => {
  container.innerHTML = "";
  const res = await axios.get(
    `https://restcountries.com/v3.1/region/${region}`
  );
  const data = res.data;
  regArr.push(data);
  filling(data);
  return regArr;
};
select.addEventListener("change", (e) => {
  if (!isChoosen) {
    container.innerHTML = "";
    const regionName = e.target.value;
    isChoosen = true;
    getRegion(regionName);
  } else if (e.target.value === "placeholder") {
    container.innerHTML = "";
    getCountry();
  } else {
    regArr = [];
    container.innerHTML = "";
    const regionName = e.target.value;
    isChoosen = true;
    getRegion(regionName);
  }
});
const regionSearch = () => {
  regArr.forEach((country) => {
    let inputValue = input.value;
    let countryNameCap =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    let filters = country.filter((q) => q.name.common.includes(countryNameCap));
    filling(filters);
  });
};
