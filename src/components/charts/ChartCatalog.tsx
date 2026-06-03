import { CHART_CATALOG } from '@/data/charts';

/** Renders a single catalog thumbnail (trusted local SVG markup). */
export function ChartThumb({ svg, designOnly, name }: { svg: string; designOnly?: boolean; name: string }) {
  return (
    <figure className="ct">
      <span className="ct-img">
        <svg viewBox="0 0 80 48" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: svg }} />
        {designOnly && <span className="ct-tag">Design only</span>}
      </span>
      <figcaption>{name}</figcaption>
    </figure>
  );
}

/** The full six-family chart catalog, derived entirely from data. */
export function ChartCatalog() {
  return (
    <>
      {CHART_CATALOG.map((cat) => (
        <div className="chartcat" key={cat.name}>
          <div className="cc-head">
            <h4 dangerouslySetInnerHTML={{ __html: cat.name }} />
            <p dangerouslySetInnerHTML={{ __html: cat.desc }} />
          </div>
          <div className="cc-grid">
            {cat.items.map((it) => (
              <ChartThumb key={it.name} svg={it.svg} designOnly={it.designOnly} name={it.name} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
