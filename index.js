function acessarAPI(url, funcao) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      funcao(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function mountRegion(lsRegiao) {
  var select = document.createElement("select");
  select.id = "regiao";
  select.name = "regiao";
  document.getElementById("regiao").addEventListener("change", function () {
    url = "https://servicodados.ibge.gov.br/api/v1/localidades/";
    if (document.getElementById("regiao").value == 0) {
      url += `estados`;
    } else {
      url += `regioes/${this.value}/estados`;
    }

    acessarAPI(url, mountUf);
  });

  document.getElementById("regiao").appendChild(select);
  var opcao = document.createElement("option");

  lsRegiao = JSON.parse(lsRegiao);

  for (i in lsRegiao) {
    opcao = document.createElement("option");
    opcao.value = lsRegiao[i].id;
    opcao.innerHTML = lsRegiao[i].nome + " (" + lsRegiao[i].sigla + ")";
    document.getElementById("regiao").appendChild(opcao);
  }
}
function mountUf(lsUf) {
  uf = document.getElementById("uf");
  uf.innerHTML = "";

  var sele = document.createElement("option");
  sele.value = "";
  sele.innerHTML = "Selecione";
  document.getElementById("uf").appendChild(sele);

  uf.addEventListener("change", function () {
    acessarAPI(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.value}/municipios`,
      mountMunicipios
    );
  });
  lsUf = JSON.parse(lsUf);
  for (i in lsUf) {
    opcao = document.createElement("option");
    opcao.value = lsUf[i].id;
    opcao.innerHTML = lsUf[i].sigla + " - " + lsUf[i].nome;
    uf.appendChild(opcao);
  }
}

function mountMunicipios(lsMunicipios) {
  if (uf.select == [0]) {
    municipio.innerHTML = "";
  }
  municipio = document.getElementById("municipio");
  municipio.innerHTML = "";

  var sele = document.createElement("option");
  sele.value = "";
  sele.innerHTML = "Selecione";
  document.getElementById("municipio").appendChild(sele);

  lsMunicipios = JSON.parse(lsMunicipios);
  for (i in lsMunicipios) {
    opcao = document.createElement("option");
    opcao.value = lsMunicipios[i].id;
    opcao.innerHTML = lsMunicipios[i].nome;
    municipio.appendChild(opcao);
  }
}

acessarAPI(
  "https://servicodados.ibge.gov.br/api/v1/localidades/regioes",
  mountRegion
);
acessarAPI(
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
  mountUf
);
