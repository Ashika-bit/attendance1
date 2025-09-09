from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, database, crud, auth

app = FastAPI()
models.Base.metadata.create_all(bind=database.engine)

# Dependency
get_db = database.get_db

# Student signup


@app.post("/student/signup")
def student_signup(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = crud.get_student_by_reg_id(db, student.reg_id)
    if db_student:
        raise HTTPException(
            status_code=400, detail="Reg ID already registered")
    return crud.create_student(db, student)

# Student login (view only)


@app.post("/student/login")
def student_login(login: schemas.StudentLogin, db: Session = Depends(get_db)):
    student = crud.get_student_by_reg_id(db, login.reg_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"reg_id": student.reg_id, "name": student.name}

# Faculty signup


@app.post("/faculty/signup")
def faculty_signup(faculty: schemas.FacultyCreate, db: Session = Depends(get_db)):
    return crud.create_faculty(db, faculty)

# Faculty login


@app.post("/faculty/login")
def faculty_login(login: schemas.FacultyLogin, db: Session = Depends(get_db)):
    faculty = crud.authenticate_faculty(db, login.user_id, login.password)
    if not faculty:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": faculty.user_id})
    return {"access_token": token, "token_type": "bearer"}
