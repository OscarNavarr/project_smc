
document.addEventListener('DOMContentLoaded', function() {

    // Get the button that opens the modal
    const show_matplotlib_chart = document.getElementById('show_matplotlib_chart');

    // Get the modal wich contains the matplotlib chart
    const matplotlib_modal_component = document.getElementById('matplotlib_modal_component');

    // Listen for click event on the button
    show_matplotlib_chart.addEventListener('click', async function() {

        // Get the matplotlib chart
        const response = await fetch('/get_chart');

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Delete prop 'src' from the image tag
        document.getElementById('img_matplotlib_chart').src = '';
        // Set the prop 'src' from the image tag
        document.getElementById('img_matplotlib_chart').src = 'static/img/charts/test.png';
        
        matplotlib_modal_component.classList.toggle('hidden');
    });

    // Listen for click event on the modal to close it
    matplotlib_modal_component.addEventListener('click', function() {
        
        // Delete prop 'src' from the image tag
        document.getElementById('img_matplotlib_chart').src = '';

        // Close the modal
        matplotlib_modal_component.classList.toggle('hidden');
    });
});