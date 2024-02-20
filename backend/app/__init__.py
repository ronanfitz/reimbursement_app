import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

def get_database_uri(testing):
    dbname = os.environ.get('DBNAME') if testing is False else "test"
    return 'postgresql+psycopg2://{dbuser}:{dbpass}@{dbhost}:{dbport}/{dbname}'.format(
        dbuser=os.environ.get('DBUSER'),
        dbpass=os.environ.get('DBPASS'),
        dbhost=os.environ.get('DBHOST'),
        dbname=dbname,
        dbport=os.environ.get('DBPORT'),
    )

# Check if testing environment is set
if os.environ.get('FLASK_ENV') == 'testing':
    print('top')
    app.config['SQLALCHEMY_DATABASE_URI'] = get_database_uri(True)
else:
    print('bottom')
    app.config['SQLALCHEMY_DATABASE_URI'] = get_database_uri(False)

# Default configuration
app.config.update(
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)

# Initialize the database connection
db = SQLAlchemy(app)

# Enable CORS
CORS(app)

# Import blueprints for endpoint groups
from endpoints.bank_member_endpoints import bank_member_blueprint
from endpoints.bank_administrator_endpoints import bank_administrator_blueprint

# Register blueprints
app.register_blueprint(bank_member_blueprint, url_prefix='/api/bank_members')
app.register_blueprint(bank_administrator_blueprint, url_prefix='/api/bank_administrators')
