export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <span className="mk" />
              Edingrad
            </div>
            <p style={{ marginTop: 16, fontSize: '.86rem' }}>
              Institutional-grade investment advisory for asset managers and private wealth.
            </p>
          </div>
          <div>
            <h5>Brand</h5>
            <a href="#philosophy">Philosophy</a>
            <a href="#logo">Logo</a>
            <a href="#type">Typography</a>
            <a href="#color">Color</a>
          </div>
          <div>
            <h5>System</h5>
            <a href="#data">Data visualization</a>
            <a href="#voice">Brand voice</a>
            <a href="#resources">Resources</a>
            <a href="#whatsnew">What&rsquo;s new</a>
          </div>
          <div>
            <h5>Edingrad</h5>
            <a href="https://www.edingrad.com" target="_blank" rel="noopener noreferrer">
              edingrad.com
            </a>
            <a href="#help">Get in touch</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Edingrad Real Estate L.L.C</span>
          <span>Brand Guidelines v1.0 &middot; Palestra + Lynx Sans</span>
        </div>
      </div>
    </footer>
  );
}
