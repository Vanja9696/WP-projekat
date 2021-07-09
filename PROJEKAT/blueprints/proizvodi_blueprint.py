import flask
from flask import Blueprint
from utils.db import mysql
from flask import session

proizvodi_blueprint=Blueprint("proizvodi_blueprint", __name__)

@proizvodi_blueprint.route("")
def get_all_proizvodi():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM proizvodi")
        proizvodi = cursor.fetchall()
        for p in proizvodi:
            p["cena"] = float(p["cena"])
        return flask.jsonify(proizvodi)
    return "", 401

@proizvodi_blueprint.route("<int:proizvod_id>")
def get_proizvod(proizvod_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvodi WHERE id=%s", (proizvod_id,))
    proizvod = cursor.fetchone()
    if proizvod is not None:
        proizvod["cena"] = float(proizvod["cena"])
        return flask.jsonify(proizvod)
    
    return "", 404

@proizvodi_blueprint.route("", methods=["POST"])
def dodavanje_proizvoda():
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO proizvodi(naziv, opis, cena, dostupno) VALUES(%(naziv)s, %(opis)s, %(cena)s, %(dostupno)s)", flask.request.json)
        db.commit()
        return flask.jsonify(flask.request.json), 201
    return "", 401
    
@proizvodi_blueprint.route("<int:proizvod_id>", methods=["PUT"])
def izmeni_proizvod(proizvod_id):
    proizvod = dict(flask.request.json)
    proizvod["proizvod_id"] = proizvod_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE proizvodi SET naziv=%(naziv)s, opis=%(opis)s, cena=%(cena)s, dostupno=%(dostupno)s WHERE id=%(proizvod_id)s", proizvod)
    db.commit()
    cursor.execute("SELECT * FROM proizvodi WHERE id=%s", (proizvod_id,))
    proizvod = cursor.fetchone()
    proizvod["cena"] = float(proizvod["cena"])
    return flask.jsonify(proizvod)

@proizvodi_blueprint.route("<int:proizvod_id>", methods=["DELETE"])
def ukloni_proizvod(proizvod_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM proizvodi WHERE id=%s", (proizvod_id, ))
    db.commit()
    return ""