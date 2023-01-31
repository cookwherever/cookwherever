import fileinput
import json
import os
import subprocess
import tempfile
import warnings

from bottle import run, request, post

warnings.simplefilter(action='ignore', category=FutureWarning)

model_file = os.environ['MODEL_FILE']

from ingredient_phrase_tagger.training import utils

def _exec_crf_test(input_text, model_path):
    with tempfile.NamedTemporaryFile() as input_file:
        input_file.write(utils.export_data(input_text).encode('utf-8', 'ignore'))
        input_file.flush()
        return subprocess.check_output(
            ['crf_test', '--verbose=1', '--model', model_path,
             input_file.name]).decode('utf-8')

# class RecipeService(service_pb2_grpc.IngredientParserServicer):
#   def Parse(self, request, context):
#     ingredient = request.text.strip()
#
#     crf_output = _exec_crf_test([ingredient], model_file)
#
#     lines = utils.import_data(crf_output.split('\n'))
#     return service_pb2.ParseResponse(name='', amount='')

def from_stdin():
    for line in fileinput.input():
        ingredient = line.strip()

        crf_output = _exec_crf_test([ingredient], model_file)

        lines = utils.import_data(crf_output.split('\n'))

        print(json.dumps(lines))

@post('/parse')
def hello_world():
    body = request.json

    ingredient = body.get('ingredient').strip()

    crf_output = _exec_crf_test([ingredient], model_file)

    lines = utils.import_data(crf_output.split('\n'))

    formatted_lines = []
    for line in lines:
        name = line.get('name')
        formatted_lines.append({
            **line,
            "name": name.lower() if name is not None else None
        })

    return {
        'ingredients': formatted_lines
    }

def main():
    run_type = os.environ['RUN']
    if run_type == "SERVER":
        run(host='0.0.0.0', port=8080)
    else:
        from_stdin()

if __name__ == '__main__':
    main()
