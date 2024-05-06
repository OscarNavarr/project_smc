import sqlite3
from sqlite3 import Error
import uuid

def connectBase():
    try:
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS STATIONS
                (id          text unique not null primary key,
                 nom         text,
                 ville       text,
                 active      bool,
                 frequence   int) ''')
        c.execute('''CREATE TABLE IF NOT EXISTS RELEVES
                (smc         text,
                 recolte     text,
                 temperature float,
                 humidite_sol    float,
                 humidite_air    float,
                 pluviosite  bool,
                 foreign key (smc) references STATIONS(id)) ''')
        conn.commit()
        return conn
    except Error as e:
        print(e)
        return None