"""Pydantic schemas for request/response validation."""
from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, validator
import re


# Employee Schemas
class EmployeeBase(BaseModel):
    """Base employee schema."""
    employee_id: str
    full_name: str
    email: str
    department: str

    @validator('email')
    def validate_email(cls, v):
        """Validate email format."""
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Invalid email format')
        return v.lower()


class EmployeeCreate(EmployeeBase):
    """Schema for creating an employee."""
    pass


class EmployeeResponse(EmployeeBase):
    """Schema for employee response."""
    id: str
    created_at: datetime

    class Config:
        orm_mode = True


# Attendance Schemas
class AttendanceBase(BaseModel):
    """Base attendance schema."""
    employee_id: str
    date: date
    status: str

    @validator('status')
    def validate_status(cls, v):
        """Validate attendance status."""
        if v not in ['Present', 'Absent']:
            raise ValueError('Status must be either Present or Absent')
        return v


class AttendanceCreate(AttendanceBase):
    """Schema for creating attendance record."""
    
    @validator('date')
    def validate_date(cls, v):
        """Validate that date is not in the future."""
        if v > date.today():
            raise ValueError('Attendance date cannot be in the future')
        return v


class AttendanceResponse(BaseModel):
    """Schema for attendance response."""
    id: str
    employee_id: str
    date: date
    status: str
    created_at: datetime
    employee_name: Optional[str] = None
    employee_department: Optional[str] = None

    class Config:
        orm_mode = True


# Error Response Schema
class ErrorResponse(BaseModel):
    """Schema for error responses."""
    detail: str
    status_code: int
