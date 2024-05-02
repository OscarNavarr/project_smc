import matplotlib.pyplot as plt
import os


def chart_generator(query_result):

    # We are going reverse the query_result to get the last values in the first position
    query_result = query_result[::-1]

    # Get the names and the values from the query_result
    names = []
    values = []

    # Loop through the query_result to get the values 
    for i in range(len(query_result)):
        names.append(query_result[i][6])
        values.append(query_result[i][7])
    

    # Create the plot
    plt.figure(figsize=(20,5))

    plt.subplot(133)                # the first subplot in the first figure
    plt.plot(names, values)         # plot the values
    plt.tight_layout()              # adjust the layout
    plt.suptitle('Variation de la température en fonction du temps')    # Title of the plot
    plt.xticks(rotation=45)         # Rotate the x-axis labels
    plt.xlabel('Date')              # x-axis label
    plt.ylabel('Temperature')       # y-axis label
    plt.grid()                      # Add a grid to the plot
    plt.tight_layout()              # adjust the layout
    plt.subplots_adjust( left=-2, right=0.95, )     # adjust the layout

    
    # Check if in ../client/static/img/charts/ exist the image test.png
    # If it exist, remove it
    if os.path.exists('../client/static/img/charts/test.png'):
        os.remove('../client/static/img/charts/test.png')
    
    # Save the plot as a file in the static folder of the client
    plt.savefig('../client/static/img/charts/test.png')
