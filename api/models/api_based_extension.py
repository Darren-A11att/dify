from sqlalchemy.dialects.postgresql import UUID

from extensions.ext_database import db

class APIBasedExtension(db.Model):
    __tablename__ = 'api_based_extensions'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='api_based_extension_pkey'),
        db.Index('api_based_extension_tenant_idx', 'tenant_id'),
    )

    id = db.Column(UUID, server_default=db.text('uuid_generate_v4()'))
    tenant_id = db.Column(UUID, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    api_endpoint = db.Column(db.String(255), nullable=False)
    api_key = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.text('CURRENT_TIMESTAMP(0)'))