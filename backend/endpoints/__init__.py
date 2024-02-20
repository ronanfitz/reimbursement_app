from flask import Blueprint

# Define blueprints for endpoint groups
bank_member_blueprint = Blueprint('bank_member', __name__)
bank_administrator_blueprint = Blueprint('bank_administrator', __name__)

# Import endpoint modules to register blueprints
from . import bank_member_endpoints, bank_administrator_endpoints
