package source

import (
	"context"

	"github.com/MontFerret/ferret/pkg/compiler"
	"github.com/MontFerret/ferret/pkg/drivers"
	"github.com/MontFerret/ferret/pkg/drivers/http"
	"github.com/MontFerret/ferret/pkg/runtime"
	"github.com/cookwherever/cookwherever/gocook/pkg/ferret"
)

func ParseSourceAsHtml(script, file string) (out []byte, err error) {
	comp := compiler.New()

	if err = comp.RegisterFunction("listtomap", ferret.ListToMap); err != nil {
		return
	}

	if err = comp.RegisterFunction("debug", ferret.Print); err != nil {
		return
	}

	if err = comp.RegisterFunction("clean_text", ferret.CleanString); err != nil {
		return
	}

	program, err := comp.Compile(script)

	if err != nil {
		return
	}

	ctx := context.Background()

	ctx = drivers.WithContext(ctx, http.NewDriver(), drivers.AsDefault())

	return program.Run(ctx, runtime.WithParam("file", file))
}
