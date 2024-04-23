# Ce fichier c'est pour créer un serveur web qui va servir les fichiers statiques et les requêtes de l'API
# Ce serveur est basé sur le framework FastAPI

from fastapi import FastAPI, APIRouter, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from database import *
from handle_bd_function import *

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



@router.post("/send_data")
def send_data(request: Request, nom: str = Form(...), ville: str = Form(...), active: bool = Form(...), frequence: int = Form(...), temperature: float = Form(...), humidite: float = Form(...), pluviosite: float = Form(...) ):
   
    result = insertStation(nom, ville, active, frequence, temperature, humidite, pluviosite )
    
    if result:
    
        return {result} 
    else: 
    
        return {"message": "Failed to insert data ", result: result }


app.include_router(router)