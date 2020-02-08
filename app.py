from flask import Flask,jsonify,request,redirect,url_for,render_template,session
import pandas as pd
from matplotlib import pyplot as plt

from sqlalchemy import create_engine
import mysql.connector

# import pymysql

# from flask_wtf.csrf import CSRFProtect
# from flask_sqlalchemy import SQLAlchemy
# from modules.admin.view import admin
# from db import db

# from flask_wtf import csrf

app = Flask(__name__)
# csrf = CSRFProtect(app)
# csrf.exempt("register")
# app.config['FLASK_ENV'] = "development"
# app.config['WTF_CSRF_CHECK_DEFAULT'] = False
# FLASK_ENV=development
app.debug = True
app.secret_key = "sljkdfksdfklsjdbnfsdfsdfk98123798123jsdkasdjf"
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://mahmoud:12345@localhost/music"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



#matplotlib
@app.route("/")
def tamrin2():
    # titanic = "titanic.csv"
    # airbase = "airbase_data.csv"
    # flow = "flowdata.csv"
    # melb = "melb_data"
    # file_name = "static/data/titanic.csv"
    # data_set_name = "titanic.csv"

    # plt.plot([0, 1, 2, 3, 4], [0, 3, 5, 9, 11])
    # plt.xlabel('Months')
    # plt.ylabel('Books Read')
    # plt.show()

    type = request.args.get("type")
    file_name = "static/data/titanic.csv"
    df = pd.read_csv(file_name)
    image = "";
    if type == "hist":
        df["Age"].hist()
        plt.savefig('static/hist_age_titanic.png')
        image = "hist_age_titanic.png"
    # plt.figure(figsize=(8, 6))

    # df["Age"].boxplot()
    # df.groupby("Sex")['Age'].agg.boxplot(column='Age', patch_artist=True)
    # plt.show()
    elif type == "boxplot" :
        zan = df[df["Sex"] == 'male']['Age'].dropna()
        mard = df[df["Sex"] == 'female']['Age'].dropna()
        print("-------------------------")
        print(list(zan))
        print(list(mard))
        # all_data = [list(zan),list(mard)]
        all_data = [zan, mard]
        fig = plt.figure(figsize=(8, 6))
        plt.boxplot(all_data,
                    notch=False,  # box instead of notch shape
                    sym='rs',  # red squares for outliers
                    vert=True)  # vertical box aligmnent
    
        plt.xticks([y + 1 for y in range(len(all_data))], ['x1', 'x2'])
        plt.xlabel('measurement x')
        t = plt.title('Box plot')
        # plt.show()
        plt.savefig('static/boxplot_age_titanic.png')
        image = "boxplot_age_titanic.png"
    else:
        return "Not Found"   

    return render_template("plot.html",data = {"image":image})

@app.route("/mysql")
def mysqlConnect():
    # sqlEngine = create_engine('mysql+pymysql://root:@127.0.0.1', pool_recycle=3600)

    engine = create_engine('mysql+mysqlconnector://'+"mahmood"+':'+"12345"+'@'+"127.0.0.1"+'/club', echo=False)
    frame = pd.read_sql('SELECT * FROM users', engine)
    # dbConnection = sqlEngine.connect()
    # frame = pd.read_sql("select * from users", dbConnection)
    # pd.set_option('display.expand_frame_repr', False)
    # print(frame)
    frame = frame.reset_index()
    frame.set_index("id")
    dt = frame[frame["phone"] == "09179071039"][["id","phone"]]
    print(dt)
    # engine.close()

    return "coonect"
# app.add_url_rule("/test","hello",test,methods=["POST","GET"])

if __name__ == "__main__" :
    app.run(host="0.0.0.0",port=8088,debug=True)





