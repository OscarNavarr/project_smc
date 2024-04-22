# This code is used to send and get data from the database. 

import sqlite3
from sqlite3 import Error
import uuid

'''
    This function allow us insert the data in the database STATIONS
    @param id: the id of the station from uuid library
    @param nom: the name of the station
    @param ville: the city of the station
    @param active: if the station is active or not
    @param fréquence: the frequency of the station
    @return: true if the data is inserted, false if not
'''
def insertStation(nom,ville,active,fréquence):
    try:
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute("INSERT INTO STATIONS (id,nom,ville,active,fréquence) VALUES (?,?,?,?,?)",(str(uuid.uuid4()),nom,ville,active,fréquence))
        conn.commit()
        return True
    except Error as e:
        print(e)
        return False
    
    
'''
    This function allow us to select all the stations in the database
    @return: the list of the stations
'''
def selectAllStations():
    try:
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute("SELECT * FROM STATIONS")
        result = c.fetchall()
        return result
    except Error as e:
        print(e)
        return None