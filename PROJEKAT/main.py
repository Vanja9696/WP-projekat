import flask
from flask import Flask
from flask import session
import mysql.connector

from utils.db import mysql

from blueprints.korisnici_blueprint import korisnici_blueprint
from blueprints.korpa_blueprint import korpa_blueprint
from blueprints.proizvodi_blueprint import proizvodi_blueprint
from blueprints.tip_blueprint import tip_blueprint

app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "matriks96"
app.config["MYSQL_DATABASE_DB"] = "restoran4"

app.register_blueprint (korisnici_blueprint, url_prefix="/api/korisnici")
app.register_blueprint (korpa_blueprint, url_prefix="/api/korpa")
app.register_blueprint (tip_blueprint, url_prefix="/api/tip")
app.register_blueprint (proizvodi_blueprint, url_prefix="/api/proizvodi")

app.secret_key = "2p3oasdfas asd gfsd  sd"

mysql.init_app(app)

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/api/login", methods=["POST"])
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE korisnicko_ime=%(korisnicko_ime)s AND tip_id=%(tip_id)s", flask.request.json)
    korisnik = cursor.fetchone()
    if korisnik is not None:
        session["korisnik"] = korisnik["korisnicko_ime"]
        if korisnik["tip_id"] == 1:
            session["tip_korisnika"] = "Administrator"
        else:
            session["tip_korisnika"] = None
        return "", 200
    return "", 403

@app.route("/api/logout", methods=["GET"])
def logout():
    session.pop("korisnik", None)
    return "", 200