/**
 * Handle the form submission
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {


    const form = document.getElementById('form_create_station');                // Get the form

    // Listen for the submit event on the form
    form.addEventListener('submit', async function(event) {

        event.preventDefault();                                                 // Prevent the default action of the form
        const form_data = new FormData(form);                                   // Create a new FormData object
        
        // Get the values from the form
        const station_name = form_data.get('station_name');
        const station_city = form_data.get('city');
        const station_frequency = form_data.get('frequency');

        // Create a new station object
        const station = {
            name: station_name,
            city: station_city,
            frequency: station_frequency
        };

        
        // Send the form data to the server
        const response = await fetch('/create_station', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(station)
        });

        // If the response is not ok, throw an error
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the data from the response
        const data = await response.json();
        
        console.log(data);
        
    });
});