
function criaContainerPlaneta(element, container){
    const button = document.createElement('button');
        const div = document.createElement('div');
        const divConteudo = document.createElement('div');
        div.classList.add('div__planeta');
        divConteudo.classList.add('main--disebled');
        button.innerText = element.name;

        const nome = document.createElement('p');
        const clima = document.createElement('p');
        const populacao = document.createElement('p');
        const terreno = document.createElement('p');
        const legendaTabela = document.createElement('p');
        const tabela = document.createElement('table');

        tabela.innerHTML = `<thead>
        <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
        </tr>
        </thead>
        <tbody></tbody>`;
        nome.innerText = 'Nome: ' + element.name;
        clima.innerText = 'Clima: ' + element.climate;
        populacao.innerText = 'População: ' + element.population;
        terreno.innerText = 'Terreno: ' + element.terrain;
        legendaTabela.innerText = 'Habitantes famosos:'

        divConteudo.appendChild(nome);
        divConteudo.appendChild(clima);
        divConteudo.appendChild(populacao);
        divConteudo.appendChild(terreno);
        divConteudo.appendChild(legendaTabela);
        divConteudo.appendChild(tabela);       

        button.addEventListener('click' , (event)=>{
            divConteudo.classList.toggle('main--disebled');
        })
        div.appendChild(button);
        div.appendChild(divConteudo);
       
        container.appendChild(div);

        const corpoTabela = divConteudo.querySelector('tbody');

        element.residents.forEach((item)=>{
            fetch(item).then(res=>res.json())
            .then(data=>{
                const templateItem = `<tr>
                    <td>${data.name}</td>
                    <td>${data.birth_year}</td>
                </tr>`

                corpoTabela.innerHTML = corpoTabela.innerHTML + templateItem
            })
        })

}


const buttonPesquisa = document.querySelector('.button__pesquisar');

buttonPesquisa.addEventListener('click' , ()=>{
    const input = document.querySelector('.pesquisar');
    
    fetch(`https://swapi.dev/api/planets/?search=${input.value}`)
    .then(res => res.json())
    .then (data =>{
        let arrayPlaneta = data.results
        const container = document.querySelector('.main');
        container.innerHTML = '';

        arrayPlaneta.forEach(element => {
            criaContainerPlaneta(element, container)
        });
    }) ;
})

fetch('https://swapi.dev/api/planets/')
.then(res=>res.json())
.then (data =>{
    let arrayPlaneta = data.results
    const container = document.querySelector('.main');

    arrayPlaneta.forEach(element => {
        criaContainerPlaneta(element, container)
    });
}) ;





