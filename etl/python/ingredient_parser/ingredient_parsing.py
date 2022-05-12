import json
import os
import subprocess
import tempfile
import fileinput

import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

from ingredient_phrase_tagger.training import utils

def _exec_crf_test(input_text, model_path):
    with tempfile.NamedTemporaryFile() as input_file:
        input_file.write(utils.export_data(input_text).encode('utf-8', 'ignore'))
        input_file.flush()
        return subprocess.check_output(
            ['crf_test', '--verbose=1', '--model', model_path,
             input_file.name]).decode('utf-8')

def main():
    model_file = os.environ['MODEL_FILE']

    for line in fileinput.input():
        ingredient = line.strip()

        crf_output = _exec_crf_test([ingredient], model_file)

        lines = utils.import_data(crf_output.split('\n'))

        print(json.dumps(lines))

if __name__ == '__main__':
    main()