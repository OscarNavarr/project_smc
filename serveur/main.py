# Ce fichier c'est pour créer un serveur web qui va servir les fichiers statiques et les requêtes de l'API
# Ce serveur est basé sur le framework FastAPI

from fastapi import FastAPI, APIRouter, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from json import JSONDecodeError, loads, dump
from database import *
from handle_bd_function import *

import json
# Import chart_generator from the client
from helpers.chart_generator import chart_generator





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
    "http://0.0.0.0:8000",
    "http://10.7.4.134",
    "http://10.7.5.176"
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

# Call the function selectAllStations from the client
query_result = selectAllStations()

# Call the function chart_generator from the client
chart_generator(query_result)


@app.get("/",response_class=HTMLResponse)

def root():
    if conn != False:
        return open("../client/index.html").read()
    

@app.get("/get_all_data")
def get_all_data():
    # Call the function selectAllStations from the client
    query_result = selectAllStations()
    return query_result

@app.get("/get_chart")
def get_chart():
    # Call the function selectAllStations from the client
    query_result = selectAllStations()
    return chart_generator(query_result)

@app.post("/send_data")
async def send_data(request: Request): 
    try:
        result = await request.json()
        
        # Convert the data to a dictionary
        result = loads(result)
    
        result_two = insertReleves(result['smc'], result['temperature'], result['humidite_sol'], result['humidite_air'], result['pluviosite'])

        if result_two:
            return {"message": "Data inserted successfully " + str(result_two)}
        else:
            return {"message": "Failed to insert data"}
           
    except ValidationError as e:
        return {"message": "Failed to insert data", "error": e.errors()} 
    

@app.post("/create_station")
async def send_data_to_create_stations(request: Request): 
    try:
        # Get the data from the request
        result = await request.json()

       

        # Insert the data into the database
        query_result = createStation(result['station_name'], result['city'], result['frequency'])

        if query_result and query_result["saved"]:
            # Create the message to return
            return {"success": True,"message": "Station created successfully", "id": query_result["id"]}
        else:
            return {"success": False,"message": "Failed to create station"}
        
        
    except ValidationError as e:
        return {"message": "Failed to insert data", "error": e.errors()} 
    

@app.get("/get_all_stations")
def get_all_stations():
    # Call the function selectAllStations from the client
    query_result = showAllStations()
    return query_result

app.include_router(router)