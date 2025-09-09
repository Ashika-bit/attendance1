from sqlalchemy import Column, Integer, String
from .database import Base


class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    reg_id = Column(String, unique=True, index=True)
    name = Column(String)
    password = Column(String, nullable=True)


class Faculty(Base):
    __tablename__ = "faculty"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)
    name = Column(String)
    password = Column(String)
