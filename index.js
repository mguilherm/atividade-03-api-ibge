function loadData() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mountRegion(this.responseText);
    }
  };

  xhttp.open(
    "GET",
    "https://servicodados.ibge.gov.br/api/v1/localidades/regioes",
    true
  );
  xhttp.send();
}

function mountRegion(lsRegiao) {
  var select = document.createElement("select");
  select.id = "regiao";
  select.name = "regiao";
  select.addEventListener("change", function () {
    console.log(this.value);
    alert(this.value);
  });

  document.getElementById("regioes").appendChild(select);
  var option = document.createElement("option");

  lsRegiao = JSON.parse(lsRegiao);

  for (i in lsRegiao) {
    option = document.createElement("option");
    option.value = lsRegiao[i].id;
    option.innerHTML = lsRegiao[i].nome + " - " + lsRegiao[i].sigla;
    document.getElementById("regioes").appendChild(option);
  }
}

loadData();
