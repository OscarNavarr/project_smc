counter = 1;

/**
 * This function is used to get the data from the server
 * @returns {object} The data from the server
 */
const getDataAboutStations = async () => {
    try {
        const response = await fetch('/get_all_stations/');
        const data = await response.json();
        // Inverse the data array
        return data.reverse();
    } catch (error) {
        console.log(error);
    }
}


/**
 * This function is used to get the data from the server
 * @param {object} data  The data from the server
 * @param {object} tbody The tbody of the table 
 */
const createRowForStations = (data, tbody) => {

    const tr = document.createElement('tr');
    const td_id = document.createElement('td');
    const td_id_station = document.createElement('td');
    const td_stations_name = document.createElement('td');
    const td_ville = document.createElement('td');
    const td_activite = document.createElement('td');
    const td_frequence = document.createElement('td');

    tr.className = tr_class;
    tr.setAttribute("data-istation", "true");
    tr.setAttribute("data-id", data[0]);
    tr.setAttribute("data-name", data[1]);
    tr.setAttribute("data-ville", data[2]);
    tr.setAttribute("data-activite", data[3]);
    tr.setAttribute("data-frequence", data[4]);
    
    td_id.textContent = counter;
    td_id.className = td_class + " font-medium";
    td_id.setAttribute("data-istation", "true");

    td_id_station.textContent = data[0];
    td_id_station.className = td_class;
    td_id_station.setAttribute("data-istation", "true");


    td_stations_name.textContent = data[1];
    td_stations_name.className = td_class;
    td_stations_name.setAttribute("data-istation", "true");
    
    td_ville.textContent = data[2];
    td_ville.className = td_class;
    td_ville.setAttribute("data-istation", "true");
    
    td_activite.textContent = data[3] == true ? "Oui" : "Non";
    td_activite.className = td_class;
    td_activite.setAttribute("data-istation", "true");

    td_frequence.textContent = data[4] + " secondes";
    td_frequence.className = td_class;
    td_frequence.setAttribute("data-istation", "true");


    tr.appendChild(td_id);
    tr.appendChild(td_id_station);
    tr.appendChild(td_stations_name);
    tr.appendChild(td_ville);
    tr.appendChild(td_activite);
    tr.appendChild(td_frequence);

    tbody.appendChild(tr);
    counter++;
}



document.addEventListener('DOMContentLoaded', async function() {

    // Get the data about the stations and the RELEVES
    const data_station_and_releves = await getData();

    // Get the data about the stations
    var data_stations = await getDataAboutStations();

    // Get the div that allows to slide the tables
    const div_slide = document.getElementById('div_slide');

    // Get the buttons 
    const btn_show_table_donnees = document.getElementById('btn_show_table_donnees');
    const btn_show_table_stations = document.getElementById('btn_show_table_stations');


    // Thead of the table
    const second_col_name = document.getElementById('second_col_name');
    const third_col_name = document.getElementById('third_col_name');
    const fourth_col_name = document.getElementById('fourth_col_name');
    const fifth_col_name = document.getElementById('fifth_col_name');
    const sixth_col_name = document.getElementById('sixth_col_name');
    const seventh_col_name = document.getElementById('seventh_col_name');
    const eighth_col_name = document.getElementById('eighth_col_name');

    // Get the tbody of the table
    const tbody = document.querySelector('tbody');


    // This function is used to change the selection variable when the user clicks on the buttons at the top of the page
    const change_selection = (val) => {
        selection = val;
    
        if (selection === "donnees") {

            div_slide.classList.remove("start_station");
            div_slide.classList.add("start_home");

            second_col_name.innerHTML = "Récolte";
            third_col_name.innerHTML = "Nom Station";
            fourth_col_name.innerHTML = "Ville";
            fifth_col_name.innerHTML = "Température";
            sixth_col_name.innerHTML = "Humidité du Sol";
            seventh_col_name.innerHTML = "Humidité de l'air";
            eighth_col_name.innerHTML = "Pluviosité";

            // Remove the hidden class from the columns
            seventh_col_name.classList.remove("hidden");
            eighth_col_name.classList.remove("hidden");

            counter = 1;

            // Remove the rows in the table
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            // Create the rows in the table
            data_station_and_releves.forEach(element => {
                createRow(element, tbody);
            });

        }else if (selection === "stations"){

            div_slide.classList.remove("start_home");
            div_slide.classList.add("start_station");

            second_col_name.innerHTML = "Id Station";
            third_col_name.innerHTML = "Nom Station";
            fourth_col_name.innerHTML = "Ville";
            fifth_col_name.innerHTML = "Active";
            sixth_col_name.innerHTML = "Fréquence";

            // Add the hidden class to the columns 
            seventh_col_name.classList.add("hidden");
            eighth_col_name.classList.add("hidden");

            counter = 1;
            // Remove the rows in the table
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            // Create the rows in the table
            data_stations.forEach(element => {
                createRowForStations(element, tbody);
            });

        }

    }

    // Update the table every 1 second
    setInterval(async function() {
        if (selection === "stations") {
            data_stations = await getDataAboutStations();
            change_selection("stations");

        }
    }, 1000);

    btn_show_table_donnees.addEventListener('click', function() {
        change_selection("donnees");
    });

    btn_show_table_stations.addEventListener('click', function() {
        change_selection("stations");
    });
});