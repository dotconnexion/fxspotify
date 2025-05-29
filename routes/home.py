from quart import Blueprint, render_template
from dotenv import load_dotenv
import os

home_bp = Blueprint('home', __name__)
load_dotenv()

@home_bp.route('/')
async def index():
    repo = os.environ.get('REPO_LINK')
    return await render_template('index.html', repo = repo)