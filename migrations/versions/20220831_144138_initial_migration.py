"""Initial migration.

Revision ID: 42454c8689d5
Revises:
Create Date: 2022-08-31 14:41:38.250687

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42454c8689d5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('profile_pic', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('buzzes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('buzz_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['buzz_id'], ['buzzes.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('buzz_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['buzz_id'], ['buzzes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('buzzes')
    op.drop_table('users')
    op.drop_table('likes')
    # ### end Alembic commands ###
