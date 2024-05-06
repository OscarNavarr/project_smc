
// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

    const tbody = document.querySelector('tbody'); 

    // We go show the modal
    const modal = document.getElementById('update_station_modal');

    // Get the button to close the modal
    const btn_close_modal = document.getElementById('close_update_station_modal');

    // We go listen for the click event inside the tbody to know if the user has clicked over station row
    tbody.addEventListener('click', function(event) {

        if(event.target.dataset.istation === 'true') {
            const tr = event.target.parentElement;
            const id = tr.dataset.id;
            const name = tr.dataset.name;
            const ville = tr.dataset.ville;
            const activite = tr.dataset.activite;
            const frequence = tr.dataset.frequence;

            document.getElementById('update_station_id').value = id;
            document.getElementById('update_station_name').value = name;
            document.getElementById('update_city').value = ville;
            
            if(activite === '1') {
                document.getElementById('update_active').value = "1";
            } else {
                document.getElementById('update_active').value = "0";
            }

            document.getElementById('update_frequency').value = frequence;

            modal.classList.remove('hidden');
        }
    });

    // We go listen for the click event on the button to close the modal
    btn_close_modal.addEventListener('click', function() {
        modal.classList.toggle('hidden');
    });
});