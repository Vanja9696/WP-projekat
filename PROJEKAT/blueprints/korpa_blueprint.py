import flask
from flask import Blueprint
from utils.db import mysql
from flask import session

korpa_blueprint=Blueprint("korpa_blueprint", __name__)

@korpa_blueprint.route("")
def get_all_korpe():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korpa")
        korpe = cursor.fetchall()
        return flask.jsonify(korpe)
    return "", 401
    
@korpa_blueprint.route("<int:korpa_id>")
def get_korpa(korpa_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id,))
    korpe = cursor.fetchone()
    return flask.jsonify(korpe)
    
@korpa_blueprint.route("", methods=["POST"])
def dodavanje_korpe():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korpa(korisnik_id, proizvod_id, kolicina, datum, ulica, broj) VALUES(%(korisnik_id)s, %(proizvod_id)s, %(kolicina)s, %(datum)s, %(ulica)s, %(broj)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201

@korpa_blueprint.route("<int:korpa_id>", methods=["PUT"])
def izmeni_korpu(korpa_id):
    korpa = dict(flask.request.json)
    korpa["korpa_id"] = korpa_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korpa SET korisnik_id=%(korisnik_id)s, proizvod_id=%(proizvod_id)s, kolicina=%(kolicina)s, datum=%(datum)s,  %(ulica)s, %(broj)s WHERE id=%(korpa_id)s" , korpa)
    db.commit()
    cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id,))
    korpa = cursor.fetchone()
    return flask.jsonify(korpa)

@korpa_blueprint.route("<int:korpa_id>", methods=["DELETE"])
def ukloni_korpu(korpa_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korpa WHERE id=%s", (korpa_id, ))
    db.commit()
    return ""