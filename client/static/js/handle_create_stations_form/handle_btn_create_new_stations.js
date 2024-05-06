/**
 * The prupose of this code is to handle the button click event to create new stations
 * 
 * The code is executed when the DOM is fully loaded
 * 
*/

document.addEventListener('DOMContentLoaded', function() {

    // Get the button that opens the modal
    const btn_show_modal = document.getElementById('btn_show_modal_create_station');

    // Get the modal wich contains the form to create a new station
    const form_modal_component = document.getElementById('create_station_modal');

    // Get the button to close the modal
    const btn_close_modal = document.getElementById('close_create_station_modal');


    // Listen for click event on the button 
    [btn_show_modal, btn_close_modal].forEach(btn => {
        btn.addEventListener('click', function() {
            form_modal_component.classList.toggle('hidden');
        });
    });

});