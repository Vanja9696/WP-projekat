import flask
from flask import Blueprint
from utils.db import mysql
from flask import session

korisnici_blueprint=Blueprint("korisnici_blueprint", __name__)

@korisnici_blueprint.route("")
def get_all_korisnici():
    if session.get("korisnik") is not None and session.get("tip_korisnika") is not None and session["tip_korisnika"] == "Administrator":
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korisnik")
        korisnici = cursor.fetchall()
        return flask.jsonify(korisnici)
    return "", 401

@korisnici_blueprint.route("<int:korisnik_id>")
def get_korisnik(korisnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
    korisnik = cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)
    
    return "", 404

@korisnici_blueprint.route("", methods=["POST"])
def dodavanje_korisnika():
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO korisnik(korisnicko_ime, lozinku, tip_id) VALUES(%(korisnicko_ime)s, %(lozinku)s, %(tip_id)s)", flask.request.json)
        db.commit()
        return flask.jsonify(flask.request.json), 201
    return "", 401
    
@korisnici_blueprint.route("<int:korisnik_id>", methods=["PUT"])
def izmeni_korisnika(korisnik_id):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_id"] = korisnik_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET korisnicko_ime=%(korisnicko_ime)s, lozinku=%(lozinku)s, tip_id=%(tip_id)s WHERE id=%(korisnik_id)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)

@korisnici_blueprint.route("<int:korisnik_id>", methods=["DELETE"])
def ukloni_korisnika(korisnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE id=%s", (korisnik_id, ))
    db.commit()
    return ""