// This file is for getting the data from the server and displaying it on the client side

let counter = 1;
const tr_class = "border-b border-neutral-200 dark:border-white/10";
const td_class = "whitespace-nowrap px-6 py-4";

// Function to get the data from the server
const getData = async () => {
    const response = await fetch('http://127.0.0.1:8000/get_all_data/');
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
    
    td_station_name.textContent = data[1];
    td_station_name.className = td_class;
    
    td_ville.textContent = data[2];
    td_ville.className = td_class;

    td_temperature.textContent = data[7] + "°C";
    td_temperature.className = td_class;

    td_humidity_sol.textContent = data[8] + "%"; 
    td_humidity_sol.className = td_class;

    td_humidity_aire.textContent = data[9] + "%"; 
    td_humidity_aire.className = td_class;

    td_pluviosite.textContent = data[9] + "mm"; 
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

var all_data = [];

// We wait that the DOM is loaded before we call the function
document.addEventListener('DOMContentLoaded', async () => {
    
    const tbody = document.querySelector('tbody');

    const data = await getData();
    
    console.log(data)
    // Inside all_data we store the data from the server like this: [[data[6],data[7]], [data[6],data[7]], ...]
    data.forEach(element => {
        all_data.push([element[6], element[7]]);
    });
    setTimeout(() => {
        data.forEach(element => {
            all_data.push([element[6], element[7]]);
        });
    }, 1000);
   

    if (data === "Error, could not get data from the server") {
        alert(data);
    } else {
        data.forEach(element => {
            createRow(element, tbody);
        });
        
        setTimeout(() => {
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            counter = 1;
            data.forEach(element => {
                
                createRow(element, tbody);
            });
        }, 1000);
        // On va effacer tous les éléments enfants du tbody


    }

});