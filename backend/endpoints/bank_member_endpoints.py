from flask import Blueprint, request, jsonify, current_app
from models import BankMember, ReimbursementRequest
from app import db
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

bank_member_blueprint = Blueprint('bank_member', __name__)

@bank_member_blueprint.route('/', methods=['GET'])
def get_bank_members():
    with current_app.app_context():
        engine = create_engine(current_app.config['SQLALCHEMY_DATABASE_URI'])
        session = Session(bind=engine)

        requests = session.query(BankMember).all()

        session.close()

        serialized_requests = [req.serialize() for req in requests]
        return jsonify(serialized_requests)

@bank_member_blueprint.route('/<int:member_id>/reimbursement_requests', methods=['GET'])
def get_reimbursement_requests(member_id):
    with current_app.app_context():
        engine = create_engine(current_app.config['SQLALCHEMY_DATABASE_URI'])
        session = Session(bind=engine)

        requests = session.query(ReimbursementRequest).filter(ReimbursementRequest.member_id == member_id).all()

        session.close()

        serialized_requests = [req.serialize() for req in requests]
        return jsonify(serialized_requests)

@bank_member_blueprint.route('/<int:member_id>/reimbursement_requests', methods=['POST'])
def submit_reimbursement_request(member_id):
    data = request.json
    new_request = ReimbursementRequest(member_id=member_id, reason=data['reason'], amount=data['amount'], transaction_date=data['transaction_date'], status='Pending')
    db.session.add(new_request)
    db.session.commit()
    return jsonify({'message': 'Reimbursement request submitted successfully'})
