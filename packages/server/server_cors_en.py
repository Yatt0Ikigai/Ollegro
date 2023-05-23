import json
from flask import Flask,request,jsonify
from flask_cors import CORS, cross_origin

import pymongo
from bson.objectid import ObjectId

from io import StringIO
import sys

import hashlib

from datetime import datetime,timezone

#add https for security

def md5(a):
	return hashlib.sha256((str)(a).encode('utf-8')).hexdigest()

db = None #global database pointer

app = Flask(__name__)
cors = CORS(app)

@cross_origin()
@app.route("/",methods=['GET']) #show webpage, link to download app
def banner():
	global db
	#idea: show list of all listings 'seller: name, price' ordered by date
	filepath = "/home/mikolaj/code/python/req.py" #PATH TO CLIENT FILE
	constructbanner = '''
	<style>th:nth-child(odd){background-color: #FA8128;}</style>
	<style>table, th, td {border-top: 2px solid black;border-bottom: 2px solid black;border-collapse: collapse;}</style>
	<h1>Welcome to E-Commerce</h1>
	<p>this site is currently under construction</p>
	<table style="width:100%;height:30px;">
	<tr>
	<th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
	</tr>
	</table>
	<h3 style="text-align: center;"><a href="''' + filepath + '''" download>Download the app!</a></h3>
	'''
	return constructbanner

@cross_origin()
@app.route("/hrtbt",methods=['POST']) #heartbeat, test if server is alive
def datarequest():
	global db
	req = request.get_json() #STRING TYPE
	return jsonify(req)

@cross_origin()
@app.route("/crtlst",methods=['POST']) #create listing
def createrequest():
	global db
	r = json.loads(request.get_json())
	res = {"result":"success"}
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r["userdata"]["login"]})
	#check password
	if md5(r['userdata']['password']) != a['passhash']:
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))
	
	l = {
		'name'        : r['listing']['name'],
		'description' : r['listing']['description'],
		'date'        : (str)(datetime.now(timezone.utc).isoformat()[:19]),
		'price'       : r['listing']['price'],
		'tags'        : r['tags'],
		'seller'      : a['login'],
		'seller_id'   : (str)(a['_id'])
	}
	db['listing'].insert_one(l)
	res['result'] = 'success'
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/getlst",methods=['POST']) #get listings fitting criteria
def getrequest():
	global db
	r = json.loads(request.json)
	res = {"result":'fail','data':[]}
	crit = {}
	cur = None

	for f in r['filter']:
		crit[f] = {}
		if f['min'] != 'null':
			crit[f]['$gte'] = f['min']
		if f['max'] != 'null':
			crit[f]['$lte'] = f['min']

	if r['tags'] != 'null':
		crit['tags'] = {'$in' : r['tags']}

	if r['name'] != 'null':
		crit['name'] = {'$regex':r['name']}

	if r['sort'] == 'null':
		cur = db['listing'].find(crit).skip(r['start']).limit(r['amount'])
	else:
		cur = db['listing'].find(crit).skip(r['start']).limit(r['amount']).sort(r['sort'])

	for doc in cur:
		res['data'].append(doc)
	res['result'] = 'success'

	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/dellst",methods=['POST']) #delete listing
def deleterequest():
	global db
	r = json.loads(request.get_json())
	res = {"result":"success"}
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r["userdata"]["login"]})
	#check password
	if md5(r['userdata']['password']) != a['passhash']:
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))
	#check listing
	if db['listing'].count_documents({'_id':ObjectId(r['listing_id'])}) == 0:
		res['result'] = 'deleted listing doesnt exist'
		return jsonify(json.dumps(res))
	l = db['listing'].find_one({'_id':ObjectId(r['listing_id'])})
	#check privilige
	if a['privilige'] != 0 and l['seller'] != a['login']:
		res['result'] = 'wrong privilige'
		return jsonify(json.dumps(res))
	
	db['listing'].delete_one(l)
	res['result'] = 'success'
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/getusr",methods=['POST']) #get user data
def userrequest():
	global db
	r = json.loads(request.get_json())
	res = {"result":"success"}
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r["userdata"]["login"]})
	#check password
	if md5(r['userdata']['password']) != a['passhash']:
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))
	#user exists
	if db['accounts'].count_documents({'login':r['login']}) == 0:
		res['result'] = 'seeking account doesnt exists'
		return jsonify(json.dumps(res))
	
	u = db["accounts"].find_one({'login':r["login"]})
	res['data'] = u.pop('passhash')
	res['result'] = 'success'
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/buy",methods=['POST']) #buy listing
def buyrequest():
	global db
	r = json.loads(request.get_json())
	res = {"result":"success"}
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r["userdata"]["login"]})
	#check password
	if md5(r['userdata']['password']) != a['passhash']:
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))
	#check listing
	if db['listing'].count_documents({'_id':ObjectId(r['listing_id'])}) == 0:
		res['result'] = 'listing doesnt exist'
		return jsonify(json.dumps(res))
	l = db['listing'].find_one({'_id':ObjectId(r['listing_id'])})

	db['listing'].delete_one(l)
	t = {
		'listing' : l,
		'rated'   : 'false',
		'buyer'   : a['login']
	}
	db['transactions'].add_one(t)
	db['accounts'].update_one({'login':a['login']},{'$inc':{'productssold':1}})
	res['result'] = 'success'

	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/rate",methods=['POST']) #rate transaction
