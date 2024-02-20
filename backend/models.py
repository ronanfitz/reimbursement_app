import uuid
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Bank(Base):
    __tablename__ = 'banks'

    id = Column(Integer, primary_key=True)
    uid = Column(UUID(as_uuid=True), default=uuid.uuid4, nullable=False)
    name = Column(String)
    location = Column(String)

class BankAdministrator(Base):
    __tablename__ = 'bank_administrators'

    id = Column(Integer, primary_key=True)
    uid = Column(UUID(as_uuid=True), default=uuid.uuid4, nullable=False)
    first_name = Column(String)
    last_name = Column(String)

class BankMember(Base):
    __tablename__ = 'bank_members'

    id = Column(Integer, primary_key=True)
    uid = Column(UUID(as_uuid=True), default=uuid.uuid4, nullable=False)
    member_id = Column(Integer)
    first_name = Column(String)
    last_name = Column(String)

class ReimbursementRequest(Base):
    __tablename__ = 'reimbursement_requests'

    id = Column(Integer, primary_key=True)
    member_id = Column(Integer, ForeignKey('bank_members.member_id'))
    bank_account_number = Column(Integer)
    reason = Column(String)
    amount = Column(Float)
    transaction_date = Column(String)
    status = Column(String)
    
    def serialize(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'bank_account_number': self.bank_account_number,
            'reason': self.reason,
            'amount': self.amount,
            'transaction_date': self.transaction_date,
            'status': self.status
        }
