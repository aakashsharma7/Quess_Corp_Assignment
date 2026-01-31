"""Pydantic schemas for request/response validation."""
from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator, ConfigDict


# Employee Schemas
class EmployeeBase(BaseModel):
    """Base employee schema."""
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeCreate(EmployeeBase):
    """Schema for creating an employee."""
    pass


class EmployeeResponse(EmployeeBase):
    """Schema for employee response."""
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Attendance Schemas
class AttendanceBase(BaseModel):
    """Base attendance schema."""
    employee_id: str
    date: date
    status: str

    @field_validator('status')
    @classmethod
    def validate_status(cls, v: str) -> str:
        """Validate attendance status."""
        if v not in ['Present', 'Absent']:
            raise ValueError('Status must be either Present or Absent')
        return v


class AttendanceCreate(AttendanceBase):
    """Schema for creating attendance record."""
    
    @field_validator('date')
    @classmethod
    def validate_date(cls, v: date) -> date:
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

    model_config = ConfigDict(from_attributes=True)


# Error Response Schema
class ErrorResponse(BaseModel):
    """Schema for error responses."""
    detail: str
    status_code: int
