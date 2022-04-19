package ferret

import (
	"github.com/MontFerret/ferret/pkg/drivers"
	"github.com/MontFerret/ferret/pkg/runtime/core"
)

func queryArgs(args []core.Value) (el drivers.HTMLDocument, keySelector drivers.QuerySelector, valueSelector drivers.QuerySelector, err error) {
	err = core.ValidateArgs(args, 3, 3)
	if err != nil {
		return
	}

	el, err = drivers.ToDocument(args[0])
	if err != nil {
		return
	}

	keySelector, err = drivers.ToQuerySelector(args[1])
	if err != nil {
		return
	}

	valueSelector, err = drivers.ToQuerySelector(args[2])
	if err != nil {
		return
	}
	return
}
