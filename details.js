window.addEventListener("load", () => {
  getCountry(sessionStorage.getItem("country"));
});
const h1 = document.querySelector(".border-name");

const container = document.querySelector(".container");
const getCountry = async (countryName) => {
  const res = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  const data = await res.data;
  const bordNames = data[0].borders;
  if (bordNames === undefined) {
    bordNames == "no further information";
  } else {
    Object.values(bordNames).forEach((name) => {
      getBorder(name);
    });
  }

  filling(data);
  //   let native = res.data[0].name.nativeName;
};

function filling(data) {
  data.forEach((element) => {
    let curr = Object.entries(element.currencies)[0][0];
    let lang = Object.entries(element.languages)[0][1];
    let name = element.name.common;
    let pop = element.population;
    let region = element.region;
    let source = element.flags.svg;
    let capital = element.capital;
    let domain = element.tld;
    let nativeData = element.name.nativeName;
    let native = Object.entries(nativeData)[0][1].common;
    fillPage(source, name, pop, region, capital, domain, curr, lang, native);
  });
}

const fillPage = (
  src,
  country,
  pop,
  region,
  capital,
  domain,
  curr,
  lang,
  native
) => {
  h1.innerHTML = "";
  container.innerHTML = "";
  const card = document.createElement("div");
  if (capital === undefined) {
    capital = "";
  }
  card.classList.add("card");
  card.innerHTML = `
  <header>
  <img src="${src}"/>
</header>
<section id="content">
  <div>
  <h1>Country: <span>${country}</span></h1>
  <p>Native Name: <span class>${native}</span></p>
  <p>Population: <span>${pop}</span></p>
  <p>Sub Region: <span>${region}</span></p>
  <p>Capital: <span>${capital}</span></p></div>
  <div class='secondline'>
  <p>Top Level Domain: <span>${domain}</span></p>
  <p>Currencies: <span>${curr}</span></p>
  <p>Languages: <span>${lang}</span></p>
  </div>
  </section>`;
  container.appendChild(card);
};

const getBorder = async (name) => {
  const res = await axios.get(`https://restcountries.com/v3.1/alpha/${name}`);
  const data = res.data;
  fillBorder(data[0].name.common);
};

const fillBorder = async (data) => {
  const a = document.createElement("a");
  a.classList.add("border");
  a.setAttribute("value", data);
  a.innerText = data;
  h1.appendChild(a);
  a.addEventListener("click", () => {
    getCountry(a.getAttribute("value"));
  });
};
