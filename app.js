let tArr = ["Mens", "Womens", "Youth", "Childs"];
let sArr = ["XL", "M", "S", "XS"];
let kArr = ["pants", "shirt", "shoes", "socks", "sweater", "belt"];

function compare(a, b, column, numeric, order) {
  let aValue = a.cells[column].innerHTML;
  let bValue = b.cells[column].innerHTML;

  if (numeric) {
    aValue = parseFloat(aValue);
    bValue = parseFloat(bValue);
  }

  if (aValue < bValue) return order;
  if (aValue > bValue) return -order;
  return 0;
}

function sortColumn(header, column) {
  let rows = document.querySelectorAll("tbody tr");
  rows = Array.from(rows);

  rows.sort(function (a, b) {
    return compare(a, b, column, header.dataset.numeric, header.dataset.order);
  });

  rows.forEach(function (row) {
    document.querySelector("tbody").appendChild(row);
  });

  header.dataset.order = -header.dataset.order;

  document.querySelectorAll("span").forEach(function (span) {
    span.classList.remove("ascending", "descending");
  });

  document.querySelectorAll("td").forEach(function (td) {
    td.classList.remove("sortColumn");
  });

  if (header.dataset.order > 0) {
    header.children[0].classList.add("ascending");
  } else {
    header.children[0].classList.add("descending");
  }

  document.querySelectorAll("tbody tr td:nth-child(" + (column + 1) + ")").forEach(function (td) {
    td.classList.add("sortColumn");
  });
}

function filterColumn(input, column) {
  document.querySelectorAll("tbody tr").forEach(function (row) {
    let header = document.querySelector("th:nth-child(" + (column + 1) + ")");
    let filterVal = input.value;
    let rowVal = row.cells[column].innerHTML;

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
}

function randInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function buildData() {
  for (let x = 1; x < 26; x++) {
    let row = document.createElement("tr");
    row.appendChild(document.createElement("td")).innerHTML = x;
    row.appendChild(document.createElement("td")).innerHTML =
      tArr[randInt(3)] + " " + sArr[randInt(3)] + " " + kArr[randInt(5)];
    row.appendChild(document.createElement("td")).innerHTML = randInt(20);
    row.appendChild(document.createElement("td")).innerHTML = (
      Math.random() * 80 + 5
    ).toFixed(2);

    document.querySelector("tbody").appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", function () {
    buildData();
  
    document.querySelectorAll("th").forEach(function (header, i) {
      let numeric = header.classList.contains("numeric");
      let order = -1;
  
      header.dataset.numeric = numeric;
      header.dataset.order = order;
  
      header.children[0].addEventListener("click", function () {
        sortColumn(header, i);
      });
  
      var filter = document.createElement("input");
      filter.type = "text";
      filter.addEventListener("keyup", function () {
        filterColumn(filter, i);
      });
  
      header.appendChild(filter);
    });
  });
  

