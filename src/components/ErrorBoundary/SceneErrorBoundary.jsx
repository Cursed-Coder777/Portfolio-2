// Catches fatal 3D/WebGL failures so the portfolio never turns into a blank page.
//
// The museum is the centerpiece, but it is also the most fragile part of the
// app: WebGL can be unavailable, a GLB can fail to download, or a shader can
// fail to compile. When that happens this boundary replaces only the canvas
// with a readable fallback that still links to the project archive.

import { Component } from "react";
import "./SceneErrorBoundary.scss";

export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Keep the real error in the console for debugging, but do not let it
    // tear down the rest of the React tree.
    console.error("3D scene failed to render:", error, info);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="scene-error" role="alert">
        <div className="scene-error__panel">
          <p className="scene-error__eyebrow">3D view unavailable</p>
          <h1 className="scene-error__title">The museum couldn&apos;t start.</h1>
          <p className="scene-error__message">
            Your browser may not support WebGL, or a 3D asset failed to load.
            The project archive is still available.
          </p>
          <div className="scene-error__actions">
            <button
              type="button"
              className="scene-error__button"
              onClick={this.handleRetry}
            >
              Retry 3D view
            </button>
            <a className="scene-error__link" href="/projects">
              View projects
            </a>
          </div>
        </div>
      </div>
    );
  }
}
