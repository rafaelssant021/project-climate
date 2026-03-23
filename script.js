const apiKey = '7d131292de5ea2011e325501c772bcf3';


async function buscarClima(){
    const city = document.getElementById("city").value;
    if (!city) {
        alert("digite uma cidade");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try{
        const resposta = await fetch(url);
        const dados = await resposta.json();

        const resultado = document.getElementById("resultado");

        if(dados.cod !== 200){
            resultado.innerHTML = `<p>Erro: ${dados.message}</p>`;
            return;
        }

        const icone = dados.weather[0].icon;
        const urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;

        const clima = dados.weather[0].main;

        if (clima === "Clear") {
            document.body.style.background = "#f7b733";
        } else if (clima === "Clouds") {
            document.body.style.background = "#757f9a";
        } else if (clima === "Rain") {
            document.body.style.background = "#005c97";
        }


        resultado.innerHTML = `
            <h2>${dados.name}</h2>
            <img src="${urlIcone}">
            <p>Temperatura: ${dados.main.temp} °C</p>
            <p>Clima: ${dados.weather[0].description}</p>
            <p>Umidade: ${dados.main.humidity}%</p>
            <p>Velocidade do vento: ${dados.wind.speed} m/s</p>
        `;

    } catch (error){
        console.error(error);
        alert("Ocorreu um erro ao buscar o clima");
    }
}

async function buscarPorLocalizacao(){
    navigator.geolocation.getCurrentPosition(async (posicao) => {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

        try{
            const resposta = await fetch(url);
            const dados = await resposta.json();

            mostrarClima(dados);
        } catch (error){
            console.error(error);
            alert("Ocorreu um erro ao buscar o clima por localização");
        }

    });
}

function mostrarClima(dados) {
    const resultado = document.getElementById("resultado");

    if (dados.cod !== 200) {
        resultado.innerHTML = `<p>Erro: ${dados.message}</p>`;
        return;
    }

    const icone = dados.weather[0].icon;
    const urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;

    const clima = dados.weather[0].main;

    document.body.className = "";

    if (clima === "Clear") {
        document.body.classList.add("clear");
    } else if (clima === "Clouds") {
        document.body.classList.add("clouds");
    } else if (clima === "Rain") {
        document.body.classList.add("rain");
    }

    resultado.innerHTML = `
        <h2>${dados.name}</h2>
        <img src="${urlIcone}">
        <p>Temperatura: ${dados.main.temp} °C</p>
        <p>Clima: ${dados.weather[0].description}</p>
        <p>Umidade: ${dados.main.humidity}%</p>
        <p>Vento: ${dados.wind.speed} m/s</p>
    `;
}
