# chatbot_backend.py
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import uvicorn
import PyPDF2

app = FastAPI()

# Sample Data
timetable = {
    "Monday": ["Math 9AM-10AM", "Physics 10AM-11AM"],
    "Tuesday": ["Chemistry 9AM-10AM", "English 10AM-11AM"]
}

exam_schedule = {
    "Math": "10 Oct 2025",
    "Physics": "12 Oct 2025"
}

faculty_contacts = {
    "Dr. Sharma": {"email": "sharma@university.com", "phone": "1234567890"}
}

events = ["Cultural Fest 5 Oct", "Sports Meet 12 Oct"]

# Models
class Query(BaseModel):
    question: str

# Endpoints
@app.get("/get_timetable")
def get_timetable():
    return {"timetable": timetable}

@app.get("/get_exam_schedule")
def get_exam_schedule():
    return {"exam_schedule": exam_schedule}

@app.get("/get_faculty_contact/{name}")
def get_faculty_contact(name: str):
    contact = faculty_contacts.get(name)
    if not contact:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return contact

@app.post("/solve_doubt")
async def solve_doubt(file: UploadFile = File(...), question: str = ""):
    pdf_reader = PyPDF2.PdfReader(file.file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    
    # For MVP, simple keyword search
    if question.lower() in text.lower():
        return {"answer": "Found relevant info in your notes!"}
    else:
        return {"answer": "Sorry, couldn't find the answer in the PDF."}

@app.get("/events")
def get_events():
    return {"upcoming_events": events}

if _name_ == "_main_":
    uvicorn.run(app, host="0.0.0.0", port=8000)