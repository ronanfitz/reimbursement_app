from app import app
import pytest
from app import db

# Set up database fixtures
@pytest.fixture(scope='session')
def database():
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    with app.app_context():
        db.create_all()
        yield db
        db.drop_all()

# Teardown database after all tests
@pytest.fixture(autouse=True)
def cleanup(request, database):
    def teardown():
        with app.app_context():
            db.session.remove()
    request.addfinalizer(teardown)