def raterequest():
	global db
	r = json.loads(request.get_json())
	res = {"result":"success"}
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r["userdata"]["login"]})
	#check password
	if md5(r['userdata']['password']) != a['passhash']:
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))
	#check transaction
	if db['transactions'].count_documents({'_id':ObjectId(r['id'])}) == 0:
		res['result'] = 'transaction doesnt exists'
		return jsonify(json.dumps(res))
	t = db['transactions'].find_one({'_id':ObjectId(r['id'])})
	if t['rated'] != 'false':
		res['result'] = 'transaction already rated'
		return jsonify(json.dumps(res))
	
	db['transaction'].update_one(t,{"$set":{"rated":"true"}})

	r,rn = a['rating'],a['ratenum']
	newrate = (r*rn+r['rating'])/(rn+1)
	db['accounts'].update_one(a,{"$set":{'rating':newrate,'ratenum':rn+1}})

	res['result'] = 'success'
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/gethist",methods=['POST']) #get user's transactions
def histrequest():
	global db
	r = json.loads(request.get_json())
	res = {"result":"success"}
	res['data'] = []
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r["userdata"]["login"]})
	#check password
	if md5(r['userdata']['password']) != a['passhash']:
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))
	#correct privilige
	if r['login'] != r['userdata']['login'] and a['privilige'] != 0:
		res['result'] = 'wrong privilige'
		return jsonify(json.dumps(res))
	
	cur = db['transactions'].find({'buyer':r['login']}).skip(r['start']).limit(r['amount'])
	for doc in cur:
		r['data'].append(doc)

	res['result'] = 'success'
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/crt",methods=['POST']) #create account
def AccCrtRequest():
	global db
	r = json.loads(request.json)
	res = {"result":'fail'}
	#account doesn't exist
	if db['accounts'].count_documents({'login' : r['login']}) != 0:
		res['result'] = 'account already exists'
		return jsonify(json.dumps(res))

	if r['privilige'] == 0: #admin account
		#account exists
		if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
			res['result'] = 'account doesnt exist'
			return jsonify(json.dumps(res))
		a = db["accounts"].find_one({'login':r['userdata']['login']})
		#correct password
		if a['passhash'] != md5(r['userdata']['password']):
			res['result'] = 'incorrect password'
			return jsonify(json.dumps(res))
		#correct privilige
		if a['privilige'] != 0:
			res['result'] = 'wrong privilige'
			return jsonify(json.dumps(res))
			
		acc = {
			'login'        : r['login'],
			'passhash'     : md5(r['password']),
			'privilige'    : 0,
			'rating'       : 0,
			'ratenum'      : 0,
			"productssold" : 0
		}
		db['accounts'].insert_one(acc)
	else: #regular account
		acc = {
			'login'        : r['login'],
			'passhash'     : md5(r['password']),
			'privilige'    : 1,
			'rating'       : 0,
			'ratenum'      : 0,
			"productssold" : 0
		}
		db['accounts'].insert_one(acc)

	res['result'] = 'success'
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/del",methods=['POST']) #delete account
def accdelrequest():
	global db
	r = json.loads(request.json)
	res = {"result":'fail'}
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r['userdata']['login']})
	#correct password
	if a['passhash'] != md5(r['userdata']['password']):
		res['result'] = 'wrong password'
		return jsonify(json.dumps(res))
	#correct privilige
	if r['login'] != r['userdata']['login'] and a['privilige'] != 0:
		res['result'] = 'wrong privilige'
		return jsonify(json.dumps(res))
	
	if db['accounts'].count_documents({'login':r['login']}) == 0:
		res['result'] = 'deleted account doesnt exists'
		return jsonify(json.dumps(res))
	
	res['result'] = 'success'
	db['accounts'].delete_one({'login':r['login']})
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/conf",methods=['POST']) #confirm if login and password match
def AccConfRequest():
	global db
	r = json.loads(request.json)
	res = {"result":'fail'}
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exist'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r['userdata']['login']})

	if a['passhash'] != md5(r['userdata']['password']):
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))

	res["result"] = 'success'
	return jsonify(json.dumps(res))

@cross_origin()
@app.route("/perform",methods=['POST']) #execute code, ADMIN ONLY
def execute():
	def exec_command(cmd):
		old_stdout = sys.stdout
		result = StringIO()
		sys.stdout = result
		exec(cmd)
		sys.stdout = old_stdout
		return result.getvalue()
	
	global db
	r = json.loads(request.get_json())
	res = {"result":"success"}
	#account exists
	if db['accounts'].count_documents({'login':r['userdata']['login']}) == 0:
		res['result'] = 'account doesnt exists'
		return jsonify(json.dumps(res))
	a = db["accounts"].find_one({'login':r["userdata"]["login"]})
	#correct password
	if md5(r['userdata']['password']) != a['passhash']:
		res["result"] = 'wrong password'
		return jsonify(json.dumps(res))
	#correct privilige
	if a['privilige'] != 0:
		res['result'] = 'wrong privilige'
		return jsonify(json.dumps(res))
	
	try:
		res["output"] = exec_command(r["command"])
	except:
		res["result"] = "command error"
	
	return jsonify(json.dumps(res))

@app.before_first_request #setup, create/activate database etc
def setup():
	#create/connect to
	global db
	client = pymongo.MongoClient('localhost',27017)
	db = client["ecomdb"]
	#insert dummy collection and document to create database
	if db['accounts'].count_documents({'login':'admin'}) == 0:
		#insert original admin account
		adminacc = {
			"login"        : "admin",
			"passhash"     : md5('admin'),
			"privilige"    : 0,
			"rating"       : 0,
			"ratenum"      : 0,
			"productssold" : 0
		}
		db["accounts"].insert_one(adminacc)

#sudo systemctl start mongod

if __name__ == "__main__":
    app.run(ssl_context='adhoc')
    #flask --app server run --cert=adhoc
    #                       ^for https
