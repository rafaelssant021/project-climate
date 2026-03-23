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
            document.body.style.backgroundImage = "linear-gradient(135deg, #fceabb, #f8b500)";
            } 
            else if (clima === "Clouds") {
                document.body.style.backgroundImage = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            } 
            else if (clima === "Rain") {
                document.body.style.backgroundImage = "linear-gradient(135deg, #4b79a1, #283e51)";
            } 
            else if (clima === "Thunderstorm") {
                document.body.style.backgroundImage = "linear-gradient(135deg, #232526, #414345)";
            } 
            else if (clima === "Snow") {
                document.body.style.backgroundImage = "linear-gradient(135deg, #e6dada, #274046)";
            } 
            else if (clima === "Drizzle") {
                document.body.style.backgroundImage = "linear-gradient(135deg, #89f7fe, #66a6ff)";
            } 
            else {
                document.body.style.backgroundImage = "linear-gradient(135deg, #667eea, #764ba2)";
            }


        resultado.innerHTML = `
            <h2>${dados.name}</h2>
            <img src="${urlIcone}">
            <p>Temperatura: ${dados.main.temp} °C</p>
            <p>Clima: ${dados.weather[0].description}</p>
            <p>Umidade: ${dados.main.humidity}%</p>
            <p>Velocidade do vento: ${dados.wind.speed} m/s</p>
        `;

        mostrarClima(dados);

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

    trocarClimaComAnimacao(() => {
        document.body.className = "";

    if (clima === "Clear") {
        document.body.classList.add("clear");
    } else if (clima === "Clouds") {
        document.body.classList.add("clouds");
    } else if (clima === "Rain") {
        document.body.classList.add("rain");
    }
    })

    resultado.innerHTML = `
        <h2>${dados.name}</h2>
        <img src="${urlIcone}">
        <p class="temp">${dados.main.temp} °C</p>
        <p>Clima: ${dados.weather[0].description}</p>
        <p>Umidade: ${dados.main.humidity}%</p>
        <p>Vento: ${dados.wind.speed} m/s</p>
    `;
}

function trocarClimaComAnimacao(callback) {
    const overlay = document.querySelector(".transition-overlay");

    overlay.classList.add("active");

    setTimeout(() => {
        callback();
        overlay.classList.remove("active");
    }, 400);
}
