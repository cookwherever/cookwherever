# Ingredient

```
Taste {

}

TimeRange {
  start: number,
  end: number | infinity
}

TemperatureRange {
  low: number,
  high: number
}

NutritionalContent {
  TBD
}

Ingredient {
  names: string[],
	description: string,
  functional_properties: string,
  states: [{
    name: string,
    time_range: TimeRange,
    temperature_range: TemperatureRange,
    taste: Taste,
		safety: SafetyInfo
    description: string
  }],
  nutritional_content: NutritionalContent,
  preperation_methods: PreperationMethod,
	regions: Region[],
	varieties: Variety[]
}
```
