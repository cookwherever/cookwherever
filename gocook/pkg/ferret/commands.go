package ferret

import (
	"context"
	"fmt"
	"strings"

	"github.com/MontFerret/ferret/pkg/drivers"
	"github.com/MontFerret/ferret/pkg/runtime/core"
	"github.com/MontFerret/ferret/pkg/runtime/values"
	"github.com/cookwherever/cookwherever/gocook/pkg/util"
	"github.com/rs/zerolog/log"
)

func CleanString(ctx context.Context, args ...core.Value) (core.Value, error) {
	err := core.ValidateArgs(args, 1, 1)
	if err != nil {
		return values.None, err
	}

	e := args[0]

	str := strings.TrimSpace(util.CleanText(e.String()))

	return values.NewString(str), nil
}

func Print(ctx context.Context, args ...core.Value) (core.Value, error) {
	err := core.ValidateArgs(args, 1, core.MaxArgs)
	if err != nil {
		return values.None, err
	}

	printLog := log.Info()

	for idx, input := range args {
		printLog.Interface(fmt.Sprintf("%d", idx), input)
	}

	printLog.Msg("log")

	return values.None, nil
}

func ListToMap(ctx context.Context, args ...core.Value) (core.Value, error) {
	el, keySelector, valueSelector, err := queryArgs(args)
	if err != nil {
		println("cannot get query args", err)
		return values.None, err
	}

	querySelector, err := drivers.ToQuerySelector(
		values.NewString(fmt.Sprintf("%s,%s", keySelector, valueSelector)),
	)
	if err != nil {
		println("cannot create query selector", err)
		return values.None, err
	}

	val, err := el.QuerySelectorAll(ctx, querySelector)
	if err != nil {
		println("cannot get elements")
		return values.None, err
	}

	elementMap := map[string][]string{}
	var currentGroup string

	val.ForEach(func(value core.Value, idx int) bool {
		e, err := drivers.ToElement(value)
		if err != nil {
			println(err)
			return false
		}

		classValue, err := e.GetAttribute(ctx, "class")
		if err != nil {
			println(err)
			return false
		}

		text, err := e.GetInnerText(ctx)
		if err != nil {
			println(err)
			return false
		}

		if strings.Contains(keySelector.String(), classValue.String()) {
			currentGroup = text.String()
			elementMap[currentGroup] = []string{}
		}

		if strings.Contains(valueSelector.String(), classValue.String()) {
			list := elementMap[currentGroup]
			elementMap[currentGroup] = append(list, text.String())
		}
		return true
	})

	mapValues := values.NewObject()
	for k, v := range elementMap {
		var strVals []core.Value
		for _, s := range v {
			strVals = append(strVals, values.NewString(s))
		}
		mapValues.Set(values.NewString(k), values.NewArrayOf(strVals))
	}

	return mapValues, err
}
