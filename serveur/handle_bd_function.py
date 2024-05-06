# This code is used to send and get data from the database. 

import sqlite3
from sqlite3 import DataError
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
def insertStation(smc,ville,active,fréquence,température,humidite_sol, humidite_air,pluviosité):
    try:
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute('''SELECT * FROM STATIONS WHERE id = ?''', (smc,))
        result = c.fetchone()

        if result == None:
            c.execute("INSERT INTO STATIONS (id,nom,ville,active,fréquence) VALUES (?,?,?,?,?)",(smc,smc,ville,active,fréquence))
        

        c.execute("INSERT INTO RELEVES (smc,température,humidité_sol ,humidité_air,pluviosité) VALUES (?,?,?,?,?)",(smc,température,humidite_sol, humidite_air,pluviosité))

        conn.commit()

        # retornar el ultimo id insertado
        return c.lastrowid
        

    except Error as e:
        return e 
    

'''
    This function allow us to create a station in the database
    @param station_name: the name of the station
    @param city: the city of the station
    @param frequency: the frequency of the station
    @return: true if the station is created, false if not
'''

def createStation(station_name, city, frequency):
    try:
        new_id = str(uuid.uuid4())
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute("INSERT INTO STATIONS (id,nom,ville,active,fréquence) VALUES (?,?,?,?,?)",(new_id,station_name,city,True,frequency))
        conn.commit()

        if c.rowcount > 0:
            return {"saved": True, "id": new_id}
        else:
            return {"saved": False, "id": None}
        
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
        c.execute("SELECT * FROM STATIONS INNER JOIN RELEVES ON STATIONS.id = RELEVES.smc ORDER BY RELEVES.récolte DESC")
        result = c.fetchall()
        return result
    except Error as e:
        print(e)
        return None
    
'''
    This function allow us to get all the stations in the database
    @return: the list of the stations
'''
def showAllStations():
    try:
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute("SELECT * FROM STATIONS")
        result = c.fetchall()
        return result
    except Error as e:
        print(e)
        return None