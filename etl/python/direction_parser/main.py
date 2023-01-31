import logging
from concurrent import futures
from pprint import pprint

import en_core_web_sm
import grpc
from grpc_reflection.v1alpha import reflection

import service_pb2
import service_pb2_grpc

nlp = en_core_web_sm.load()

verbs = ["chop", "peel", "dice", "mince", "slice", "grate", "crush", "whisk", "stir", "mix", "knead", "roll", "heat", "boil", "simmer", "bake", "roast", "grill", "fry", "saute", "sear", "braise", "steam", "poach", "deep-fry", "pan-fry", "stew", "pressure-cook", "blend", "puree", "shred", "squeeze", "zest", "juice", "melt", "cool", "marinate", "coat", "spread", "dissolve", "measure", "garnish", "top", "season", "flip", "toss", "combine", "drain", "rinse", "wipe", "preheat", "reduce", "deglaze", "glaze", "brine", "pickle", "cure", "smoke", "rest", "chill", "warm", "cool", "cover", "uncover", "decorate", "pipe", "shape", "assemble", "arrange", "layer", "fold", "sift", "strain", "score", "brush", "spoon", "pour", "scatter", "sprinkle", "pack", "press", "mold", "form", "pipe", "fill", "top", "knead", "pound", "beat", "whisk", "whip", "fold", "flatten", "press", "roll", "knead", "stretch", "shape", "mold", "form"]
equipment = ["pot", "pan", "skillet", "bowl", "plate", "knife", "cutting board", "spoon", "fork", "whisk", "measuring cups", "measuring spoons", "scale", "thermometer", "timer", "colander", "strainer", "grater", "peeler", "can opener", "corkscrew", "ladle", "tongs", "spatula", "rolling pin", "pastry brush", "pastry cutter", "muffin tin", "pie dish", "cake pan", "loaf pan", "baking sheet", "cooling rack", "parchment paper", "aluminum foil", "plastic wrap", "skewers", "grill brush", "pressure cooker", "blender", "food processor", "mixer", "slow cooker", "air fryer", "deep fryer", "wok", "Dutch oven", "stockpot", "teapot", "coffee maker", "toaster", "microwave", "oven", "stovetop", "fridge", "freezer", "ice cream maker", "juicer", "food mill", "mandoline", "mortar and pestle", "citrus press", "pasta machine", "sous-vide", "steamer", "chinois", "chinois", "funnel", "cheesecloth", "twine", "piping bags", "nozzles", "cookie cutters", "candy thermometer", "popover tin", "baguette pan", "dough scraper", "bench scraper", "pastry scraper", "dough cutter", "pastry wheel", "biscuit cutter", "pie server", "meat thermometer", "meat mallet", "meat slicer", "food thermometer", "instant-read thermometer", "meat tenderizer", "meat grinder", "food smoker", "deep fry thermometer"]

class Parser(service_pb2_grpc.ParserServicer):

    def ParseDirection(self, request: service_pb2.ParseDirectionRequest, context):
        doc = nlp(request.text)
        pprint([(X.text, X.label_) for X in doc.ents])
        return service_pb2.ParseDirectionResponse(name='', amount='')


def serve():
    port = '50051'
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_ParserServicer_to_server(Parser(), server)
    SERVICE_NAMES = (
        service_pb2.DESCRIPTOR.services_by_name['Parser'].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)
    server.add_insecure_port('[::]:' + port)
    server.start()
    print("Server started, listening on " + port)
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
