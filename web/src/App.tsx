import React from "react";
import "./App.css";
import WebPush from "./API/frontend";

export interface IAppProps {}

export interface IAppState {
  notificationToggle: boolean;
  id: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
  private wp = new WebPush();
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      notificationToggle: false,
      id: "",
    };
  }

  componentDidMount = async () => {
    var isAlreadyRegistered = await this.wp.init(
      "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8"
    );
    if (isAlreadyRegistered)
      this.setState({ id: isAlreadyRegistered.id, notificationToggle: true });
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>A web push notification example</p>
          {!this.state.notificationToggle ? (
            <button
              style={{
                border: "none",
                borderRadius: ".25rem",
                backgroundColor: "#626567",
                color: "white",
                padding: "10px 15px",
              }}
              disabled={this.state.notificationToggle}
              onClick={async () => {
                if (this.state.notificationToggle) return;
                var sub = await this.wp.register();
                if (sub)
                  this.setState({ id: sub.id, notificationToggle: true });
              }}
            >
              Click here
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Push Notifications are enabled | ID:
              </span>
              &nbsp;
              <input
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                  fontSize: "14px",
                  fontWeight: 100,
                  color: "rgba(255,255,255,0.8)",
                  padding: 0,
                  paddingTop: "1px",
                  width: "max-content",
                }}
                type="text"
                value={this.state.id}
              />
            </div>
          )}
        </header>
      </div>
    );
  }
}
