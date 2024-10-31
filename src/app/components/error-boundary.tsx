import React, { Component, ReactNode } from "react";
import { logError } from "../actions/log-error";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ error, hasError: true, info });
    logError(error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: "white", color: "red" }}>
          There was an error {JSON.stringify(this.state)}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
