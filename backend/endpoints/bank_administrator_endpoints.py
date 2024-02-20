from flask import Blueprint, request, jsonify, current_app
from models import BankAdministrator, ReimbursementRequest
from app import db
from sqlalchemy import create_engine
from sqlalchemy.orm import Session


bank_administrator_blueprint = Blueprint('bank_administrator', __name__)

@bank_administrator_blueprint.route('/', methods=['GET'])
def get_bank_administrators():
    with current_app.app_context():
        engine = create_engine(current_app.config['SQLALCHEMY_DATABASE_URI'])
        session = Session(bind=engine)

        requests = session.query(BankAdministrator).all()

        session.close()

        serialized_requests = [req.serialize() for req in requests]
        return jsonify(serialized_requests)

@bank_administrator_blueprint.route('/<int:admin_id>/reimbursement_requests', methods=['GET'])
def get_all_reimbursement_requests(admin_id):
    with current_app.app_context():
        engine = create_engine(current_app.config['SQLALCHEMY_DATABASE_URI'])
        session = Session(bind=engine)

        status = request.args.get('status', default='none')
        if status != 'none':
            requests = session.query(ReimbursementRequest).filter(ReimbursementRequest.status == status).all()
        else:
            requests = session.query(ReimbursementRequest).all()

        session.close()

        serialized_requests = [req.serialize() for req in requests]
        return jsonify(serialized_requests)

@bank_administrator_blueprint.route('/<int:admin_id>/reimbursement_requests/<int:request_id>', methods=['PUT'])
def approve_or_deny_reimbursement_request(admin_id, request_id):
    with current_app.app_context():
        engine = create_engine(current_app.config['SQLALCHEMY_DATABASE_URI'])
        session = Session(bind=engine)

        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            requests = session.query(ReimbursementRequest).filter(ReimbursementRequest.id == request_id).first()
            requests.status = request.json['status']

            session.commit()
            session.close()

            return jsonify({'message': 'Reimbursement request updated successfully'})
        else:
            return 'Content-Type not supported!'