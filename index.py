from flask import Flask, render_template # type: ignore

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('game.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')