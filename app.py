from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Mock data for the portfolio
portfolio_data = {
    "name": "Alejandro Murillo Anguas",
    "brand": "ANGVISUAL",
    "categories": [
        {"id": "sports", "title": "DEPORTE", "description": "Capturando la intensidad y el movimiento en su estado puro."},
        {"id": "events", "title": "EVENTOS Y EMPRESAS", "description": "Soluciones visuales profesionales para marcas y corporaciones."},
        {"id": "personal", "title": "PRESENTACIÓN", "description": "Sobre mí y mi visión detrás de la cámara."}
    ],
    "videos": [
        {"id": 1, "title": "Empresa A - Promo", "url": "#"},
        {"id": 2, "title": "Empresa B - Evento", "url": "#"},
        {"id": 3, "title": "Empresa C - Corporativo", "url": "#"}
    ]
}

@app.route('/')
def index():
    videos_dir = os.path.join(app.root_path, 'static', 'videos')
    videos_list = []
    if os.path.exists(videos_dir):
        files = [f for f in os.listdir(videos_dir) if f.lower().endswith(('.mp4', '.mov', '.webm', '.avi'))]
        for i, f in enumerate(files):
            # Clean up the extension from the title
            title = os.path.splitext(f)[0].replace('-', ' ').replace('_', ' ').title()
            videos_list.append({
                "id": i + 1,
                "title": title,
                "url": f"/static/videos/{f}"
            })
    portfolio_data['videos'] = videos_list

    return render_template('index.html', data=portfolio_data)

@app.route('/api/data')
def get_data():
    return jsonify(portfolio_data)

@app.route('/api/gallery/<category>')
def get_gallery(category):
    if category not in ['deporte', 'eventos', 'empresas', 'sesiones']:
        return jsonify([])
    
    folder_path = os.path.join(app.root_path, 'static', category)
    if not os.path.exists(folder_path):
        return jsonify([])
        
    images = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return jsonify([f'/static/{category}/{img}' for img in images])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
