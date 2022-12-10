let openModal = document.getElementById("open__modal");
let modal_window = document.querySelector(".Modal");
let back_modal = document.querySelector(".back__click");
let clear = document.querySelector(".clear");
let inputBtn = document.getElementById("input");
let region__content = document.querySelector(".region__content");
let input__clear = document.getElementById("input_clear");
let region__name = document.querySelector("#open__modal span");
let region__cards = document.querySelector(".region__cards a");
let region__clicked = document.querySelector(".region__clicked");

openModal.addEventListener("click", function () {
  modal_window.style.display = "block";
  back_modal.style.display = "block";
});

back_modal.addEventListener("click", function () {
  modal_window.style.display = "none";
  back_modal.style.display = "none";
});

clear.addEventListener("click", function () {
  clear.style.display = "none";
  input__clear.value = "";
});
input__clear.addEventListener("input", function () {
  clear.style.display = "block";
});

inputBtn.addEventListener("input", function () {
  searchLocation(inputBtn.value);
});

async function postData(url = "https://studika.ru/api/areas") {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

let locationData;

function filterLocations(location, locationData) {
  let filteredLocs = [];
  location = location.toLowerCase();

  locationData.forEach((locItem) => {
    let locItemName = locItem.name.toLowerCase();

    if (locItemName.includes(location)) {
      filteredLocs.push(locItem.name);
    }
    locItem?.cities?.forEach((locItemCity) => {
      let locItemCityName = locItemCity.name.toLowerCase();

      if (locItemCityName.includes(location)) {
        filteredLocs.push(locItemCity.name);
      }
    });
  });
  // region__cards.addEventListener("click", function () {
  //   region__clicked.insertAdjacentHTML(
  //     "beforeend",
  //     `<button>${elem} <img src="./images/close.svg" alt="close" /></button>`
  //   );
  // });
  return filteredLocs.map((elem) => {
    if (inputBtn.value == "") {
      region__content.innerHTML = "";
    }
    region__content.insertAdjacentHTML(
      "beforeend",
      `<div class="region__cards"><a href="#">${elem}</a></div>`
    );
  });
}

function searchLocation(query) {
  postData("https://studika.ru/api/areas").then((data) => {
    locationData = data;
    filterLocations(query, data);
  });
}
