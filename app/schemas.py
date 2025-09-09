from pydantic import BaseModel


class StudentCreate(BaseModel):
    reg_id: str
    name: str
    password: str = None


class StudentLogin(BaseModel):
    reg_id: str


class FacultyCreate(BaseModel):
    user_id: str
    name: str
    password: str


class FacultyLogin(BaseModel):
    user_id: str
    password: str
