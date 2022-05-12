from .atk import *
from .nyt import *
from .seriouseats import *
from .epicurious import *
from .joshuaweissman import *
from .thewok import *

recipe_providers = {
    "atk": atk,
    "nyt": nyt,
    "seriouseats": seriouseats,
    "epicurious": epicurious,
    "joshuaweissman": joshuaweissman,
    "thewok": thewok
}
