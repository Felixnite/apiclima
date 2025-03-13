//Crear los selectores
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')
const contenedor = document.querySelector('.container')

//Eventos 

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault()
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value
    if (ciudad === "" || pais === "") {
        mostrarError('LOS CAMPOS SON OBLIGATORIOS')
    }else{
        consultarAPI(ciudad, pais)
    }
}

function consultarAPI(ciudad, pais){
    const appid = 'dd87865c7341e0535724cb678aee6a7f'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`
    fetch(url)
    .then(respuesta=>{
        // console.log(respuesta)
        return respuesta.json()
    })
    .then(datos =>{
        console.log(datos)
        if(datos.cod === '404'){
            mostrarError('CIUDAD NO ENCONTRADA')
            
        }else{
            mostrarHTML(datos)
        }
        // mostrarHTML()
    })
    .catch(error=>{
        console.log(error)
    })
}

//Mostrar error
function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-500')
    //console.log(alerta)
    if (!alerta){
        const alertaM = document.createElement('div')
        alertaM.innerHTML = `<strong>${mensaje}</strong>`
        alertaM.classList.add('bg-red-500', 'text-center', 'text-red-700','py-3', 'mt-4', 'max-w-md', 'mx-auto')
        contenedor.appendChild(alertaM)
        setTimeout(()=>{
            alertaM.remove()
        },3000)
    } 
}

function gradosKelvinaC(temperatura){
    return  temperatura - 273.15
}

function mostrarHTML(data){
    limpiarHTML()
    console.log(data)
    const {name, main:{temp, temp_max, temp_min}} = data

    //Convertir a grados celsius
    Math.round
    const TA = Math.round(gradosKelvinaC(temp))
    const TMa = Math.round(gradosKelvinaC(temp_max))
    const TMm = Math.round(gradosKelvinaC(temp_min))

    // console.log(name, temp, temp_min, temp_max)
    const nCiudad = document.createElement('p')
    nCiudad.innerHTML = `El Clima en ${name}`
    nCiudad.classList.add('text-white', 'text-center', 'text-3xl')

    const tempA = document.createElement('p')
    tempA.innerHTML = `${TA} &#176C`
    tempA.classList.add('text-white', 'text-center', 'text-6xl', 'font-bold')

    const min = document.createElement('p')
    min.innerHTML = `Temp min: ${TMm} &#176C`
    min.classList.add('text-white', 'text-center', 'text-3xl')

    const max = document.createElement('p')
    max.innerHTML = `Temp max: ${TMa} &#176C`
    max.classList.add('text-white', 'text-center', 'text-3xl')

    resultado.appendChild(nCiudad)
    resultado.appendChild(tempA)
    resultado.appendChild(min)
    resultado.appendChild(max)
}



function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}