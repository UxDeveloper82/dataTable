const tArr = ["Mens", "Womens", "Youth", "Childs"];
const sArr = ["XL", "M", "S", "XS"];
const kArr = ["pants", "shirt", "shoes", "socks", "sweater", "belt"];

const compare = (a, b, column, numeric, order) => {
  let aValue = a.cells[column].innerHTML;
  let bValue = b.cells[column].innerHTML;

  if (numeric) {
    aValue = parseFloat(aValue);
    bValue = parseFloat(bValue);
  }

  if (aValue < bValue) return order;
  if (aValue > bValue) return -order;
  return 0;
};

const sortColumn = (header, column) => {
  let rows = document.querySelectorAll("tbody tr");
  rows = Array.from(rows);

  rows.sort((a, b) =>
    compare(a, b, column, header.dataset.numeric, header.dataset.order)
  );

  rows.forEach((row) => {
    document.querySelector("tbody").appendChild(row);
  });

  header.dataset.order = -header.dataset.order;

  document.querySelectorAll("span").forEach((span) => {
    span.classList.remove("ascending", "descending");
  });

  document.querySelectorAll("td").forEach((td) => {
    td.classList.remove("sortColumn");
  });

  if (header.dataset.order > 0) {
    header.children[0].classList.add("ascending");
  } else {
    header.children[0].classList.add("descending");
  }

  document.querySelectorAll(
    `tbody tr td:nth-child(${column + 1})`
  ).forEach((td) => {
    td.classList.add("sortColumn");
  });
};

const filterColumn = (input, column) => {
  document.querySelectorAll("tbody tr").forEach((row) => {
    const header = document.querySelector(`th:nth-child(${column + 1})`);
    const filterVal = input.value;
    const rowVal = row.cells[column].innerHTML;

    if (header.dataset.numeric) {
      if (parseFloat(filterVal) >= parseFloat(rowVal)) {
        row.style.display = "none";
      }
    } else {
      if (rowVal.indexOf(filterVal) < 0) {
        row.style.display = "none";
      }
    }
  });
};

const randInt = (max) => Math.floor(Math.random() * max) + 1;

const buildData = () => {
  for (let x = 1; x < 26; x++) {
    const row = document.createElement("tr");
    row.appendChild(document.createElement("td")).innerHTML = x;
    row.appendChild(document.createElement("td")).innerHTML =
      tArr[randInt(3)] + " " + sArr[randInt(3)] + " " + kArr[randInt(5)];
    row.appendChild(document.createElement("td")).innerHTML = randInt(20);
    row.appendChild(document.createElement("td")).innerHTML = (
      Math.random() * 80 + 5
    ).toFixed(2);

    document.querySelector("tbody").appendChild(row);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  buildData();

  document.querySelectorAll("th").forEach((header, i) => {
    const numeric = header.classList.contains("numeric");
    let order = -1;

    header.da
