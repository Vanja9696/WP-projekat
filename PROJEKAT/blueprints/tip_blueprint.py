import flask
from flask import Blueprint
from utils.db import mysql
from flask import session

tip_blueprint=Blueprint("tip_blueprint", __name__)

@tip_blueprint.route("")
def get_all_tip():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM tip")
        tip = cursor.fetchall()
        return flask.jsonify(tip)
    return "", 401
    
@tip_blueprint.route("<int:tip_id>")
def get_tip(tip_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM tip WHERE id=%s", (tip_id,))
    tip = cursor.fetchone()
    return flask.jsonify(tip)
