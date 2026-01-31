"""Database models for HRMS Lite."""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base


class Employee(Base):
    """Employee model."""
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    employee_id = Column(String(50), unique=True, nullable=False, index=True)
    full_name = Column(String(200), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    department = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationship with attendance
    attendance_records = relationship("Attendance", back_populates="employee", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Employee {self.employee_id}: {self.full_name}>"


class Attendance(Base):
    """Attendance model."""
    __tablename__ = "attendance"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    employee_id = Column(String(50), ForeignKey("employees.employee_id", ondelete="CASCADE"), nullable=False)
    date = Column(DateTime, nullable=False, index=True)
    status = Column(String(20), nullable=False)  # 'Present' or 'Absent'
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationship with employee
    employee = relationship("Employee", back_populates="attendance_records")

    # Unique constraint: one attendance record per employee per date
    __table_args__ = (
        UniqueConstraint('employee_id', 'date', name='uq_employee_date'),
        Index('idx_employee_date', 'employee_id', 'date'),
    )

    def __repr__(self):
        return f"<Attendance {self.employee_id} on {self.date}: {self.status}>"
