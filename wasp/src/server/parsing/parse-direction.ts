import WinkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
import HttpError from "@wasp/core/HttpError.js";

const actions = [
	// TypeError: Cannot read properties of undefined (reading ' otherwise')
	//"slice",

	"whisk",
	"chop",
	"peel",
	"dice",
	"mince",
	"grate",
	"crush",
	"whisk",
	"stir",
	"mix",
	"knead",
	"roll",
	"heat",
	"place",
	"boil",
	"simmer",
	"bake",
	"roast",
	"grill",
	"fry",
	"saute",
	"sear",
	"braise",
	"steam",
	"poach",
	"deep-fry",
	"pan-fry",
	"stew",
	"pressure-cook",
	"blend",
	"puree",
	"shred",
	"squeeze",
	"zest",
	"juice",
	"melt",
	"cool",
	"marinate",
	"coat",
	"spread",
	"dissolve",
	"measure",
	"garnish",
	"top",
	"season",
	"flip",
	"toss",
	"combine",
	"drain",
	"rinse",
	"wipe",
	"preheat",
	"reduce",
	"deglaze",
	"glaze",
	"brine",
	"pickle",
	"cure",
	"smoke",
	"rest",
	"chill",
	"warm",
	"cool",
	"cover",
	"uncover",
	"decorate",
	"pipe",
	"shape",
	"assemble",
	"arrange",
	"layer",
	"fold",
	"sift",
	"strain",
	"score",
	"brush",
	"spoon",
	"pour",
	"scatter",
	"sprinkle",
	"pack",
	"press",
	"mold",
	"form",
	"pipe",
	"fill",
	"top",
	"knead",
	"pound",
	"beat",
	"whisk",
	"whip",
	"fold",
	"flatten",
	"press",
	"roll",
	"knead",
	"stretch",
	"shape",
	"mold",
	"form",
];
const equipment = [
	"aluminum roasting pan",
	"pot",
	"pan",
	"skillet",
	"bowl",
	"plate",
	"knife",
	"cutting board",
	"spoon",
	"fork",
	"measuring cup",
	"measuring spoon",
	"scale",
	"thermometer",
	"timer",
	"colander",
	"strainer",
	"grater",
	"peeler",
	"can opener",
	"corkscrew",
	"ladle",
	"tongs",
	"spatula",
	"rolling pin",
	"pastry brush",
	"pastry cutter",
	"muffin tin",
	"pie dish",
	"cake pan",
	"loaf pan",
	"baking sheet",
	"cooling rack",
	"parchment paper",
	"aluminum foil",
	"plastic wrap",
	"skewers",
	"grill brush",
	"pressure cooker",
	"blender",
	"food processor",
	"mixer",
	"slow cooker",
	"air fryer",
	"deep fryer",
	"wok",
	"Dutch oven",
	"stockpot",
	"teapot",
	"coffee maker",
	"toaster",
	"microwave",
	"oven",
	"stovetop",
	"fridge",
	"freezer",
	"ice cream maker",
	"juicer",
	"food mill",
	"mandoline",
	"mortar and pestle",
	"citrus press",
	"pasta machine",
	"sous-vide",
	"steamer",
	"chinois",
	"chinois",
	"funnel",
	"cheesecloth",
	"twine",
	"piping bags",
	"nozzles",
	"cookie cutters",
	"candy thermometer",
	"popover tin",
	"baguette pan",
	"dough scraper",
	"bench scraper",
	"pastry scraper",
	"dough cutter",
	"pastry wheel",
	"biscuit cutter",
	"pie server",
	"meat thermometer",
	"meat mallet",
	"meat slicer",
	"food thermometer",
	"instant-read thermometer",
	"meat tenderizer",
	"meat grinder",
	"food smoker",
	"deep fry thermometer",
	"grill",
];

interface ParseDirectionRequest {
	directions: string[];
	ingredients: string[];
}

interface ParsedDirection {
	originalText: string;
	text: string;
	ingredients: string[];
	equipment: string[];
	durations: string[];
	temperatures: string[];
	actions: string[];
	measurements: string[];
}

interface ParseDirectionResponse {
	directions: ParsedDirection[];
}

export function parseDirections(
	req: ParseDirectionRequest,
): ParseDirectionResponse {
	if (!req.directions) {
		throw new HttpError(401, "No direction provided.");
	}

	const nlp = WinkNLP(model);

	const customEntities = [
		{ name: "ACTION", patterns: actions },
		{
			name: "EQUIPMENT",
			patterns: equipment,
		},
		{
			name: "MEASUREMENT",
			patterns: [
				"CARDINAL [tbsp|tsp|teaspoon|teaspoons|tablespoon|tablespoons|cup|cups]",
			],
		},
		{
			name: "DURATION",
			patterns: ["DURATION"],
		},
		{
			name: "TEMPERATURE",
			patterns: ["CARDINAL degrees"],
		},
	];

	if (req.ingredients.length > 0) {
		customEntities.push({ name: "INGREDIENT", patterns: req.ingredients });
	}
	nlp.learnCustomEntities(customEntities);

	const its = nlp.its;

	const parsedDirections = req.directions.map((direction) => {
		const doc = nlp.readDoc(direction);

		let ingredients = new Set<string>();
		let equipment = new Set<string>();
		let durations = new Set<string>();
		let temperatures = new Set<string>();
		let actions = new Set<string>();
		let measurements = new Set<string>();
		doc.customEntities().each((e) => {
			let entityType = e.out(its.type);
			const entityValue = e.out(its.value);

			const entityMatchesPOS = (pos: string) => {
				return (
					e
						.tokens()
						.filter((t) => t.out(its.pos) === pos)
						.length() > 0
				);
			};

			if (entityType === "ACTION") {
				console.log(entityValue);
				e.tokens().each((t) => console.log(t.out(its.pos)));
				if (!entityMatchesPOS("VERB")) {
					return;
				}
				actions.add(entityValue);
			}
			if (entityType === "INGREDIENT") {
				if (!entityMatchesPOS("NOUN")) {
					return;
				}
				ingredients.add(entityValue);
			}
			if (entityType === "EQUIPMENT") {
				if (!entityMatchesPOS("NOUN")) {
					return;
				}
				equipment.add(entityValue);
			}
			if (entityType === "DURATION") {
				durations.add(entityValue);
			}
			if (entityType === "TEMPERATURE") {
				temperatures.add(entityValue);
			}
			if (entityType === "MEASUREMENT") {
				measurements.add(entityValue);
			}
			return e.markup(`<mark name="${entityType}">`, "</mark>");
		});
		return {
			originalText: direction,
			text: doc.out(its.markedUpText),
			ingredients: Array.from(ingredients),
			equipment: Array.from(equipment),
			durations: Array.from(durations),
			temperatures: Array.from(temperatures),
			actions: Array.from(actions),
			measurements: Array.from(measurements),
		};
	});
	return {
		directions: parsedDirections,
	};
}
