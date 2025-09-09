from sqlalchemy.orm import Session
from . import models, schemas, auth

# Student


def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(
        reg_id=student.reg_id, name=student.name, password=student.password)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def get_student_by_reg_id(db: Session, reg_id: str):
    return db.query(models.Student).filter(models.Student.reg_id == reg_id).first()

# Faculty


def create_faculty(db: Session, faculty: schemas.FacultyCreate):
    hashed_password = auth.hash_password(faculty.password)
    db_faculty = models.Faculty(
        user_id=faculty.user_id, name=faculty.name, password=hashed_password)
    db.add(db_faculty)
    db.commit()
    db.refresh(db_faculty)
    return db_faculty


def authenticate_faculty(db: Session, user_id: str, password: str):
    faculty = db.query(models.Faculty).filter(
        models.Faculty.user_id == user_id).first()
    if faculty and auth.verify_password(password, faculty.password):
        return faculty
    return None
