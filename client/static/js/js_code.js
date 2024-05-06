// This file is for getting the data from the server and displaying it on the client side
var selection = "donnees";


let counter = 1;
const tr_class = "border-b border-neutral-200 dark:border-white/10 text-black";
const td_class = "whitespace-nowrap px-6 py-4 text-black";

// Function to get the data from the server
const getData = async () => {
    const response = await fetch('/get_all_data/');
    const data = await response.json();

    if (!response.ok ) {

        return "Error, could not get data from the server";
    }
    return data;

}
// Function to create a row in the table with the data 
const createRow = (data, tbody) => {

    const tr = document.createElement('tr');
    const td_number = document.createElement('td');
    const recolte = document.createElement('td');
    const td_station_name = document.createElement('td');
    const td_ville = document.createElement('td');
    const td_temperature = document.createElement('td');
    const td_humidity_sol = document.createElement('td');
    const td_humidity_aire = document.createElement('td');
    const td_pluviosite = document.createElement('td');

    tr.className = tr_class;
    
    td_number.textContent = counter;
    td_number.className = td_class + " font-medium";

    recolte.textContent = data[6];
    recolte.className = td_class;
    
    td_station_name.textContent = "Station 21";
    td_station_name.className = td_class;
    
    td_ville.textContent = data[2];
    td_ville.className = td_class;

    td_temperature.textContent = data[7] + "°C";
    td_temperature.className = td_class;
    td_temperature.setAttribute("id", "temperature_" + counter);


    td_humidity_sol.textContent = data[8] + "%"; 
    td_humidity_sol.className = td_class;

    td_humidity_aire.textContent = data[9] + "%"; 
    td_humidity_aire.className = td_class;

    td_pluviosite.textContent = data[10] == true ? "Oui" : "Non"; 
    td_pluviosite.className = td_class; 

    tr.appendChild(td_number);
    tr.appendChild(recolte);
    tr.appendChild(td_station_name);
    tr.appendChild(td_ville);
    tr.appendChild(td_temperature);
    tr.appendChild(td_humidity_sol);
    tr.appendChild(td_humidity_aire);
    tr.appendChild(td_pluviosite);

    tbody.appendChild(tr);
    counter++;
}

const all_data = [];


// We wait that the DOM is loaded before we call the function
document.addEventListener('DOMContentLoaded', async () => {
    
    const tbody = document.querySelector('tbody');
    
    // Get the initial data
    var initialData = await getData();


    initialData.forEach(element => {
        all_data.push([element[6], element[7]]);
    });
    
    
    setInterval(async () => {
        if (selection === "donnees") {
            let newDataForAllData = await getData();

            newDataForAllData.forEach(element => {
                all_data.push([element[6], element[7]]);
            });
        }
    }, 1000);
    
    // Manejar error si hay problema al obtener datos
    if (initialData === "Error, could not get data from the server") {
        alert(initialData);
        return;
    }

    // Inicializar tabla con los datos iniciales
    initialData.forEach(element => {
        createRow(element, tbody);
    });
    
    
    // Actualizar datos y tabla cada cierto intervalo de tiempo
    setInterval(async () => {
        if (selection === "donnees") {
            let newData = await getData(); // Obtener nuevos datos del servidor
            

            // Manejar error si hay problema al obtener nuevos datos
            if (newData === "Error, could not get data from the server") {
                alert(newData);
                return;
            }

            // Limpiar tabla
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            
            // Reiniciar contador
            counter = 1;
            
            // Crear nuevas filas con los nuevos datos
            newData.forEach(element => {
                createRow(element, tbody);
            });


            document.getElementById("h1_temp").innerHTML = newData[0][7];
        }    
    }, 1000);
    
});
