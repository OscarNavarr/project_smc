# Ce fichier c'est pour créer un serveur web qui va servir les fichiers statiques et les requêtes de l'API
# Ce serveur est basé sur le framework FastAPI

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from database import *


app = FastAPI()

conn = connectBase()
print(conn)

@app.get("/",response_class=HTMLResponse)

def root():
    if conn != False:
        return open("index.html").read()
    
@app.get("/stations")
def lesstations():
    return {"liste": stations()}

@app.get("/stations/{ville}")
def lesstations2(ville=None):
    return {"liste": stations(ville)}