import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <Link to="/" className="back-link">
        {'\u2190'} Back to Home
      </Link>

      <h1>About This Project</h1>

      <section className="about-section">
        <h2>License</h2>
        <div className="about-card">
          <div className="license-item">
            <h3>Application Source Code</h3>
            <p>
              Licensed under the <strong>MIT License</strong>. You are free to use, modify,
              and distribute this software with minimal restrictions.
            </p>
          </div>
          <div className="license-item">
            <h3>Educational Content</h3>
            <p>
              Lesson text, quiz questions, and exercise descriptions are licensed under the{' '}
              <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong>.
              You may share and adapt the content with appropriate credit.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>References &amp; Sources</h2>
        <p className="about-description">
          The educational content in this application is based on and references the
          following official sources. This project is not affiliated with or endorsed
          by these organizations.
        </p>
        <div className="about-card">
          <table className="about-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Usage</th>
                <th>License</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Yocto Project Documentation</strong>
                  <br />
                  <span className="about-url">docs.yoctoproject.org</span>
                </td>
                <td>
                  Core concepts, BitBake usage, recipe syntax, image creation,
                  SDK, and licensing workflows
                </td>
                <td>CC BY-SA 2.0 UK</td>
              </tr>
              <tr>
                <td>
                  <strong>OpenEmbedded Documentation</strong>
                  <br />
                  <span className="about-url">openembedded.org</span>
                </td>
                <td>Layer system, class inheritance, recipe best practices</td>
                <td>MIT</td>
              </tr>
              <tr>
                <td>
                  <strong>OpenEmbedded Layer Index</strong>
                  <br />
                  <span className="about-url">layers.openembedded.org</span>
                </td>
                <td>Layer discovery and compatibility information</td>
                <td>MIT</td>
              </tr>
              <tr>
                <td>
                  <strong>BitBake User Manual</strong>
                  <br />
                  <span className="about-url">docs.yoctoproject.org/bitbake</span>
                </td>
                <td>BitBake task execution, variable syntax, fetchers</td>
                <td>CC BY-SA 2.0 UK</td>
              </tr>
              <tr>
                <td>
                  <strong>Linux Kernel Documentation</strong>
                  <br />
                  <span className="about-url">kernel.org/doc</span>
                </td>
                <td>Device tree syntax and bindings</td>
                <td>GPL-2.0</td>
              </tr>
              <tr>
                <td>
                  <strong>SPDX Specification</strong>
                  <br />
                  <span className="about-url">spdx.dev</span>
                </td>
                <td>Software Bill of Materials (SBoM) concepts</td>
                <td>CC-BY-3.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="about-section">
        <h2>Trademarks</h2>
        <div className="about-card">
          <ul className="about-list">
            <li>
              <strong>Yocto Project</strong> is a registered trademark of the Linux Foundation.
            </li>
            <li>
              <strong>OpenEmbedded</strong> is a trademark of the OpenEmbedded project.
            </li>
            <li>
              <strong>BitBake</strong> is part of the OpenEmbedded build infrastructure.
            </li>
            <li>
              <strong>Linux</strong> is a registered trademark of Linus Torvalds.
            </li>
          </ul>
          <p className="about-note">
            All trademarks are the property of their respective owners. Use of these
            names is for identification purposes only and does not imply endorsement.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Disclaimer</h2>
        <div className="about-card">
          <p>
            This is an independent educational project. It is <strong>not</strong> officially
            affiliated with, endorsed by, or sponsored by the Yocto Project, the Linux
            Foundation, or OpenEmbedded.
          </p>
          <p>
            The content is provided for learning purposes and may not reflect the most
            recent changes to the Yocto Project. Always refer to the{' '}
            <a
              href="https://docs.yoctoproject.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              official Yocto Project documentation
            </a>{' '}
            for the latest and most authoritative information.
          </p>
          <p>
            THE CONTENT IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. THE AUTHORS
            ARE NOT RESPONSIBLE FOR ANY ERRORS, OMISSIONS, OR DAMAGES ARISING FROM THE
            USE OF THIS MATERIAL.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Open Source Dependencies</h2>
        <div className="about-card">
          <table className="about-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>License</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>React</td>
                <td>MIT</td>
              </tr>
              <tr>
                <td>React Router</td>
                <td>MIT</td>
              </tr>
              <tr>
                <td>Vite</td>
                <td>MIT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
