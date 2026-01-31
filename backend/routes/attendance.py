"""Attendance management routes."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
from datetime import datetime
from database import get_db
from models import Attendance, Employee
from schemas import AttendanceCreate, AttendanceResponse

router = APIRouter(prefix="/api/attendance", tags=["attendance"])


@router.post("", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    """
    Mark attendance for an employee.
    
    - **employee_id**: Employee identifier
    - **date**: Attendance date (cannot be in the future)
    - **status**: Attendance status (Present or Absent)
    """
    try:
        # Check if employee exists
        employee = db.query(Employee).filter(Employee.employee_id == attendance.employee_id).first()
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Employee with ID '{attendance.employee_id}' not found"
            )
        
        # Check if attendance already marked for this date
        existing_attendance = db.query(Attendance).filter(
            Attendance.employee_id == attendance.employee_id,
            Attendance.date == datetime.combine(attendance.date, datetime.min.time())
        ).first()
        
        if existing_attendance:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Attendance already marked for employee '{attendance.employee_id}' on {attendance.date}"
            )
        
        # Create attendance record
        db_attendance = Attendance(
            employee_id=attendance.employee_id,
            date=datetime.combine(attendance.date, datetime.min.time()),
            status=attendance.status
        )
        db.add(db_attendance)
        db.commit()
        db.refresh(db_attendance)
        
        return AttendanceResponse(
            id=str(db_attendance.id),
            employee_id=db_attendance.employee_id,
            date=db_attendance.date.date(),
            status=db_attendance.status,
            created_at=db_attendance.created_at,
            employee_name=employee.full_name,
            employee_department=employee.department
        )
    
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Attendance already marked for this employee on this date"
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while marking attendance: {str(e)}"
        )


@router.get("/{employee_id}", response_model=List[AttendanceResponse])
async def get_employee_attendance(employee_id: str, db: Session = Depends(get_db)):
    """
    Get attendance records for a specific employee.
    
    - **employee_id**: Employee identifier
    
    Returns all attendance records for the employee, ordered by date (most recent first).
    """
    try:
        # Check if employee exists
        employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Employee with ID '{employee_id}' not found"
            )
        
        # Get attendance records
        attendance_records = db.query(Attendance).filter(
            Attendance.employee_id == employee_id
        ).order_by(Attendance.date.desc()).all()
        
        return [
            AttendanceResponse(
                id=str(record.id),
                employee_id=record.employee_id,
                date=record.date.date(),
                status=record.status,
                created_at=record.created_at,
                employee_name=employee.full_name,
                employee_department=employee.department
            )
            for record in attendance_records
        ]
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving attendance records: {str(e)}"
        )


@router.get("", response_model=List[AttendanceResponse])
async def get_all_attendance(db: Session = Depends(get_db)):
    """
    Get all attendance records.
    
    Returns all attendance records in the system, ordered by date (most recent first).
    """
    try:
        attendance_records = db.query(Attendance).join(Employee).order_by(Attendance.date.desc()).all()
        
        return [
            AttendanceResponse(
                id=str(record.id),
                employee_id=record.employee_id,
                date=record.date.date(),
                status=record.status,
                created_at=record.created_at,
                employee_name=record.employee.full_name,
                employee_department=record.employee.department
            )
            for record in attendance_records
        ]
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving attendance records: {str(e)}"
        )
