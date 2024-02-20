import pytest
import uuid
from app import app, db
from models import BankMember
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
        db.session.remove()
        db.drop_all()

def test_get_bank_members(client):
    # Create some mock bank members
    member1 = BankMember(uid=uuid.uuid4(), member_id='112233445', first_name='John', last_name='Doe')
    member2 = BankMember(uid=uuid.uuid4(), member_id='554433221', first_name='Jane', last_name='Smith')
    with app.app_context():
        db.session.add(member1)
        db.session.add(member2)
        db.session.commit()

    # Test retrieving bank members
    response = client.get('/api/bank_members/')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) == 2

# Add more test cases as needed
