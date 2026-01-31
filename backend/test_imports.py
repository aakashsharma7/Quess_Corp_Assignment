"""Test script to check imports."""
try:
    print("Testing imports...")
    print("1. Importing database...")
    from database import Base, engine
    print("✓ Database imported")
    
    print("2. Importing models...")
    from models import Employee, Attendance
    print("✓ Models imported")
    
    print("3. Importing schemas...")
    from schemas import EmployeeCreate, AttendanceCreate
    print("✓ Schemas imported")
    
    print("4. Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created")
    
    print("\n✅ All imports successful!")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
