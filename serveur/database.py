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
                 fréquence   int) ''')
        c.execute('''CREATE TABLE IF NOT EXISTS RELEVES
                (smc         text,
                 récolte     date default CURRENT_TIMESTAMP,
                 température float,
                 humidité_sol    float,
                 humidité_air    float,
                 pluviosité  bool,
                 foreign key (smc) references STATIONS(id)) ''')
        conn.commit()
        return conn
    except Error as e:
        print(e)
        return None


    
#def createTrigger():
    #try:
        #conn = sqlite3.connect("database.db")
        #c = conn.cursor()
        #c.execute('''CREATE TRIGGER IF NOT EXISTS update_releves
                #AFTER INSERT ON RELEVES
                #BEGIN
                    #UPDATE RELEVES
                    #SET a = ''
                    #WHERE id = old.smc;
                #END;''')
        #conn.commit()
        #return True
    #except Error as e:
     #   print(e)
     #   return False

