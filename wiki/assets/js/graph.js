async function drawGraph(url, baseUrl, pathColors, depth, enableDrag, enableLegend, enableZoom) {
  const { index, links, content } = await fetchData
  const curPage = url.replace(baseUrl, "")

  const parseIdsFromLinks = (links) => [...(new Set(links.flatMap(link => ([link.source, link.target]))))]

  const neighbours = new Set()
  const wl = [curPage || "/", "__SENTINEL"]
  if (depth >= 0) {
    while (depth >= 0 && wl.length > 0) {
      // compute neighbours
      const cur = wl.shift()
      if (cur === "__SENTINEL") {
        depth--
        wl.push("__SENTINEL")
      } else {
        neighbours.add(cur)
        const outgoing = index.links[cur] || []
        const incoming = index.backlinks[cur] || []
        wl.push(...outgoing.map(l => l.target), ...incoming.map(l => l.source))
      }
    }
  } else {
    parseIdsFromLinks(links).forEach(id => neighbours.add(id))
  }

  const data = {
    nodes: [...neighbours].map(id => ({ id })),
    links: links.filter(l => neighbours.has(l.source) && neighbours.has(l.target)),
  }

  const color = (d) => {
    if (d.id === curPage || (d.id === "/" && curPage === "")) {
      return "var(--g-node-active)"
    }

    for (const pathColor of pathColors) {
      const path = Object.keys(pathColor)[0]
      const colour = pathColor[path]
      if (d.id.startsWith(path)) {
        return colour
      }
    }

    return "var(--g-node)"
  }

  const drag = simulation => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const noop = () => { }
    return d3.drag()
      .on("start", enableDrag ? dragstarted : noop)
      .on("drag", enableDrag ? dragged : noop)
      .on("end", enableDrag ? dragended : noop);
  }

  const height = 250
  const width = document.getElementById("graph-container").offsetWidth

  const simulation = d3.forceSimulation(data.nodes)
    .force("charge", d3.forceManyBody().strength(-30))
    .force("link", d3.forceLink(data.links).id(d => d.id))
    .force("center", d3.forceCenter());

  const svg = d3.select('#graph-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  if (enableLegend) {
    const legend = [
      { "Current": "var(--g-node-active)" },
      { "Note": "var(--g-node)" },
      ...pathColors
    ]
    legend.forEach((legendEntry, i) => {
      const key = Object.keys(legendEntry)[0]
      const colour = legendEntry[key]
      svg.append("circle").attr("cx", -width / 2 + 20).attr("cy", height / 2 - 30 * (i + 1)).attr("r", 6).style("fill", colour)
      svg.append("text").attr("x", -width / 2 + 40).attr("y", height / 2 - 30 * (i + 1)).text(key).style("font-size", "15px").attr("alignment-baseline", "middle")
    })
  }

  // draw links between nodes
  const link = svg.append("g")
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("class", "link")
    .attr("stroke", "var(--g-link)")
    .attr("stroke-width", 2)
    .attr("data-source", d => d.source.id)
    .attr("data-target", d => d.target.id)

  // svg groups
  const graphNode = svg.append("g")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")

  // draw individual nodes
  const node = graphNode.append("circle")
    .attr("class", "node")
    .attr("id", (d) => d.id)
    .attr("r", (d) => {
      const numOut = index.links[d.id]?.length || 0
      const numIn = index.backlinks[d.id]?.length || 0
      return 3 + (numOut + numIn) / 4
    })
    .attr("fill", color)
    .style("cursor", "pointer")
    .on("click", (_, d) => {
      window.location.href = baseUrl + '/' + decodeURI(d.id).replace(/\s+/g, '-')
    })
    .on("mouseover", function(_, d) {
      d3.selectAll(".node")
        .transition()
        .duration(100)
        .attr("fill", "var(--g-node-inactive)")

      const neighbours = parseIdsFromLinks([...(index.links[d.id] || []), ...(index.backlinks[d.id] || [])])
      const neighbourNodes = d3.selectAll(".node").filter(d => neighbours.includes(d.id))
      const currentId = d.id
      const linkNodes = d3.selectAll(".link").filter(d => d.source.id === currentId || d.target.id === currentId)

      // highlight neighbour nodes
      neighbourNodes
        .transition()
        .duration(200)
        .attr("fill", color)

      // highlight links
      linkNodes
        .transition()
        .duration(200)
        .attr("stroke", "var(--g-link-active)")

      // show text for self
      d3.select(this.parentNode)
        .select("text")
        .raise()
        .transition()
        .duration(200)
        .style("opacity", 1)
    }).on("mouseleave", function(_, d) {
      d3.selectAll(".node")
        .transition()
        .duration(200)
        .attr("fill", color)

      const currentId = d.id
      const linkNodes = d3.selectAll(".link").filter(d => d.source.id === currentId || d.target.id === currentId)

      linkNodes
        .transition()
        .duration(200)
        .attr("stroke", "var(--g-link)")

      d3.select(this.parentNode)
        .select("text")
        .transition()
        .duration(200)
        .style("opacity", 0)
    })
    .call(drag(simulation));

  // draw labels
  const labels = graphNode.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text((d) => content[d.id]?.title || d.id.replace("-", " "))
    .style("opacity", 0)
    .style("pointer-events", "none")
    .call(drag(simulation));

  // set panning

  if (enableZoom) {
    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.25, 4])
      .on("zoom", ({ transform }) => {
        link.attr("transform", transform);
        node.attr("transform", transform);
        labels.attr("transform", transform);
      }));
  }

  // progress the simulation
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
    labels
      .attr("x", d => d.x)
      .attr("y", d => d.y)
  });
}
