import fileinput
import json
import os
import subprocess
import tempfile
import warnings

from etl.python.ingredient_parser import service_pb2_grpc, service_pb2

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

class Greeter(service_pb2_grpc.IngredientParserServicer):
  def Parse(self, request, context):
    ingredient = request.text.strip()

    crf_output = _exec_crf_test([ingredient], model_file)

    lines = utils.import_data(crf_output.split('\n'))
    return service_pb2.ParseResponse(name='', amount='')

def main():

if __name__ == '__main__':
    main()
