document.addEventListener('DOMContentLoaded', async function() { 

    const form = document.getElementById('form_update_station');

    // We go listen for the submit event on the form
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const id = document.getElementById('update_station_id').value;
        const name = document.getElementById('update_station_name').value;
        const city = document.getElementById('update_city').value;
        const active = document.getElementById('update_active').value;
        const frequency = document.getElementById('update_frequency').value;


        const station_to_update = {
            "id": id,
            "name": name,
            "city": city,
            "active": active,
            "frequency": frequency
        }

        const response = await fetch('/update_station/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(station_to_update)
        });

        if(response.status === 200) {
            const data = await response.json();
            
            if(data.success == true){
                // Reset the form
                form.reset();

                // Close the modal  
                document.getElementById('update_station_modal').classList.toggle('hidden');                

            }
        }
    });

});