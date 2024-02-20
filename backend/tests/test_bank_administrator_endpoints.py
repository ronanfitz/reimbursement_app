import pytest
import uuid
from app import app, db
from models import BankAdministrator, ReimbursementRequest
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()

    # Set up a temporary in-memory database
    with app.app_context():
        db.create_all()

    yield client

    # Teardown the temporary database after tests
    with app.app_context():
        db.drop_all()

def test_get_bank_administrators(client):
    # Create some mock bank administrators
    admin1 = BankAdministrator(uid=uuid.uuid4(), first_name='Admin', last_name='One')
    admin2 = BankAdministrator(uid=uuid.uuid4(), first_name='Admin', last_name='Two')
    with app.app_context():
        db.session.add(admin1)
        db.session.add(admin2)
        db.session.commit()

    # Test retrieving bank administrators
    response = client.get('/api/bank_administrators/')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) == 2

# Add more test cases as needed
