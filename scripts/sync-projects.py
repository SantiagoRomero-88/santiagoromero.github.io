"""Actualiza la copia JavaScript después de editar data/projects.json.
Uso: python scripts/sync-projects.py. Solo requiere Python estándar.
"""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
projects=json.loads((root/'data/projects.json').read_text(encoding='utf-8'))
if not isinstance(projects,list):raise ValueError('projects.json debe contener una lista')
ids=set()
for project in projects:
    for key in ['id','title','category','description','cover']:
        if not project.get(key):raise ValueError(f'Falta {key}: {project}')
    if project['id'] in ids:raise ValueError('ID duplicado: '+project['id'])
    ids.add(project['id'])
content='// Generado desde projects.json. Ejecutar: python scripts/sync-projects.py\nwindow.PORTFOLIO_PROJECTS = '+json.dumps(projects,ensure_ascii=False,indent=2)+';\n'
(root/'data/projects.js').write_text(content,encoding='utf-8')
print(f'Catálogo sincronizado: {len(projects)} proyectos.')
