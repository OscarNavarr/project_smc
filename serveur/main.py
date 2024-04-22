# Ce fichier c'est pour créer un serveur web qui va servir les fichiers statiques et les requêtes de l'API
# Ce serveur est basé sur le framework FastAPI

from fastapi import FastAPI, APIRouter, Request, Form
from fastapi.responses import HTMLResponse

from database import *
from handle_bd_function import *

app = FastAPI()
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
def send_data(request: Request, nom: str = Form(...), ville: str = Form(...), active: str = Form(...), frequence: int = Form(...)):
   
    result = insertStation(nom, ville, active, frequence)
    
    if result:
    
        return {"message": "Data inserted successfully"} 
    else: 
    
        return {"message": "Failed to insert data"}


app.include_router(router)