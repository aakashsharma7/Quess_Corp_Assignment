"""Employee management routes."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
from database import get_db
from models import Employee
from schemas import EmployeeCreate, EmployeeResponse

router = APIRouter(prefix="/api/employees", tags=["employees"])


@router.post("", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    """
    Create a new employee.
    
    - **employee_id**: Unique employee identifier
    - **full_name**: Employee's full name
    - **email**: Employee's email address (must be valid and unique)
    - **department**: Employee's department
    """
    try:
        # Check if employee_id already exists
        existing_employee = db.query(Employee).filter(Employee.employee_id == employee.employee_id).first()
        if existing_employee:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Employee with ID '{employee.employee_id}' already exists"
            )
        
        # Check if email already exists
        existing_email = db.query(Employee).filter(Employee.email == employee.email).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Employee with email '{employee.email}' already exists"
            )
        
        # Create new employee
        db_employee = Employee(**employee.dict())
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        
        return EmployeeResponse(
            id=str(db_employee.id),
            employee_id=db_employee.employee_id,
            full_name=db_employee.full_name,
            email=db_employee.email,
            department=db_employee.department,
            created_at=db_employee.created_at
        )
    
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee with this ID or email already exists"
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while creating the employee: {str(e)}"
        )


@router.get("", response_model=List[EmployeeResponse])
async def get_employees(db: Session = Depends(get_db)):
    """
    Retrieve all employees.
    
    Returns a list of all employees in the system.
    """
    try:
        employees = db.query(Employee).order_by(Employee.created_at.desc()).all()
        
        return [
            EmployeeResponse(
                id=str(emp.id),
                employee_id=emp.employee_id,
                full_name=emp.full_name,
                email=emp.email,
                department=emp.department,
                created_at=emp.created_at
            )
            for emp in employees
        ]
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving employees: {str(e)}"
        )


@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    """
    Delete an employee by employee_id.
    
    - **employee_id**: The unique employee identifier
    
    This will also delete all associated attendance records.
    """
    try:
        employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
        
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Employee with ID '{employee_id}' not found"
            )
        
        db.delete(employee)
        db.commit()
        
        return None
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting the employee: {str(e)}"
        )
