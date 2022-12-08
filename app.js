const getCountry = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all");
  const data = res.data;
  filling(data);
};

const container = document.querySelector(".container");
const input = document.querySelector("input");
const fillPage = (src, country, pop, region, capital) => {
  const card = document.createElement("div");
  if (capital === undefined) {
    capital = "";
  }
  card.classList.add("card");
  card.innerHTML = `<div class="img">
  <img src="${src}" alt="" />
</div>
<div class="content">
  <h2 class="country">${country}</h2>
  <p>Population: <span class="population">${pop}</span></p>
  <p>Region: <span class="region">${region}</span></p>
  <p class='capName'>Capital: <span class="capital">${capital}</span></p>
</div>`;
  container.append(card);
};
input.addEventListener("input", async () => {
  let countryName = input.value;
  container.innerHTML = "";
  if (countryName === "") {
    container.innerHTML = "";
    getCountry();
  } else {
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
window.addEventListener("load", getCountry());

const getRegion = async (region) => {
  container.innerHTML = "";
  const res = await axios.get(
    `https://restcountries.com/v3.1/region/${region}`
  );
  const data = res.data;
  filling(data);
  console.log(res, " res");
  console.log(data, " data");
};
const select = document.querySelector("select");
select.addEventListener("change", (e) => {
  const regionName = e.target.value;
  getRegion(regionName);
});
