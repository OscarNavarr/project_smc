# Ce fichier c'est pour créer un serveur web qui va servir les fichiers statiques et les requêtes de l'API
# Ce serveur est basé sur le framework FastAPI

from fastapi import FastAPI, APIRouter, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from json import JSONDecodeError, loads
from database import *
from handle_bd_function import *

import json

class Item(BaseModel):
    nom: str
    ville: str
    active: bool
    frequence: int
    temperature: float
    humidite: float
    pluviosite: float


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000"
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="../client/static"), name="static")

router = APIRouter()

conn = connectBase()
print(conn)

@app.get("/",response_class=HTMLResponse)

def root():
    if conn != False:
        return open("../client/index.html").read()
    

@app.get("/get_all_data")
def get_all_data():
    result = selectAllStations()
    return result


@app.post("/send_data")
async def send_data(request: Request): 
    try:
        result = await request.json()
        # Conocer el tipo de dato que es result
        #print(type(result))   # str

        # Convertir el string a un diccionario
        #result = loads(result)
        #print(type(result))   # dico
        

        #print(result['temperature'])
    
        result_two = insertStation(result['smc'], result['ville'], result['active'], result['frequence'], result['temperature'], result['humidite_sol'], result['humidite_air'], result['pluviosite'])

        if result_two:
            return {"message": "Data inserted successfully" + str(result_two)}
        else:
            return {"message": "Failed to insert data"}
        
        
    except ValidationError as e:
        return {"message": "Failed to insert data", "error": e.errors()} 
    
app.include_router(router)