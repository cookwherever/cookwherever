/*
			if (e.target.className === 'tl-host') {
				return;
			}

			function getInnermostHovered() { return [].slice.call(document.querySelectorAll(':hover')).pop(); }

			const nodeSelector = finder(getInnermostHovered());

			this.selector = nodeSelector

			let elem = document.querySelector(nodeSelector);

      if (e.keyCode === 68) {
        elem.remove();
        this.$elementsToRemove.push(nodeSelector);
        return;
      }

      this.$target = elem

			function findSimilarTargets(depth, elem) {
				if (depth === 5 || elem === null) {
					return {
            elems: [],
            selector: undefined
          }
        }

        for (let i in elem.classList) {
          const className = elem.classList[i];
					const elems = document.getElementsByClassName(className);
					if (elems.length > 1) {
						return {
              elems: elems,
              selector: '.' + className
            }
					}
        }

				if (nodeSelector.indexOf('nth-child') !== -1) {
					const similarTargets = elem.parentElement.children;
					if (similarTargets.length > 1) {
						const tagName = similarTargets[0].tagName

						if (Array.from(similarTargets).every(e => e.tagName === tagName)) {
							return {
                elems: similarTargets,
                selector: undefined
              }
						}
					}
				}
				return findSimilarTargets(depth + 1, elem.parentElement)
			}

      this.$similarTargets = [this.$target];
      if (e.keyCode === 65) {
        ret = findSimilarTargets(0, elem);
        this.$similarTargets = ret.elems;

        if (this.$similarTargets.length !== 0) {
          this.selector = finder(this.$similarTargets[0].parentElement)
        }

        if (ret.selector) {
          this.selector = ret.selector
        }
      }
*/